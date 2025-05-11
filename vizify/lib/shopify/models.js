/**
 * Models for Shopify products specific to Midnight Magnolia
 * 
 * These models serve as templates for creating products in the Shopify admin
 * They define the structure and data for the various service offerings
 */

// Wedding Planning Services
export const WEDDING_SERVICES = [
  {
    title: "Full Wedding Planning Package",
    handle: "full-wedding-planning",
    description: `Our comprehensive wedding planning service includes everything you need for a perfect day. From initial consultation to final execution, we'll be by your side every step of the way.

• Initial consultation and venue selection
• Budget planning and management
• Vendor selection, booking, and coordination
• Timeline and floor plan development
• Wedding day coordination (up to 12 hours)
• Rehearsal dinner coordination
• Personal wedding attendant for the couple
• Detailed planning meetings throughout the process
• Unlimited email and phone support

The Midnight Magnolia difference is our commitment to creating a stress-free, memorable experience while bringing your vision to life.`,
    productType: "Wedding Planning",
    tags: ["Wedding", "Full Service", "Premium", "Featured"],
    price: 5500.00,
    variants: [
      {
        title: "Standard Package",
        price: 5500.00
      },
      {
        title: "Premium Package",
        price: 7500.00
      }
    ],
    images: [
      {
        src: "/images/midnight-magnolia/wedding-full.jpg",
        altText: "Full Wedding Planning Service"
      }
    ]
  },
  {
    title: "Partial Wedding Planning",
    handle: "partial-wedding-planning",
    description: `Perfect for couples who have started planning but need professional guidance to complete the process. Our partial planning service includes:

• Three planning meetings to review progress and provide direction
• Vendor recommendations and coordination
• Timeline development
• Month-of coordination
• Wedding rehearsal coordination
• Wedding day coordination (up to 10 hours)
• Email and phone support

Let us help you bring your vision together, making sure every detail is perfect for your special day.`,
    productType: "Wedding Planning",
    tags: ["Wedding", "Partial Service", "Mid-tier"],
    price: 3200.00,
    variants: [
      {
        title: "Standard Package",
        price: 3200.00
      },
      {
        title: "Enhanced Package",
        price: 4000.00
      }
    ],
    images: [
      {
        src: "/images/midnight-magnolia/wedding-partial.jpg",
        altText: "Partial Wedding Planning Service"
      }
    ]
  },
  {
    title: "Day-of Wedding Coordination",
    handle: "day-of-wedding-coordination",
    description: `Our day-of coordination ensures your wedding day runs smoothly, allowing you to fully enjoy your celebration. This service includes:

• Two pre-wedding consultations
• Wedding day timeline creation
• Vendor confirmation and coordination
• Ceremony rehearsal coordination
• Full wedding day coordination (up to 8 hours)
• Setup and breakdown supervision
• Handling any unexpected situations

Relax and enjoy your wedding day knowing that all the details are in capable hands.`,
    productType: "Wedding Planning",
    tags: ["Wedding", "Day-of", "Coordination", "Essential"],
    price: 1800.00,
    variants: [
      {
        title: "Standard Package (8 hours)",
        price: 1800.00
      },
      {
        title: "Extended Package (10 hours)",
        price: 2200.00
      }
    ],
    images: [
      {
        src: "/images/midnight-magnolia/wedding-day-of.jpg",
        altText: "Day-of Wedding Coordination Service"
      }
    ]
  }
];

