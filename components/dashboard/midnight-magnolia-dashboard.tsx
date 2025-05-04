"use client"

import { useState } from "react"

// Tech Architecture Data
const techArchitecture = {
  frontend: [
    { name: "Vercel", use: "Public site and landing pages" },
    { name: "GitHub Pages", use: "Static content and documentation" },
    { name: "Wix/Shopify", use: "E-commerce capabilities" },
  ],
  backend: [
    { name: "Supabase", use: "Auth and backend data" },
    { name: "make.com & Windsurf", use: "Visual automation workflows" },
    { name: "Netlify Functions", use: "Custom logic and scalable tasks" }, // Replaced Azure with Netlify
  ],
  aiCreative: [
    { name: "OpenAI, Anthropic", use: "Language tasks" },
    { name: "Leonardo, Midjourney, Ideogram", use: "Visual generation" },
    { name: "Adobe Creative Cloud, Canva", use: "Design tools" },
  ],
  storage: [
    { name: "Airtable, Supabase, Snowflake", use: "Structured storage" },
    { name: "Dropbox, iCloud Notes", use: "File storage and archive" },
  ],
  management: [
    { name: "Notion", use: "Project HQ" },
    { name: "Trello", use: "Task boards" },
    { name: "GitHub + VSCode", use: "Code management and deployment" },
  ],
}

// Notion Template Sections
const notionTemplate = {
  title: "🌙 Midnight Magnolia Command Center",
  sections: [
    {
      name: "🪷 Root & Rituals",
      items: [
        "Finalize brand mission & healing-centered values",
        "Confirm fonts & color palette",
        "Add brand assets to shared folders",
      ],
    },
    {
      name: "🎯 Today's Intentions",
      description: "Use filtered view to show today's tasks from task database",
      affirmation: "My systems can be soft. My flow is sacred.",
    },
    {
      name: "🧘🏾‍♀️ Soft Structure (Task Links)",
      items: [
        "GitHub cleanup task list",
        "Make.com automation setup",
        "Canva image prompts ready",
        "Tarot deck planning check-in",
      ],
    },
    {
      name: "🔗 Open Work Portals",
      links: ["🔮 Tarot Tracker", "📓 Journal Layouts", "🛒 Product List", "⚙️ Automations", "🗂️ Portfolio & Dev"],
    },
    {
      name: "🎨 Moodboard & Muse",
      description: "Add your Leonardo/Canva image uploads here",
    },
    {
      name: "🔥 Affirmation Altar",
      quote: "I build soft systems that honor my mind and my magic.",
    },
  ],
}

// Business Services
const businessServices = [
  {
    name: "Professional Documentation",
    offerings: ["Business plan development", "Grant writing services", "Organizational policies", "Procedural manuals"],
    description: "Comprehensive business document creation with southern elegance and professional polish",
  },
  {
    name: "Event Planning Documents",
    offerings: ["Custom event proposals", "Venue contracts", "Vendor agreements", "Event timelines"],
    description: "Elegant, thorough documentation for successful southern events and gatherings",
  },
  {
    name: "Digital Identity Packages",
    offerings: ["QR code designs", "Digital business cards", "Social media templates", "Email signature designs"],
    description: "Modern digital tools with Midnight Magnolia's sophisticated southern aesthetic",
  },
]

// Tech Access Initiatives
const techAccessInitiatives = [
  {
    name: "AI for Black Women Entrepreneurs",
    focus: "Making AI tools accessible for business growth",
    programs: [
      "Monthly AI workshops",
      "Personalized tool setup assistance",
      "Prompt engineering masterclass",
      "Online community support",
    ],
    impact: "Helping Black women leverage AI for business tasks, marketing, and client service",
  },
  {
    name: "Southern Tech Accelerator",
    focus: "Building tech skills for rural Black women",
    programs: [
      "Remote work readiness training",
      "Basic coding fundamentals",
      "Digital marketing certification",
      "Tech mentorship matching",
    ],
    impact: "Creating pathways to tech careers and remote work opportunities in underserved communities",
  },
  {
    name: "Digital Template Library",
    focus: "Providing accessible design resources",
    programs: [
      "Free business document templates",
      "Customizable presentation decks",
      "Social media graphic templates",
      "Email marketing frameworks",
    ],
    impact: "Reducing barriers to professional digital presence for minority-owned businesses",
  },
]

// Affiliate Programs
const affiliatePrograms = [
  {
    platform: "Amazon Associates",
    categories: [
      {
        name: "Wellness Books",
        commission: "4.5%",
        bestSellers: ["The Body Keeps the Score", "Burnout", "Adult Children of Emotionally Immature Parents"],
      },
      {
        name: "Luxury Home Goods",
        commission: "3%",
        bestSellers: ["Egyptian Cotton Sheet Sets", "Scented Candles", "Decorative Storage"],
      },
      {
        name: "Productivity Tools",
        commission: "2.5%",
        bestSellers: ["Planners", "Noise-Cancelling Headphones", "Desk Organization"],
      },
    ],
    implementation: "Custom storefronts embedded in blog content and specialized product recommendation widgets",
  },
  {
    platform: "Bookshop.org",
    categories: [
      {
        name: "Black Southern Authors",
        commission: "10%",
        bestSellers: ["Salvage the Bones", "Heavy", "The Water Dancer"],
      },
      {
        name: "Healing & Wellness",
        commission: "10%",
        bestSellers: ["My Grandmother's Hands", "The Body Is Not an Apology", "Pleasure Activism"],
      },
      {
        name: "ADHD Resources",
        commission: "10%",
        bestSellers: ["A Radical Guide for Women with ADHD", "Order from Chaos", "Driven to Distraction"],
      },
    ],
    implementation: "Curated booklists with context-specific recommendations tied to blog content and memoir themes",
  },
  {
    platform: "Etsy Affiliate",
    categories: [
      {
        name: "Black Artisan Crafts",
        commission: "4%",
        bestSellers: ["Handmade Jewelry", "Traditional Textiles", "Custom Portraits"],
      },
      {
        name: "Sustainable Home Goods",
        commission: "4%",
        bestSellers: ["Beeswax Candles", "Vintage Decor", "Natural Fiber Baskets"],
      },
      {
        name: "Wellness Supplies",
        commission: "4%",
        bestSellers: ["Herbal Tea Blends", "Essential Oil Products", "Handmade Soap"],
      },
    ],
    implementation:
      "Featured creator spotlights and seasonal gift guides with emphasis on Black-owned small businesses",
  },
]

