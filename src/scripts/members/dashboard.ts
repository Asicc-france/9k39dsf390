import { getBackend, type Backend, type Item, type Level, type Profile, type User } from '../backend';
import { tr, esc, base, pub, lang, errMsg, demoBar, spinner, fmtDate, setBusy, levelChecks } from './common';

const root = document.getElementById('app')!;
root.innerHTML = spinner();

let b: Backend;
let routed = false;

getBackend().then((backend) => {
  b = backend;
  demoBar(b);
  b.onAuth((u) => {
    if (!u) { location.replace(`${base}login/?next=${encodeURIComponent(location.pathname + location.hash)}`); return; }
    if (routed) return; routed = true;
    route(u).catch((e) => { root.innerHTML = `<p class="notice notice-err">${esc(errMsg(e))}</p>`; });
  });
});

async function route(user: User) {
  if (b.mode === 'firebase' && !user.emailVerified) return viewVerify(user);
  const p = await b.getProfile(user.uid);
  if (!p) return viewProfileForm(user);
  if (p.status === 'pending') return viewState(p, 'pending');
  if (p.status === 'rejected') return viewState(p, 'rejected');
  return viewDashboard(user, p);
}

/* ---------- 상태 화면 ---------- */
const logoutBtn = `<button class="btn btn-ghost btn-sm" type="button" data-logout>${esc(tr('logout'))}</button>`;
const bindLogout = () => root.querySelectorAll('[data-logout]').forEach((x) =>
  x.addEventListener('click', async () => { await b.signOut(); location.replace(pub()); }));

function viewVerify(user: User) {
  root.innerHTML = `
    <div class="card auth-card stack gap-16">
      <h1 class="h2">${esc(tr('verifyTitle'))}</h1>
      <p class="muted"><b>${esc(user.email)}</b>${esc(tr('verifyText'))}</p>
      <p class="err" data-msg role="status"></p>
      <div class="row gap-12"><button class="btn btn-dark" data-done>${esc(tr('verifyDone'))}</button><button class="btn btn-ghost" data-resend>${esc(tr('verifyResend'))}</button></div>
      <div>${logoutBtn}</div>
    </div>`;
  const msg = root.querySelector<HTMLElement>('[data-msg]')!;
  root.querySelector('[data-done]')!.addEventListener('click', async () => {
    const u = await b.reloadUser();
    if (u?.emailVerified) { routed = true; route(u); } else msg.textContent = tr('verifyStill');
  });
  root.querySelector('[data-resend]')!.addEventListener('click', async () => {
    try { await b.resendVerification(lang); msg.style.color = 'var(--ok)'; msg.textContent = tr('verifyResent'); } catch (e) { msg.textContent = errMsg(e); }
  });
  bindLogout();
}

function viewState(p: Profile, kind: 'pending' | 'rejected') {
  root.innerHTML = `
    <div class="card auth-card stack gap-16">
      <span class="pill ${kind === 'pending' ? 'pill-warn' : 'pill-gray'}" style="align-self:flex-start">${esc(tr('status.' + kind))}</span>
      <h1 class="h2">${esc(tr(kind + 'Title'))}</h1>
      <p class="muted">${esc(tr(kind + 'Text'))}</p>
      <div class="card card-pad small" style="background:var(--bg)">
        <div class="kv"><span class="muted">${esc(tr('name'))}</span><span>${esc(p.name)}</span></div>
        <div class="kv"><span class="muted">${esc(tr('email'))}</span><span>${esc(p.email)}</span></div>
        <div class="kv"><span class="muted">${esc(tr('levels'))}</span><span>${p.levels.map((l) => esc(tr('lv.' + l))).join(', ')}</span></div>
      </div>
      <div class="row gap-12">${logoutBtn}<a class="btn btn-ghost btn-sm" href="${pub('contact/')}">${esc(lang === 'ko' ? '협회 문의' : 'Nous contacter')}</a></div>
    </div>`;
  bindLogout();
}