// Corporate Event Services
export const CORPORATE_SERVICES = [
  {
    title: "Corporate Conference Planning",
    handle: "corporate-conference-planning",
    description: `Make your next conference a standout success with our comprehensive planning service. We handle all aspects of your corporate conference:

• Venue selection and negotiation
• Speaker coordination
• Audiovisual setup and management
• Catering arrangements
• Registration management
• Marketing material coordination
• Day-of event management
• Post-event analysis

Our team ensures a professional, seamless event that meets your business objectives while impressing attendees.`,
    productType: "Corporate Events",
    tags: ["Corporate", "Conference", "Full Service", "Premium"],
    price: 4800.00,
    variants: [
      {
        title: "Small Conference (up to 100 attendees)",
        price: 4800.00
      },
      {
        title: "Medium Conference (101-250 attendees)",
        price: 6500.00
      },
      {
        title: "Large Conference (251-500 attendees)",
        price: 8500.00
      }
    ],
    images: [
      {
        src: "/images/midnight-magnolia/corporate-conference.jpg",
        altText: "Corporate Conference Planning Service"
      }
    ]
  },
  {
    title: "Corporate Team Building Event",
    handle: "team-building-event",
    description: `Strengthen your team with a customized team-building event designed to engage and inspire. Our team-building planning service includes:

• Consultation to determine objectives
• Customized activity planning
• Venue selection and coordination
• Catering arrangements
• Equipment and materials procurement
• Professional facilitation
• Day-of coordination
• Follow-up assessment

Build a stronger, more cohesive team with our expertly designed team-building events.`,
    productType: "Corporate Events",
    tags: ["Corporate", "Team Building", "Activities", "Mid-tier"],
    price: 2500.00,
    variants: [
      {
        title: "Half-Day Event",
        price: 2500.00
      },
      {
        title: "Full-Day Event",
        price: 3800.00
      },
      {
        title: "Two-Day Retreat",
        price: 6500.00
      }
    ],
    images: [
      {
        src: "/images/midnight-magnolia/team-building.jpg",
        altText: "Corporate Team Building Event Service"
      }
    ]
  },
  {
    title: "Product Launch Event",
    handle: "product-launch-event",
    description: `Make a splash with your new product launch. Our comprehensive planning service ensures your product gets the attention it deserves:

• Event concept and theme development
• Venue selection and setup
• Invitation design and distribution
• Media coordination
• Product display design
• Speaker/presenter coordination
• Catering and beverage service
• Technical and audiovisual support
• Event photography and videography arrangements
• Day-of event management

Create buzz and excitement around your new product with our expertly planned launch events.`,
    productType: "Corporate Events",
    tags: ["Corporate", "Product Launch", "Marketing", "Premium"],
    price: 3800.00,
    variants: [
      {
        title: "Standard Launch Event",
        price: 3800.00
      },
      {
        title: "Premium Launch Experience",
        price: 5500.00
      }
    ],
    images: [
      {
        src: "/images/midnight-magnolia/product-launch.jpg",
        altText: "Product Launch Event Service"
      }
    ]
  }
];