// Nonprofit Initiatives
const nonprofitInitiatives = [
  {
    name: "Survivor Support Network",
    focus: "Sexual abuse survivors",
    programs: [
      "Support group facilitation",
      "Resource connecting",
      "Trauma-informed workplace training",
      "Survivor storytelling platforms",
    ],
    dataInitiatives: "Mapping service deserts for survivors in rural Southern communities",
  },
  {
    name: "Clean Slate Project",
    focus: "Record cleaning and expungement",
    programs: [
      "Legal clinic partnerships",
      "Documentation assistance",
      "Employment pathway programs",
      "Know-your-rights workshops",
    ],
    dataInitiatives: "Mapping expungement-eligible individuals against available services by county",
  },
  {
    name: "Southern Working Mothers Coalition",
    focus: "Resource access for working mothers",
    programs: [
      "Childcare co-op development",
      "Flexible work advocacy",
      "Emergency assistance coordination",
      "Policy development guidance",
    ],
    dataInitiatives:
      "Analyzing childcare deserts, employment policies, and maternal healthcare access across Southern states",
  },
]

// Digital Wellness Offerings
const digitalWellnessOfferings = [
  {
    name: "Moonlight Reflections",
    type: "Astrology Integration",
    description: "Digital companion to Midnight Magnolia journals providing personalized moon phase insights",
    features: [
      "Daily moon phase notifications with journal prompts",
      "Monthly lunar forecast with reflection suggestions",
      "Integration with physical journals via QR codes",
      "Community sharing options for moon rituals",
    ],
    automations: "Airtable-powered content scheduling; Zapier integration for personalized delivery",
  },
  {
    name: "StarPath Guide",
    type: "Astrological Wellness Tool",
    description: "Personal natal chart insights with southern cultural context and wellness recommendations",
    features: [
      "Custom birth chart analysis",
      "Southern folklore integration",
      "Seasonal wellness suggestions based on chart elements",
      "Compatible with physical wellness products",
    ],
    automations: "Integrates with Shopify to recommend physical products; scheduled content delivery via Make.com",
  },
  {
    name: "Heritage Healing",
    type: "Cultural Wellness Platform",
    description:
      "Digital platform connecting ancestral wisdom with modern wellness practices for Black southern communities",
    features: [
      "Seasonal recipes and herbal traditions",
      "Elder wisdom video archive",
      "Family history journaling prompts",
      "Community healing practice directory",
    ],
    automations: "Airtable content management; n8n workflows for community resource updates",
  },
]

// Blog & Memoir Content
const blogAndMemoir = {
  title: "Southern Roots, Modern Blooms",
  author: "Latisha V. Waters",
  categories: [
    "Disability Advocacy",
    "Black Southern Experience",
    "ADHD Journey",
    "Community Activism",
    "Gastric Health",
  ],
  series: [
    {
      name: "Diagnosis After 40",
      posts: [
        "Finding My ADHD Voice: Late Diagnosis and Self-Discovery",
        "Executive Dysfunction and Building a Business: Systems That Saved Me",
        "Medication Journey: What I Wish I'd Known Sooner",
        "ADHD and Black Women: The Invisible Struggle",
      ],
    },
    {
      name: "Southern Activist Chronicles",
      posts: [
        "Community Organizing in Small Southern Towns",
        "Finding Allies in Unexpected Places",
        "When Activism Meets Entrepreneurship",
        "Building Inclusive Spaces in Traditional Communities",
      ],
    },
    {
      name: "Living with Invisible Disabilities",
      posts: [
        "Navigating Social Events with Gastric Limitations",
        "PTSD and Entrepreneurship: Creating Safe Work Environments",
        "Accessibility in the Digital Marketplace",
        "Teaching Others About Invisible Disabilities",
      ],
    },
  ],
  memoirDetails: {
    workingTitle: "Magnolias Also Bloom at Night",
    themes: [
      "Black southern identity and tradition",
      "Late-diagnosis disability journey",
      "Community activism in conservative spaces",
      "Entrepreneurship as a form of resistance",
      "Finding beauty and strength in unseen struggles",
    ],
    structure:
      "Thematic chapters rather than strictly chronological, weaving personal narrative with historical context and community stories",
    timeline:
      "Focusing primarily on the transformative decade from 2015-2025, with relevant childhood and early adult experiences as contextual background",
  },
}

