// Shared request form for every concept: the step after "Request appointment" (live app: GuestRequestModal).
// EMU_REQ.open({ therapist, when, place, address, onDone }). EMU_CAL.open({ therapist, place, address, onPick }) is the
// "See more available dates" calendar (4 weeks ahead); picking a time there goes straight on to the request form. Concepts restyle it with these CSS variables on :root:
//   --rq-ink, --rq-soft, --rq-bg, --rq-panel (summary panel), --rq-line, --rq-accent (primary button), --rq-accent-ink,
//   --rq-accent-hover, --rq-error, --rq-radius, --rq-btn-radius, --rq-serif, --rq-sans, --rq-title-font (a full font shorthand)
(function () {
  const css = `
  .rq{border:0;padding:0;margin:auto;width:min(520px,calc(100vw - 32px));max-height:calc(100dvh - 32px);border-radius:var(--rq-radius,16px);background:var(--rq-bg,#fff);color:var(--rq-ink,#291605);box-shadow:0 30px 80px -24px rgba(41,22,5,.45);font:400 16px/1.55 var(--rq-sans,Inter,system-ui,sans-serif)}
  .rq::backdrop{background:rgba(41,22,5,.42)}
  .rq .rq-in{display:grid;max-height:calc(100dvh - 32px);grid-template-rows:auto minmax(0,1fr)}
  .rq header{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:18px 20px 12px 24px;border-bottom:1px solid var(--rq-line,#E3E0DD)}
  .rq h2{margin:0;font:var(--rq-title-font,500 26px/1.15 var(--rq-serif,Newsreader,Georgia,serif));letter-spacing:-.01em}
  .rq .rq-x{width:44px;height:44px;border:0;background:none;border-radius:50%;cursor:pointer;display:grid;place-items:center;color:inherit;flex:none}
  .rq .rq-x:hover{background:var(--rq-panel,#F6F5F3)}
  .rq .rq-body{overflow:auto;padding:18px 24px 24px;display:grid;gap:16px}
  .rq .rq-sum{background:var(--rq-panel,#F6F5F3);border-radius:calc(var(--rq-radius,16px) - 4px);padding:14px 16px;display:grid;gap:2px}
  .rq .rq-sum b{font-weight:600}
  .rq .rq-sum span{color:var(--rq-soft,#70655C);font-size:15px}
  .rq p{margin:0}
  .rq .rq-note{color:var(--rq-soft,#70655C);font-size:15px}
  .rq .rq-f{display:grid;gap:6px}
  .rq .rq-f label{font-weight:600}
  .rq .rq-f input{font:inherit;min-height:48px;padding:0 14px;border:1px solid #877A6E;border-radius:calc(var(--rq-radius,16px) - 6px);background:#fff;color:var(--rq-ink,#291605)}
  .rq .rq-f input:focus-visible,.rq :focus-visible{outline:2px solid var(--rq-accent,#9B5212);outline-offset:2px}
  .rq .rq-f input[aria-invalid=true]{border-color:var(--rq-error,#B42318)}
  .rq .rq-req{font-size:14px;color:var(--rq-soft,#70655C)}
  .rq .rq-req a{color:inherit}
  .rq .rq-check{display:grid;grid-template-columns:22px minmax(0,1fr);gap:10px;align-items:start;padding:12px 14px;border:1px solid var(--rq-line,#E3E0DD);border-radius:calc(var(--rq-radius,16px) - 6px);cursor:pointer}
  .rq .rq-check input{width:20px;height:20px;margin:2px 0 0;accent-color:var(--rq-accent,#9B5212)}
  .rq .rq-check[data-invalid=true]{border-color:var(--rq-error,#B42318)}
  .rq .rq-err{color:var(--rq-error,#B42318);font-weight:600;font-size:15px}
  .rq .rq-err:empty{display:none}
  .rq .rq-btn{font:600 16px var(--rq-sans,Inter,system-ui,sans-serif);min-height:50px;border:0;border-radius:var(--rq-btn-radius,999px);background:var(--rq-accent,#9B5212);color:var(--rq-accent-ink,#fff);cursor:pointer;width:100%}
  .rq .rq-btn:hover{background:var(--rq-accent-hover,#6E3A0D)}
  .rq .rq-btn:disabled{opacity:.7;cursor:progress}
  .rq .cal-place{color:var(--rq-soft,#70655C);font-size:15px}
  .rq .cal-month{font-weight:600;margin:0 0 6px}
  .rq .cal-grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:4px;text-align:center}
  .rq .cal-grid abbr{font-size:13px;color:var(--rq-soft,#70655C);text-decoration:none;padding-bottom:2px}
  .rq .cal-day{min-height:44px;border:1px solid var(--rq-line,#E3E0DD);border-radius:calc(var(--rq-radius,16px) - 8px);background:#fff;color:var(--rq-ink,#291605);font:500 15px var(--rq-sans,Inter,system-ui,sans-serif);cursor:pointer;display:grid;place-items:center;line-height:1.1;padding:2px}
  .rq .cal-day small{display:block;font-size:11px;font-weight:400;color:var(--rq-soft,#70655C)}
  .rq .cal-day:disabled{background:transparent;border-color:transparent;color:#A39A92;cursor:default;text-decoration:line-through}
  .rq .cal-day[aria-pressed=true],.rq .cal-time[aria-pressed=true]{background:var(--rq-accent,#9B5212);border-color:var(--rq-accent,#9B5212);color:var(--rq-accent-ink,#fff)}
  .rq .cal-day[aria-pressed=true] small{color:inherit}
  .rq .cal-gap{min-height:44px}
  .rq .cal-times{display:flex;flex-wrap:wrap;gap:6px}
  .rq .cal-time{min-height:40px;padding:0 14px;border:1px solid #877A6E;border-radius:var(--rq-btn-radius,999px);background:#fff;color:var(--rq-ink,#291605);font:500 15px var(--rq-sans,Inter,system-ui,sans-serif);cursor:pointer}
  .rq .cal-h{font-weight:600;margin:0}
  @media (max-width:560px){.rq{width:100vw;max-width:100vw;margin:auto 0 0;border-radius:var(--rq-radius,16px) var(--rq-radius,16px) 0 0;max-height:92dvh}.rq .rq-in{max-height:92dvh}}
  `;
  let dlg;
  const x = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>';
  function ensure() {
    if (dlg) return dlg;
    const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    dlg = document.createElement('dialog'); dlg.className = 'rq'; dlg.setAttribute('aria-labelledby', 'rq-title');
    document.body.appendChild(dlg);
    dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
    return dlg;
  }
  function open(o) {
    const R = window.EMU.request, X = window.EMU.extras, t = o.therapist || window.EMU.therapists[0];
    const d = ensure();
    const tz = X && X.timezone ? ` (${X.timezone})` : '';
    const session = X && X.sessionLength ? X.sessionLength.text.replace(' minutes', '-minute') + ' session' : 'Session';
    d.innerHTML = `<div class="rq-in">
      <header><h2 id="rq-title">${R.title}</h2><button type="button" class="rq-x" aria-label="Close" data-close>${x}</button></header>
      <form class="rq-body" novalidate>
        <div class="rq-sum"><b>${t.name}</b>${o.place ? `<span>${o.place}${o.address ? `, ${o.address}` : ''}</span>` : ''}<span>${session}, ${o.when || ''}${tz}</span><span>$${t.price} per session</span></div>
        <p class="rq-note">${R.notice}</p>
        ${X && X.slidingScale ? `<p class="rq-note">${X.slidingScale.text}</p>` : ''}
        <div class="rq-f"><label for="rq-name">Full name *</label><input id="rq-name" autocomplete="name" required aria-describedby="rq-err"></div>
        <div class="rq-f"><label for="rq-email">Email address *</label><input id="rq-email" type="email" autocomplete="email" required aria-describedby="rq-err"></div>
        <p class="rq-req">Fields marked * are required. <a href="#">Privacy policy</a></p>
        <label class="rq-check"><input type="checkbox" id="rq-ack"><span>${R.ack}</span></label>
        <label class="rq-check"><input type="checkbox" id="rq-consent"><span>${R.consent}</span></label>
        <p class="rq-err" id="rq-err" role="alert"></p>
        <button type="submit" class="rq-btn">${R.send}</button>
      </form></div>`;
    const err = d.querySelector('#rq-err');
    d.querySelector('[data-close]').onclick = () => d.close();
    d.querySelector('form').onsubmit = e => {
      e.preventDefault();
      const name = d.querySelector('#rq-name'), mail = d.querySelector('#rq-email'), ack = d.querySelector('#rq-ack'), con = d.querySelector('#rq-consent');
      [name, mail].forEach(i => i.removeAttribute('aria-invalid')); [ack, con].forEach(c => c.closest('label').removeAttribute('data-invalid'));
      let bad = null;
      if (!name.value.trim()) { name.setAttribute('aria-invalid', 'true'); bad = bad || [name, 'Enter your full name.']; }
      if (!/^\S+@\S+\.\S+$/.test(mail.value.trim())) { mail.setAttribute('aria-invalid', 'true'); bad = bad || [mail, 'Enter an email address, like name@example.com.']; }
      if (!ack.checked) { ack.closest('label').dataset.invalid = 'true'; bad = bad || [ack, 'Please check the acknowledgment box to continue.']; }
      if (!con.checked) { con.closest('label').dataset.invalid = 'true'; bad = bad || [con, 'Please check the consent box to continue.']; }
      if (bad) { err.textContent = bad[1]; bad[0].focus(); return; }
      const send = d.querySelector('.rq-btn'); if (send.disabled) return;
      send.disabled = true; send.textContent = 'Sending request…'; err.textContent = '';
      setTimeout(() => done(), 700);
    };
    const done = () => {
      d.innerHTML = `<div class="rq-in"><header><h2 id="rq-title">${R.sentTitle}</h2><button type="button" class="rq-x" aria-label="Close" data-close>${x}</button></header>
        <div class="rq-body"><div class="rq-sum"><b>${t.name}</b>${o.place ? `<span>${o.place}</span>` : ''}<span>${o.when || ''}${tz}</span></div><p>${R.sent}</p><p class="rq-note">Nothing is sent from this mockup.</p><button type="button" class="rq-btn" data-close>Done</button></div></div>`;
      d.querySelectorAll('[data-close]').forEach(b => b.onclick = () => d.close());
      d.querySelector('.rq-btn').focus();
      if (o.onDone) o.onDone();
    };
    if (!d.open) d.showModal();
    d.querySelector('#rq-name').focus();
  }
  // "See more available dates": a 4-week calendar. Dates and times here are EXAMPLES, generated per place.
  // Mockup clock: today is Saturday 3 October 2026, so the 72-hour rule opens Tuesday 6 October and 28 days closes 31 October.
  const WD = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], MO = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const fmt = dt => `${WD[dt.getDay()]}, ${MO[dt.getMonth()]} ${dt.getDate()}`;
  const seedOf = s => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  function timesFor(place, dt) {
    let h = seedOf(place + dt.getDate());
    const r = () => { h = (h * 1664525 + 1013904223) >>> 0; return h / 4294967296; };
    if (dt.getDay() === 0 || r() < 0.28) return [];
    const grid = ['9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','1:00 PM','1:30 PM','2:00 PM','3:30 PM','4:00 PM','5:30 PM'];
    return grid.filter(() => r() < 0.3);
  }
  function openCal(o) {
    const X = window.EMU.extras, t = o.therapist || window.EMU.therapists[0], d = ensure(), place = o.place || '';
    const first = new Date(2026, 9, 6), last = new Date(2026, 9, 31), start = new Date(2026, 8, 28); // grid starts Monday 28 Sept
    const days = []; for (let i = 0; i < 35; i++) { const dt = new Date(start); dt.setDate(start.getDate() + i); days.push(dt); }
    let pickDay = null, pickTime = null;
    const cell = dt => {
      const inRange = dt >= first && dt <= last, n = inRange ? timesFor(place, dt).length : 0;
      const why = !inRange ? (dt < first ? 'too soon to book' : 'more than 4 weeks ahead') : n ? `${n} ${n === 1 ? 'time' : 'times'}` : 'no times';
      return `<button type="button" class="cal-day" data-d="${dt.getMonth()}-${dt.getDate()}" ${n ? '' : 'disabled'} aria-pressed="false" aria-label="${fmt(dt)}, ${why}">${dt.getDate()}${n ? `<small>${n}</small>` : ''}</button>`;
    };
    d.innerHTML = `<div class="rq-in">
      <header><h2 id="rq-title">More available dates</h2><button type="button" class="rq-x" aria-label="Close" data-close>${x}</button></header>
      <div class="rq-body">
        <p class="cal-place">${t.name}${place ? ` at ${place}` : ''}. ${X && X.notice ? X.notice.text : ''}</p>
        <div><p class="cal-month">September to October 2026</p>
        <div class="cal-grid" role="group" aria-label="Dates">${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(w => `<abbr title="${w}">${w}</abbr>`).join('')}${days.map(cell).join('')}</div></div>
        <div class="cal-pick" aria-live="polite"><p class="rq-note">Choose a date to see its times. Numbers show how many times are open.</p></div>
        <p class="rq-note">Times in this calendar are examples for this mockup.</p>
        <p class="rq-err" id="cal-err" role="alert"></p>
        <button type="button" class="rq-btn" data-go>Request this time</button>
      </div></div>`;
    const pick = d.querySelector('.cal-pick'), err = d.querySelector('#cal-err');
    d.querySelector('[data-close]').onclick = () => d.close();
    d.querySelector('.cal-grid').onclick = e => {
      const b = e.target.closest('.cal-day'); if (!b || b.disabled) return;
      d.querySelectorAll('.cal-day').forEach(x => x.setAttribute('aria-pressed', x === b));
      const [m, dd] = b.dataset.d.split('-').map(Number); pickDay = new Date(2026, m, dd); pickTime = null; err.textContent = '';
      pick.innerHTML = `<p class="cal-h">${fmt(pickDay)}</p><div class="cal-times" role="group" aria-label="Times on ${fmt(pickDay)}">${timesFor(place, pickDay).map(tm => `<button type="button" class="cal-time" aria-pressed="false">${tm}</button>`).join('')}</div>`;
    };
    pick.onclick = e => { const b = e.target.closest('.cal-time'); if (!b) return; pick.querySelectorAll('.cal-time').forEach(x => x.setAttribute('aria-pressed', x === b)); pickTime = b.textContent; err.textContent = ''; };
    d.querySelector('[data-go]').onclick = () => {
      if (!pickDay || !pickTime) { err.textContent = pickDay ? 'Choose a time to continue.' : 'Choose a date, then a time.'; (d.querySelector('.cal-time') || d.querySelector('.cal-day:not(:disabled)')).focus(); return; }
      const when = `${fmt(pickDay)} at ${pickTime}`;
      if (o.onPick) o.onPick(when);
      open({ therapist: t, when, place: o.place, address: o.address, onDone: o.onDone ? () => o.onDone(when) : null });
    };
    if (!d.open) d.showModal();
    d.querySelector('.cal-day:not(:disabled)').focus();
  }
  window.EMU_REQ = { open };
  window.EMU_CAL = { open: openCal };
})();
