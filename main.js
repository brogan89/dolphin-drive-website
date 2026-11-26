const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// ---------- Shows ----------
// A show stays listed until 24 hours after its start time, then drops off.
const cutoff = Date.now() - 24 * 3600e3;
const upcoming = SHOWS.map(s => ({ ...s, when: new Date(s.date) }))
  .filter(s => s.when.getTime() > cutoff)
  .sort((a, b) => a.when - b.when);

const day = d => d.toLocaleDateString("en-NZ", { weekday: "short" });
const date = d => d.toLocaleDateString("en-NZ", { day: "numeric", month: "short" });
const time = d => d.toLocaleTimeString("en-NZ", { hour: "numeric", minute: "2-digit" });

// No shows left: hide the whole section and its nav link.
$("shows").hidden = $("nav-shows").hidden = !upcoming.length;

$("upcoming").innerHTML = upcoming.map(s => `
  <li class="flyer">
    <p class="flyer-date"><span>${day(s.when)}</span> ${date(s.when)}</p>
    <h3>${esc(s.title)}</h3>
    <p>${esc(s.venue)}, ${esc(s.city)}<br>Doors ${time(s.when)}</p>
    ${s.link ? `<a class="stamp" href="${esc(s.link)}" target="_blank" rel="noopener">Get tickets</a>` : ""}
  </li>`).join("");

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
