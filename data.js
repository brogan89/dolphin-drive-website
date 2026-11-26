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

// Singles show as big cards in the Music section.
window.SINGLES = [
  {
    title: "Day Drinking",
    blurb: "Count us in! We're day drinking!",
    src: "assets/audio/day-drinking.mp3",
    cover: "assets/img/day-drinking.jpg"
  },
  {
    title: "Tango",
    blurb: "So in love that I could tango!",
    src: "assets/audio/tango.mp3",
    cover: "assets/img/tango.png"
  }
];

// Demos show as a track list under the singles.
window.DEMOS = [
  { title: "Breakdown (Demo)", src: "assets/audio/breakdown-demo.mp3" },
  { title: "Not Alone (Demo)", src: "assets/audio/not-alone-demo.mp3" },
  { title: "Covered In Flies (Demo)", src: "assets/audio/covered-in-flies-demo.mp3" },
  { title: "Dance The Night Away (Demo)", src: "assets/audio/dance-the-night-away-demo.mp3" }
];

// Photos: drop files in assets/img/gallery/ and list them here.
window.PHOTOS = [
  "01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg",
  "09.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg"
].map(f => "assets/img/gallery/" + f);
