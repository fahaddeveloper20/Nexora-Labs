(() => {
 const box = document.getElementById('scene');
 if (!box || !window.THREE || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
 let r; try { r = new THREE.WebGLRenderer({antialias: true, alpha: true}); } catch (e) { return; }
 box.classList.add('live'); box.appendChild(r.domElement);
 r.setPixelRatio(Math.min(devicePixelRatio, 2));
 const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(45, 1, .1, 100); cam.position.z = 7.5;
 const grp = new THREE.Group(); scene.add(grp);
 const mat = (c, o = 1) => new THREE.MeshBasicMaterial({color: c, wireframe: true, transparent: true, opacity: o});
 const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.6, 1), mat(0x7667FF, .9));
 const inner = new THREE.Mesh(new THREE.OctahedronGeometry(.85), mat(0x36C5F0));
 const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(2.5, .04, 160, 8, 2, 3), new THREE.MeshBasicMaterial({color: 0x36C5F0, transparent: true, opacity: .55}));
 const ring = new THREE.Mesh(new THREE.TorusGeometry(3.1, .012, 8, 140), new THREE.MeshBasicMaterial({color: 0x7667FF}));
 ring.rotation.x = 1.25;
 grp.add(core, inner, knot, ring);
 const N = 420, pos = new Float32Array(N * 3);
 for (let i = 0; i < N; i++) { const rad = 3.4 + Math.random() * 2.2, t = Math.random() * 6.283, p = Math.acos(2 * Math.random() - 1);
  pos.set([rad * Math.sin(p) * Math.cos(t), rad * Math.sin(p) * Math.sin(t), rad * Math.cos(p)], i * 3); }
 const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
 const pts = new THREE.Points(pg, new THREE.PointsMaterial({color: 0xF5F5F7, size: .035, transparent: true, opacity: .7}));
 scene.add(pts);
 const size = () => { const w = box.clientWidth, h = box.clientHeight; r.setSize(w, h); cam.aspect = w / h; cam.updateProjectionMatrix(); };
 size(); addEventListener('resize', size);
 let mx = 0, my = 0, vis = true;
 addEventListener('pointermove', e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; });
 new IntersectionObserver(([e]) => vis = e.isIntersecting).observe(box);
 const clock = new THREE.Clock();
 (function loop() {
  requestAnimationFrame(loop); if (!vis) return;
  const t = clock.getElapsedTime();
  core.rotation.set(t * .25, t * .35, 0); inner.rotation.set(-t * .5, t * .4, 0);
  knot.rotation.set(t * .12, -t * .18, 0); ring.rotation.z = t * .3; pts.rotation.y = t * .05;
  const s = 1 + Math.sin(t * 1.4) * .04; inner.scale.setScalar(s);
  grp.rotation.y += (mx * 1.2 - grp.rotation.y) * .05; grp.rotation.x += (my * .8 - grp.rotation.x) * .05;
  grp.position.y = -Math.min(scrollY, 700) * .004;
  r.render(scene, cam);
 })();
})();
