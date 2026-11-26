const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// ---------- Shows ----------
const now = new Date();
const shows = SHOWS.map(s => ({ ...s, when: new Date(s.date) })).sort((a, b) => a.when - b.when);
// A show counts as upcoming until 6 hours after its start time.
const isPast = s => s.when.getTime() + 6 * 3600e3 < now.getTime();
const upcoming = shows.filter(s => !isPast(s));
const past = shows.filter(isPast).reverse();

const day = d => d.toLocaleDateString("en-NZ", { weekday: "short" });
const date = d => d.toLocaleDateString("en-NZ", { day: "numeric", month: "short" });
const time = d => d.toLocaleTimeString("en-NZ", { hour: "numeric", minute: "2-digit" });

$("upcoming").innerHTML = upcoming.length
  ? upcoming.map(s => `
    <li class="flyer">
      <p class="flyer-date"><span>${day(s.when)}</span> ${date(s.when)}</p>
      <h3>${esc(s.title)}</h3>
      <p>${esc(s.venue)}, ${esc(s.city)}<br>Doors ${time(s.when)}</p>
      ${s.link ? `<a class="stamp" href="${esc(s.link)}" target="_blank" rel="noopener">Get tickets</a>` : ""}
    </li>`).join("")
  : `<li class="flyer empty"><h3>No shows booked right now</h3><p>Follow us on Instagram to hear first.</p></li>`;

if (past.length) {
  $("past-wrap").hidden = false;
  $("past").innerHTML = past.map(s =>
    `<li><time datetime="${esc(s.date)}">${s.when.toLocaleDateString("en-NZ", { day: "numeric", month: "short", year: "numeric" })}</time> ${esc(s.title)}, ${esc(s.venue)}, ${esc(s.city)}</li>`).join("");
}

// ---------- Music ----------
const tracks = [...SINGLES, ...DEMOS];
const audio = $("audio");
let current = -1;

$("singles").innerHTML = SINGLES.map((t, i) => `
  <article class="single">
    <button class="cover" data-track="${i}" aria-label="Play ${esc(t.title)}">
      <img src="${esc(t.cover)}" alt="" loading="lazy">
      <span class="cover-play" aria-hidden="true"></span>
    </button>
    <div>
      <h3>${esc(t.title)}</h3>
      <p>${esc(t.blurb)}</p>
      <p class="actions">
        <button class="btn" data-track="${i}">Play</button>
        <a class="btn ghost" href="${esc(t.src)}" download>Download</a>
        <button class="btn ghost" data-share="${esc(t.title)}">Share</button>
      </p>
    </div>
  </article>`).join("");

$("demos").innerHTML = DEMOS.map((t, i) => `
  <li><button data-track="${SINGLES.length + i}"><span class="tl-title">${esc(t.title)}</span><span class="tl-len" data-len="${SINGLES.length + i}"></span></button></li>`).join("");

// Fill in track lengths without downloading whole files.
tracks.forEach((t, i) => {
  const a = new Audio();
  a.preload = "metadata";
  a.src = t.src;
  a.addEventListener("loadedmetadata", () => {
    const el = document.querySelector(`[data-len="${i}"]`);
    if (el) el.textContent = fmt(a.duration);
  });
});

function fmt(sec) {
  if (!isFinite(sec)) return "0:00";
  const s = Math.floor(sec);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function play(i) {
  if (i === current) return toggle();
  current = (i + tracks.length) % tracks.length;
  audio.src = tracks[current].src;
  audio.play();
  $("now-title").textContent = tracks[current].title;
  $("player").hidden = false;
  document.body.classList.add("has-player");
  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: tracks[current].title, artist: "Dolphin Drive",
      artwork: [{ src: tracks[current].cover || "assets/img/tango.png" }]
    });
  }
}
function toggle() { audio.paused ? audio.play() : audio.pause(); }

document.addEventListener("click", e => {
  const t = e.target.closest("[data-track]");
  if (t) play(+t.dataset.track);
  const s = e.target.closest("[data-share]");
  if (s) share(s.dataset.share, s);
});

async function share(title, btn) {
  const url = location.origin + location.pathname + "#music";
  try {
    if (navigator.share) return await navigator.share({ title: `${title} by Dolphin Drive`, url });
    await navigator.clipboard.writeText(url);
    btn.textContent = "Link copied";
  } catch {
    // share sheet dismissed, or clipboard blocked: nothing to do
  }
}

$("toggle").onclick = toggle;
$("prev").onclick = () => audio.currentTime > 3 ? (audio.currentTime = 0) : play(current - 1);
$("next").onclick = () => play(current + 1);
audio.addEventListener("ended", () => play(current + 1));

function syncPlaying() {
  const playing = !audio.paused;
  $("toggle-icon").setAttribute("d", playing ? "M6 4h4v16H6zM14 4h4v16h-4z" : "M7 4v16l13-8z");
  $("toggle").setAttribute("aria-label", playing ? "Pause" : "Play");
  document.querySelectorAll("[data-track]").forEach(b =>
    b.classList.toggle("playing", playing && +b.dataset.track === current));
}
audio.addEventListener("play", syncPlaying);
audio.addEventListener("pause", syncPlaying);

audio.addEventListener("timeupdate", () => {
  $("seek").value = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
  $("time").textContent = `${fmt(audio.currentTime)} / ${fmt(audio.duration)}`;
});
$("seek").addEventListener("input", e => {
  if (audio.duration) audio.currentTime = (e.target.value / 100) * audio.duration;
});

if ("mediaSession" in navigator) {
  navigator.mediaSession.setActionHandler("previoustrack", () => play(current - 1));
  navigator.mediaSession.setActionHandler("nexttrack", () => play(current + 1));
}

// ---------- Photos ----------
$("gallery").innerHTML = PHOTOS.map((src, i) => `
  <li><button data-photo="${esc(src)}" aria-label="Open photo ${i + 1}">
    <img src="${esc(src)}" alt="Dolphin Drive live, photo ${i + 1}" loading="lazy">
  </button></li>`).join("");

$("gallery").addEventListener("click", e => {
  const b = e.target.closest("[data-photo]");
  if (!b) return;
  $("lightbox-img").src = b.dataset.photo;
  $("lightbox-img").alt = b.querySelector("img").alt;
  $("lightbox").showModal();
});
// Click outside the photo closes it.
$("lightbox").addEventListener("click", e => { if (e.target === e.currentTarget) e.currentTarget.close(); });
