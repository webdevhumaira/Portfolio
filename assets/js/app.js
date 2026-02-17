const cursor = document.getElementById('cursor'), follower = document.getElementById('cursorFollower');
let mx = 0, my = 0, fx = 0, fy = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cursor.style.left = mx + 'px'; cursor.style.top = my + 'px' });
(function anim() { fx += (mx - fx) * .12; fy += (my - fy) * .12; follower.style.left = fx + 'px'; follower.style.top = fy + 'px'; requestAnimationFrame(anim) })();
document.querySelectorAll('a,button,.skill-chip,.service-card,.project-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%,-50%) scale(2.5)');
    el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%,-50%) scale(1)');
});
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', scrollY > 50));
const stb = document.getElementById('scrollTop');
window.addEventListener('scroll', () => stb.classList.toggle('show', scrollY > 400));
const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            e.target.querySelectorAll('.timeline-item').forEach((item, i) => setTimeout(() => item.classList.add('visible'), i * 150));
        }
    });
}, { threshold: .15 });
document.querySelectorAll('.reveal,.reveal-left').forEach(el => io.observe(el));
document.querySelectorAll('.progress-fill').forEach(bar => {
    new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) setTimeout(() => bar.style.width = bar.dataset.width + '%', 300) });
    }, { threshold: .3 }).observe(bar);
});
const secs = document.querySelectorAll('section[id]'), navls = document.querySelectorAll('.nav-link:not(.nav-cta)');
window.addEventListener('scroll', () => { let cur = ''; secs.forEach(s => { if (scrollY >= s.offsetTop - 100) cur = s.id }); navls.forEach(l => { l.style.color = l.getAttribute('href') === '#' + cur ? 'var(--primary)' : '' }) });
document.getElementById('sendBtn').addEventListener('click', function () {
    this.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
    this.style.background = 'linear-gradient(135deg,var(--accent),#38f9d7)'; this.style.color = '#0d0d1a';
    setTimeout(() => { this.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message'; this.style.background = ''; this.style.color = '' }, 3000);
});