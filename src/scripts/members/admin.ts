import { getBackend, type Backend, type ContentCol, type InboxCol, type Item, type Level, type Profile, type Role } from '../backend';
import { tr, esc, base, lang, errMsg, demoBar, spinner, fmtDate, setBusy } from './common';

const root = document.getElementById('app')!;
root.innerHTML = spinner();
let b: Backend; let me: Profile; let routed = false;

getBackend().then((backend) => {
  b = backend; demoBar(b);
  b.onAuth(async (u) => {
    if (!u) { location.replace(`${base}login/?next=${encodeURIComponent(location.pathname)}`); return; }
    if (routed) return; routed = true;
    const p = await b.getProfile(u.uid);
    if (!p || p.status !== 'approved' || (p.role !== 'admin' && p.role !== 'rep')) {
      root.innerHTML = `<div class="card auth-card stack gap-16"><p>${esc(tr('noAccess'))}</p><a class="btn btn-ghost btn-sm" style="align-self:flex-start" href="${base}">${esc(tr('membersOnly'))}</a></div>`;
      return;
    }
    me = p; shell();
  });
});

type Tab = 'approvals' | 'members' | 'content' | 'inbox';
const tabsFor = (): Tab[] => (me.role === 'admin' ? ['approvals', 'members', 'content', 'inbox'] : ['approvals', 'members']);

function shell() {
  const tabs = tabsFor();
  root.innerHTML = `
    <div class="m-top">
      <div class="stack gap-8"><span class="m-badge" style="align-self:flex-start">${esc(tr('role.' + me.role))}${me.role === 'rep' && me.repLevel ? ' · ' + esc(tr('lv.' + me.repLevel)) : ''}</span><h1 class="m-title">${esc(tr('adminTitle'))}</h1></div>
      <a class="btn btn-ghost btn-sm" href="${base}">← ${esc(tr('membersOnly'))}</a>
    </div>
    <div class="filters" role="tablist" style="margin-bottom:24px">${tabs.map((t) => `<button class="chip" role="tab" data-tab="${t}">${esc(tr('adm.' + t))}</button>`).join('')}</div>
    <section id="panel" class="stack gap-16"></section>`;
  root.querySelectorAll<HTMLButtonElement>('[data-tab]').forEach((x) => x.addEventListener('click', () => { location.hash = x.dataset.tab!; }));
  window.addEventListener('hashchange', show); show();
}
function show() {
  const tabs = tabsFor();
  const h = location.hash.slice(1) as Tab;
  const tab = tabs.includes(h) ? h : 'approvals';
  root.querySelectorAll<HTMLButtonElement>('[data-tab]').forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.tab === tab)));
  const panel = document.getElementById('panel')!;
  panel.innerHTML = spinner();
  VIEWS[tab](panel).catch((e) => (panel.innerHTML = `<p class="notice notice-err">${esc(errMsg(e))}</p>`));
}
const canHandle = (m: Profile) => me.role === 'admin' || (me.repLevel != null && m.levels.includes(me.repLevel));
const lv = (ls: Level[]) => ls.map((l) => esc(tr('lv.' + l))).join(', ');

