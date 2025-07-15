export interface TourItineraryItem {
  day: number
  title: string
  description: string
}

export interface Tour {
  id: string
  title: string
  shortDescription: string // For card
  longDescription: string // For detail page
  mainImage: string // For card and hero on detail page
  galleryImages: string[] // For detail page gallery
  pricePerPerson?: string // e.g., "$1500 / Per person"
  duration: string // e.g., "5 Days"
  destination: string // e.g., "Volcanoes National Park, Lake Kivu"
  category?: string // e.g., "Gorilla Trekking", "Cultural"
  itinerary: TourItineraryItem[]
  included: string[]
  excluded: string[]
}

export const toursData: Tour[] = [
  {
    id: "volcanoes-gorilla-trek",
    title: "Topographic Survey",
    shortDescription:
      "Accurate mapping of land features for effective project planning. Ideal for construction and development projects.",
    longDescription:
      "Our topographic survey service provides detailed mapping of natural and man-made features on a site, including contours, elevations, trees, buildings, and utilities. Using advanced tools like GPS, total stations, and drones, we deliver precise data to support architects, engineers, and developers in planning construction projects. This service ensures accurate site analysis, reducing risks and optimizing design efficiency.",
    mainImage: "/images/tours/volca1.jpg",
    galleryImages: [
      "/images/tours/volca1.jpg",
      "/images/tours/volca2.jpg",
      "/images/tours/volca3.jpg",
      "/images/tours/volca4.jpg",
      "/images/tours/volca5.gif",
    ],
    pricePerPerson: "Negotiatiable",
    duration: "2- 5 Days",
    destination: "All kinds of Topography",
    category: "Surveying",
    itinerary: [
      {
        day: 1,
        title: "Site Assessment & Setup",
        description:
          "Conduct initial site visit, consult with client on project scope, and set up survey equipment.",
      },
      {
        day: 2,
        title: "Data Collection",
        description:
          "Perform field survey using GPS, total stations, or drones to capture topographic data.",
      },
      {
        day: 3,
        title: "Data Processing & Delivery",
        description:
          "Analyze collected data and produce detailed topographic maps or 3D models. Deliver final reports to client.",
      },
    ],
    included: [
      "Field survey with advanced equipment",
      "Topographic maps or 3D models",
      "Professional surveyor fees",
      "Project consultation",
      "Digital and hardcopy deliverables",
    ],
    excluded: [
      "Travel expenses outside [specified region]",
      "Additional revisions beyond scope",
      "Permits or regulatory fees",
    ],
  },
  {
    id: "lake-kivu-scenic-tour",
    title: "Bill of Quantities Preparation",
    shortDescription:
      "Detailed cost estimation with precise material and labor quantities for efficient project budgeting.",
    longDescription:
      "Our BOQ preparation service delivers comprehensive documentation of materials, labor, and quantities required for your construction project. By conducting thorough quantity takeoffs and cost analysis, we help clients, contractors, and developers create accurate budgets, streamline procurement, and support tendering processes. Our BOQs are tailored to project specifications, ensuring transparency and cost control.",
    mainImage: "/images/tours/kivu6.jpg",
    galleryImages: [
      "/images/tours/kivu6.jpg",
      "/images/tours/kivu1.jpg",
      "/images/tours/kivu2.jpg",
      "/images/tours/kivu5.jpg",
      "/images/tours/kivu3.webp",
    ],
    pricePerPerson: "Negotiable",
    duration: "4-10 Days",
    destination: "Residential, Commercial, Infrastructure, Industrial",
    category: "BOQ",
    itinerary: [
      {
        day: 1,
        title: "Project Scope Review",
        description:
          "Meet with client to review project plans, specifications, and requirements.",
      },
      {
        day: 2,
        title: "Quantity Takeoff",
        description:
          "Perform detailed measurements and calculations from drawings using BOQ software like CostX.",
      },
      {
        day: 3,
        title: "Cost Estimation & Drafting",
        description:
          "Compile quantities, assign unit costs, and draft initial BOQ document.",
      },
      {
        day: 4,
        title: "Review & Finalization",
        description:
          "Review BOQ with client, incorporate feedback, and deliver final BOQ in digital and hardcopy formats.",
      },
    ],
    included: [
      "Detailed BOQ document",
      "Quantity takeoff and cost estimation",
      "Use of industry-standard software",
      "Consultation and revisions (up to 2 rounds)",
      "Digital and hardcopy deliverables",
    ],
    excluded: ["Site visits (if required)",
      "Additional revisions beyond scope",
      "Specialized consultancy fees"],
  },
  {
    id: "nyungwe-forest-canopy-walk",
    title: "Boundary Survey",
    shortDescription:
      "Precise determination of property lines to resolve disputes or support land development.",
    longDescription:
      "Our boundary survey service establishes accurate property lines to prevent disputes, support land transactions, or prepare for construction. Using legal descriptions, deeds, and field measurements, our licensed surveyors mark boundaries and provide detailed plats. This service is essential for landowners, developers, and legal professionals needing clarity on property extents.",
    mainImage: "/images/tours/nyungwe1.jpg",
    galleryImages: [
      "/images/tours/nyungwe1.jpg",
      "/images/tours/nyungwe2.jpg",
      "/images/tours/nyungwe3.jpg",
      "/images/tours/nyungwe4.jpg",
    ],
    pricePerPerson: "Negotiable",
    duration: "1-3 Days",
    destination: "All sorts of landscapes",
    category: "Surveying",
    itinerary: [
      {
        day: 1,
        title: "Research & Planning",
        description:
          "Review legal documents, deeds, and existing surveys to define boundary scope.",
      },
      {
        day: 2,
        title: "Field Survey",
        description:
          "Conduct on-site measurements using GPS and total stations to locate boundary markers.",
      },
      {
        day: 3,
        title: "Plat Preparation & Delivery",
        description:
          "Prepare boundary plat or map, mark corners if required, and deliver final report to client.",
      },
    ],
    included: [
      "Construction staking for specified elements",
      "As-staked drawings",
      "Professional surveyor fees",
      "Use of advanced survey tools",
      "Digital deliverables",
    ],
    excluded: [
      "Restaking due to site changes",
      "Additional staking beyond scope",
      "Travel expenses outside [specified region]",
    ],
  },
  {
    id: "kigali-city-cultural-tour",
    title: "Construction Staking",
    shortDescription:
      "Accurate site layout and marking for precise construction alignment and execution.",
    longDescription:
      "Our construction staking service ensures your project is built exactly to plan by marking key points on-site for foundations, utilities, and structures. Using detailed construction drawings and advanced survey tools, we provide precise staking to guide contractors, reducing errors and ensuring alignment with design specifications. Ideal for any construction project requiring accuracy.",
    mainImage: "/images/tours/kigali3.jpg",
    galleryImages: [
      "/images/tours/kigali3.jpg",
      "/images/tours/kigali4.jpg",
      "/images/tours/kigali2.jpg",
      "/images/tours/kigali1.jpg",
    ],
    pricePerPerson: "Negotiable",
    duration: "2-4 Days",
    destination: "Residential, Commercial, Infrastructure",
    category: "Surveying",
    itinerary: [
      {
        day: 1,
        title: "Plan Review & Coordination",
        description:
          "Review construction plans and coordinate with project team to confirm staking requirements.",
      },
      {
        day: 2,
        title: "Field Staking",
        description:
          "Mark key points (e.g., foundations, utilities) using stakes and survey equipment.",
      },
      {
        day: 3,
        title: "Verification & Delivery",
        description:
          "Verify staking accuracy, provide as-staked drawings, and deliver documentation to client.",
      },
    ],
    included: [
      "Professional guide",
      "Entrance fees to sites mentioned",
      "Lunch",
      "Bottled water",
      "Transportation within city",
    ],
    excluded: ["Hotel pickup/drop-off (can be arranged)", "Dinner", "Personal shopping", "Tips"],
  },
  {
    id: "akagera-wildlife-safari",
    title: "As-Built Survey",
    shortDescription:
      "Detailed documentation of constructed features to verify compliance with design plans.",
    longDescription:
      "Our as-built survey service captures the exact location and dimensions of constructed features, such as buildings, utilities, and infrastructure, to verify they match approved plans. This service is critical for project closeout, regulatory compliance, or future renovations. Using 3D laser scanning and GPS, we deliver accurate as-built drawings for contractors, owners, and engineers.",
    mainImage: "/images/tours/akagera1.jpg",
    galleryImages: [
      "/images/tours/akagera1.jpg",
      "/images/tours/akagera2.webp",
      "/images/tours/akagera3.jpg",
      "/images/tours/akagera4.jpg",
      "/images/tours/akagera5.jpg",
    ],
    pricePerPerson: "Negotiable",
    duration: "2-7 Days",
    destination: "Commercial, Industrial, Infrastructure",
    category: "Surveying",
    itinerary: [
    {
        day: 1,
        title: "Project Review & Setup",
        description:
          "Review design plans and project scope, and set up survey equipment on-site.",
      },
      {
        day: 2,
        title: "Data Collection",
        description:
          "Capture as-built data using 3D laser scanners or GPS for constructed features.",
      },
      {
        day: 3,
        title: "Data Processing & Delivery",
        description:
          "Process data to create as-built drawings or models, and deliver final reports to client.",
      },
    ],
    included: [
      "As-built drawings or 3D models",
      "Field survey with advanced tools",
      "Professional surveyor fees",
      "Digital and hardcopy deliverables",
      "Initial consultation",
    ],
    excluded: [
      "Additional data processing for non-standard formats",
      "Travel expenses outside [specified region]",
      "Permits or access fees",
    ],
  },
  {
    id: "rwanda-cultural-heritage",
    title: "Cost Estimation Consultancy",
    shortDescription:
      "Expert guidance on project budgeting and cost forecasting for construction projects.",
    longDescription:
      "Our cost estimation consultancy service provides expert advice on budgeting, cost forecasting, and financial planning for construction projects. Working closely with clients, we analyze project plans, market trends, and site conditions to deliver reliable cost estimates. This service supports developers, contractors, and owners in making informed financial decisions and avoiding cost overruns.",
    mainImage: "/images/tours/culture1.jpg",
    galleryImages: [
      "/images/tours/culture1.jpg",
      "/images/tours/culture2.webp",
      "/images/tours/culture3.jpeg",
      "/images/tours/culture4.webp",
      "/images/tours/culture5.jpg",
    ],
    pricePerPerson: "Negotiable",
    duration: "1-4 Days",
    destination: "Residential, Commercial, Infrastructure, Industrial",
    category: "BOQs",
    itinerary: [
      {
        day: 1,
        title: "Initial Consultation",
        description:
          "Meet with client to understand project goals, scope, and budget constraints.",
      },
      {
        day: 2,
        title: "Plan Analysis",
        description:
          "Review architectural and engineering plans to identify cost drivers.",
      },
      {
        day: 3,
        title: "Cost Forecasting",
        description:
          "Develop detailed cost estimates based on market rates and project specifics.",
      },
      {
        day: 4,
        title: "Report Delivery",
        description:
          "Present cost estimation report with recommendations and support client review.",
      },
    ],
   included: [
      "Detailed cost estimation report",
      "Market rate analysis",
      "Consultation with quantity surveyors",
      "Up to 2 rounds of revisions",
      "Digital deliverables",
    ],
    excluded: [
      "Site visits (if required)",
      "Additional revisions beyond scope",
      "Specialized financial modeling",
    ],
  },
];