function viewProfileForm(user: User) {
  root.innerHTML = `
    <form class="card auth-card wide stack gap-16" novalidate>
      <h1 class="h2">${esc(tr('profileTitle'))}</h1>
      <p class="muted">${esc(tr('profileText'))}</p>
      <label class="field">${esc(tr('name'))}<input name="name" required></label>
      <div class="field"><span>${esc(tr('levels'))}</span><div class="checks">${levelChecks('levels')}</div></div>
      <label class="field">${esc(tr('phone'))}<input name="phone" type="tel"></label>
      <label class="check"><input type="checkbox" name="imageConsent">${esc(tr('imageConsent'))}</label>
      <label class="check"><input type="checkbox" name="privacyConsent"><span>${esc(tr('privacyConsent'))}</span></label>
      <p class="err" data-msg role="alert"></p>
      <button class="btn btn-dark" type="submit" style="align-self:flex-start">${esc(tr('save'))}</button>
    </form>`;
  const f = root.querySelector('form')!;
  f.addEventListener('submit', async (e) => {
    e.preventDefault();
    const g = (n: string) => f.elements.namedItem(n) as HTMLInputElement;
    const levels = [...f.querySelectorAll<HTMLInputElement>('[name=levels]:checked')].map((i) => i.value as Level);
    const msg = f.querySelector<HTMLElement>('[data-msg]')!;
    if (!g('name').value.trim()) return (msg.textContent = tr('err.required'));
    if (!levels.length) return (msg.textContent = tr('err.levels'));
    if (!g('privacyConsent').checked) return (msg.textContent = tr('err.privacy'));
    try {
      await b.createProfile(user.uid, { name: g('name').value.trim(), email: user.email, levels, phone: g('phone').value.trim(), imageConsent: g('imageConsent').checked, privacyConsent: true, lang });
      route(user);
    } catch (e2) { msg.textContent = errMsg(e2); }
  });
}

