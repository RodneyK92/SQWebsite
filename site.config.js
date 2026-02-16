window.SITE = {
  brand: "Rodney Kono",
  seo: {
    title: "Rodney Kono | Photography",
    description: "Portraits, travel, and events — click a cover to view full sets."
  },

  // “Pages” in the nav (single-page routing by hash)
  nav: [
    { label: "Home", page: "home" },
    { label: "Portraits", page: "portraits" },
    { label: "Travels", page: "travels" },
    { label: "Events", page: "events" },
    { label: "Services", page: "services" },
    { label: "Contact", page: "contact" }
  ],

  hero: {
    badge: "Gallery-style portfolio",
    headline: "Photography that feels like a memory you can hold.",
    subhead: "Choose a category. Click a cover image to open the full set.",
    primaryCta: { label: "View Portraits", page: "portraits" },
    secondaryCta: { label: "Services", page: "services" },
    stats: [
      { value: "Portraits", label: "People + mood" },
      { value: "Travels", label: "Places + stories" },
      { value: "Events", label: "Real moments" }
    ]
  },

  featuredCard: {
    title: "Style",
    text: "Clean edits, cinematic color, and natural direction.",
    bullets: ["Fast turnaround", "Coaching + posing help", "Clean color workflow", "Social-ready exports"],
    button: { label: "Email me", href: "mailto:you@example.com?subject=Photography%20Inquiry" }
  },

  // Each category is a page. Each page has SETS (album covers).
  // Clicking a cover opens its photos[] in the lightbox.
  galleries: {
    portraits: {
      title: "Portraits",
      subtitle: "Individuals, couples, and editorial-style portraits.",
      sets: [
        {
          id: "portraits_studio_01",
          title: "Studio Portraits",
          location: "Frederick, MD",
          date: "2026",
          cover: { src: "./images/portraits/studio-01/cover.jpg", alt: "Studio portraits cover" },
          photos: [
            "./images/portraits/studio-01/01.jpg",
            "./images/portraits/studio-01/02.jpg",
            "./images/portraits/studio-01/03.jpg"
          ]
        },
        {
          id: "portraits_golden_01",
          title: "Golden Hour",
          location: "Gambrill",
          date: "2026",
          cover: { src: "./images/portraits/golden-hour-01/cover.jpg", alt: "Golden hour cover" },
          photos: [
            "./images/portraits/golden-hour-01/01.jpg",
            "./images/portraits/golden-hour-01/02.jpg",
            "./images/portraits/golden-hour-01/03.jpg",
            "./images/portraits/golden-hour-01/04.jpg"
          ]
        }
      ]
    },

    travels: {
      title: "Travels",
      subtitle: "Atmosphere, landscapes, and visual stories.",
      sets: [
        {
          id: "travels_maryland_01",
          title: "Maryland Landscapes",
          location: "Maryland",
          date: "2026",
          cover: { src: "./images/travels/maryland-01/cover.jpg", alt: "Maryland landscapes cover" },
          photos: [
            "./images/travels/maryland-01/01.jpg",
            "./images/travels/maryland-01/02.jpg",
            "./images/travels/maryland-01/03.jpg"
          ]
        }
      ]
    },

    events: {
      title: "Events",
      subtitle: "Celebrations and real moments.",
      sets: [
        {
          id: "events_wedding_01",
          title: "Wedding Highlights",
          location: "Maryland",
          date: "2026",
          cover: { src: "./images/events/wedding-01/cover.jpg", alt: "Wedding cover" },
          photos: [
            "./images/events/wedding-01/01.jpg",
            "./images/events/wedding-01/02.jpg",
            "./images/events/wedding-01/03.jpg"
          ]
        }
      ]
    }
  },

  services: {
    title: "Services",
    subtitle: "Simple packages. Clean results. Easy booking.",
    items: [
      {
        title: "Portrait Session",
        price: "From $250",
        bullets: ["60–90 minutes", "1 location", "15 edited photos", "48–72hr sneak peek"]
      },
      {
        title: "Event Coverage",
        price: "From $400",
        bullets: ["2-hour minimum", "Candid + highlights", "Edited gallery delivery", "Add-ons available"]
      },
      {
        title: "Brand / Editorial",
        price: "Custom",
        bullets: ["Story-driven sets", "Usage options available", "Moodboarding included", "Let’s build the vibe"]
      }
    ],
    cta: { label: "Book / Inquire", href: "mailto:you@example.com?subject=Photography%20Inquiry" }
  },

  contact: {
    title: "Contact",
    text: "Want to shoot, collaborate, or book? Send a quick note and I’ll reply ASAP.",
    buttons: [
      { label: "Email", href: "mailto:you@example.com" },
      { label: "Instagram", href: "https://instagram.com/" },
      { label: "LinkedIn", href: "https://linkedin.com/" }
    ]
  },

  footer: {
    text: "© {year} Rodney Kono Photography.",
    socials: [
      { label: "Instagram", href: "https://instagram.com/" },
      { label: "GitHub", href: "https://github.com/" }
    ]
  }
};
