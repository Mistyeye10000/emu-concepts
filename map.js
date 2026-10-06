// Shared real map for every concept: Leaflet + OpenStreetMap tiles, numbered pins.
// Usage: EMU_MAP.mount(element, { pins: [{ lat, lng, n, label, href }], center: [lat, lng], radiusMiles, pin: { bg, fg }, line: '#hex', tint: 'css-filter', onVisible: nums => {} })
// onVisible (as in the live app): called with the pin numbers inside the visible map area, on load and after every pan or zoom.
// Returns a promise resolving to { map, focus(n) }. Concepts style the container; this only draws.
(function () {
  const CSS = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
  const JS = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
  let loading;
  function load() {
    if (window.L) return Promise.resolve(window.L);
    if (loading) return loading;
    loading = new Promise((res, rej) => {
      const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = CSS; document.head.appendChild(l);
      const s = document.createElement('script'); s.src = JS; s.onload = () => res(window.L); s.onerror = rej; document.head.appendChild(s);
    });
    return loading;
  }
  async function mount(el, o = {}) {
    const L = await load();
    const pinBg = (o.pin && o.pin.bg) || '#291605', pinFg = (o.pin && o.pin.fg) || '#fff';
    const map = L.map(el, { scrollWheelZoom: false, zoomControl: true, attributionControl: true });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '&copy; OpenStreetMap contributors' }).addTo(map);
    const markers = {};
    const icon = (n, active) => L.divIcon({ className: 'emu-pin', iconSize: [30, 30], iconAnchor: [15, 15],
      html: `<span style="display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:${active ? (o.activeBg || '#9B5212') : pinBg};color:${pinFg};font:700 14px/1 Inter,system-ui,sans-serif;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.3)">${n}</span>` });
    (o.pins || []).forEach(p => {
      const m = L.marker([p.lat, p.lng], { icon: icon(p.n), title: p.label, keyboard: true, alt: p.label }).addTo(map);
      if (p.label) m.bindTooltip(p.label, { direction: 'top', offset: [0, -14] });
      if (p.href) m.on('click', () => { location.href = p.href; });
      markers[p.n] = m;
    });
    if (o.center) L.circleMarker(o.center, { radius: 6, color: '#fff', weight: 2, fillColor: '#291605', fillOpacity: 1 }).addTo(map).bindTooltip('You');
    if (o.center && o.radiusMiles) L.circle(o.center, { radius: o.radiusMiles * 1609.34, color: o.line || '#2E5A43', weight: 1.5, dashArray: '4 6', fill: false }).addTo(map);
    const pts = (o.pins || []).map(p => [p.lat, p.lng]).concat(o.center ? [o.center] : []);
    if (pts.length > 1) map.fitBounds(pts, { padding: [36, 36], maxZoom: 15 }); else if (pts.length) map.setView(pts[0], 15);
    if (o.tint) map.getPane('tilePane').style.filter = o.tint; // after the map has a view
    const report = () => { if (!o.onVisible) return; const b = map.getBounds(); o.onVisible((o.pins || []).filter(p => b.contains([p.lat, p.lng])).map(p => p.n)); };
    map.on('moveend zoomend', report);
    setTimeout(() => { map.invalidateSize(); report(); }, 60);
    return {
      map,
      focus(n) { Object.entries(markers).forEach(([k, m]) => m.setIcon(icon(k, String(k) === String(n)))); if (markers[n]) map.panTo(markers[n].getLatLng()); },
      refresh() { map.invalidateSize(); if (pts.length > 1) map.fitBounds(pts, { padding: [36, 36], maxZoom: 15 }); report(); },
    };
  }
  window.EMU_MAP = { mount };
})();
