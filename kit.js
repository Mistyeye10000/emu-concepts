// Shared helpers for concepts 1 to 3: icons, mockup bar, toggles, booking.
(function () {
  const I = {
    pin: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    badge: '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    left: '<path d="m15 18-6-6 6-6"/>',
    right: '<path d="m9 18 6-6-6-6"/>',
    sliders: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
    cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
    walk: '<circle cx="13" cy="4" r="2"/><path d="m9 20 3-6 3 3v4M7 12l3-3 4 1 3 3M10 9l-1 5"/>',
    book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    map: '<path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15M9 3.236v15"/>',
  };
  const icon = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${n === 'check' ? 2.5 : 2}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

  const placeIcon = t => /walk/i.test(t) ? 'walk' : /library/i.test(t) ? 'book' : 'leaf';

  function mockBar(num, name) {
    const pill = 'color:#fff;border:1px solid rgba(255,255,255,.4);border-radius:99px;padding:3px 12px;text-decoration:none';
    const here = location.pathname.split('/').pop();
    const link = (f, l) => here === f ? `<a href="${f}" aria-current="page" style="${pill};background:#fff;color:#291605">${l}</a>` : `<a href="${f}" style="${pill}">${l}</a>`;
    const bar = document.createElement('div');
    bar.setAttribute('role', 'region'); bar.setAttribute('aria-label', 'Mockup controls');
    bar.style.cssText = 'background:#291605;color:#fff;font:500 13px/1.4 Inter,system-ui,sans-serif;padding:8px 16px;display:flex;flex-wrap:wrap;gap:6px 16px;align-items:center';
    bar.innerHTML = `<strong style="font-weight:700">Concept ${num}: ${name}</strong><span style="opacity:.8">Jordan Avery is real. Therapists marked as examples are made up. Distances and times are examples.</span><span style="margin-left:auto;display:flex;flex-wrap:wrap;gap:8px">${link(`c${num}-home.html`, 'Landing')}${link(`c${num}-directory.html`, 'Directory')}${link(`c${num}-profile.html`, 'Profile')}<a href="index.html" style="${pill}">All concepts</a></span>`;
    document.body.prepend(bar);
  }

  // Single-select toggle groups: any [data-toggle-group] container
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-toggle-group] [aria-pressed]');
    if (!b) return;
    b.closest('[data-toggle-group]').querySelectorAll('[aria-pressed]').forEach(x => x.setAttribute('aria-pressed', x === b));
  });

  // Booking: slots carry data-t; summary [data-chosen]; button [data-request]. Delegated so times can be re-rendered per location.
  function booking(root) {
    const chosen = root.querySelector('[data-chosen]');
    const empty = chosen.textContent;
    let picked = null, when = null;
    root.addEventListener('click', e => {
      const s = e.target.closest('[data-t]');
      if (s && root.contains(s)) {
        root.querySelectorAll('[data-t]').forEach(x => x.setAttribute('aria-pressed', x === s));
        when = s.dataset.t;
        picked = s.dataset.t + (root.dataset.loc ? ` at ${root.dataset.loc}` : '');
        chosen.textContent = picked; chosen.classList.remove('is-error');
        document.querySelectorAll('[data-chosen-mirror]').forEach(m => m.textContent = picked);
        return;
      }
      const r = e.target.closest('[data-request]');
      if (r && root.contains(r)) {
        const first = root.querySelector('[data-t]');
        if (!picked) { chosen.textContent = 'Choose a time to continue'; chosen.classList.add('is-error'); if (first) { first.focus(); first.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } }
        else if (window.EMU_REQ) {
          const loc = (EMU.profile.locations || []).find(l => l.name === root.dataset.loc);
          EMU_REQ.open({ therapist: EMU.therapists[0], when, place: root.dataset.loc, address: loc && loc.address, onDone: () => { chosen.textContent = 'Request sent for ' + picked + '. Jordan will reply by email.'; } });
        } else chosen.textContent = 'Request sent for ' + picked + ' (mockup)';
      }
    });
    root.__resetPick = () => { picked = null; when = null; chosen.textContent = empty; chosen.classList.remove('is-error'); document.querySelectorAll('[data-chosen-mirror]').forEach(m => m.textContent = 'No time chosen'); };
  }

  const periodOf = t => { const h = parseInt(t, 10); return h === 12 || h < 9 ? 'PM' : 'AM'; };
  const fullSlot = (day, t) => `${day} at ${t} ${periodOf(t)}`;

  // Profile gap content (EMU.extras). Example values carry a dagger marker; legend explains it.
  const X = () => EMU.extras;
  const exm = '<span class="exm" aria-label="example value" title="Example value">\u2020</span>';
  const ex = (txt, isEx) => isEx ? `${txt}${exm}` : txt;
  const facts = () => {
    const e = X();
    const row = (k, v) => `<div class="x-row"><dt>${k}</dt><dd>${v}</dd></div>`;
    return `<dl class="x-facts">${row('Languages', ex(e.languages.items.join(', '), true))}${row(EMU.labels.who, ex(e.ageGroups.items.join(', '), true))}${row('Payment', ex(e.paymentOptions.items.join(', '), true))}${row('Sliding scale', ex(e.slidingScale.text, true))}</dl>`;
  };
  const freeCall = () => `<div class="x-call"><b>${ex(X().freeCall.text, true)}</b><span>A short chat to see if Jordan feels right before you book.</span></div>`;
  const whatNext = () => `<div class="x-next"><p class="x-h">After you send a request</p><ol>${X().whatNext.steps.map(t => `<li>${t}</li>`).join('')}</ol></div>`;
  const placeMore = () => { const pl = X().place; return `<div class="x-place"><p><b>Getting around:</b> ${ex(pl.access, true)}</p><p><b>If the weather turns:</b> ${ex(pl.weather, true)}</p></div>`; };
  const contact = () => { const c = X().contact; return `<div class="x-contact"><button type="button" class="x-ask" aria-expanded="false">${c.label} <span class="x-prop">Proposed</span></button><p class="x-note" hidden>${c.note}</p></div>`; };
  const legend = () => `<p class="x-legend">${exm} ${X().exampleLegend}</p>`;
  const notice = () => `<p class="x-notice">${X().notice.text}</p>`;
  const payLine = () => `Jordan will reply to confirm. ${X().payment.text}`;
  const crisisFoot = () => `<footer class="x-foot"><p>${EMU.home.disclaimer}</p><p class="x-crisis">${EMU.home.crisis}</p></footer>`;
  // Card excerpt: the start of the therapist's own About Me text (Rachel's handoff). Two lines, then an ellipsis.
  const excerpt = p => p.about ? `<p class="x-about">${p.about}</p>` : '';
  const hints = id => (EMU.hints[id] || []).map(h => `<span class="x-hint">${h}${exm}</span>`).join('');
  document.addEventListener('click', e => {
    const b = e.target.closest('.x-ask'); if (!b) return;
    const n = b.parentElement.querySelector('.x-note'); const open = n.hidden; n.hidden = !open; b.setAttribute('aria-expanded', open);
  });

  // Several meeting locations (EMU.profile.locations). Location-first booking as in the live app.
  const LOCS = () => EMU.profile.locations;
  const tagList = l => l.tags.map(t => `<span class="x-tag">${t}</span>`).join('');
  const locList = () => `<ol class="x-loclist">${LOCS().map((l, i) => `
      <li class="x-locitem" data-locitem="${l.id}">
        <span class="x-num" aria-hidden="true">${i + 1}</span>
        <div>
          <p class="x-locname">${ex(l.name, l.example)} ${tagList(l)}</p>
          <p class="x-addr">${l.address}</p>
          <p class="x-instr">${ex(l.instructions, l.example)}</p>
          ${l.id === 'rittenhouse' ? placeMore() : ''}
        </div>
      </li>`).join('')}</ol>`;
  const otherLocs = () => { const L = LOCS(); return L.length < 2 ? '' : `<div class="x-also"><p class="x-h">Jordan also meets at</p><ol class="x-loclist">${L.slice(1).map((l, i) => `
      <li class="x-locitem" data-locitem="${l.id}"><span class="x-num" aria-hidden="true">${i + 2}</span><div>
        <p class="x-locname">${ex(l.name, l.example)} ${tagList(l)}</p><p class="x-addr">${l.address}</p><p class="x-instr">${ex(l.instructions, l.example)}</p>
      </div></li>`).join('')}</ol></div>`; };
  const locPicker = () => `<div class="x-picker"><p class="x-h" id="x-pick-h">Where would you like to meet?</p>
      <div class="x-locs" role="group" aria-labelledby="x-pick-h">${LOCS().map((l, i) => `<button type="button" class="x-loc" data-loc="${l.id}" aria-pressed="${i === 0}">${icon('check', 'ic x-tick')}<span class="x-n" aria-hidden="true">${i + 1}</span><span>${ex(l.name, l.example)}<small>${l.tags.join(', ')}</small></span></button>`).join('')}</div>
      <p class="x-hint-line">Nearest to you is selected. Times below are for this place.</p></div>`;
  // renderDays(availability, loc) must return the page's own markup for the times (slots carry data-t)
  // "See more available dates" (Rachel's handoff): opens the shared 4-week calendar for the chosen place
  function moreDates(root) {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'x-moredates'; b.textContent = 'See more available dates';
    b.addEventListener('click', () => {
      const l = LOCS().find(x => x.name === root.dataset.loc) || LOCS()[0];
      if (window.EMU_CAL) EMU_CAL.open({ therapist: EMU.therapists[0], place: l.name, address: l.address,
        onDone: when => { const c = root.querySelector('[data-chosen]'); if (c) c.textContent = `Request sent for ${when} at ${l.name}. Jordan will reply by email.`; } });
    });
    return b;
  }
  if (!document.getElementById('x-kit-css')) { const st = document.createElement('style'); st.id = 'x-kit-css';
    st.textContent = '.x-about{margin:6px 0 0;max-width:62ch;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;opacity:.86}.x-moredates{display:inline-flex;align-items:center;min-height:44px;margin:8px 0 0;padding:0 2px;font:inherit;font-weight:600;color:inherit;background:none;border:0;text-decoration:underline;text-underline-offset:4px;cursor:pointer}';
    document.head.appendChild(st); }
  function wireLocs(root, renderDays) {
    const target = root.querySelector('[data-days]'), more = moreDates(root);
    const show = id => {
      const l = LOCS().find(x => x.id === id);
      root.dataset.loc = l.name;
      root.querySelectorAll('.x-loc').forEach(b => b.setAttribute('aria-pressed', b.dataset.loc === id));
      target.innerHTML = l.availability.length ? renderDays(l.availability, l) : '<p class="x-none">No openings in the next 4 weeks.</p>';
      if (!more.isConnected) target.after(more);
      if (root.__resetPick) root.__resetPick();
      if (window.__locMap) window.__locMap.focus(LOCS().indexOf(l) + 1);
      document.querySelectorAll('[data-locitem]').forEach(li => li.classList.toggle('is-on', li.dataset.locitem === id));
    };
    root.addEventListener('click', e => { const b = e.target.closest('.x-loc'); if (b && root.contains(b)) show(b.dataset.loc); });
    show(LOCS()[0].id);
  }
  const cssVar = (n, fb) => (getComputedStyle(document.documentElement).getPropertyValue(n) || '').trim() || fb;
  function mountLocMap(el, o = {}) {
    if (!window.EMU_MAP) return;
    EMU_MAP.mount(el, Object.assign({ pins: LOCS().map((l, i) => ({ lat: l.lat, lng: l.lng, n: i + 1, label: l.name + (l.example ? ' (example)' : '') })), pin: { bg: cssVar('--x-pin', '#291605') }, activeBg: cssVar('--x-pin-on', '#9B5212') }, o))
      .then(m => { window.__locMap = m; const on = document.querySelector('.x-loc[aria-pressed="true"]'); if (on) m.focus([...document.querySelectorAll('.x-loc')].indexOf(on) + 1); });
  }
  // Directory map view: the four therapists as numbered pins, centre and radius, synced list
  const dirPins = hrefFor => EMU.therapists.map((t, i) => ({ lat: t.lat, lng: t.lng, n: i + 1, label: `${t.name}, ${t.place}${t.example ? ' (example)' : ''}`, href: hrefFor(t) }));
  const dirMapList = hrefFor => `<p class="x-mapcount" aria-live="polite"></p><ol class="x-maplist">${EMU.therapists.map((t, i) => `<li data-pin="${i + 1}"><span class="x-num" aria-hidden="true">${i + 1}</span><div><a href="${hrefFor(t)}">${t.name}</a>${t.example ? exm : ''}<span>${t.place}, ${t.distance} away</span></div></li>`).join('')}</ol>`;
  function mountDirMap(el, listEl, hrefFor, o = {}) {
    if (!window.EMU_MAP || el.__mounted) { if (el.__ctl) el.__ctl.refresh(); return; }
    el.__mounted = true;
    const total = EMU.therapists.length;
    const follow = nums => {
      if (!listEl) return;
      listEl.querySelectorAll('[data-pin]').forEach(li => { li.hidden = !nums.includes(+li.dataset.pin); });
      const c = listEl.querySelector('.x-mapcount');
      if (c) c.textContent = nums.length ? `${nums.length} of ${total} in map view` : 'No therapists in this part of the map. Zoom out to see more.';
    };
    EMU_MAP.mount(el, Object.assign({ pins: dirPins(hrefFor), center: [EMU.center.lat, EMU.center.lng], radiusMiles: EMU.search.radius, pin: { bg: cssVar('--x-pin', '#291605') }, activeBg: cssVar('--x-pin-on', '#9B5212'), line: cssVar('--x-pin', '#291605'), onVisible: follow }, o))
      .then(m => { el.__ctl = m; if (listEl) listEl.querySelectorAll('[data-pin]').forEach(li => { li.addEventListener('mouseenter', () => m.focus(li.dataset.pin)); li.addEventListener('focusin', () => m.focus(li.dataset.pin)); }); });
  }
  const moreLocs = () => { const n = LOCS().length - 1; return n > 0 ? ` and ${n} more ${n === 1 ? 'place' : 'places'}${exm}` : ''; };

  window.KIT = { icon, placeIcon, mockBar, booking, fullSlot, ex, exm, facts, freeCall, whatNext, placeMore, contact, legend, notice, payLine, crisisFoot, hints, excerpt, locList, otherLocs, locPicker, wireLocs, mountLocMap, dirMapList, mountDirMap, moreLocs, tagList };
})();
