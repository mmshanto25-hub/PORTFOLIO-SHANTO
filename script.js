const $ = s => document.querySelector(s), $$ = s => document.querySelectorAll(s);

window.addEventListener("load", () => setTimeout(() => $("#loader").classList.add("hide"), 900));

const header = $("#header"), progress = $("#progressBar");
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = (scrollY / max * 100) + "%";
  header.classList.toggle("scrolled", scrollY > 40);
  const sections = [...$$("main section")];
  let active = "home";
  sections.forEach(s => { if (scrollY >= s.offsetTop - 160) active = s.id });
  $$("nav a").forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + active));
});

$$('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
  const id = a.getAttribute("href");
  if (id !== "#") { e.preventDefault(); $(id)?.scrollIntoView({ behavior: "smooth" }); }
  $("#nav").classList.remove("open");
}));

$("#menuBtn").addEventListener("click", () => $("#nav").classList.toggle("open"));

const words = ["Full Stack Developer", "UI/UX Designer", "React Expert", "TypeScript Wizard"];
let wi = 0, ci = 0, deleting = false;
function type() {
  const word = words[wi];
  $("#typingText").textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
  let speed = deleting ? 45 : 80;
  if (!deleting && ci > word.length) { deleting = true; speed = 1600 }
  if (deleting && ci < 0) { deleting = false; wi = (wi + 1) % words.length; ci = 0; speed = 300 }
  setTimeout(type, speed);
}
type();

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      if (e.target.matches(".stat")) animateCount(e.target);
      observer.unobserve(e.target);
    }
  });
}, { threshold: .12 });
$$(".reveal").forEach(el => observer.observe(el));
$$(".stat").forEach(el => observer.observe(el));

function animateCount(card) {
  const n = +card.querySelector("[data-count]").dataset.count, el = card.querySelector("[data-count]");
  let start = 0; const step = Math.max(1, Math.ceil(n / 35));
  const timer = setInterval(() => { start += step; if (start >= n) { start = n; clearInterval(timer) } el.textContent = start }, 35);
}

const testimonials = [
  { q: "Alex transformed our product from a functional app into an experience our customers genuinely love. His attention to detail is unmatched.", n: "Sarah Mitchell", r: "Product Director, TechCorp" },
  { q: "Working with Alex was seamless. He understood the business problem, designed a beautiful solution, and delivered it with exceptional engineering quality.", n: "David Park", r: "Founder, StartupXYZ" },
  { q: "A rare combination of design thinking and technical depth. Alex consistently raises the quality bar for every project he touches.", n: "Emily Rodriguez", r: "Creative Director, DesignStudio" }
];
let ti = 0;
function renderTestimonial() {
  const t = testimonials[ti];
  $("#quoteText").textContent = t.q; $("#quoteName").textContent = t.n; $("#quoteRole").textContent = t.r;
  $("#dots").innerHTML = testimonials.map((_, i) => `<i class="${i === ti ? "active" : ""}"></i>`).join("");
}
$("#prevTest").onclick = () => { ti = (ti - 1 + testimonials.length) % testimonials.length; renderTestimonial() };
$("#nextTest").onclick = () => { ti = (ti + 1) % testimonials.length; renderTestimonial() };
renderTestimonial();

$("#contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = $("#name").value.trim(), email = $("#email").value.trim(), subject = $("#subject").value.trim(), message = $("#message").value.trim(), status = $("#formStatus");
  if (name.length < 2) return status.textContent = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return status.textContent = "Please enter a valid email.";
  if (subject.length < 5) return status.textContent = "Subject must be at least 5 characters.";
  if (message.length < 10) return status.textContent = "Message must be at least 10 characters.";
  status.textContent = "Message sent! Thank you for reaching out.";
  e.target.reset();
});

$("#topBtn").onclick = () => scrollTo({ top: 0, behavior: "smooth" });
$("#year").textContent = new Date().getFullYear();

$("#cvBtn").addEventListener("click", e => {
  e.preventDefault();
  const cv = `Alex Chen\nFull Stack Developer & UI/UX Designer\n\nSkills: HTML, CSS, JavaScript, React, TypeScript, Node.js, Python, PostgreSQL, MongoDB, Figma`;
  const blob = new Blob([cv], { type: "text/plain" }), url = URL.createObjectURL(blob), a = document.createElement("a");
  a.href = url; a.download = "Alex-Chen-CV.txt"; a.click(); URL.revokeObjectURL(url);
});

const glow = $("#mouseGlow"), cursor = $(".cursor");
window.addEventListener("mousemove", e => {
  glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px";
  cursor.style.left = e.clientX + "px"; cursor.style.top = e.clientY + "px";
});
$$("a,button").forEach(el => {
  el.addEventListener("mouseenter", () => { cursor.style.width = "48px"; cursor.style.height = "48px"; cursor.style.background = "#3b82f612" });
  el.addEventListener("mouseleave", () => { cursor.style.width = "32px"; cursor.style.height = "32px"; cursor.style.background = "transparent" });
});
