export interface BusinessConfig {
  name: string;
  tagline: string;
  yearsOfExcellence: string;
  customersServed: string;
  primaryPhone: string;
  landlinePhone: string;
  whatsappNumber: string;
  email: string;
  address: {
    line1: string;
    landmark: string;
    city: string;
    state: string;
    pincode: string;
    full: string;
  };
  workingHours: {
    weekdays: string;
    sunday: string;
  };
  socialLinks: {
    facebook: string;
    instagram: string;
    googleMaps: string;
  };
}

export const BUSINESS_INFO: BusinessConfig = {
  name: "Excellent Tailors & Dress Makers",
  tagline: "25+ Years of Excellence",
  yearsOfExcellence: "25+",
  customersServed: "50,000+",
  primaryPhone: "+91 94433 54440",
  landlinePhone: "0424 2260554",
  whatsappNumber: "919443354440",
  email: "contact@excellentdressmakers.com",
  address: {
    line1: "No 375, Erode Collectorate",
    landmark: "NGGO Colony Area, Perundurai Road",
    city: "Erode",
    state: "Tamil Nadu",
    pincode: "638011",
    full: "No 375, Erode Collectorate, NGGO Colony Area, Perundurai Road, Erode, Tamil Nadu 638011"
  },
  workingHours: {
    weekdays: "Monday - Saturday: 9:30 AM - 9:00 PM",
    sunday: "Sunday: By Prior Appointment"
  },
  socialLinks: {
    facebook: "https://facebook.com/excellenttailorserode",
    instagram: "https://www.instagram.com/excellenttailorserode/",
    googleMaps: "https://maps.google.com/?q=No+375+Erode+Collectorate+Perundurai+Road+Erode+638011"
  }
};

export interface ServiceItem {
  id: string;
  name: string;
  category: 'formal' | 'traditional' | 'occasion' | 'bulk';
  image: string;
  description: string;
  startingPrice: string;
  priceNote?: string;
  features: string[];
  popular?: boolean;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "shirt-stitching",
    name: "Shirt Stitching",
    category: "formal",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
    description: "Custom-fitted shirts crafted with immaculate collar shaping, structured cuffs, and ergonomic armhole contouring for formal, business, and casual wear.",
    startingPrice: "₹350",
    priceNote: "Half Sleeve: ₹350 | Full Sleeve: ₹400",
    features: [
      "Fused German interlinings for crisp collars",
      "Single-needle lockstitch seam finish",
      "Custom cuff styles (French, Barrel, Two-button)",
      "Choice of Slim, Regular, or Relaxed fit"
    ],
    popular: true
  },
  {
    id: "pant-stitching",
    name: "Pant & Trouser Stitching",
    category: "formal",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80",
    description: "Personalized trousers tailored to precise waist, hip, rise, thigh, and hem drape measurements for supreme daily comfort and sharp drape.",
    startingPrice: "₹450",
    priceNote: "Starting from ₹450",
    features: [
      "Custom front rise & zip fly construction",
      "Reinforced crotch seam and pocket linings",
      "Tailored waistbands with non-slip grip",
      "Pleated or flat front customized cut"
    ],
    popular: true
  },
  {
    id: "coat-suit",
    name: "Coat Suit (3-Piece / 2-Piece)",
    category: "occasion",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
    description: "Master-crafted bespoke suits featuring Shirt + Pant + Blazer for prestigious boardroom meetings, grand weddings, and executive gala events.",
    startingPrice: "₹3,200",
    priceNote: "Starting from ₹3,200 (Subject to package details)",
    features: [
      "Full canvas and structured shoulder padding",
      "Custom lapel cuts (Notch, Peak, Shawl)",
      "Premium satin inner lining & piping",
      "Personalized monogramming options"
    ],
    popular: true
  },
  {
    id: "kurtha",
    name: "Traditional Kurtha",
    category: "traditional",
    image: "https://images.unsplash.com/photo-1772736243289-872f9ac73cf8?auto=format&fit=crop&w=800&q=80",
    description: "Graceful traditional Indian attire tailored for celebrations, festivals, and cultural events with personalized comfort and breathable fitting.",
    startingPrice: "₹500",
    priceNote: "Starting from ₹500",
    features: [
      "Mandarin collar with fine placket stitch",
      "Concealed side utility pockets",
      "Comfort shoulder drape for movement",
      "High-tensile stitching along side slits"
    ]
  },
  {
    id: "kurtha-set",
    name: "Kurtha Set (Pajama / Dhoti)",
    category: "traditional",
    image: "https://images.unsplash.com/photo-1774437789586-56206b6bd11f?auto=format&fit=crop&w=800&q=80",
    description: "Harmoniously coordinated ethnic sets incorporating custom-tailored Kurtha with matching Churidar, Pajama, or traditional bottoms.",
    startingPrice: "₹800",
    priceNote: "Starting from ₹800",
    features: [
      "Coordinated fit and fabric balance",
      "Reinforced drawstrings and elastic inserts",
      "Ideal for weddings and temple occasions",
      "Tailored length to match foot posture"
    ]
  },
  {
    id: "vesty-waistcoat",
    name: "Vesty / Waistcoat + Shirt",
    category: "occasion",
    image: "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=800&q=80",
    description: "Refined waistcoats and Nehru jackets paired with matching custom shirts, creating an imposing look for formal festivities and reception wear.",
    startingPrice: "₹800",
    priceNote: "Starting from ₹800",
    features: [
      "Contoured back cinch buckle for custom taper",
      "Double-welt front watch pockets",
      "Structured chest canvas for posture enhancement",
      "Complementary button selections"
    ]
  },
  {
    id: "alterations-fit",
    name: "Master Alterations & Fit Tuning",
    category: "formal",
    image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=800&q=80",
    description: "Expert adjustments for waist tapering, sleeve shortening, trouser hemming, blazer reshaping, and seam resizing ensuring garments fit your silhouette perfectly.",
    startingPrice: "₹100",
    priceNote: "Starting from ₹100 (Custom fitting assessment)",
    features: [
      "Precision trouser hem, taper & waist adjusting",
      "Blazer sleeve & shoulder restructuring",
      "Shirt side seam slim fit conversions",
      "Fast turnaround for men & women's wardrobe adjustments"
    ]
  }
];