/* ---------- 대시보드 ---------- */
const TABS = ['notices', 'kids', 'minutes', 'relations', 'ops', 'account'] as const;
type Tab = (typeof TABS)[number];
const ICON: Record<Tab, string> = {
  notices: '<path d="M4 5h16v11H8l-4 4z"/>',
  kids: '<circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01M15 9h.01"/>',
  minutes: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',
  relations: '<path d="M4 19h16M6 15l4-4 3 3 5-6"/>',
  ops: '<path d="M4 6h16v12H4z"/><path d="M4 10h16"/>',
  account: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
};
const icon = (t: Tab) => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[t]}</svg>`;

let me: Profile; let meUser: User;
const cache = new Map<string, Item[]>();
const load = async (col: any, fresh = false) => {
  if (fresh || !cache.has(col)) cache.set(col, await b.list(col));
  return cache.get(col)!;
};

function viewDashboard(user: User, p: Profile) {
  me = p; meUser = user;
  const staff = p.role === 'admin' || p.role === 'rep';
  root.innerHTML = `
    <div class="m-top">
      <div class="stack gap-8">
        <span class="m-badge" style="align-self:flex-start">${esc(tr('membersOnly'))}</span>
        <h1 class="m-title">${esc(p.name)}${esc(tr('welcome'))}</h1>
      </div>
      <div class="row gap-8">
        ${staff ? `<a class="btn btn-accent btn-sm" href="${base}admin/">${esc(tr('toAdmin'))}</a>` : ''}
        ${logoutBtn}
      </div>
    </div>
    <div class="m-layout">
      <nav class="card m-nav" role="tablist" aria-label="${esc(tr('membersOnly'))}">
        ${TABS.map((t) => `<button type="button" role="tab" id="tab-${t}" aria-controls="panel" data-tab="${t}">${icon(t)}${esc(tr('tab.' + t))}</button>`).join('')}
        <p class="note">${esc(tr('sideNote'))}</p>
      </nav>
      <section class="m-main" id="panel" role="tabpanel" tabindex="-1"></section>
    </div>`;
  bindLogout();
  root.querySelectorAll<HTMLButtonElement>('[data-tab]').forEach((btn) => btn.addEventListener('click', () => { location.hash = btn.dataset.tab!; }));
  window.addEventListener('hashchange', showTab);
  showTab();
}

function showTab() {
  const h = location.hash.slice(1) as Tab;
  const tab: Tab = TABS.includes(h) ? h : 'notices';
  root.querySelectorAll<HTMLButtonElement>('[data-tab]').forEach((x) => {
    const on = x.dataset.tab === tab;
    x.setAttribute('aria-selected', String(on)); x.tabIndex = on ? 0 : -1;
  });
  const panel = document.getElementById('panel')!;
  panel.setAttribute('aria-labelledby', `tab-${tab}`);
  panel.innerHTML = spinner();
  RENDER[tab](panel).catch((e) => { panel.innerHTML = `<p class="notice notice-err">${esc(errMsg(e))}</p>`; });
}

const head = (tab: Tab, intro: string, extra = '') => `
  <div class="row between gap-12">
    <div class="stack gap-8"><span class="eyebrow">${esc(tr('tab.' + tab))}</span><p class="muted small">${esc(intro)}</p></div>${extra}
  </div>`;
const emptyBox = `<div class="card empty">${esc(tr('none'))}</div>`;

function chips(name: string, keys: string[], prefix: string) {
  return `<div class="filters" role="group">${keys.map((k, i) => `<button type="button" class="chip" data-${name}="${k}" aria-pressed="${i === 0}">${esc(tr(prefix + k))}</button>`).join('')}</div>`;
}
function bindChips(panel: HTMLElement, name: string, onPick: (k: string) => void) {
  const bs = panel.querySelectorAll<HTMLButtonElement>(`[data-${name}]`);
  bs.forEach((x) => x.addEventListener('click', () => { bs.forEach((y) => y.setAttribute('aria-pressed', String(y === x))); onPick(x.getAttribute(`data-${name}`)!); }));
}

const RENDER: Record<Tab, (p: HTMLElement) => Promise<void>> = {
  async notices(panel) {
    const items = await load('notices');
    panel.innerHTML = head('notices', tr('noticesIntro'),
      `<label class="search"><span class="sr-only">${esc(tr('search'))}</span><input type="search" data-q placeholder="${esc(tr('search'))}"></label>`) +
      `<ul class="card list" data-list></ul>`;
    const ul = panel.querySelector<HTMLElement>('[data-list]')!;
    const draw = (q = '') => {
      const f = items.filter((i) => !q || `${i.title} ${i.body}`.toLowerCase().includes(q));
      ul.innerHTML = f.length ? f.map((i) => `<li><span class="when">${esc(fmtDate(i.date))}</span><div class="grow"><b>${esc(i.title)}</b><p class="small muted" style="white-space:pre-line">${esc(i.body)}</p></div></li>`).join('') : `<li class="empty">${esc(tr('none'))}</li>`;
    };
    draw();
    panel.querySelector<HTMLInputElement>('[data-q]')!.addEventListener('input', (e) => draw((e.target as HTMLInputElement).value.trim().toLowerCase()));
  },

  async kids(panel) {
    const items = await load('gallery');
    panel.innerHTML = head('kids', tr('kidsIntro')) + chips('cat', ['all', 'art', 'diary', 'class'], 'cat.') + `<div class="gallery" data-g></div>`;
    const g = panel.querySelector<HTMLElement>('[data-g]')!;
    const draw = (cat: string) => {
      const f = items.filter((i) => cat === 'all' || i.cat === cat);
      g.innerHTML = f.length ? f.map((i) => `
        <figure><div class="img" data-img="${esc(i.id)}">${esc(i.caption || tr('cat.' + i.cat))}</div>
        <figcaption><b>${esc(tr('cat.' + i.cat))}</b><span class="muted">${esc(i.grade ?? '')}</span></figcaption></figure>`).join('') : emptyBox;
      f.forEach(async (i) => {
        const file = i.files?.[0]; if (!file) return;
        try {
          const url = await b.fileUrl(file);
          const box = g.querySelector(`[data-img="${CSS.escape(i.id)}"]`);
          if (box) box.innerHTML = `<img src="${esc(url)}" alt="${esc(i.caption ?? '')}" loading="lazy">`;
        } catch {}
      });
    };
    draw('all'); bindChips(panel, 'cat', draw);
  },

  async minutes(panel) {
    const items = await load('minutes');
    const pill: Record<string, string> = { ag: 'pill-navy', board: 'pill-accent', founding: 'pill-olive', other: 'pill-gray' };
    panel.innerHTML = head('minutes', tr('minutesIntro')) + (items.length ? items.map((i) => `
      <article class="card">
        <div class="row between gap-8" style="padding:20px 22px;border-bottom:1px solid var(--line-2)">
          <div class="stack" style="gap:2px"><b style="font-size:17px">${esc(i.title)}</b><span class="tiny">${esc(fmtDate(i.date))}${i.summary ? ' · ' + esc(i.summary) : ''}</span></div>
          <span class="pill ${pill[i.type] ?? 'pill-gray'}">${esc(tr('mt.' + (i.type ?? 'other')))}</span>
        </div>
        <ul class="list">${(i.files ?? []).map((f, k) => `<li><span class="small">${esc(f.name)}</span><button class="btn btn-ghost btn-sm" data-file="${esc(i.id)}:${k}">${esc(tr('download'))}</button></li>`).join('') || `<li class="tiny">—</li>`}</ul>
      </article>`).join('') : emptyBox);
    panel.querySelectorAll<HTMLButtonElement>('[data-file]').forEach((btn) => btn.addEventListener('click', async () => {
      const [id, k] = btn.dataset.file!.split(':');
      const f = items.find((x) => x.id === id)!.files![+k];
      try { window.open(await b.fileUrl(f), '_blank', 'noopener'); } catch (e) { alert(errMsg(e)); }
    }));
  },

  async relations(panel) {
    const items = await load('relations');
    const orgs = ['all', 'edu-center', 'ministry', 'rectorat', 'school', 'community'];
    panel.innerHTML = head('relations', tr('relationsIntro')) + chips('org', orgs, 'org.') + `<ol class="card list" data-list></ol>`;
    const ol = panel.querySelector<HTMLElement>('[data-list]')!;
    const draw = (o: string) => {
      const f = items.filter((i) => o === 'all' || i.org === o);
      ol.innerHTML = f.length ? f.map((i) => `<li><span class="when">${esc(fmtDate(i.date))}</span><div class="grow"><span class="tiny" style="color:var(--accent-ink);font-weight:500">${esc(tr('org.' + i.org))}</span><b>${esc(i.title)}</b><p class="small muted" style="white-space:pre-line">${esc(i.note ?? '')}</p></div></li>`).join('') : `<li class="empty">${esc(tr('none'))}</li>`;
    };
    draw('all'); bindChips(panel, 'org', draw);
  },

  async ops(panel) {
    const expenses = await load('expenses');
    panel.innerHTML = head('ops', '') + `
      <div class="grid g-2">
        <div class="card card-pad stack gap-8">
          <span class="tiny">${esc(tr('opsFee'))}</span>
          <b style="font-family:var(--serif);font-size:34px;color:var(--accent)">20 €</b>
          <p class="small muted">${esc(tr('opsFeeText'))}</p>
          <span class="box small">${esc(tr('opsFeeHow'))}</span>
        </div>
        <div class="card card-pad stack gap-8">
          <span class="tiny">${esc(tr('opsExpenses'))}</span>
          ${expenses.length ? expenses.map((x) => `<div class="kv"><span>${esc(x.label)} <span class="tiny">${esc(fmtDate(x.date))}</span></span><span>${x.amount ? esc(x.amount) + ' €' : '<span class="placeholder">[—]</span>'}</span></div>`).join('') : `<p class="tiny">${esc(tr('none'))}</p>`}
        </div>
      </div>
      <div class="card card-pad row between gap-16">
        <div class="stack gap-8" style="flex:1 1 320px"><b>${esc(tr('opsVolunteer'))}</b><p class="small muted">${esc(tr('opsVolunteerText'))}</p></div>
        <a class="btn btn-dark btn-sm" href="${pub('contact/?type=volunteer')}">${esc(tr('apply'))}</a>
      </div>`;
  },

  async account(panel) {
    panel.innerHTML = head('account', tr('accountIntro')) + `
      <div class="grid g-2">
        <form class="card card-pad stack gap-16" data-acc novalidate>
          <label class="field">${esc(tr('name'))}<input name="name" value="${esc(me.name)}" required></label>
          <label class="field">${esc(tr('phone'))}<input name="phone" type="tel" value="${esc(me.phone)}"></label>
          <div class="field"><span>${esc(tr('levels'))}</span><div class="checks">${levelChecks('levels', me.levels)}</div></div>
          <label class="field">${esc(tr('prefLang'))}<select name="lang"><option value="ko" ${me.lang === 'ko' ? 'selected' : ''}>한국어</option><option value="fr" ${me.lang === 'fr' ? 'selected' : ''}>Français</option></select></label>
          <label class="check"><input type="checkbox" name="imageConsent" ${me.imageConsent ? 'checked' : ''}>${esc(tr('imageConsent'))}</label>
          <div class="row gap-12"><button class="btn btn-dark btn-sm" type="submit">${esc(tr('save'))}</button><span class="err" data-msg role="status"></span></div>
        </form>
        <div class="stack gap-16">
          <div class="card card-pad">
            <div class="kv"><span class="muted">${esc(tr('email'))}</span><span>${esc(me.email)}</span></div>
            <div class="kv"><span class="muted">${esc(tr('statusLabel'))}</span><span class="pill pill-ok">${esc(tr('status.' + me.status))}</span></div>
            <div class="kv"><span class="muted">${esc(tr('roleLabel'))}</span><span>${esc(tr('role.' + me.role))}${me.repLevel && me.role === 'rep' ? ' · ' + esc(tr('lv.' + me.repLevel)) : ''}</span></div>
          </div>
          <div class="card card-pad stack gap-12">
            <button class="btn btn-ghost btn-sm" type="button" data-reset style="align-self:flex-start">${esc(tr('forgot'))}</button>
            <button class="btn btn-ghost btn-sm" type="button" data-delete style="align-self:flex-start;color:var(--danger)">${esc(tr('deleteAccount'))}</button>
          </div>
        </div>
      </div>`;
    const f = panel.querySelector<HTMLFormElement>('[data-acc]')!;
    const msg = f.querySelector<HTMLElement>('[data-msg]')!;
    f.addEventListener('submit', async (e) => {
      e.preventDefault();
      const g = (n: string) => f.elements.namedItem(n) as HTMLInputElement;
      const levels = [...f.querySelectorAll<HTMLInputElement>('[name=levels]:checked')].map((i) => i.value as Level);
      if (!g('name').value.trim()) return (msg.textContent = tr('err.required'));
      if (!levels.length) return (msg.textContent = tr('err.levels'));
      const patch = { name: g('name').value.trim(), phone: g('phone').value.trim(), levels, lang: g('lang').value as 'ko' | 'fr', imageConsent: g('imageConsent').checked };
      try { await b.updateMyProfile(me.uid, patch); me = { ...me, ...patch }; msg.style.color = 'var(--ok)'; msg.textContent = tr('saved'); }
      catch (e2) { msg.style.color = ''; msg.textContent = errMsg(e2); }
    });
    panel.querySelector('[data-reset]')!.addEventListener('click', async () => {
      try { await b.resetPassword(me.email, lang); msg.style.color = 'var(--ok)'; msg.textContent = tr('resetSent'); } catch (e) { msg.textContent = errMsg(e); }
    });
    panel.querySelector('[data-delete]')!.addEventListener('click', async () => {
      if (!confirm(tr('deleteConfirm'))) return;
      try { await b.deleteAccount(); location.replace(pub()); } catch (e) { alert(errMsg(e)); }
    });
  },
};