// Brand Colors Data
const brandColors = {
  primary: { name: "Midnight Blue", hex: "#191970", rgb: "25, 25, 112", cmyk: "78, 78, 0, 56" },
  secondary: { name: "Magnolia Cream", hex: "#F8F6F0", rgb: "248, 246, 240", cmyk: "0, 1, 3, 3" },
  accent1: { name: "Silver Sage", hex: "#C0C0B0", rgb: "192, 192, 176", cmyk: "0, 0, 8, 25" },
  accent2: { name: "Blush", hex: "#E8C4C0", rgb: "232, 196, 192", cmyk: "0, 16, 17, 9" },
  accent3: { name: "Gold", hex: "#D4AF37", rgb: "212, 175, 55", cmyk: "0, 17, 74, 17" },
}

// Typography Data
const typography = {
  primary: { name: "Playfair Display", weights: ["Regular (400)", "Semi-Bold (600)", "Bold (700)"] },
  secondary: { name: "Montserrat", weights: ["Light (300)", "Regular (400)", "Medium (500)"] },
}

// Target Audience Data
const targetAudience = {
  primary: {
    demographic: "Women 35-60",
    interests: ["Southern culture", "Home decoration", "Luxury items", "Traditional values"],
    traits: ["Sophisticated", "Quality-focused", "Design-conscious", "Values heritage"],
  },
  secondary: {
    demographic: "Men 35-65",
    interests: ["Gift purchasing", "Home office decor", "Heritage items"],
    traits: ["Professional", "Discerning", "Values craftsmanship"],
  },
  psychographics: [
    "Appreciates sophistication",
    "Values authenticity",
    "Seeks products with stories",
    "Willing to invest in quality",
  ],
}

// Brand Voice Data
const brandVoice = {
  tone: {
    primary: ["Sophisticated", "Warm", "Gracious", "Authentic"],
    avoid: ["Casual", "Slang", "Overly trendy", "Pushy"],
  },
  vocabulary: {
    use: ["Elegant", "Refined", "Heritage", "Crafted", "Curated", "Luxurious"],
    avoid: ["Cheap", "Basic", "Deal", "Discount", "Steal"],
  },
  messaging: [
    "Quality and craftsmanship are paramount",
    "Products that tell a story and honor tradition",
    "Modern interpretation of southern elegance",
    "Thoughtfully designed for the discerning home",
  ],
}

// Product Categories Data
const productCategories = [
  {
    name: "Home Textiles",
    items: ["Table linens", "Decorative pillows", "Bed linens", "Hand towels"],
    description: "Elegant fabric goods featuring magnolia motifs and our signature color palette",
  },
  {
    name: "Home Accents",
    items: ["Vases", "Candle holders", "Decorative trays", "Picture frames"],
    description: "Sophisticated accessories that elevate any space with southern charm",
  },
  {
    name: "Midnight Menagerie",
    items: ["Luxury pet beds", "Designer collars", "Personalized bowls", "Travel accessories"],
    description: "Premium pet accessories designed specifically for Black pet parents who value style and heritage",
  },
  {
    name: "Historical & Fan Art Prints",
    items: ["Black history portraits", "Cultural celebration art", "Literary inspirations", "Contemporary fan art"],
    description: "Museum-quality prints celebrating history, heritage, and popular culture with a southern perspective",
  },
  {
    name: "Open Source Publishing",
    items: ["eBooks", "Sheet music", "Educational resources", "Community cookbooks"],
    description: "Accessible digital content supporting education, creativity, and community knowledge-sharing",
  },
  {
    name: "Southern Oracle Tarot",
    items: ["Magnolia Wisdom deck", "Southern Gothic deck", "Ancestral Guidance cards", "Beginner's reading kit"],
    description:
      "Tarot and oracle decks featuring southern imagery, Black cultural elements, and traditional symbolism",
  },
  {
    name: "Journals & Stationery",
    items: ["ADHD-friendly planners", "Moon phase journals", "Luxury correspondence sets", "Affirmation cards"],
    description: "Premium paper goods designed for executive function support, mindfulness, and southern elegance",
  },
]

// Workflows Data
const workflows = [
  {
    name: "Content Creation",
    platforms: ["Canva", "Ideogram AI"],
    steps: [
      "Create content request in Airtable",
      "Generate images with AI prompt",
      "Design in Canva using brand kit",
      "Submit for approval",
      "Schedule for publication",
    ],
    automation:
      "n8n: Airtable record creation triggers notification to designer, approved designs auto-publish to social platforms",
  },
  {
    name: "Product Upload",
    platforms: ["Shopify", "Wix"],
    steps: [
      "Add product details to Airtable",
      "Generate product images",
      "Upload to primary platform",
      "Sync inventory across platforms",
      "Verify display on both stores",
    ],
    automation: "n8n: New Airtable product record triggers Shopify creation with Make.com sync to Wix",
  },
]

// Icons Data
const icons = {
  brand: [
    { name: "Magnolia Flower", usage: "Primary brand symbol" },
    { name: "Southern Column", usage: "Architecture element for premium lines" },
    { name: "Wrought Iron Scroll", usage: "Decorative element for patterns and borders" },
    { name: "Monogram Frame", usage: "For personalized and bespoke items" },
  ],
  ui: [
    { name: "Shop", icon: "S", usage: "Product categories and collections" },
    { name: "Heritage", icon: "H", usage: "Brand story and about sections" },
    { name: "Craftsmanship", icon: "C", usage: "Product details and quality highlights" },
    { name: "Gift", icon: "G", usage: "Gift collections and registries" },
  ],
}