export interface ClientPartner {
  name: string;
  type: string;
  highlight: string;
}

export const TRUSTED_CLIENTS: ClientPartner[] = [
  { name: "Geethanjali CBSE", type: "Educational Institution", highlight: "School Uniform Partner" },
  { name: "Cambridge, Avinashi", type: "Educational Institution", highlight: "Institutional Tailoring" },
  { name: "Kamaraj School, Nambiyur", type: "School Campus", highlight: "Complete Uniform Outfitting" },
  { name: "Kia", type: "Automotive Dealership", highlight: "Showroom Staff Uniforms" },
  { name: "Hyundai", type: "Automotive Dealership", highlight: "Technician & Sales Attire" },
  { name: "Honda", type: "Automotive Dealership", highlight: "Service Team Apparel" },
  { name: "Yamaha", type: "Automobile Dealership", highlight: "Staff Branding Uniforms" },
  { name: "Olirum Erode Trust", type: "Social Foundation", highlight: "Organizational Attire" },
  { name: "Rotary", type: "Civic Organization", highlight: "Event & Formal Blazers" },
  { name: "JCI", type: "Leadership Organization", highlight: "Club Uniforms & Lapel Wear" },
  { name: "Renault", type: "Automotive Dealership", highlight: "Dealership Corporate Wear" }
];

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'formal' | 'suits' | 'traditional' | 'institutional' | 'craftsmanship';
  image: string;
  tag: string;
  description: string;
}

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: "port-1",
    title: "Executive Italian Wool Blazer",
    category: "suits",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
    tag: "Coat Suit",
    description: "Peak-lapel structured two-piece suit with hand-finished pick stitching."
  },
  {
    id: "port-2",
    title: "Egyptian Giza Cotton Formal Shirt",
    category: "formal",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
    tag: "Formal Shirt",
    description: "Crisp spread collar with mother-of-pearl buttons and tailored taper."
  },
  {
    id: "port-3",
    title: "Automotive Dealership Front Office Set",
    category: "institutional",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80",
    tag: "Corporate Uniform",
    description: "High-durability wrinkle-resistant executive uniforms for showroom sales personnel."
  },
  {
    id: "port-4",
    title: "Heritage Festive Silk Kurtha",
    category: "traditional",
    image: "https://images.unsplash.com/photo-1772736243289-872f9ac73cf8?auto=format&fit=crop&w=800&q=80",
    tag: "Traditional Wear",
    description: "Rich woven festival kurtha tailored for regal ease and comfort."
  },
  {
    id: "port-5",
    title: "Cambridge Avinashi Uniform Ensembles",
    category: "institutional",
    image: "https://images.unsplash.com/photo-1580974852861-c381510bc98a?auto=format&fit=crop&w=800&q=80",
    tag: "School Uniforms",
    description: "Standardized, reinforced double-stitch school attire engineered for activity."
  },
  {
    id: "port-6",
    title: "Bespoke Navy Velvet Waistcoat",
    category: "suits",
    image: "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=800&q=80",
    tag: "Occasion Wear",
    description: "Contoured waistcoat with contrast satin piping and antique brass buttons."
  },
  {
    id: "port-7",
    title: "Master Pattern Drafting",
    category: "craftsmanship",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80",
    tag: "Process",
    description: "Hand-drafted paper patterns sculpted specifically for individual anatomy."
  },
  {
    id: "port-8",
    title: "Precision Tailoring & Sewing",
    category: "craftsmanship",
    image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=800&q=80",
    tag: "Process",
    description: "Grain-aligned fabric shears cut with millimeter-level boundary tolerances."
  }
];

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  iconName: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Personal Consultation",
    description: "We understand your preferences, occasion requirements, posture nuances, and functional needs over a relaxed consultation.",
    iconName: "MessageSquare"
  },
  {
    step: "02",
    title: "Comprehensive Measurements",
    description: "Over 18 precision anatomical metrics recorded to assure exact shoulder slope, collar circumference, and natural contouring.",
    iconName: "Ruler"
  },
  {
    step: "03",
    title: "Fabric & Styling Guidance",
    description: "Select from our vast textile archives or bring your own cut length. We assist in styling collar points, cuffs, pleats, and pockets.",
    iconName: "Layers"
  },
  {
    step: "04",
    title: "Artisanal Tailoring",
    description: "Master tailors with decades of experience meticulously cut, line, and assemble your garment using high-tensile threads.",
    iconName: "Scissors"
  },
  {
    step: "05",
    title: "Trial Fitting & Nuance Tuning",
    description: "We conduct a trial fitting to fine-tune seam tensions, armholes, or hemlines, leaving zero compromise on comfort.",
    iconName: "Sparkles"
  },
  {
    step: "06",
    title: "Final Pressing & Delivery",
    description: "Vacuum pressed and carefully packaged in protective garment bags, ready for your most momentous days.",
    iconName: "CheckCircle2"
  }
];

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  date: string;
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "t1",
    name: "R. Sundaram",
    role: "Collectorate Official & Regular Customer (8+ Years)",
    comment: "Excellent Dress Makers has been stitching my formal office shirts and trousers for nearly a decade. Their fit around the shoulders and waist is unmatched in Erode. Truly reliable quality.",
    rating: 5,
    date: "Verified Customer"
  },
  {
    id: "t2",
    name: "K. Mohanraj",
    role: "Showroom Operations Manager",
    comment: "We entrusted our entire dealership sales team's uniform order to Excellent Dress Makers. The stitching quality, batch delivery timeline, and durable fabric selection exceeded our expectations.",
    rating: 5,
    date: "Corporate Client"
  },
  {
    id: "t3",
    name: "Dr. S. Karthikeyan",
    role: "Bridegroom / Bespoke Suit Client",
    comment: "Got my 3-piece wedding coat suit and kurtha set tailored here. The attention to trial fittings and collar posture made a huge difference on stage. Got numerous compliments!",
    rating: 5,
    date: "Verified Customer"
  }
];