/* ---------- 콘텐츠 양식 정의 ---------- */
type Field = { n: string; t?: 'text' | 'date' | 'textarea' | 'select' | 'file' | 'files'; opts?: string[]; prefix?: string; req?: boolean; label: string };
const today = () => new Date().toISOString().slice(0, 10);
const SCHEMA: Record<Exclude<ContentCol, 'sharing'>, Field[]> = {
  notices: [{ n: 'date', t: 'date', req: true, label: 'date' }, { n: 'title', req: true, label: 'title' }, { n: 'body', t: 'textarea', req: true, label: 'body' }],
  minutes: [{ n: 'date', t: 'date', req: true, label: 'date' }, { n: 'title', req: true, label: 'title' }, { n: 'type', t: 'select', opts: ['ag', 'board', 'founding', 'other'], prefix: 'mt.', label: 'type' }, { n: 'summary', label: 'summary' }, { n: 'files', t: 'files', label: 'files' }],
  relations: [{ n: 'date', t: 'date', req: true, label: 'date' }, { n: 'org', t: 'select', opts: ['edu-center', 'ministry', 'rectorat', 'school', 'community', 'other'], prefix: 'org.', label: 'org' }, { n: 'title', req: true, label: 'title' }, { n: 'note', t: 'textarea', label: 'note' }],
  gallery: [{ n: 'date', t: 'date', req: true, label: 'date' }, { n: 'cat', t: 'select', opts: ['art', 'diary', 'class'], prefix: 'cat.', label: 'type' }, { n: 'grade', label: 'grade' }, { n: 'caption', label: 'caption' }, { n: 'files', t: 'file', req: true, label: 'image' }],
  expenses: [{ n: 'date', t: 'date', req: true, label: 'date' }, { n: 'label', req: true, label: 'label' }, { n: 'amount', label: 'amount' }],
};
const fieldHtml = (f: Field) => {
  const L = esc(tr(f.label)) + (f.req ? ' *' : '');
  const full = f.t === 'textarea' || f.t === 'file' || f.t === 'files' ? ' full' : '';
  switch (f.t) {
    case 'textarea': return `<label class="field${full}">${L}<textarea name="${f.n}" rows="4"></textarea></label>`;
    case 'select': return `<label class="field">${L}<select name="${f.n}">${f.opts!.map((o) => `<option value="${o}">${esc(tr(f.prefix + o))}</option>`).join('')}</select></label>`;
    case 'file': return `<label class="field${full}">${L}<input type="file" name="${f.n}" accept="image/*"></label>`;
    case 'files': return `<label class="field${full}">${L}<input type="file" name="${f.n}" multiple accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,image/*"></label>`;
    case 'date': return `<label class="field">${L}<input type="date" name="${f.n}" value="${today()}"></label>`;
    default: return `<label class="field">${L}<input name="${f.n}"></label>`;
  }
};
const itemLine = (col: string, i: Item) => {
  const main = i.title ?? i.label ?? i.caption ?? i.name ?? i.email ?? '';
  const sub = col === 'relations' ? tr('org.' + i.org) : col === 'gallery' ? `${tr('cat.' + i.cat)} · ${i.grade ?? ''}` : col === 'expenses' ? (i.amount ? i.amount + ' €' : '') : (i.files?.length ? `${i.files.length} ${tr('files')}` : '');
  return `<li><span class="when">${esc(fmtDate(i.date ?? i.createdAt))}</span><div class="grow"><b>${esc(main)}</b><span class="tiny">${esc(sub)}</span></div><button class="btn btn-ghost btn-sm" data-del="${esc(i.id)}">${esc(tr('delete'))}</button></li>`;
};

