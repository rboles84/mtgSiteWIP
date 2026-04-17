/* ============================================================
   shared.js — Vox Mana
   Supabase auth + profile storage.
   ============================================================ */

const VM_CONFIG = {
  supabaseUrl:  'https://lwkjnwscowbqrfqqhgsp.supabase.co',
  supabaseKey:  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3a2pud3Njb3dicXJmcXFoZ3NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NTExMDcsImV4cCI6MjA5MTAyNzEwN30.mttdOwKCBkON8DOeEAV297rFV-Sj6n-TcLCT28BVlZ8'
};

/* ── SUPABASE CLIENT ─────────────────────────────────────── */
let _sb = null;
function getSupabase() {
  if (_sb) return _sb;
  if (typeof window.supabase === 'undefined') {
    console.error('Supabase SDK not loaded.');
    return null;
  }
  try {
    _sb = window.supabase.createClient(VM_CONFIG.supabaseUrl, VM_CONFIG.supabaseKey);
    return _sb;
  } catch(e) {
    console.error('Supabase init error:', e);
    return null;
  }
}

/* ── SESSION ─────────────────────────────────────────────── */
const VM_SESSION = {
  _username: null,
  _profile:  null,

  get username() {
    if (this._username) return this._username;
    try { return sessionStorage.getItem('vm_user') || null; } catch(_) { return null; }
  },
  set username(v) {
    this._username = v;
    try {
      if (v) sessionStorage.setItem('vm_user', v);
      else   sessionStorage.removeItem('vm_user');
    } catch(_) {}
  },

  get profile() {
    if (this._profile) return this._profile;
    try {
      const s = sessionStorage.getItem('vm_profile');
      return s ? JSON.parse(s) : null;
    } catch(_) { return null; }
  },
  set profile(v) {
    this._profile = v;
    try {
      if (v) sessionStorage.setItem('vm_profile', JSON.stringify(v));
      else   sessionStorage.removeItem('vm_profile');
    } catch(_) {}
  },

  clear() {
    this._username = null;
    this._profile  = null;
    try {
      sessionStorage.removeItem('vm_user');
      sessionStorage.removeItem('vm_profile');
    } catch(_) {}
  }
};

/* ── AUTH FUNCTIONS ──────────────────────────────────────── */

/*
  Registration:
  - Passes username in metadata so the DB trigger can store it.
  - The trigger (handle_new_user) inserts the profile row automatically.
  - We then UPDATE to ensure username + email are correct.
  - No manual INSERT avoids RLS timing issues entirely.
*/
async function vm_register(username, email, password) {
  username = username.trim().toLowerCase();

  const sb = getSupabase();
  if (!sb) return { ok: false, message: 'Could not connect to database.' };

  try {
    /* 1. Create auth user — pass username in metadata for the DB trigger */
    const { data, error: signUpErr } = await sb.auth.signUp({
      email,
      password,
      options: { data: { username } }
    });

    if (signUpErr) return { ok: false, message: signUpErr.message };

    const userId = data.user?.id;
    if (!userId) return {
      ok: false,
      message: 'Registration failed — no user ID returned. Make sure "Confirm email" is OFF in Supabase Auth settings.'
    };

    /* 2. Upsert profile row — works whether the DB trigger already fired or not.
          If the trigger created the row, this updates username + email.
          If the trigger hasn't fired yet, this inserts the row directly. */
    const { error: upsertErr } = await sb
      .from('profiles')
      .upsert(
        { id: userId, username, email, guild: null, scores: null, taken_at: null },
        { onConflict: 'id' }
      );

    if (upsertErr) {
      /* Username already taken (unique constraint on username column) */
      if (upsertErr.code === '23505') return { ok: false, message: 'That username is already taken.' };
      console.warn('Profile upsert warning:', upsertErr.message);
      /* Non-fatal — session still valid, profile may exist via trigger */
    }

    VM_SESSION.username = username;
    VM_SESSION.profile  = { guild: null, scores: null, takenAt: null };
    return { ok: true };

  } catch(e) {
    return { ok: false, message: 'Network error during registration: ' + e.message };
  }
}

