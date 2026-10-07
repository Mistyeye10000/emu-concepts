// Shared content for every Emu concept. Same data everywhere so concepts differ by design, not content.
// Jordan Avery is real test data from the live app (captured 2 Oct 2026). The other three are made-up
// examples and must be visibly labelled "Example". Distances and next-available dates are examples for all four.
window.EMU = {
  brand: {
    // Base colours (keep). Concepts may add secondary and tertiary colours.
    lilac: '#EFD2F9', lilac100: '#F6E4FC', lilac700: '#6A307E', lilac800: '#4B2259',
    rust: '#9B5212', rust800: '#6E3A0D', rust50: '#FDF7F1',
    bark: '#291605', cream: '#FCFAF8', white: '#FFFFFF',
    stone200: '#E3E0DD', stone500: '#877A6E', stone600: '#70655C',
    fonts: { serif: "'Newsreader', Georgia, serif", sans: "'Inter', ui-sans-serif, system-ui, sans-serif" },
    fontsHref: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&display=swap',
    // Rachel's own brand imagery from emu.care (can ship)
    images: {
      feather: 'https://media.base44.com/images/public/6a76a592b364131655d5dea1/d46a85608_generated_bef7ca90.png',     // square, "A feather caught in warm light"
      walkBanner: 'https://media.base44.com/images/public/6a76a592b364131655d5dea1/08f119df9_generated_39bd4f69.png',  // wide, "Walk & Talk Therapy"
      textures: 'https://media.base44.com/images/public/6a76a592b364131655d5dea1/50755a760_generated_911429f5.png',    // square, "Natural linen, clay and water textures"
    },
  },

  // Real, freely licensed photos of actual Emu meeting places (Wikimedia Commons). CC BY-SA: show the credit wherever used.
  photos: {
    trailWalk: { src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/Schuylkill_River_Trail_2018.jpg/1920px-Schuylkill_River_Trail_2018.jpg',
      alt: 'People walking and jogging on the Schuylkill River Trail beside the river on a sunny morning',
      credit: 'Schuylkill River Trail. Photo: Ii2nmd, CC BY-SA 4.0, via Wikimedia Commons', place: 'Schuylkill River Trail' },
    trailCity: { src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Schuylkill_River_Trail_from_the_South_St._bridge.jpg/1920px-Schuylkill_River_Trail_from_the_South_St._bridge.jpg',
      alt: 'The Schuylkill River Trail boardwalk curving along the river toward the Philadelphia skyline, autumn trees in the foreground',
      credit: 'Schuylkill River Trail from the South St. bridge. Photo: SidewalkMD, CC BY-SA 4.0, via Wikimedia Commons', place: 'Schuylkill River Trail' },
    library: { src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Philadelphia_October_2017_06_%28Free_Library_of_Philadelphia_Parkway_Central_Library%29.jpg/1920px-Philadelphia_October_2017_06_%28Free_Library_of_Philadelphia_Parkway_Central_Library%29.jpg',
      alt: 'The columned front of Parkway Central Library, Free Library of Philadelphia, with young trees and benches',
      credit: 'Parkway Central Library. Photo: Michael Barera, CC BY-SA 4.0, via Wikimedia Commons', place: 'Parkway Central Library' },
  },

  // Real home page copy from the live app (4 Oct 2026) and Rachel's other copy
  home: {
    headline: 'Therapy that meets you where you are.',
    line: "Tell us where to look, and we'll show you therapists nearby.",
    aboutLine: 'Not an office. Not a screen. Another option.',
    noOffice: 'No waiting room. No fluorescent lights. Just therapy, in a place where you actually feel comfortable.',   // emu.care
    walk: "Sometimes it's easier to open up while you're moving.",                                                       // emu.care
    therapistsTitle: 'Build an office-free private practice.',                                                          // emu.care
    therapistsLine: 'One client a week or a full caseload. You decide.',                                                // emu.care
    founding: 'Founding therapists receive their first 6 months free.',                                                 // emu.care
    disclaimer: 'Emu is a marketplace that connects patients with independent licensed therapists. Emu is not a therapy practice, does not provide clinical care and is not an emergency or crisis service.',
    crisis: 'If you are experiencing an emergency, call 911. If you are experiencing a mental health crisis, call or text 988.',
  },

  search: { location: 'Philadelphia, PA', radius: 10, radii: [5, 10, 25, 50], count: 4, activeFilters: ['Self-pay'] },

  therapists: [
    {
      id: 'jordan', example: false, lat: 39.9496, lng: -75.1718, name: 'Jordan Avery', credential: 'Licensed Clinical Social Worker', state: 'PA', city: 'Philadelphia',
      photo: 'https://i.pravatar.cc/320?img=38', price: 140,
      place: 'Rittenhouse Square', placeType: 'Park', distance: '0.4 miles', next: 'Tuesday, October 6',
      specialties: ['Anxiety', 'Life transitions', 'Caregiver stress', 'Stress/burnout'],
      about: 'Jordan is a licensed clinical social worker with over a decade of experience supporting adults through anxiety, life transitions, and caregiver stress.',
    },
    {
      id: 'maya', example: true, lat: 39.948, lng: -75.181, name: 'Maya Okafor', credential: 'Licensed Professional Counselor', state: 'PA', city: 'Philadelphia',
      photo: 'https://i.pravatar.cc/320?img=47', price: 120,
      place: 'Schuylkill River Trail', placeType: 'Walk and talk', distance: '1.2 miles', next: 'Wednesday, October 7',
      specialties: ['Depression', 'Grief & loss', 'Self-esteem'],
      about: 'I walk with adults working through loss, low mood and big changes. Moving side by side often makes the hard things easier to say.',
    },
    {
      id: 'priya', example: true, lat: 39.9597, lng: -75.1712, name: 'Priya Natarajan', credential: 'Psychologist, PsyD', state: 'PA', city: 'Philadelphia',
      photo: 'https://i.pravatar.cc/320?img=59', price: 160,
      place: 'Parkway Central Library', placeType: 'Library', distance: '1.6 miles', next: 'Friday, October 9',
      specialties: ['ADHD', 'Anxiety', 'Self-esteem'],
      about: 'I work with teens and adults who feel scattered, stuck or never good enough. We meet somewhere quiet and work on practical next steps.',
    },
    {
      id: 'daniel', example: true, lat: 39.9487, lng: -75.2096, name: 'Daniel Reyes', credential: 'Licensed Marriage and Family Therapist', state: 'PA', city: 'Philadelphia',
      photo: 'https://i.pravatar.cc/320?img=12', price: 150,
      place: 'Clark Park', placeType: 'Park', distance: '2.8 miles', next: 'Thursday, October 8',
      specialties: ['Relationship issues', 'Parenting', 'Family issues'],
      about: 'I help couples and parents talk through the patterns that keep repeating at home, outdoors and away from the usual arguments.',
    },
  ],

  // Jordan's full profile. Rachel's copy: quote exactly, do not rewrite.
  profile: {
    about: 'Jordan is a licensed clinical social worker with over a decade of experience supporting adults through anxiety, life transitions, and caregiver stress. Jordan takes a warm, collaborative approach and tailors each session to the person in the room.',
    expect: "Your first session is a relaxed conversation about what brings you here and what you hope to change. Together you'll set a pace and focus that feels right — no pressure and no homework you didn't agree to.",
    location: { name: 'Rittenhouse Square', type: 'Outdoor', address: '1800 Walnut St, Philadelphia, PA 19103', lat: 39.9496, lng: -75.1718,
      instructions: 'Meet near the central fountain. Jordan will be wearing a green scarf.' },
    // Several meeting locations per therapist (live app, 5 Oct). Rittenhouse Square and its times are real;
    // the other two locations and their times are EXAMPLES. Picking a location filters the times (as in the live app).
    locations: [
      { id: 'rittenhouse', example: false, name: 'Rittenhouse Square', type: 'Park', tags: ['Outdoor'], address: '1800 Walnut St, Philadelphia, PA 19103', lat: 39.9496, lng: -75.1718,
        instructions: 'Meet near the central fountain. Jordan will be wearing a green scarf.',
        availability: [
          { day: 'Tuesday, October 6', morning: ['9:00', '9:50', '10:40', '11:30'], afternoon: [] },
          { day: 'Thursday, October 8', morning: ['10:00', '10:50', '11:40'], afternoon: ['12:30', '1:20', '2:10'] },
          { day: 'Tuesday, October 13', morning: ['9:00', '9:50', '10:40', '11:30'], afternoon: [] },
        ] },
      { id: 'trail', example: true, name: 'Schuylkill River Trail at Locust Street', short: 'Schuylkill River Trail', type: 'Walk and talk', tags: ['Outdoor'], address: 'Locust St entrance, Schuylkill Banks, Philadelphia, PA 19103', lat: 39.9480, lng: -75.1810,
        instructions: 'Meet at the top of the Locust Street ramp. We walk south along the river.',
        availability: [
          { day: 'Wednesday, October 7', morning: ['9:00', '9:50'], afternoon: [] },
          { day: 'Friday, October 9', morning: [], afternoon: ['1:00', '1:50'] },
        ] },
      { id: 'library', example: true, name: 'Parkway Central Library', type: 'Library', tags: ['Indoor'], address: '1901 Vine St, Philadelphia, PA 19103', lat: 39.9597, lng: -75.1712,
        instructions: 'Meet at the second-floor reading room entrance.',
        availability: [
          { day: 'Monday, October 12', morning: ['10:00', '10:50', '11:40'], afternoon: [] },
        ] },
    ],
    methods: [
      ['Cognitive Behavioral (CBT)', 'Practical strategies for noticing and shifting thought patterns that feed anxiety.'],
      ['Mindfulness-based', 'Grounding and present-moment practices woven into talk therapy.'],
      ['Solution-focused', 'Short, goal-oriented conversations centered on what is already working.'],
    ],
    // Real slots. Rachel wants a 72-hour minimum notice, so treat these as already past that buffer.
    availability: [
      { day: 'Tuesday, October 6', morning: ['9:00', '9:50', '10:40', '11:30'], afternoon: [] },
      { day: 'Thursday, October 8', morning: ['10:00', '10:50', '11:40'], afternoon: ['12:30', '1:20', '2:10'] },
      { day: 'Tuesday, October 13', morning: ['9:00', '9:50', '10:40', '11:30'], afternoon: [] },
    ],
    // Facts from Rachel (3 Oct): payment happens outside the app, directly with the therapist.
    // Therapist response time can't be promised. Sessions are usually 45 to 50 minutes.
  },

  // Additions for the profile gaps (4 Oct). Every field says whether it is confirmed by Rachel or an EXAMPLE value.
  // Examples must be visibly marked on the page (marker plus a short legend), so nobody mistakes them for Jordan's real data.
  labels: { focus: 'Areas of focus', approaches: 'Treatment approaches', who: 'Who I work with' }, // Rachel's handoff, 6 Oct
  center: { lat: 39.9526, lng: -75.1652 }, // search centre (Philadelphia)
  extras: {
    notice:        { text: '45-minute sessions · Book 72 hours to 4 weeks ahead.', example: false },          // Rachel's handoff, 6 Oct: duration lives here, not across the profile
    timezone:      'Eastern Time',                                                                               // shown with every date and time in the request
    payment:       { text: "You'll pay Jordan directly, outside Emu. Emu doesn't take payment.", example: false }, // Rachel: payment happens off the app
    whatNext: { example: false, steps: [                                                                          // no response time promised (Rachel)
      'Send a request for the time you picked.',
      'Jordan replies to confirm the time or suggest another.',
      'Meet at the location you chose. At Rittenhouse Square, look for the green scarf.',
    ] },
    sessionLength: { text: '45 minutes', example: false },                                                      // confirmed: all new sessions are 45 minutes
    paymentOptions:{ items: ['Self-pay', 'HSA'], example: true },
    slidingScale:  { text: 'Need a sliding-scale rate? Agree on the fee with your therapist before meeting.', example: true }, // Rachel's wording; whether Jordan offers one is an example
    freeCall:      { text: 'Free 15-minute phone call before your first session', example: true },
    languages:     { items: ['English', 'Spanish'], example: true },
    ageGroups:     { items: ['Adults', 'Couples'], example: true },
    place: { example: true,
      access:  'Paved paths and benches around the fountain. Step-free from Walnut Street.',
      weather: "If it rains, Jordan will message you to move to a covered spot nearby or pick another time.",
    },
    contact: { proposed: true, label: 'Ask Jordan a question',                                                 // Rachel is still deciding
      note: 'Proposed feature. Rachel is deciding whether clients can message a therapist before the first session.' },
    exampleLegend: 'Example value for this mockup. Jordan has not entered this yet.',
  },

  // Request form, from the live app's GuestRequestModal (5 Oct). Rachel's wording, quote exactly.
  request: {
    title: 'Request appointment',
    notice: 'Your therapist will respond by email. Your appointment is confirmed only when they accept.',
    ack: "I understand that I'll pay the therapist directly, outside Emu.",
    consent: 'I agree to email contact about this request and understand that requesting does not establish a therapist-client relationship.',
    send: 'Send request',
    sentTitle: 'Request sent',
    sent: "Your therapist will contact you by email about your request. Your appointment is not confirmed until the therapist accepts it. We've emailed you a copy of your request.",
  },

  // Small hints for directory results (all EXAMPLE values, mark them)
  hints: {
    jordan: ['Free 15-min call', 'Sliding scale'],
    maya:   ['Sliding scale', 'Speaks Spanish'],
    priya:  ['Free 15-min call'],
    daniel: ['Evenings available'],
  },

  // Filter groups and options from Rachel's handoff (6 Oct 2026). No insurance, no Walk & Talk or Older Adult filter.
  filters: [
    ['Areas of focus', ['Any','Anxiety','Depression','Stress & burnout','Life transitions','Relationship issues','Grief & loss','Trauma & PTSD','Self-esteem','Family issues','Parenting','ADHD','LGBTQ+ concerns','Pregnancy & postpartum','Chronic illness & health concerns','Substance use & addiction']],
    ['Who I work with', ['Anyone','Children','Teens','Adults','Couples']],
    ['When?', ['Any day','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']],
    ['Max price', ['Any price','$100','$150','$200','$250']],
    ['Payment options', ['Any payment','Self-pay','HSA']],
    ['Treatment approaches', ['Any approach','Cognitive behavioral therapy (CBT)','Acceptance and commitment therapy (ACT)','Dialectical behavior therapy (DBT)','Psychodynamic therapy','Person-centered therapy','Solution-focused therapy','Motivational interviewing','Mindfulness-based therapy','EMDR','Somatic therapy','Internal family systems (IFS)','Integrative/eclectic therapy']],
  ],

  // Real copy from /about
  howItWorks: [
    ['Search', 'Find independent therapists by location, availability, price, and other practical preferences.'],
    ['Choose', "View therapist profiles, meeting locations, session details, and pricing before deciding whom you'd like to contact or book."],
    ['Meet', "Arrange your session with the therapist and meet in the location and format you've selected together."],
  ],
};
