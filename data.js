// Edit this file to update the site. No build step: commit and push, GitHub Pages does the rest.

// Shows: date is local NZ time, "YYYY-MM-DDTHH:MM". Past shows move to "Past shows" automatically.
// link is optional (tickets / Facebook event).
window.SHOWS = [
  {
    date: "2026-11-28T20:00",
    title: "Before The Wrecking Ball pt5 (Finale)",
    venue: "Nirvara Lounge",
    city: "Hamilton",
    link: ""
  }
];

// Music. Each single gets an embedded Spotify player.
// spotifyTrack = the ID from the track's share link: open.spotify.com/track/<ID>
window.SINGLES = [
  { title: "Day Drinking", blurb: "Count us in! We're day drinking!", cover: "assets/img/day-drinking.jpg", spotifyTrack: "5WrXErjuQPLsifnYxm6zQK" },
  { title: "Tango", blurb: "So in love that I could tango!", cover: "assets/img/tango.jpg", spotifyTrack: "6rz2kQ3eJBNOxC35NOLvTF" }
];

// Photos: drop files in assets/img/gallery/ and list them here.
window.PHOTOS = [
  "01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg",
  "09.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg"
].map(f => "assets/img/gallery/" + f);