/*
  Login:
  - Looks up email from profiles table using the username.
  - Then signs in with Supabase using that email + password.
  - Gives a clear message if email is still NULL (needs SQL fix).
*/
async function vm_login(username, password) {
  username = username.trim().toLowerCase();

  const sb = getSupabase();
  if (!sb) return { ok: false, message: 'Could not connect to database.' };

  try {
    /* Look up email by username */
    const { data: row, error: fetchErr } = await sb
      .from('profiles')
      .select('id, email, guild, scores, taken_at')
      .eq('username', username)
      .maybeSingle();

    if (fetchErr) return { ok: false, message: 'Login error: ' + fetchErr.message };
    if (!row)     return { ok: false, message: 'No account found for that username.' };
    if (!row.email) return {
      ok: false,
      message: 'Account email is missing — run the SQL email-fix in Supabase SQL Editor, then try again.'
    };

    /* Sign in with Supabase */
    const { error: signInErr } = await sb.auth.signInWithPassword({
      email: row.email,
      password
    });
    if (signInErr) return { ok: false, message: 'Incorrect password.' };

    VM_SESSION.username = username;
    VM_SESSION.profile  = {
      guild:   row.guild,
      scores:  row.scores,
      takenAt: row.taken_at
    };
    return { ok: true };

  } catch(e) {
    return { ok: false, message: 'Network error during login: ' + e.message };
  }
}

/* Sign out and clear session */
async function vm_signOut() {
  const sb = getSupabase();
  try { if (sb) await sb.auth.signOut(); } catch(_) {}
  VM_SESSION.clear();
}

/*
  Resume an existing Supabase session on page load.
  Call on DOMContentLoaded to restore auth after a page refresh.
  Returns true if a session was restored.
*/
async function vm_resumeSession() {
  const sb = getSupabase();
  if (!sb) return false;

  try {
    const { data: { session } } = await sb.auth.getSession();
    if (!session) return false;

    /* Already cached in this tab */
    if (VM_SESSION.username && VM_SESSION.profile) return true;

    /* Re-fetch profile from DB using auth user ID */
    const { data: row } = await sb
      .from('profiles')
      .select('username, guild, scores, taken_at')
      .eq('id', session.user.id)
      .maybeSingle();

    if (!row) return false;

    VM_SESSION.username = row.username;
    VM_SESSION.profile  = {
      guild:   row.guild,
      scores:  row.scores,
      takenAt: row.taken_at
    };
    return true;

  } catch(e) {
    console.warn('Session resume failed:', e.message);
    return false;
  }
}

/* Save guild result to database */
async function vm_saveProfile(guildKey, scoresObj) {
  const sb = getSupabase();
  if (!sb || !VM_SESSION.username) return false;

  try {
    const now = new Date().toISOString();
    const { error } = await sb
      .from('profiles')
      .update({ guild: guildKey, scores: scoresObj, taken_at: now })
      .eq('username', VM_SESSION.username);

    if (error) { console.error('saveProfile:', error.message); return false; }
    VM_SESSION.profile = { guild: guildKey, scores: scoresObj, takenAt: now };
    return true;
  } catch(e) {
    console.error('saveProfile error:', e.message);
    return false;
  }
}

/* Clear guild result so user can retake the quiz */
async function vm_clearGuild() {
  const sb = getSupabase();
  if (!sb || !VM_SESSION.username) return false;

  try {
    const { error } = await sb
      .from('profiles')
      .update({ guild: null, scores: null, taken_at: null })
      .eq('username', VM_SESSION.username);

    if (error) return false;
    VM_SESSION.profile = { guild: null, scores: null, takenAt: null };
    return true;
  } catch(e) {
    return false;
  }
}