const MidnightMagnoliaDashboard = () => {
  const [activeTab, setActiveTab] = useState("colors")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Render Tech Architecture Section
  const renderTechArchitecture = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-2xl font-serif mb-4 text-[#191970]">Technology Architecture</h3>
      <p className="mb-6 text-[#191970]">
        Complete developer and automation strategy for Midnight Magnolia's digital ecosystem.
      </p>

      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden border-[#191970]">
          <div className="bg-[#191970] text-[#F8F6F0] p-4">
            <h4 className="font-serif text-xl">Vision Statement</h4>
          </div>
          <div className="p-4 bg-[#F8F6F0]">
            <p className="italic mb-4 text-[#191970]">
              "Midnight Magnolia is a sacred business incubator and creative sanctuary rooted in Southern Gothic
              aesthetics and healing-centered technology. Its core applications include digital journaling tools,
              AI-assisted content, automation workflows, and incubator offerings for trauma-informed creators. The tech
              stack is focused on low-maintenance workflows, flexibility, and trauma-aware scalability."
            </p>
          </div>
        </div>

        {Object.entries(techArchitecture).map(([key, items]) => (
          <div key={key} className="border rounded-lg overflow-hidden border-[#191970]">
            <div className="bg-[#191970] text-[#F8F6F0] p-4">
              <h4 className="font-serif text-xl">{key.charAt(0).toUpperCase() + key.slice(1)}</h4>
            </div>
            <div className="p-4 bg-[#F8F6F0]">
              <ul className="list-disc list-inside space-y-1">
                {items.map((item, index) => (
                  <li key={index} className="text-[#191970]">
                    <span className="font-medium">{item.name}:</span> {item.use}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // Render Notion Template Section
  const renderNotionTemplate = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-2xl font-serif mb-4 text-[#191970]">Notion Command Center</h3>
      <p className="mb-6 text-[#191970]">Template for Midnight Magnolia's project management and daily workflow.</p>

      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden border-[#191970]">
          <div className="bg-[#191970] text-[#F8F6F0] p-4">
            <h4 className="font-serif text-xl">{notionTemplate.title}</h4>
          </div>
          <div className="p-4 space-y-6 bg-[#F8F6F0]">
            {notionTemplate.sections.map((section, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0 border-[#191970]/20">
                <h5 className="font-serif text-lg mb-2 text-[#191970]">{section.name}</h5>

                {section.items && (
                  <ul className="list-inside space-y-1">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-center text-[#191970]">
                        <input type="checkbox" className="mr-2 h-4 w-4 rounded accent-[#D4AF37]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.links && (
                  <ul className="list-inside space-y-1">
                    {section.links.map((link, i) => (
                      <li key={i} className="text-[#191970] hover:underline cursor-pointer">
                        {link}
                      </li>
                    ))}
                  </ul>
                )}

                {section.description && <p className="text-[#191970]/80 italic">{section.description}</p>}

                {section.affirmation && (
                  <p className="mt-2 text-[#191970] italic font-medium">"{section.affirmation}"</p>
                )}

                {section.quote && (
                  <div className="bg-[#191970]/10 border-l-4 border-[#191970] p-3 mt-2 italic text-[#191970]">
                    "{section.quote}"
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // Render Business Services Section
  const renderBusinessServices = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-2xl font-serif mb-4 text-[#191970]">Business Services</h3>
      <p className="mb-6 text-[#191970]">
        Professional documentation and digital identity solutions by Latisha and Midnight Magnolia.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {businessServices.map((service, index) => (
          <div key={index} className="border rounded-lg overflow-hidden h-full border-[#191970]">
            <div className="bg-[#191970] text-[#F8F6F0] p-4">
              <h4 className="font-serif text-xl">{service.name}</h4>
            </div>
            <div className="p-4 flex flex-col h-full bg-[#F8F6F0]">
              <p className="mb-4 text-[#191970]">{service.description}</p>
              <div className="mt-auto">
                <h5 className="font-medium mb-2 text-[#191970]">Offerings:</h5>
                <ul className="list-disc list-inside space-y-1">
                  {service.offerings.map((item, i) => (
                    <li key={i} className="text-[#191970]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // Render Tech Access Section
  const renderTechAccess = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-2xl font-serif mb-4 text-[#191970]">Technology Access Initiatives</h3>
      <p className="mb-6 text-[#191970]">
        Programs to increase Black women's access to technology for career advancement.
      </p>

      <div className="space-y-8">
        {techAccessInitiatives.map((initiative, index) => (
          <div key={index} className="border rounded-lg overflow-hidden border-[#191970]">
            <div className="bg-[#191970] text-[#F8F6F0] p-4">
              <h4 className="font-serif text-xl">{initiative.name}</h4>
              <p className="text-sm text-[#F8F6F0]/90">Focus: {initiative.focus}</p>
            </div>
            <div className="p-4 bg-[#F8F6F0]">
              <div className="mb-4">
                <h5 className="font-medium mb-2 text-[#191970]">Programs:</h5>
                <ul className="list-disc list-inside space-y-1">
                  {initiative.programs.map((program, i) => (
                    <li key={i} className="text-[#191970]">
                      {program}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#191970]/10 border-l-4 border-[#191970] p-4">
                <h5 className="font-medium mb-1 text-[#191970]">Impact:</h5>
                <p className="text-[#191970]">{initiative.impact}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // Render Affiliate Programs Section
  const renderAffiliates = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-2xl font-serif mb-4 text-[#191970]">Affiliate Programs</h3>
      <p className="mb-6 text-[#191970]">
        Curated product recommendations that complement Midnight Magnolia offerings.
      </p>

      <div className="space-y-8">
        {affiliatePrograms.map((program, index) => (
          <div key={index} className="border rounded-lg overflow-hidden border-[#191970]">
            <div className="bg-[#191970] text-[#F8F6F0] p-4">
              <h4 className="font-serif text-xl">{program.platform}</h4>
            </div>
            <div className="p-4 bg-[#F8F6F0]">
              <div className="mb-4">
                <h5 className="font-medium mb-2 text-[#191970]">Implementation:</h5>
                <p className="text-[#191970]">{program.implementation}</p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-[#191970]/10">
                      <th className="py-2 px-4 border text-left text-[#191970] font-serif">Category</th>
                      <th className="py-2 px-4 border text-left text-[#191970] font-serif">Commission</th>
                      <th className="py-2 px-4 border text-left text-[#191970] font-serif">Best Sellers</th>
                    </tr>
                  </thead>
                  <tbody>
                    {program.categories.map((category, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#F8F6F0]"}>
                        <td className="py-2 px-4 border text-[#191970]">{category.name}</td>
                        <td className="py-2 px-4 border text-[#191970]">{category.commission}</td>
                        <td className="py-2 px-4 border text-[#191970]">
                          <ul className="list-disc list-inside">
                            {category.bestSellers.map((item, j) => (
                              <li key={j}>{item}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // Render Nonprofit Initiatives Section
  const renderNonprofit = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-2xl font-serif mb-4 text-[#191970]">Nonprofit Initiatives</h3>
      <p className="mb-6 text-[#191970]">
        Data-driven social impact programs supporting survivors and vulnerable communities.
      </p>

      <div className="space-y-8">
        {nonprofitInitiatives.map((initiative, index) => (
          <div key={index} className="border rounded-lg overflow-hidden border-[#191970]">
            <div className="bg-[#191970] text-[#F8F6F0] p-4">
              <h4 className="font-serif text-xl">{initiative.name}</h4>
              <p className="text-sm text-[#F8F6F0]/90">Focus: {initiative.focus}</p>
            </div>
            <div className="p-4 bg-[#F8F6F0]">
              <div className="mb-4">
                <h5 className="font-medium mb-2 text-[#191970]">Programs:</h5>
                <ul className="list-disc list-inside space-y-1">
                  {initiative.programs.map((program, i) => (
                    <li key={i} className="text-[#191970]">
                      {program}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#191970]/10 border-l-4 border-[#191970] p-4">
                <h5 className="font-medium mb-1 text-[#191970]">Data Initiative:</h5>
                <p className="text-[#191970]">{initiative.dataInitiatives}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // Render Digital Wellness Section
  const renderDigitalWellness = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-2xl font-serif mb-4 text-[#191970]">Digital Wellness Offerings</h3>
      <p className="mb-6 text-[#191970]">
        Web and mobile experiences complementing physical journals and wellness products.
      </p>

      <div className="space-y-8">
        {digitalWellnessOfferings.map((offering, index) => (
          <div key={index} className="border rounded-lg overflow-hidden border-[#191970]">
            <div className="bg-[#191970] text-[#F8F6F0] p-4">
              <h4 className="font-serif text-xl">{offering.name}</h4>
              <p className="text-sm text-[#F8F6F0]/90">Type: {offering.type}</p>
            </div>
            <div className="p-4 bg-[#F8F6F0]">
              <p className="mb-4 text-[#191970]">{offering.description}</p>
              <div className="mb-4">
                <h5 className="font-medium mb-2 text-[#191970]">Key Features:</h5>
                <ul className="list-disc list-inside space-y-1">
                  {offering.features.map((feature, i) => (
                    <li key={i} className="text-[#191970]">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#D4AF37]/10 border-l-4 border-[#D4AF37] p-4">
                <h5 className="font-medium mb-1 text-[#191970]">Automations:</h5>
                <p className="text-[#191970]">{offering.automations}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // Render Blog and Memoir Section
  const renderBlog = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-2xl font-serif mb-4 text-[#191970]">{blogAndMemoir.title}</h3>
      <p className="mb-6 text-[#191970]">Personal narrative and community storytelling by {blogAndMemoir.author}</p>

      <div className="mb-8 p-4 border rounded-md border-[#191970]">
        <h4 className="text-xl font-serif mb-4 text-[#191970]">
          Memoir Project: {blogAndMemoir.memoirDetails.workingTitle}
        </h4>

        <div className="mb-4">
          <h5 className="font-medium mb-2 text-[#191970]">Key Themes:</h5>
          <ul className="list-disc list-inside space-y-1">
            {blogAndMemoir.memoirDetails.themes.map((theme, index) => (
              <li key={index} className="text-[#191970]">
                {theme}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="font-medium mb-2 text-[#191970]">Structure:</h5>
          <p className="text-[#191970]">{blogAndMemoir.memoirDetails.structure}</p>
          <p className="mt-2 text-[#191970]">{blogAndMemoir.memoirDetails.timeline}</p>
        </div>
      </div>

      <div className="space-y-6">
        {blogAndMemoir.series.map((series, index) => (
          <div key={index} className="border rounded-lg overflow-hidden border-[#191970]">
            <div className="bg-[#191970] text-[#F8F6F0] p-4">
              <h4 className="font-serif text-xl">{series.name}</h4>
            </div>
            <div className="p-4 bg-[#F8F6F0]">
              <ul className="list-disc list-inside space-y-2">
                {series.posts.map((post, i) => (
                  <li key={i} className="text-[#191970]">
                    {post}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // Render Color Palette Section
  const renderColorPalette = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white rounded-lg shadow">
      <div className="col-span-1 md:col-span-2">
        <h3 className="text-2xl font-serif mb-4 text-[#191970]">Brand Color Palette</h3>
        <p className="mb-6 text-[#191970]">Apply these colors consistently across all brand materials.</p>
      </div>

      {Object.entries(brandColors).map(([key, color]) => (
        <div key={key} className="flex items-center space-x-4 p-4 border rounded-md border-[#191970]">
          <div className="w-16 h-16 rounded-md shadow-md" style={{ backgroundColor: color.hex }}></div>
          <div>
            <h4 className="font-serif font-semibold text-lg text-[#191970]">{color.name}</h4>
            <p className="text-sm text-[#191970]">HEX: {color.hex}</p>
            <p className="text-sm text-[#191970]">RGB: {color.rgb}</p>
            <p className="text-sm text-[#191970]">CMYK: {color.cmyk}</p>
          </div>
        </div>
      ))}
    </div>
  )

  // Render Typography Section
  const renderTypography = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-2xl font-serif mb-4 text-[#191970]">Typography System</h3>

      <div className="mb-8">
        <h4 className="text-lg font-serif font-semibold mb-2 text-[#191970]">
          Primary Font: {typography.primary.name}
        </h4>
        <p className="mb-4 text-[#191970]">Used for headings, logo, and important statements</p>

        <div className="space-y-4">
          <div className="p-4 border rounded-md border-[#191970]">
            <h1 className="text-3xl font-serif font-bold text-[#191970]">Heading 1 - Playfair Display Bold (32px)</h1>
          </div>

          <div className="p-4 border rounded-md border-[#191970]">
            <h2 className="text-2xl font-serif font-semibold text-[#191970]">
              Heading 2 - Playfair Display SemiBold (24px)
            </h2>
          </div>

          <div className="p-4 border rounded-md border-[#191970]">
            <h3 className="text-xl font-serif text-[#191970]">Heading 3 - Playfair Display Regular (20px)</h3>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-serif font-semibold mb-2 text-[#191970]">
          Secondary Font: {typography.secondary.name}
        </h4>
        <p className="mb-4 text-[#191970]">Used for body text, navigation, and descriptions</p>

        <div className="space-y-4">
          <div className="p-4 border rounded-md border-[#191970]">
            <p className="text-base text-[#191970]">
              Body Text - Montserrat Regular (16px) This is the primary text style used for paragraphs and general
              content across the brand.
            </p>
          </div>

          <div className="p-4 border rounded-md border-[#191970]">
            <p className="text-sm text-[#191970]">
              Secondary Text - Montserrat Light (14px) Used for supporting text, captions, and smaller elements
              throughout the design.
            </p>
          </div>

          <div className="p-4 border rounded-md border-[#191970]">
            <button className="bg-[#191970] text-[#F8F6F0] px-4 py-2 uppercase tracking-wider font-sans">
              Button Text - Montserrat Medium
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  // Render Icons Section
  const renderIcons = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-2xl font-serif mb-4 text-[#191970]">Brand & UI Icons</h3>
      <p className="mb-6 text-[#191970]">Consistent visual elements to reinforce brand identity across touchpoints.</p>

      <div className="mb-8">
        <h4 className="text-xl font-serif font-semibold mb-3 text-[#191970]">Brand Icons</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {icons.brand.map((icon, index) => (
            <div key={index} className="border p-4 rounded-md border-[#191970]">
              <div className="h-16 w-16 bg-[#191970] flex items-center justify-center rounded-full mb-3 mx-auto">
                <div className="text-[#F8F6F0] text-2xl font-serif">{icon.name.charAt(0)}</div>
              </div>
              <h5 className="font-serif text-center mb-2 text-[#191970]">{icon.name}</h5>
              <p className="text-sm text-center text-[#191970]">{icon.usage}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xl font-serif font-semibold mb-3 text-[#191970]">UI Icons</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {icons.ui.map((icon, index) => (
            <div key={index} className="border p-4 rounded-md border-[#191970]">
              <div className="h-16 w-16 bg-[#F8F6F0] border-2 border-[#191970] flex items-center justify-center rounded-md mb-3 mx-auto">
                <span className="text-[#191970] text-xl">{icon.icon}</span>
              </div>
              <h5 className="font-serif text-center mb-2 text-[#191970]">{icon.name}</h5>
              <p className="text-sm text-center text-[#191970]">{icon.usage}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Render Audience Section
  const renderAudience = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-2xl font-serif mb-4 text-[#191970]">Target Audience</h3>
      <p className="mb-6 text-[#191970]">
        Understanding our ideal customers to inform product development, marketing, and brand voice.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border rounded-lg overflow-hidden border-[#191970]">
          <div className="bg-[#191970] text-[#F8F6F0] p-4">
            <h4 className="font-serif text-xl">Primary Audience</h4>
          </div>
          <div className="p-4 bg-[#F8F6F0]">
            <p className="font-medium mb-2 text-[#191970]">Demographic: {targetAudience.primary.demographic}</p>
            <div className="mb-4">
              <h5 className="font-medium mb-1 text-[#191970]">Interests:</h5>
              <ul className="list-disc list-inside">
                {targetAudience.primary.interests.map((interest, index) => (
                  <li key={index} className="text-[#191970]">
                    {interest}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-1 text-[#191970]">Traits:</h5>
              <ul className="list-disc list-inside">
                {targetAudience.primary.traits.map((trait, index) => (
                  <li key={index} className="text-[#191970]">
                    {trait}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden border-[#191970]">
          <div className="bg-[#191970] text-[#F8F6F0] p-4">
            <h4 className="font-serif text-xl">Secondary Audience</h4>
          </div>
          <div className="p-4 bg-[#F8F6F0]">
            <p className="font-medium mb-2 text-[#191970]">Demographic: {targetAudience.secondary.demographic}</p>
            <div className="mb-4">
              <h5 className="font-medium mb-1 text-[#191970]">Interests:</h5>
              <ul className="list-disc list-inside">
                {targetAudience.secondary.interests.map((interest, index) => (
                  <li key={index} className="text-[#191970]">
                    {interest}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-1 text-[#191970]">Traits:</h5>
              <ul className="list-disc list-inside">
                {targetAudience.secondary.traits.map((trait, index) => (
                  <li key={index} className="text-[#191970]">
                    {trait}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border rounded-md p-4 border-[#191970]">
        <h4 className="font-serif text-lg mb-3 text-[#191970]">Psychographic Profile</h4>
        <div className="flex flex-wrap gap-2">
          {targetAudience.psychographics.map((item, index) => (
            <span key={index} className="bg-[#191970]/10 border border-[#191970] rounded-full px-4 py-1 text-[#191970]">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )

  // Render Products Section
  const renderProducts = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-2xl font-serif mb-4 text-[#191970]">Product Categories</h3>
      <p className="mb-6 text-[#191970]">Core product lines that represent the Midnight Magnolia brand.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {productCategories.map((category, index) => (
          <div key={index} className="border rounded-lg overflow-hidden border-[#191970]">
            <div className="bg-[#191970] text-[#F8F6F0] p-4">
              <h4 className="font-serif text-xl">{category.name}</h4>
            </div>
            <div className="p-4 bg-[#F8F6F0]">
              <p className="mb-3 text-[#191970]">{category.description}</p>
              <div>
                <h5 className="font-medium mb-2 text-[#191970]">Product Items:</h5>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item, i) => (
                    <span
                      key={i}
                      className="bg-[#191970]/10 border border-[#191970] rounded-md px-3 py-1 text-sm text-[#191970]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // Render Brand Voice Section
  const renderTone = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-2xl font-serif mb-4 text-[#191970]">Brand Voice & Tone</h3>
      <p className="mb-6 text-[#191970]">How we communicate with our audience across all touchpoints.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border rounded-md p-4 border-[#191970]">
          <h4 className="font-serif text-lg mb-3 text-[#191970]">Tone Elements</h4>
          <div className="mb-4">
            <h5 className="font-medium mb-2 text-[#191970]">Use These Tones:</h5>
            <div className="flex flex-wrap gap-2">
              {brandVoice.tone.primary.map((tone, index) => (
                <span
                  key={index}
                  className="bg-[#191970]/10 border border-[#191970] rounded-full px-4 py-1 text-[#191970]"
                >
                  {tone}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h5 className="font-medium mb-2 text-[#191970]">Avoid These Tones:</h5>
            <div className="flex flex-wrap gap-2">
              {brandVoice.tone.avoid.map((tone, index) => (
                <span key={index} className="bg-red-50 border border-red-500 rounded-full px-4 py-1 text-red-700">
                  {tone}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border rounded-md p-4 border-[#191970]">
          <h4 className="font-serif text-lg mb-3 text-[#191970]">Vocabulary</h4>
          <div className="mb-4">
            <h5 className="font-medium mb-2 text-[#191970]">Preferred Words:</h5>
            <div className="flex flex-wrap gap-2">
              {brandVoice.vocabulary.use.map((word, index) => (
                <span
                  key={index}
                  className="bg-[#191970]/10 border border-[#191970] rounded-full px-4 py-1 text-[#191970]"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h5 className="font-medium mb-2 text-[#191970]">Words to Avoid:</h5>
            <div className="flex flex-wrap gap-2">
              {brandVoice.vocabulary.avoid.map((word, index) => (
                <span key={index} className="bg-red-50 border border-red-500 rounded-full px-4 py-1 text-red-700">
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border rounded-md p-4 border-[#191970]">
        <h4 className="font-serif text-lg mb-3 text-[#191970]">Key Messaging</h4>
        <div className="space-y-2">
          {brandVoice.messaging.map((message, index) => (
            <div key={index} className="p-3 bg-[#191970]/10 border-l-4 border-[#191970] rounded-r-md text-[#191970]">
              {message}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Render Workflows Section
  const renderWorkflows = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-2xl font-serif mb-4 text-[#191970]">Workflow Automation</h3>
      <p className="mb-6 text-[#191970]">Streamlined processes to help with executive dysfunction challenges.</p>

      <div className="space-y-8">
        {workflows.map((workflow, index) => (
          <div key={index} className="border rounded-lg overflow-hidden border-[#191970]">
            <div className="bg-[#191970] text-[#F8F6F0] p-4">
              <h4 className="font-serif text-xl">{workflow.name}</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {workflow.platforms.map((platform, i) => (
                  <span key={i} className="px-2 py-1 bg-[#191970]/80 rounded-md text-sm text-[#F8F6F0]">
                    {platform}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-[#F8F6F0]">
              <ol className="list-decimal list-inside space-y-2 mb-4">
                {workflow.steps.map((step, i) => (
                  <li key={i} className="text-[#191970]">
                    {step}
                  </li>
                ))}
              </ol>

              <div className="bg-[#D4AF37]/10 border-l-4 border-[#D4AF37] p-4">
                <p className="font-medium mb-1 text-[#191970]">Automation:</p>
                <p className="text-[#191970]">{workflow.automation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // Switch between different content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "colors":
        return renderColorPalette()
      case "typography":
        return renderTypography()
      case "icons":
        return renderIcons()
      case "audience":
        return renderAudience()
      case "products":
        return renderProducts()
      case "businessServices":
        return renderBusinessServices()
      case "techAccess":
        return renderTechAccess()
      case "digitalWellness":
        return renderDigitalWellness()
      case "nonprofit":
        return renderNonprofit()
      case "affiliates":
        return renderAffiliates()
      case "tone":
        return renderTone()
      case "workflows":
        return renderWorkflows()
      case "architecture":
        return renderTechArchitecture()
      case "notion":
        return renderNotionTemplate()
      case "blog":
        return renderBlog()
      default:
        return renderColorPalette()
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-[#191970] text-[#F8F6F0] p-6 rounded-t-lg">
        <h1 className="text-3xl font-serif mb-2">Midnight Magnolia</h1>
        <h2 className="text-xl font-sans">Visual Brand Dashboard</h2>
      </div>

      {/* Mobile menu button */}
      <div className="bg-[#F8F6F0] p-4 border-b border-[#191970]/20 md:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-full flex items-center justify-between p-3 bg-[#191970] text-[#F8F6F0] rounded-md"
        >
          <span className="font-serif">
            {activeTab === "colors"
              ? "Color Palette"
              : activeTab === "typography"
                ? "Typography"
                : activeTab === "icons"
                  ? "Icons"
                  : activeTab === "audience"
                    ? "Audience"
                    : activeTab === "products"
                      ? "Products"
                      : activeTab === "businessServices"
                        ? "Business Services"
                        : activeTab === "techAccess"
                          ? "Tech Access"
                          : activeTab === "digitalWellness"
                            ? "Digital Wellness"
                            : activeTab === "nonprofit"
                              ? "Nonprofit"
                              : activeTab === "affiliates"
                                ? "Affiliates"
                                : activeTab === "tone"
                                  ? "Brand Voice"
                                  : activeTab === "workflows"
                                    ? "Workflows"
                                    : activeTab === "architecture"
                                      ? "Tech Architecture"
                                      : activeTab === "notion"
                                        ? "Notion Template"
                                        : "Blog & Memoir"}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transition-transform ${mobileMenuOpen ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="mt-2 bg-[#F8F6F0] border border-[#191970]/20 rounded-md shadow-lg overflow-hidden">
            <div className="max-h-80 overflow-y-auto">
              {[
                { id: "colors", label: "Color Palette" },
                { id: "typography", label: "Typography" },
                { id: "icons", label: "Icons" },
                { id: "audience", label: "Audience" },
                { id: "products", label: "Products" },
                { id: "businessServices", label: "Business Services" },
                { id: "techAccess", label: "Tech Access" },
                { id: "digitalWellness", label: "Digital Wellness" },
                { id: "nonprofit", label: "Nonprofit" },
                { id: "affiliates", label: "Affiliates" },
                { id: "tone", label: "Brand Voice" },
                { id: "workflows", label: "Workflows" },
                { id: "architecture", label: "Tech Architecture" },
                { id: "notion", label: "Notion Template" },
                { id: "blog", label: "Blog & Memoir" },
              ].map((item) => (
                <button
                  key={item.id}
                  className={`w-full text-left p-3 ${activeTab === item.id ? "bg-[#191970]/10 text-[#191970] font-medium" : "text-[#191970]"}`}
                  onClick={() => {
                    setActiveTab(item.id)
                    setMobileMenuOpen(false)
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Desktop horizontal scrolling tabs */}
      <div className="hidden md:block bg-[#F8F6F0] p-4 border-b border-[#191970]/20">
        <div className="flex overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#191970] scrollbar-track-[#F8F6F0]">
          {[
            { id: "colors", label: "Color Palette" },
            { id: "typography", label: "Typography" },
            { id: "icons", label: "Icons" },
            { id: "audience", label: "Audience" },
            { id: "products", label: "Products" },
            { id: "businessServices", label: "Business Services" },
            { id: "techAccess", label: "Tech Access" },
            { id: "digitalWellness", label: "Digital Wellness" },
            { id: "nonprofit", label: "Nonprofit" },
            { id: "affiliates", label: "Affiliates" },
            { id: "tone", label: "Brand Voice" },
            { id: "workflows", label: "Workflows" },
            { id: "architecture", label: "Tech Architecture" },
            { id: "notion", label: "Notion Template" },
            { id: "blog", label: "Blog & Memoir" },
          ].map((item) => (
            <button
              key={item.id}
              className={`px-4 py-2 mr-2 whitespace-nowrap rounded-md font-serif ${
                activeTab === item.id
                  ? "bg-[#191970] text-[#F8F6F0] font-medium"
                  : "bg-[#191970]/10 text-[#191970] hover:bg-[#191970]/20"
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">{renderContent()}</div>

      <div className="mt-6 p-4 bg-[#191970]/5 rounded-lg border border-[#191970]/20">
        <h3 className="text-lg font-serif font-semibold mb-2 text-[#191970]">Rumi-Nations LLC Contact Information</h3>
        <p className="mb-1 text-[#191970]">10070 Dorchester Rd, #51599, Summerville, SC 29485</p>
        <p className="mb-1 text-[#191970]">Phone: (803) 387-2552</p>
        <p className="mb-1 text-[#191970]">Website: www.rumi-nations.shop</p>
        <div className="flex flex-wrap gap-4 mt-2">
          <a
            href="https://www.facebook.com/ruminationsshop"
            className="text-[#191970] hover:text-[#D4AF37] hover:underline"
          >
            Facebook
          </a>
          <a
            href="https://www.instagram.com/rumi_nationz/"
            className="text-[#191970] hover:text-[#D4AF37] hover:underline"
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/in/latishavwaters/"
            className="text-[#191970] hover:text-[#D4AF37] hover:underline"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  )
}

export default MidnightMagnoliaDashboard
