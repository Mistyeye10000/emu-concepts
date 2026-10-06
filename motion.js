// Shared motion for concepts 9 and 10. Everything is opt-in by class, quick, and off under reduced motion.
//  .rv            fades and rises in when it enters the viewport (add data-d="1..4" to stagger)
//  [data-draw]    an SVG path (pathLength="1") that draws itself in when it enters the viewport
//  MOTION.scrollPath(svgPath, container)  ties a path's drawing to scroll progress through a container
//  MOTION.pillNav(el)                     shows a floating nav once the hero has scrolled away
// Content is fully visible without JS: the hidden starting state only applies under html.js.
(function () {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');
  if (reduce) document.documentElement.classList.add('reduce');
  const css = `
  html.js:not(.reduce) .rv { opacity: 0; transform: translateY(18px); transition: opacity .6s cubic-bezier(.2,.7,.2,1), transform .6s cubic-bezier(.2,.7,.2,1); }
  html.js:not(.reduce) .rv[data-d="1"] { transition-delay: .08s } html.js:not(.reduce) .rv[data-d="2"] { transition-delay: .16s }
  html.js:not(.reduce) .rv[data-d="3"] { transition-delay: .24s } html.js:not(.reduce) .rv[data-d="4"] { transition-delay: .32s }
  html.js .rv.in { opacity: 1; transform: none; }
  html.js:not(.reduce) [data-draw] { stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1); }
  html.js [data-draw].in { stroke-dashoffset: 0; }
  @keyframes mo-pulse { 0% { transform: scale(1); opacity: .55 } 100% { transform: scale(2.6); opacity: 0 } }
  html.js:not(.reduce) .pulse { transform-box: fill-box; transform-origin: center; animation: mo-pulse 2.2s cubic-bezier(.2,.7,.2,1) infinite; }
  @media (prefers-reduced-motion: reduce) { .pulse { animation: none !important; } }`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: .12 }) : null;
  function watch(root = document) { root.querySelectorAll('.rv, [data-draw]').forEach(el => { if (reduce || !io) el.classList.add('in'); else io.observe(el); }); }
  document.addEventListener('DOMContentLoaded', () => watch());

  function scrollPath(path, container) {
    if (!path) return;
    if (reduce) { path.style.strokeDasharray = 'none'; return; }
    path.style.strokeDasharray = '1'; path.style.strokeDashoffset = '1';
    let ticking = false;
    const update = () => {
      ticking = false;
      const r = container.getBoundingClientRect(), vh = innerHeight;
      const p = Math.min(1, Math.max(0, (vh * .7 - r.top) / r.height));
      path.style.strokeDashoffset = String(1 - p);
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    addEventListener('resize', update); update();
  }
  function pillNav(el, after) {
    if (!el) return;
    const check = () => el.classList.toggle('show', scrollY > (after ? after.offsetHeight * .6 : 400));
    addEventListener('scroll', check, { passive: true }); check();
  }
  // A route down a container: a smooth line through one point in each [data-stop], drawn with scroll.
  // xs: fractions of the width for each stop on wide screens; on narrow screens it hugs the left edge.
  function trail(walk, xs, colour) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('aria-hidden', 'true'); svg.setAttribute('class', 'mo-trail');
    svg.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:3;overflow:visible';
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('pathLength', '1'); path.setAttribute('fill', 'none'); path.setAttribute('stroke', colour || '#E2A33B');
    path.setAttribute('stroke-width', '3.5'); path.setAttribute('stroke-linecap', 'round');
    svg.appendChild(path); walk.style.position = 'relative'; walk.prepend(svg);
    const layout = () => {
      const w = walk.offsetWidth, h = walk.offsetHeight, narrow = w < 768;
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      const pts = [...walk.querySelectorAll('[data-stop]')].map((s, i) => [narrow ? 14 : w * xs[i % xs.length], s.offsetTop + s.offsetHeight * .5]);
      pts.unshift([narrow ? 14 : w * xs[0], 0]); pts.push([narrow ? 14 : w * xs[(pts.length - 1) % xs.length], h]);
      let d = `M ${pts[0][0]} ${pts[0][1]}`;
      for (let i = 1; i < pts.length; i++) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], my = (y0 + y1) / 2; d += ` C ${x0} ${my}, ${x1} ${my}, ${x1} ${y1}`; }
      path.setAttribute('d', d);
    };
    layout(); addEventListener('resize', layout); addEventListener('load', layout);
    if ('ResizeObserver' in window) new ResizeObserver(layout).observe(walk);
    scrollPath(path, walk);
    return { layout };
  }
  // Photos that drift slightly against the scroll
  function drift(imgs) {
    if (reduce || !imgs.length) return;
    let t = false;
    const run = () => { t = false; imgs.forEach(img => { const r = img.parentElement.getBoundingClientRect(); const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight; img.style.transform = `translateY(${(p * -6).toFixed(2)}%)`; }); };
    addEventListener('scroll', () => { if (!t) { t = true; requestAnimationFrame(run); } }, { passive: true }); run();
  }
  window.MOTION = { watch, scrollPath, pillNav, trail, drift, reduce };
})();
