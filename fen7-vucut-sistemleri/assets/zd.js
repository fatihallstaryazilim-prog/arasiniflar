/* ==========================================================================
   Vücudumuzdaki Sistemler · Materyal Seti — ortak arayüz kiti (ZD)
   Bağımlılık yok. Her sayfa: <div id="app"></div> + ZD.mount({...})
   ========================================================================== */
(function () {
  'use strict';

  /* ---------------- İkonlar ---------------- */
  const I = {
    hand: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.6 2.2a1.9 1.9 0 0 1 2.1 1.9v6.1l.6-.1V8.6a1.8 1.8 0 0 1 3.6 0v1.8l.5-.1a1.8 1.8 0 0 1 3.3 1v1.2l.3-.1a1.7 1.7 0 0 1 2.1 1.7v2.9c0 3.9-3 7-6.9 7h-1.5c-2.2 0-4.2-1-5.5-2.8l-4.1-5.6a1.9 1.9 0 0 1 2.8-2.5l1.4 1.2V4.1c0-1 .7-1.8 1.7-1.9Z"/></svg>',
    sound: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9.5v5c0 .6.4 1 1 1h3.2l4.3 3.8c.6.6 1.6.1 1.6-.7V5.4c0-.8-1-1.3-1.6-.7L7.2 8.5H4c-.6 0-1 .4-1 1Z"/><path d="M16.2 8.2a5.3 5.3 0 0 1 0 7.6M18.8 5.6a9 9 0 0 1 0 12.8" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    mute: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9.5v5c0 .6.4 1 1 1h3.2l4.3 3.8c.6.6 1.6.1 1.6-.7V5.4c0-.8-1-1.3-1.6-.7L7.2 8.5H4c-.6 0-1 .4-1 1Z"/><path d="m16.5 9.5 5 5m0-5-5 5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    restart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12a8 8 0 1 1-2.6-5.9"/><path d="M20 4v5h-5"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.2 4.2L19 7"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.8v14.4c0 .8.9 1.3 1.6.8l11-7.2c.6-.4.6-1.2 0-1.6l-11-7.2C7.9 3.5 7 4 7 4.8Z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4.5" width="4.2" height="15" rx="1.4"/><rect x="13.8" y="4.5" width="4.2" height="15" rx="1.4"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.1"/></svg>',
    bulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2V16h5.2v-.2c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z"/></svg>',
    arrowL: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
    arrowR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    star: (on) => `<svg viewBox="0 0 64 64"><defs><linearGradient id="zs${on ? 1 : 0}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${on ? '#fff3a6' : '#3a4b63'}"/><stop offset=".55" stop-color="${on ? '#ffc93c' : '#28374c'}"/><stop offset="1" stop-color="${on ? '#ff9a1f' : '#1d2a3b'}"/></linearGradient></defs><path d="M32 4.5l8.3 17 18.7 2.7-13.5 13.2 3.2 18.6L32 47.2l-16.7 8.8 3.2-18.6L5 24.2l18.7-2.7Z" fill="url(#zs${on ? 1 : 0})" stroke="${on ? '#fff6c9' : '#4a5d78'}" stroke-width="2.4" stroke-linejoin="round"/><path d="M24 22l8-14 3 9" fill="none" stroke="rgba(255,255,255,${on ? .7 : .12})" stroke-width="3" stroke-linecap="round"/></svg>`
  };

  /* ---------------- Depolama (güvenli) ---------------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem('zd7:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('zd7:' + k, JSON.stringify(v)); } catch (e) { } }
  };

  /* ---------------- Ses (WebAudio sentezi) ---------------- */
  let ctx = null, muted = store.get('muted', false);
  function ac() {
    if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; } }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  function tone(f, t0, dur, type = 'sine', vol = .18, f2) {
    const a = ac(); if (!a) return;
    const o = a.createOscillator(), g = a.createGain();
    o.type = type; o.frequency.setValueAtTime(f, a.currentTime + t0);
    if (f2) o.frequency.exponentialRampToValueAtTime(f2, a.currentTime + t0 + dur);
    g.gain.setValueAtTime(0.0001, a.currentTime + t0);
    g.gain.exponentialRampToValueAtTime(vol, a.currentTime + t0 + .012);
    g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + t0 + dur);
    o.connect(g).connect(a.destination); o.start(a.currentTime + t0); o.stop(a.currentTime + t0 + dur + .05);
  }
  function noise(t0, dur, vol = .12, from = 600, to = 3000) {
    const a = ac(); if (!a) return;
    const len = Math.floor(a.sampleRate * dur), buf = a.createBuffer(1, len, a.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const s = a.createBufferSource(); s.buffer = buf;
    const bp = a.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 1.2;
    bp.frequency.setValueAtTime(from, a.currentTime + t0); bp.frequency.exponentialRampToValueAtTime(to, a.currentTime + t0 + dur);
    const g = a.createGain(); g.gain.value = vol;
    s.connect(bp).connect(g).connect(a.destination); s.start(a.currentTime + t0);
  }
  const SFX = {
    click() { tone(1100, 0, .05, 'sine', .08); },
    tap() { tone(700, 0, .07, 'triangle', .1, 900); },
    good() { tone(880, 0, .14, 'triangle', .16); tone(1318.5, .09, .22, 'triangle', .16); tone(2637, .12, .18, 'sine', .04); },
    bad() { tone(196, 0, .26, 'sawtooth', .07, 120); tone(147, .05, .25, 'square', .03, 100); },
    win() { [523.3, 659.3, 784, 1046.5, 1318.5].forEach((f, i) => tone(f, i * .09, .35, 'triangle', .14)); tone(2093, .5, .5, 'sine', .05); },
    pop() { tone(520, 0, .09, 'sine', .14, 1400); },
    bubble() { tone(300 + Math.random() * 200, 0, .12, 'sine', .07, 900 + Math.random() * 300); },
    whoosh() { noise(0, .35, .1, 300, 2600); },
    beat() { tone(70, 0, .13, 'sine', .45, 48); tone(62, .17, .12, 'sine', .3, 44); },
    tick() { tone(1500, 0, .03, 'square', .025); },
    swallow() { tone(220, 0, .18, 'sine', .14, 110); noise(0, .15, .04, 200, 600); },
    squish() { noise(0, .18, .07, 180, 500); tone(140, 0, .16, 'sine', .08, 90); },
    breathIn(d = 1.2) { noise(0, d, .05, 300, 1400); },
    breathOut(d = 1.4) { noise(0, d, .045, 1200, 260); },
    drip() { tone(1200, 0, .08, 'sine', .08, 500); },
    level() { [659.3, 880, 1174.7].forEach((f, i) => tone(f, i * .07, .2, 'triangle', .12)); }
  };
  function sfx(name, ...a) { if (muted) return; try { SFX[name] && SFX[name](...a); } catch (e) { } }

  /* ---------------- Zamanlayıcı ---------------- */
  class Timer {
    constructor(onTick) { this.onTick = onTick; this.t = 0; this.run = false; this._last = 0; this._raf = 0; }
    start() { if (this.run) return; this.run = true; this._last = performance.now(); const loop = (n) => { if (!this.run) return; this.t += (n - this._last) / 1000; this._last = n; this.onTick && this.onTick(this.t); this._raf = requestAnimationFrame(loop); }; this._raf = requestAnimationFrame(loop); }
    stop() { this.run = false; cancelAnimationFrame(this._raf); }
    reset() { this.stop(); this.t = 0; this.onTick && this.onTick(0); }
    static fmt(s) { s = Math.max(0, s); const m = Math.floor(s / 60), r = Math.floor(s % 60); return m + ':' + String(r).padStart(2, '0'); }
  }

  /* ---------------- Yardımcılar ---------------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; } return a; };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  function h(tag, attrs = {}, html = '') { const e = document.createElement(tag); for (const k in attrs) { if (k === 'class') e.className = attrs[k]; else if (k.startsWith('on')) e.addEventListener(k.slice(2), attrs[k]); else e.setAttribute(k, attrs[k]); } if (html) e.innerHTML = html; return e; }

  /* ---------------- Sayfa iskeleti ---------------- */
  let STAGE = null;
  function mount(o) {
    const app = typeof o.el === 'string' ? $(o.el) : (o.el || $('#app'));
    const crumb = (o.crumb || ['7. Sınıf Fen Bilimleri', '3. Ünite']).map((c, i, a) => i === a.length - 1 ? `<b>${c}</b>` : c).join(' &nbsp;›&nbsp; ');
    app.innerHTML = `
      <div class="zd-top">
        <a class="zd-back" href="${o.back || 'index.html'}">${I.back}<span>Materyal Seti</span></a>
        <div class="zd-crumb">${crumb}</div>
        <div class="zd-brand"><i></i>VÜCUDUMUZDAKİ SİSTEMLER</div>
      </div>
      <div class="zd-wrap">
        <section class="zd-stage" id="zd-stage">
          <header class="zd-hud">
            <div class="zd-title"><small>${o.kicker || ''}</small><h1>${o.title || ''}</h1></div>
            <div class="zd-stats">${(o.stats || []).map(s => `<div class="zd-stat" data-stat="${s.id}"><span class="l">${s.label}</span><span class="v ${s.cls || ''}">${s.value ?? ''}</span></div>`).join('')}</div>
            <div class="zd-tools">
              ${o.help !== false ? `<button class="zd-ibtn" data-zd="help" title="Nasıl kullanılır?" aria-label="Nasıl kullanılır?">${I.hand}</button>` : ''}
              <button class="zd-ibtn ${muted ? 'off' : ''}" data-zd="sound" title="Ses" aria-label="Sesi aç/kapat">${muted ? I.mute : I.sound}</button>
              ${o.restart !== false ? `<button class="zd-ibtn" data-zd="restart" title="Yeniden başlat" aria-label="Yeniden başlat">${I.restart}</button>` : ''}
            </div>
          </header>
          <div class="zd-body" id="zd-body"></div>
          <div class="zd-toast" id="zd-toast"><span class="ic"></span><span class="tx"></span></div>
        </section>
      </div>`;
    STAGE = $('#zd-stage');
    const sb = $('[data-zd="sound"]', app);
    sb.onclick = () => { muted = !muted; store.set('muted', muted); sb.innerHTML = muted ? I.mute : I.sound; sb.classList.toggle('off', muted); if (!muted) sfx('click'); };
    const hb = $('[data-zd="help"]', app); if (hb) hb.onclick = () => { sfx('click'); o.onHelp && o.onHelp(); };
    const rb = $('[data-zd="restart"]', app); if (rb) rb.onclick = () => { sfx('click'); o.onRestart && o.onRestart(); };
    document.title = (o.title || 'Materyal') + ' · Vücudumuzdaki Sistemler';
    // ilk dokunuşta ses bağlamını aç
    const unlock = () => { ac(); window.removeEventListener('pointerdown', unlock); };
    window.addEventListener('pointerdown', unlock);
    return {
      stage: STAGE, body: $('#zd-body'),
      stat(id, v, bump) { const e = $(`[data-stat="${id}"] .v`, app); if (!e) return; const s = String(v); if (e.textContent !== s) { e.textContent = s; if (bump) { e.classList.remove('bump'); void e.offsetWidth; e.classList.add('bump'); } } },
      statClass(id, cls) { const e = $(`[data-stat="${id}"] .v`, app); if (e) e.className = 'v ' + (cls || ''); }
    };
  }

  /* ---------------- Tost ---------------- */
  let toastT = 0;
  function toast(msg, type = '', ms = 2200) {
    const t = $('#zd-toast'); if (!t) return;
    t.className = 'zd-toast ' + type;
    $('.ic', t).innerHTML = type === 'good' ? '✓' : type === 'bad' ? '✕' : 'i';
    $('.tx', t).innerHTML = msg;
    requestAnimationFrame(() => t.classList.add('show'));
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), ms);
  }

  /* ---------------- Modal ---------------- */
  function modal({ html, actions = [], dismiss = false, cls = '' }) {
    const m = h('div', { class: 'zd-modal ' + cls }), box = h('div', { class: 'box' }, html);
    const acts = h('div', { class: 'acts' });
    const close = () => { m.classList.remove('show'); setTimeout(() => m.remove(), 380); };
    actions.forEach(a => { const b = h('button', { class: 'zd-btn ' + (a.cls || '') }, a.label); b.onclick = () => { sfx('click'); if (a.close !== false) close(); a.onClick && a.onClick(); }; acts.appendChild(b); });
    if (actions.length) box.appendChild(acts);
    m.appendChild(box); (STAGE || document.body).appendChild(m);
    if (dismiss) m.addEventListener('click', e => { if (e.target === m) close(); });
    requestAnimationFrame(() => requestAnimationFrame(() => m.classList.add('show')));
    return { el: m, box, close };
  }

  function intro({ kicker = 'MATERYAL', title, text = '', steps = [], start = 'Başla', onStart, art = '' }) {
    return modal({
      html: `${art}<span class="zd-chip">${kicker}</span><h2>${title}</h2>${text ? `<p>${text}</p>` : ''}
        ${steps.length ? `<ul class="zd-howto">${steps.map((s, i) => `<li><b>${i + 1}</b><span>${s}</span></li>`).join('')}</ul>` : ''}`,
      actions: [{ label: I.play + start, cls: 'lg', onClick: onStart }]
    });
  }

  function result({ title = 'Tebrikler!', correct = 0, total = 0, score = 0, time = 0, text = '', onReplay, extra = '' }) {
    const r = total ? correct / total : 1, n = r >= .9 ? 3 : r >= .6 ? 2 : r > 0 ? 1 : 0;
    // ana sayfadaki kartlarda gösterilmek üzere en iyi sonucu sakla
    const key = 'best:' + (location.pathname.split('/').pop() || 'index.html') + location.search;
    const prev = store.get(key, null);
    if (!prev || n > prev.stars || (n === prev.stars && score > prev.score)) store.set(key, { stars: n, score, at: Date.now() });
    const m = modal({
      html: `<div class="zd-stars">${[0, 1, 2].map(i => I.star(i < n)).join('')}</div>
        <h2>${title}</h2>${text ? `<p>${text}</p>` : ''}
        <div class="zd-res-grid"><div><b style="color:var(--green)">${correct}/${total}</b><span>Doğru</span></div><div><b style="color:var(--cyan)">${score}</b><span>Puan</span></div><div><b>${Timer.fmt(time)}</b><span>Süre</span></div></div>${extra}`,
      actions: [{ label: I.restart + 'Tekrar Oyna', cls: 'ghost', onClick: onReplay }, { label: 'Materyal Seti', cls: '', onClick: () => location.href = 'index.html' }]
    });
    $$('.zd-stars svg', m.box).forEach((s, i) => setTimeout(() => { s.classList.add('on'); if (i < n) sfx('pop'); }, 350 + i * 260));
    if (n >= 2) { sfx('win'); confetti(); }
    return m;
  }

  /* ---------------- Konfeti ---------------- */
  function confetti(n = 140) {
    const host = STAGE || document.body, c = h('canvas', { class: 'zd-confetti' }); host.appendChild(c);
    const r = host.getBoundingClientRect(), dpr = Math.min(2, devicePixelRatio || 1);
    c.width = r.width * dpr; c.height = r.height * dpr; const g = c.getContext('2d'); g.scale(dpr, dpr);
    const cols = ['#35eefc', '#2fe39b', '#ffbb3d', '#ff6fb0', '#a879ff', '#ffffff'];
    const P = Array.from({ length: n }, () => ({ x: r.width / 2 + (Math.random() - .5) * 120, y: r.height * .35, vx: (Math.random() - .5) * 13, vy: -Math.random() * 13 - 4, s: 5 + Math.random() * 7, a: Math.random() * 6, va: (Math.random() - .5) * .35, c: cols[(Math.random() * cols.length) | 0], sh: Math.random() < .5 }));
    let t = 0; (function f() { t++; g.clearRect(0, 0, r.width, r.height); P.forEach(p => { p.vy += .32; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.a += p.va; g.save(); g.translate(p.x, p.y); g.rotate(p.a); g.fillStyle = p.c; g.globalAlpha = Math.max(0, 1 - t / 170); if (p.sh) g.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); else { g.beginPath(); g.arc(0, 0, p.s / 2.6, 0, 7); g.fill(); } g.restore(); }); if (t < 170) requestAnimationFrame(f); else c.remove(); })();
  }

  /* ---------------- İpucu eli ---------------- */
  const HAND_SVG = `<svg viewBox="0 0 64 64"><defs><linearGradient id="zhg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#dfe8f3"/></linearGradient></defs><path d="M25.5 6.5c2.8 0 5 2.2 5 5v15l1.6-.3v-3.9c0-2.7 2.2-4.8 4.8-4.8s4.8 2.1 4.8 4.8v4.6l1.3-.2c2.8-.5 5.3 1.6 5.3 4.4v2.9l.9-.1c2.6-.3 4.8 1.7 4.8 4.3v7.5c0 9.8-7.9 17.8-17.7 17.8h-3.8c-5.7 0-11-2.7-14.4-7.3L7.4 40.3c-1.6-2.2-1.1-5.3 1.2-6.9 2-1.4 4.6-1.1 6.3.6l5.6 5.6V11.5c0-2.8 2.2-5 5-5Z" fill="url(#zhg)" stroke="#0b1626" stroke-width="3" stroke-linejoin="round"/></svg>`;
  let handEl = null, ringEl = null;
  function pointAt(target, opts = {}) {
    hideHand(); if (!STAGE || !target) return;
    const sr = STAGE.getBoundingClientRect(), tr = (target.getBoundingClientRect ? target.getBoundingClientRect() : target);
    const x = (tr.left + tr.width * (opts.fx ?? .5)) - sr.left, y = (tr.top + tr.height * (opts.fy ?? .5)) - sr.top;
    ringEl = h('div', { class: 'zd-ring' }); ringEl.style.left = x + 'px'; ringEl.style.top = y + 'px';
    handEl = h('div', { class: 'zd-hand tap' }, HAND_SVG); handEl.style.left = (x - 14) + 'px'; handEl.style.top = (y - 4) + 'px';
    STAGE.append(ringEl, handEl);
    if (opts.ms) setTimeout(hideHand, opts.ms);
  }
  function hideHand() { handEl && handEl.remove(); ringEl && ringEl.remove(); handEl = ringEl = null; }

  /* ---------------- Sürükle-bırak ---------------- */
  // ZD.drag(el, {data, onStart, onMove(x,y,ghost), onDrop(x,y,target) -> bool}) — fare + dokunmatik
  function drag(el, o = {}) {
    el.style.touchAction = 'none';
    el.addEventListener('pointerdown', (e) => {
      if (o.enabled && !o.enabled()) return;
      e.preventDefault();
      const r = el.getBoundingClientRect(), ox = e.clientX - r.left, oy = e.clientY - r.top;
      const ghost = el.cloneNode(true); ghost.classList.add('zd-ghost');
      Object.assign(ghost.style, { position: 'fixed', left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px', zIndex: 9999, pointerEvents: 'none', transform: 'scale(1.06) rotate(-2deg)', transition: 'transform .15s', margin: 0 });
      document.body.appendChild(ghost); el.style.opacity = '.35'; sfx('tap'); o.onStart && o.onStart();
      const mv = (ev) => { ghost.style.left = (ev.clientX - ox) + 'px'; ghost.style.top = (ev.clientY - oy) + 'px'; o.onMove && o.onMove(ev.clientX, ev.clientY, ghost); };
      const up = (ev) => {
        window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up);
        ghost.style.display = 'none'; const tgt = document.elementFromPoint(ev.clientX, ev.clientY); ghost.style.display = '';
        const ok = o.onDrop ? o.onDrop(ev.clientX, ev.clientY, tgt) : false;
        if (ok) { ghost.remove(); el.style.opacity = ''; }
        else { ghost.style.transition = 'left .3s, top .3s, transform .3s'; ghost.style.left = r.left + 'px'; ghost.style.top = r.top + 'px'; ghost.style.transform = 'none'; setTimeout(() => { ghost.remove(); el.style.opacity = ''; }, 300); }
      };
      window.addEventListener('pointermove', mv); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
    });
  }

  window.ZD = { I, mount, sfx, toast, modal, intro, result, confetti, pointAt, hideHand, drag, Timer, store, shuffle, clamp, lerp, wait, h, $, $$, get muted() { return muted; } };
})();