// Special Occasion Services
export const SPECIAL_OCCASION_SERVICES = [
  {
    title: "Birthday Celebration Planning",
    handle: "birthday-celebration",
    description: `Celebrate another trip around the sun with a perfectly planned birthday event. Our birthday planning service includes:

• Theme development and design
• Venue selection and coordination
• Invitation design recommendations
• Décor planning and setup
• Catering and cake arrangements
• Entertainment booking
• Photography recommendations
• Day-of coordination

Make this birthday one to remember with our personalized planning service.`,
    productType: "Special Occasions",
    tags: ["Birthday", "Celebration", "Personal", "Mid-tier"],
    price: 1200.00,
    variants: [
      {
        title: "Basic Package",
        price: 1200.00
      },
      {
        title: "Deluxe Package",
        price: 1800.00
      },
      {
        title: "Milestone Celebration Package",
        price: 2500.00
      }
    ],
    images: [
      {
        src: "/images/midnight-magnolia/birthday.jpg",
        altText: "Birthday Celebration Planning Service"
      }
    ]
  },
  {
    title: "Anniversary Celebration",
    handle: "anniversary-celebration",
    description: `Honor your special milestone with an anniversary celebration that reflects your journey together. Our anniversary planning service includes:

• Consultation to understand your story and preferences
• Venue selection and coordination
• Theme and décor planning
• Catering and beverage arrangements
• Entertainment booking
• Photography recommendations
• Custom touches to honor your years together
• Day-of coordination

Celebrate your love story with a thoughtfully planned anniversary event.`,
    productType: "Special Occasions",
    tags: ["Anniversary", "Celebration", "Personal", "Romantic", "Mid-tier"],
    price: 1500.00,
    variants: [
      {
        title: "Intimate Celebration (up to 20 guests)",
        price: 1500.00
      },
      {
        title: "Standard Celebration (21-50 guests)",
        price: 2200.00
      },
      {
        title: "Grand Celebration (51-100 guests)",
        price: 3000.00
      }
    ],
    images: [
      {
        src: "/images/midnight-magnolia/anniversary.jpg",
        altText: "Anniversary Celebration Planning Service"
      }
    ]
  },
  {
    title: "Baby Shower Planning",
    handle: "baby-shower",
    description: `Welcome the newest addition to your family with a beautiful baby shower. Our baby shower planning service includes:

• Theme development
• Venue selection and coordination
• Custom invitations recommendation
• Décor planning and setup
• Catering arrangements
• Game and activity planning
• Favor selection and assembly
• Day-of coordination

Create wonderful memories as you prepare to welcome your little one.`,
    productType: "Special Occasions",
    tags: ["Baby Shower", "Family", "Celebration", "Essential"],
    price: 950.00,
    variants: [
      {
        title: "Essential Package",
        price: 950.00
      },
      {
        title: "Deluxe Package",
        price: 1400.00
      }
    ],
    images: [
      {
        src: "/images/midnight-magnolia/baby-shower.jpg",
        altText: "Baby Shower Planning Service"
      }
    ]
  }
];

// Consultation Services
export const CONSULTATION_SERVICES = [
  {
    title: "Initial Planning Consultation",
    handle: "planning-consultation",
    description: `Not sure where to start with your event planning? Our initial consultation provides expert guidance to set you on the right path:

• 90-minute consultation with an experienced event planner
• Discussion of your vision, needs, and budget
• Preliminary timeline development
• Vendor recommendations
• Basic planning checklist
• Follow-up email with summary and next steps

Get professional insight and direction for your event planning journey.`,
    productType: "Consultation",
    tags: ["Consultation", "Planning", "Guidance", "Essential"],
    price: 250.00,
    variants: [
      {
        title: "Virtual Consultation",
        price: 250.00
      },
      {
        title: "In-Person Consultation",
        price: 350.00
      }
    ],
    images: [
      {
        src: "/images/midnight-magnolia/consultation.jpg",
        altText: "Initial Planning Consultation Service"
      }
    ]
  },
  {
    title: "Venue Selection Service",
    handle: "venue-selection",
    description: `Finding the perfect venue is one of the most important decisions in event planning. Our venue selection service takes the stress out of the process:

• Consultation to understand your needs and preferences
• Researching available venues within your budget and requirements
• Scheduling up to three venue tours
• Accompanying you on venue visits
• Assistance with comparing options
• Guidance on questions to ask and considerations
• Contract review assistance

Find your perfect event location with our expert venue selection service.`,
    productType: "Consultation",
    tags: ["Venue", "Selection", "Guidance", "Mid-tier"],
    price: 600.00,
    variants: [
      {
        title: "Standard Package",
        price: 600.00
      },
      {
        title: "Premium Package (up to 5 venues)",
        price: 900.00
      }
    ],
    images: [
      {
        src: "/images/midnight-magnolia/venue-selection.jpg",
        altText: "Venue Selection Service"
      }
    ]
  }
];

// All services combined
export const ALL_SERVICES = [
  ...WEDDING_SERVICES,
  ...CORPORATE_SERVICES,
  ...SPECIAL_OCCASION_SERVICES,
  ...CONSULTATION_SERVICES
];