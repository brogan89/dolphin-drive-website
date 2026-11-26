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
$("singles").innerHTML = SINGLES.map(t => `
  <article class="single">
    <img class="cover" src="${esc(t.cover)}" alt="${esc(t.title)} cover art" loading="lazy">
    <div>
      <h3>${esc(t.title)}</h3>
      <p>${esc(t.blurb)}</p>
      <iframe class="spotify" title="Play ${esc(t.title)} on Spotify" loading="lazy"
        src="https://open.spotify.com/embed/track/${encodeURIComponent(t.spotifyTrack)}?theme=0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
    </div>
  </article>`).join("");

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
