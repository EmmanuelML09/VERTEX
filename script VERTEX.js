/**
 * VÉRTEX — Streetwear Couture & High End Drops
 * Application Script & Interactive Logic
 */

const I = {
  logo: 'assets/logo.jpg',
  tee: 'assets/tee.jpg',
  hood: 'assets/hood.jpg',
  pants: 'assets/pants.jpg',
  cream: 'assets/cream.jpg',
  cap1: 'assets/cap1.jpg',
  cap2: 'assets/cap2.jpg',
  cap3: 'assets/cap3.jpg',
  sh1: 'assets/sh1.jpg',
  sh2: 'assets/sh2.jpg',
  sh3: 'assets/sh3.jpg',
  guy: 'assets/guy.jpg',
  shoe: 'assets/shoe.jpg',
  girl: 'assets/girl.jpg',
  store: 'assets/store.jpg',
  bag: 'assets/bag.jpg',
  tag: 'assets/tag.jpg'
};

const P = [
      { id: 'tee', n: 'Tee Dreams Built Different', i: 'tee', p: 38, c: 'ropa', b: 'TOP SELLER', desc: 'Camiseta oversize 100% algodón 300 GSM con gráfico graffiti en espalda.' },
      { id: 'hood', n: 'Hoodie Crown Purple', i: 'hood', p: 79, c: 'ropa', b: 'DROP EXCLUSIVO', desc: 'Heavyweight French Terry 450 GSM con bordado 3D puff de corona en pecho.' },
      { id: 'pants', n: 'Cargo Night Tactical', i: 'pants', p: 68, c: 'ropa', b: 'HOT', desc: 'Pantalón cargo técnico con bolsillos 3D, correas tácticas y logo bordado.' },
      { id: 'cream', n: 'Tee Good Vibes', i: 'cream', p: 36, c: 'ropa', desc: 'Camiseta color crema vintage con arte de flamas violetas y ojos anime.' },
      { id: 'cap1', n: 'Snapback Crown Black', i: 'cap1', p: 28, c: 'gorras', b: 'ESSENTIAL', desc: 'Gorra snapback de 6 paneles en sarga pesada con bordado tridimensional de corona.' },
      { id: 'cap2', n: 'Cap VÉRTEX Purple', i: 'cap2', p: 28, c: 'gorras', b: 'HOT', desc: 'Gorra curva en morado real con tipografía VÉRTEX en hilo rosa flúor.' },
      { id: 'cap3', n: 'Trucker Pink Star', i: 'cap3', p: 30, c: 'gorras', desc: 'Trucker retro con malla rosa flúor de alta ventilación y estrella frontal.' },
      { id: 'sh1', n: 'VÉRTEX High Edition', i: 'sh1', p: 135, c: 'zapatos', b: 'FLAGSHIP KICKS', desc: 'Sneakers high-top en cuero vacuno negro con paneles morados y acentos rosa.' },
      { id: 'sh2', n: 'Lilac Low Shadow', i: 'sh2', p: 119, c: 'zapatos', desc: 'Silueta skate baja en cuero pastel lila, ante morado y suela acolchada.' },
      { id: 'sh3', n: 'Pink Tech Runner', i: 'sh3', p: 129, c: 'zapatos', b: 'HOT', desc: 'Sneaker futurista chunky con suela amortiguadora de ondas y detalles magenta.' },
      { id: 'hood_new', n: 'Hoodie Crown Purple', i: 'hood', p: 79, c: 'nuevo', b: 'RECIÉN LLEGADO', desc: 'Stock ultra limitado recién salido del taller.' },
      { id: 'trucker_new', n: 'Trucker Pink Star', i: 'cap3', p: 30, c: 'nuevo', b: 'RECIÉN LLEGADO', desc: 'Stock ultra limitado recién salido del taller.' },
      { id: 'runner_new', n: 'Pink Tech Runner', i: 'sh3', p: 129, c: 'nuevo', b: 'RECIÉN LLEGADO', desc: 'Stock ultra limitado recién salido del taller.' }
    ];

    const $ = s => document.getElementById(s);
    const cart = [];
    let promoDiscount = 0;

    // Load images
    document.querySelectorAll('[data-i]').forEach(e => {
      if (I[e.dataset.i]) e.src = I[e.dataset.i];
    });

    // Populate Marquee
    const mqText = Array(12).fill('TU ESTILO ✦ TU ZONA ✦ VÉRTEX ✦ ROPA / GORRAS / SNEAKERS ✦ HIGH-END STREETWEAR ✦ ').join('');
    $('mq').innerHTML = $('mq2').innerHTML = mqText;

    // Render Product Cards
    const grid = $('mainGrid');
    function renderProducts(filter = 'all') {
      grid.innerHTML = '';
      const list = filter === 'all' 
        ? P.filter((p, index, self) => index === self.findIndex(t => t.n === p.n))
        : (filter === 'nuevo' ? P.filter(p => p.c === 'nuevo') : P.filter(p => p.c === filter));

      list.forEach((p, idx) => {
        const d = document.createElement('div');
        d.className = 'card';
        d.innerHTML = `
          <div class="im">
            ${p.b ? `<span class="bd">${p.b}</span>` : ''}
            <img src="${I[p.i]}" alt="${p.n}" loading="lazy">
          </div>
          <div class="card-body">
            <span class="card-cat">${p.c.toUpperCase()}</span>
            <h3>${p.n}</h3>
            <div class="rw">
              <span class="pr">$${p.p}</span>
              <button class="btn-buy" data-id="${p.id}">AÑADIR +</button>
            </div>
          </div>
        `;
        d.querySelector('.btn-buy').onclick = () => add(p);

        // 3D card tilt physics
        d.onmousemove = e => {
          const r = d.getBoundingClientRect(),
                x = (e.clientX - r.left) / r.width - 0.5,
                y = (e.clientY - r.top) / r.height - 0.5;
          d.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-8px)`;
        };
        d.onmouseleave = () => d.style.transform = '';
        grid.appendChild(d);

        // Observer reveal
        setTimeout(() => d.classList.add('on'), (idx % 4) * 120);
      });
    }
    renderProducts();

    // Filter tab clicks
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProducts(btn.dataset.filter);
      };
    });

    // Sticky Showcase Setup
    const S = [
      { w: 'HOODIE', p: P[1], tag: 'French Terry 450 GSM • Boxy Fit' },
      { w: 'HIGH', p: P[7], tag: 'Cuero Premium • Amortiguación Air' },
      { w: 'SNAPBACK', p: P[4], tag: 'Sarga Pesada • Bordado 3D Puff' },
      { w: 'CARGO', p: P[2], tag: 'Algodón Técnico • Correas Tácticas' },
      { w: 'TEE', p: P[0], tag: 'Gráfico Graffiti • 100% Algodón' },
      { w: 'CREAM', p: P[3], tag: 'Edición Vintage • Estampado Flamas' }
    ];

    let cur = -1;
    S.forEach((s, i) => {
      $('sp').insertAdjacentHTML('beforeend', `<img src="${I[s.p.i]}" alt="${s.p.n}">`);
      $('sNav').insertAdjacentHTML('beforeend', `<button class="thumb-btn ${i === 0 ? 'a' : ''}" data-idx="${i}">${s.w}</button>`);
    });

    function setS(i) {
      if (i === cur || i < 0 || i >= S.length) return;
      cur = i;
      [...$('sp').children].forEach((e, k) => e.classList.toggle('a', k === i));
      [...$('sNav').children].forEach((e, k) => e.classList.toggle('a', k === i));
      $('bw').textContent = S[i].w;
      $('sn').textContent = S[i].p.n;
      $('spr').textContent = '$' + S[i].p.p + ' USD';
    }

    $('sNav').onclick = e => {
      const b = e.target.closest('button');
      if (b) setS(+b.dataset.idx);
    };

    $('sb').onclick = () => add(S[cur].p);
    setS(0);

    // Parallax on scroll
    const fo = [...document.querySelectorAll('.fo')];
    const gi = [...document.querySelectorAll('#gal img')];
    function onScroll() {
      const y = scrollY;
      const sh = $('show');
      const r = sh.getBoundingClientRect();
      const pr = Math.min(0.999, Math.max(0, -r.top / (r.height - innerHeight)));
      setS(Math.floor(pr * S.length));

      fo.forEach(f => {
        f.style.transform = `translateY(${y * (+f.dataset.s) * -1.8}px) rotate(${y * 0.04 * (+f.dataset.s > 0 ? 1 : -1)}deg)`;
      });
      gi.forEach(g => {
        const b = g.parentNode.getBoundingClientRect();
        g.style.transform = `translateY(${(b.top - innerHeight / 2) * (+g.dataset.p)}px)`;
      });

      // Navbar shrink on scroll
      $('navbar').classList.toggle('scrolled', y > 60);
    }
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mouse ambient movement
    addEventListener('mousemove', e => {
      document.body.style.setProperty('--cx', e.clientX + 'px');
      document.body.style.setProperty('--cy', e.clientY + 'px');
    });

    // Toast alert
    function ts(m) {
      const t = $('ts');
      t.textContent = m;
      t.classList.add('s');
      clearTimeout(t._tm);
      t._tm = setTimeout(() => t.classList.remove('s'), 2200);
    }

    // Cart Management
    function add(p) {
      const f = cart.find(c => c.n === p.n);
      if (f) f.q++;
      else cart.push({ ...p, q: 1, size: 'M' });
      renderCart();
      ts('👑 ' + p.n.toUpperCase() + ' AÑADIDO');
    }

    function renderCart() {
      const it = $('its');
      if (!cart.length) {
        it.innerHTML = '<div style="text-align:center; padding: 40px 10px; color: var(--g);"><div style="font-size:3rem; margin-bottom:10px;">👑</div><p style="font-weight:600; font-size:1.1rem; color:#fff;">Tu carrito está vacío</p><p style="font-size:0.85rem; margin-top:6px;">Explora el drop y elige tu zona.</p></div>';
      } else {
        it.innerHTML = '';
      }

      let sub = 0, n = 0;
      cart.forEach((c, i) => {
        sub += c.p * c.q;
        n += c.q;
        const d = document.createElement('div');
        d.className = 'it';
        d.innerHTML = `
          <img src="${I[c.i]}" alt="${c.n}">
          <div class="it-info">
            <div class="it-title">${c.n}</div>
            <div class="it-price">$${c.p} USD</div>
            <div class="it-qty">
              <button class="qty-btn" data-a="-1" data-j="${i}">-</button>
              <span class="qty-count">${c.q}</span>
              <button class="qty-btn" data-a="1" data-j="${i}">+</button>
            </div>
          </div>
        `;
        it.appendChild(d);
      });

      // Free shipping calculation (threshold: $90)
      const threshold = 90;
      const progress = Math.min(100, (sub / threshold) * 100);
      $('shipProgress').style.width = progress + '%';
      if (sub === 0) {
        $('shipText').innerHTML = 'Envío gratis a partir de <b>$90 USD</b>';
      } else if (sub >= threshold) {
        $('shipText').innerHTML = '🎉 ¡Felicidades! Tienes <b>ENVÍO GRATIS</b>';
      } else {
        const remaining = (threshold - sub).toFixed(0);
        $('shipText').innerHTML = `Agrega <b>$${remaining} USD</b> más para <b>ENVÍO GRATIS</b>`;
      }

      // Calculations
      const discount = sub * promoDiscount;
      const shipping = (sub >= threshold || sub === 0) ? 0 : 12;
      const total = Math.max(0, sub - discount + shipping);

      $('subTotal').textContent = '$' + sub.toFixed(2);
      $('shipCost').textContent = shipping === 0 ? 'GRATIS' : '$' + shipping.toFixed(2);
      if (promoDiscount > 0) {
        $('discountRow').style.display = 'flex';
        $('discAmount').textContent = '-$' + discount.toFixed(2);
      } else {
        $('discountRow').style.display = 'none';
      }
      $('tt').textContent = '$' + total.toFixed(2);
      $('cn').textContent = n;

      // Animate cart button bump
      const b = $('cb');
      b.classList.remove('bp');
      void b.offsetWidth;
      b.classList.add('bp');
    }

    $('its').onclick = e => {
      const b = e.target.closest('button');
      if (!b) return;
      const c = cart[+b.dataset.j];
      c.q += +b.dataset.a;
      if (c.q < 1) cart.splice(+b.dataset.j, 1);
      renderCart();
    };

    // Promo code apply
    $('promoBtn').onclick = () => {
      const val = $('promoInput').value.trim().toUpperCase();
      if (val === 'VERTEX10') {
        promoDiscount = 0.10;
        renderCart();
        ts('✨ ¡CÓDIGO VERTEX10 APLICADO! -10% OFF');
      } else if (!val) {
        ts('Ingresa un código de descuento');
      } else {
        ts('Código no válido o expirado');
      }
    };

    // Drawer toggle
    $('cb').onclick = () => $('dr').classList.add('o');
    $('cl').onclick = () => $('dr').classList.remove('o');

    // Mobile nav toggle
    $('mobBtn').onclick = () => $('mobileMenu').classList.add('open');
    $('closeMob').onclick = () => $('mobileMenu').classList.remove('open');
    document.querySelectorAll('.mob-link').forEach(link => {
      link.onclick = () => $('mobileMenu').classList.remove('open');
    });

    // Checkout button
    $('py').onclick = () => {
      if (!cart.length) return ts('AÑADE PRODUCTOS ANTES DE PAGAR');
      cart.length = 0;
      promoDiscount = 0;
      $('promoInput').value = '';
      renderCart();
      $('dr').classList.remove('o');
      ts('👑 ¡COMPRA EXITOSA! BIENVENIDO A LA ZONA VÉRTEX');
    };

    renderCart();

    // Hide loader
    addEventListener('load', () => {
      setTimeout(() => $('ld').classList.add('h'), 600);
    });
  