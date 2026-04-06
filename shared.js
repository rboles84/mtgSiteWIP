/* ============================================================
   shared.js — Vox Mana
   Auth, storage, and session used by both index.html and research.html.
   Import with:  <script src="shared.js"></script>
   ============================================================ */

/* ── STORAGE (3-tier fallback) ──────────────────────────────
   1. window.storage   → Claude artifact environment
   2. localStorage     → any normal browser / local file
   3. MEM_STORE Map    → session-only, always works
   ---------------------------------------------------------- */
const MEM_STORE = new Map();

/* Test accounts — no persistence, always available */
const TEST_ACCOUNTS = { 'tu': 'tu' };

function vm_profileKey(u) { return 'vm_profile:' + u.toLowerCase(); }

function vm_hashPass(u, p) {
  const raw = u.toLowerCase() + '::' + p;
  let h = 0x811c9dc5;
  for (let i = 0; i < raw.length; i++) {
    h ^= raw.charCodeAt(i);
    h = (h * 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, '0');
}

async function vm_loadProfile(u) {
  /* Test account — ephemeral fresh profile every time */
  if (Object.prototype.hasOwnProperty.call(TEST_ACCOUNTS, u)) {
    return { passwordHash: vm_hashPass(u, TEST_ACCOUNTS[u]), guild: null, scores: null, takenAt: null, _test: true };
  }
  /* 1. window.storage (Claude artifact env) */
  if (typeof window.storage !== 'undefined') {
    try {
      const r = await window.storage.get(vm_profileKey(u));
      if (r) return JSON.parse(r.value);
    } catch (_) {}
  }
  /* 2. localStorage */
  try {
    const v = localStorage.getItem(vm_profileKey(u));
    if (v) return JSON.parse(v);
  } catch (_) {}
  /* 3. In-memory */
  const v = MEM_STORE.get(vm_profileKey(u));
  return v ? JSON.parse(v) : null;
}

async function vm_saveProfile(u, d) {
  /* Test accounts never persist */
  if (Object.prototype.hasOwnProperty.call(TEST_ACCOUNTS, u)) return true;
  const val = JSON.stringify(d);
  /* 1. window.storage */
  if (typeof window.storage !== 'undefined') {
    try { await window.storage.set(vm_profileKey(u), val); return true; } catch (_) {}
  }
  /* 2. localStorage */
  try { localStorage.setItem(vm_profileKey(u), val); return true; } catch (_) {}
  /* 3. In-memory fallback — always succeeds */
  MEM_STORE.set(vm_profileKey(u), val);
  return true;
}

/* ── SESSION ─────────────────────────────────────────────── */
/* Shared session state — survives page navigation via sessionStorage */
const VM_SESSION = {
  get username() {
    try { return sessionStorage.getItem('vm_user') || null; } catch(_) { return this._u || null; }
  },
  set username(v) {
    try { if(v) sessionStorage.setItem('vm_user', v); else sessionStorage.removeItem('vm_user'); }
    catch(_) { this._u = v; }
  },
  _profile: null,
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
      else sessionStorage.removeItem('vm_profile');
    } catch(_) {}
  },
  clear() {
    this.username = null;
    this.profile = null;
    this._profile = null;
    try { sessionStorage.removeItem('vm_user'); sessionStorage.removeItem('vm_profile'); } catch(_) {}
  }
};