const VIEWS: Record<Tab, (p: HTMLElement) => Promise<void>> = {
  async approvals(panel) {
    const all = await b.listMembers();
    const pending = all.filter((m) => m.status === 'pending' && canHandle(m));
    panel.innerHTML = `<p class="muted small">${esc(tr('approvalsIntro'))}</p>` + (pending.length ? `<ul class="card list">${pending.map((m) => `
      <li data-uid="${esc(m.uid)}">
        <div class="grow"><b>${esc(m.name)}</b><span class="small">${esc(m.email)}${m.phone ? ' · ' + esc(m.phone) : ''}</span>
          <span class="tiny">${lv(m.levels)} · ${esc(tr('appliedAt'))} ${esc(fmtDate(m.createdAt))} · <span class="pill ${m.imageConsent ? 'pill-ok' : 'pill-gray'}">${esc(tr(m.imageConsent ? 'imageOk' : 'imageNo'))}</span></span></div>
        <div class="row gap-8"><button class="btn btn-dark btn-sm" data-act="approved">${esc(tr('approve'))}</button><button class="btn btn-ghost btn-sm" data-act="rejected">${esc(tr('reject'))}</button></div>
      </li>`).join('')}</ul>` : `<div class="card empty">${esc(tr('noPending'))}</div>`);
    panel.querySelectorAll<HTMLButtonElement>('[data-act]').forEach((btn) => btn.addEventListener('click', async () => {
      const li = btn.closest<HTMLElement>('[data-uid]')!;
      setBusy(btn, true);
      try { await b.setStatus(li.dataset.uid!, btn.dataset.act as any, me.uid); li.remove(); if (!panel.querySelector('[data-uid]')) show(); }
      catch (e) { alert(errMsg(e)); setBusy(btn, false); }
    }));
  },

  async members(panel) {
    const all = (await b.listMembers()).filter((m) => m.status !== 'pending');
    const admin = me.role === 'admin';
    panel.innerHTML = `<div class="row between gap-12"><p class="muted small">${esc(tr('membersIntro'))}</p><span class="tiny">${all.filter((m) => m.status === 'approved').length} ${esc(tr('count'))}</span></div>
      <div class="table-wrap"><table>
        <thead><tr><th>${esc(tr('name'))}</th><th>${esc(tr('email'))}</th><th>${esc(tr('levels'))}</th><th>${esc(tr('statusLabel'))}</th><th>${esc(tr('roleLabel'))}</th></tr></thead>
        <tbody>${all.map((m) => `<tr data-uid="${esc(m.uid)}">
          <td>${esc(m.name)}</td><td>${esc(m.email)}</td><td>${lv(m.levels)}</td>
          <td><span class="pill ${m.status === 'approved' ? 'pill-ok' : 'pill-gray'}">${esc(tr('status.' + m.status))}</span></td>
          <td>${admin && m.uid !== me.uid ? `
            <select data-role aria-label="${esc(tr('setRole'))}">${(['member', 'rep', 'admin'] as Role[]).map((r) => `<option value="${r}" ${m.role === r ? 'selected' : ''}>${esc(tr('role.' + r))}</option>`).join('')}</select>
            <select data-rep aria-label="${esc(tr('repOf'))}" ${m.role === 'rep' ? '' : 'hidden'}>${(['mat', 'elem', 'col'] as Level[]).map((l) => `<option value="${l}" ${m.repLevel === l ? 'selected' : ''}>${esc(tr('lv.' + l))}</option>`).join('')}</select>`
            : esc(tr('role.' + m.role)) + (m.role === 'rep' && m.repLevel ? ' · ' + esc(tr('lv.' + m.repLevel)) : '')}</td>
        </tr>`).join('')}</tbody></table></div>`;
    panel.querySelectorAll<HTMLTableRowElement>('tr[data-uid]').forEach((row) => {
      const role = row.querySelector<HTMLSelectElement>('[data-role]'); const rep = row.querySelector<HTMLSelectElement>('[data-rep]');
      if (!role || !rep) return;
      const save = async () => {
        rep.hidden = role.value !== 'rep';
        try { await b.setRole(row.dataset.uid!, role.value as Role, role.value === 'rep' ? (rep.value as Level) : null); } catch (e) { alert(errMsg(e)); }
      };
      role.addEventListener('change', save); rep.addEventListener('change', save);
    });
  },

  async content(panel) {
    const cols = Object.keys(SCHEMA) as (keyof typeof SCHEMA)[];
    panel.innerHTML = `<p class="muted small">${esc(tr('contentIntro'))}</p>
      <div class="filters">${cols.map((c, i) => `<button class="chip" data-col="${c}" aria-pressed="${i === 0}">${esc(tr('col.' + c))}</button>`).join('')}</div>
      <div data-area class="grid g-2" style="align-items:start"></div>`;
    const area = panel.querySelector<HTMLElement>('[data-area]')!;
    const open = async (col: keyof typeof SCHEMA) => {
      area.innerHTML = `
        <form class="card card-pad form" novalidate>
          ${col === 'gallery' ? `<p class="notice notice-warn full">${esc(tr('galleryWarn'))}</p>` : ''}
          ${SCHEMA[col].map(fieldHtml).join('')}
          <div class="full row gap-12"><button class="btn btn-dark btn-sm" type="submit">${esc(tr('add'))}</button><span class="err" data-msg role="status"></span></div>
        </form>
        <ul class="card list" data-list>${spinner()}</ul>`;
      const ul = area.querySelector<HTMLElement>('[data-list]')!;
      const draw = async () => {
        const items = await b.list(col);
        ul.innerHTML = items.length ? items.map((i) => itemLine(col, i)).join('') : `<li class="empty">${esc(tr('none'))}</li>`;
        ul.querySelectorAll<HTMLButtonElement>('[data-del]').forEach((d) => d.addEventListener('click', async () => {
          if (!confirm(tr('confirmDelete'))) return;
          try { await b.remove(col, d.dataset.del!); draw(); } catch (e) { alert(errMsg(e)); }
        }));
      };
      draw();
      const f = area.querySelector('form')!;
      f.addEventListener('submit', async (e) => {
        e.preventDefault();
        const msg = f.querySelector<HTMLElement>('[data-msg]')!; msg.style.color = '';
        const data: Record<string, any> = {}; let files: File[] = [];
        for (const fd of SCHEMA[col]) {
          const el = f.elements.namedItem(fd.n) as HTMLInputElement;
          if (fd.t === 'file' || fd.t === 'files') { files = [...(el.files ?? [])]; if (fd.req && !files.length) return (msg.textContent = `${tr(fd.label)}: ${tr('err.required')}`); continue; }
          const v = el.value.trim();
          if (fd.req && !v) return (msg.textContent = `${tr(fd.label)}: ${tr('err.required')}`);
          data[fd.n] = v;
        }
        const btn = f.querySelector<HTMLButtonElement>('[type=submit]')!; setBusy(btn, true);
        try { await b.add(col, data, files); f.reset(); f.querySelectorAll<HTMLInputElement>('input[type=date]').forEach((d) => (d.value = today())); msg.style.color = 'var(--ok)'; msg.textContent = tr('added'); draw(); }
        catch (e2) { msg.textContent = errMsg(e2); }
        setBusy(btn, false);
      });
    };
    const chips = panel.querySelectorAll<HTMLButtonElement>('[data-col]');
    chips.forEach((c) => c.addEventListener('click', () => { chips.forEach((x) => x.setAttribute('aria-pressed', String(x === c))); open(c.dataset.col as any); }));
    open(cols[0]);
  },

  async inbox(panel) {
    const cols: InboxCol[] = ['messages', 'registrations', 'subscribers'];
    panel.innerHTML = `<div class="filters">${cols.map((c, i) => `<button class="chip" data-col="${c}" aria-pressed="${i === 0}">${esc(tr('col.' + c))}</button>`).join('')}</div><div data-area></div>`;
    const area = panel.querySelector<HTMLElement>('[data-area]')!;
    const open = async (col: InboxCol) => {
      area.innerHTML = spinner();
      const items = await b.list(col);
      const keys = col === 'subscribers' ? ['date', 'email', 'lang'] : col === 'registrations' ? ['date', 'name', 'email', 'levels', 'message'] : ['date', 'name', 'email', 'type', 'level', 'message'];
      area.innerHTML = `<div class="row between gap-12" style="margin-bottom:12px"><span class="tiny">${items.length}</span><button class="btn btn-ghost btn-sm" data-csv ${items.length ? '' : 'disabled'}>${esc(tr('exportCsv'))}</button></div>` +
        (items.length ? `<ul class="card list">${items.map((i) => `<li><span class="when">${esc(fmtDate(i.date ?? i.createdAt))}</span><div class="grow"><b>${esc(i.name ?? i.email)}</b><span class="small">${esc(i.email)}${i.type ? ' · ' + esc(i.type) : ''}${i.levels ? ' · ' + esc([].concat(i.levels).join(', ')) : ''}${i.lang ? ' · ' + esc(i.lang) : ''}</span>${i.message ? `<p class="small muted" style="white-space:pre-line">${esc(i.message)}</p>` : ''}</div><button class="btn btn-ghost btn-sm" data-del="${esc(i.id)}">${esc(tr('delete'))}</button></li>`).join('')}</ul>` : `<div class="card empty">${esc(tr('none'))}</div>`);
      area.querySelector('[data-csv]')?.addEventListener('click', () => {
        const q = (v: any) => `"${String(Array.isArray(v) ? v.join(' ') : v ?? '').replace(/"/g, '""')}"`;
        const csv = '﻿' + [keys.join(','), ...items.map((i) => keys.map((k) => q(i[k])).join(','))].join('\n');
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
        a.download = `asicc-${col}-${today()}.csv`; a.click();
      });
      area.querySelectorAll<HTMLButtonElement>('[data-del]').forEach((d) => d.addEventListener('click', async () => {
        if (!confirm(tr('confirmDelete'))) return;
        try { await b.remove(col, d.dataset.del!); open(col); } catch (e) { alert(errMsg(e)); }
      }));
    };
    const chips = panel.querySelectorAll<HTMLButtonElement>('[data-col]');
    chips.forEach((c) => c.addEventListener('click', () => { chips.forEach((x) => x.setAttribute('aria-pressed', String(x === c))); open(c.dataset.col as InboxCol); }));
    open('messages');
  },
};
