/* ============================================================
   shared.js — Vox Mana
   Supabase auth + profile storage.
   Import with: <script src="shared.js"></script>
   ============================================================

   SETUP — paste your values from supabase.com → project → Settings → API:
   ---------------------------------------------------------- */
const VM_CONFIG = {
  supabaseUrl:  'https://lwkjnwscowbqrfqqhgsp.supabase.co',
  supabaseKey:  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3a2pud3Njb3dicXJmcXFoZ3NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NTExMDcsImV4cCI6MjA5MTAyNzEwN30.mttdOwKCBkON8DOeEAV297rFV-Sj6n-TcLCT28BVlZ8'
};
/* ---------------------------------------------------------- */

/* Load Supabase client (loaded via CDN script tag in HTML) */
let _sb = null;
function getSupabase() {
  if (_sb) return _sb;
  if (typeof window.supabase === 'undefined') {
    console.error('Supabase SDK not loaded. Add the CDN script before shared.js.');
    return null;
  }
  _sb = window.supabase.createClient(VM_CONFIG.supabaseUrl, VM_CONFIG.supabaseKey);
  return _sb;
}

/* ── SESSION ─────────────────────────────────────────────── */
/* VM_SESSION mirrors the old interface so index.html/research.html
   don't need changes beyond the auth functions.
   .username and .profile are cached in memory + sessionStorage
   as a fast read layer; Supabase is the source of truth.      */
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

/**
 * Register a new user.
 * Returns { ok: true } or { ok: false, message: '...' }
 */
async function vm_register(username, email, password) {
  const sb = getSupabase();
  if (!sb) return { ok: false, message: 'Auth service unavailable.' };

  username = username.trim().toLowerCase();

  /* Check username isn't taken (profiles table, username column) */
  const { data: existing } = await sb
    .from('profiles')
    .select('id')
    .eq('username', username)
    .maybeSingle();

  if (existing) return { ok: false, message: 'That username is already taken.' };

  /* Create Supabase auth user */
  const { data, error } = await sb.auth.signUp({ email, password });
  if (error) return { ok: false, message: error.message };

  const userId = data.user?.id;
  if (!userId) return { ok: false, message: 'Registration failed — please try again.' };

  /* Insert profile row */
  const { error: profileErr } = await sb
    .from('profiles')
    .insert({ id: userId, username, guild: null, scores: null, taken_at: null });

  if (profileErr) return { ok: false, message: profileErr.message };

  /* Cache session */
  VM_SESSION.username = username;
  VM_SESSION.profile  = { guild: null, scores: null, takenAt: null };

  return { ok: true };
}

/**
 * Sign in an existing user by username + password.
 * Looks up the email from the profiles table, then signs in with Supabase.
 */
async function vm_login(username, password) {
  const sb = getSupabase();
  if (!sb) return { ok: false, message: 'Auth service unavailable.' };

  username = username.trim().toLowerCase();

  /* Fetch email for this username */
  const { data: row, error: fetchErr } = await sb
    .from('profiles')
    .select('id, email, guild, scores, taken_at')
    .eq('username', username)
    .maybeSingle();

  if (fetchErr || !row) return { ok: false, message: 'No account found for that username.' };

  /* Sign in with Supabase */
  const { data, error } = await sb.auth.signInWithPassword({ email: row.email, password });
  if (error) return { ok: false, message: 'Incorrect password.' };

  /* Cache session */
  VM_SESSION.username = username;
  VM_SESSION.profile  = {
    guild:   row.guild,
    scores:  row.scores,
    takenAt: row.taken_at
  };

  return { ok: true };
}

/**
 * Sign out.
 */
async function vm_signOut() {
  const sb = getSupabase();
  if (sb) await sb.auth.signOut();
  VM_SESSION.clear();
}

/**
 * Resume an existing Supabase session on page load.
 * Call this in your load handler to restore auth after a page refresh.
 * Returns true if a session was found and restored.
 */
async function vm_resumeSession() {
  const sb = getSupabase();
  if (!sb) return false;

  const { data: { session } } = await sb.auth.getSession();
  if (!session) return false;

  /* Already cached from this tab? */
  if (VM_SESSION.username && VM_SESSION.profile) return true;

  /* Re-fetch profile from DB */
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
}

/**
 * Save guild result to database.
 */
async function vm_saveProfile(guildKey, scoresObj) {
  const sb = getSupabase();
  if (!sb || !VM_SESSION.username) return false;

  const now = new Date().toISOString();

  const { error } = await sb
    .from('profiles')
    .update({ guild: guildKey, scores: scoresObj, taken_at: now })
    .eq('username', VM_SESSION.username);

  if (error) { console.error('saveProfile:', error.message); return false; }

  VM_SESSION.profile = { guild: guildKey, scores: scoresObj, takenAt: now };
  return true;
}

/**
 * Clear the guild result (retake).
 */
async function vm_clearGuild() {
  const sb = getSupabase();
  if (!sb || !VM_SESSION.username) return false;

  const { error } = await sb
    .from('profiles')
    .update({ guild: null, scores: null, taken_at: null })
    .eq('username', VM_SESSION.username);

  if (error) return false;

  VM_SESSION.profile = { guild: null, scores: null, takenAt: null };
  return true;
}
