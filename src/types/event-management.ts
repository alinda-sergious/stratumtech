// Simulates the data structure we'd fetch from Firebase for the Event Management page
export interface EventPageData {
  hero: {
    backgroundImageUrl: string
    titlePart1: string
    titlePart2Gold: string
    tagline: string
  }
  services: {
    title: string
    items: Array<{
      id: string
      iconName: string // Lucide icon name (e.g., "Heart", "Briefcase")
      label: string
      serviceList: string[]
      quoteButtonText: string
    }>
  }
  quoteForm: {
    title: string
    fullNameLabel: string
    fullNamePlaceholder: string
    phoneLabel: string
    phonePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    eventTypeLabel: string
    estimatedBudgetLabel: string
    estimatedBudgetPlaceholder: string
    detailsLabel: string
    detailsPlaceholder: string
    submitButtonText: string
    successMessage: string
    errorMessage: string
  }
  howItWorks: {
    title: string
    steps: Array<{
      id: string
      iconName: string // Lucide icon name
      title: string
      description: string
    }>
  }
  footerCallout: {
    buttonText: string
    buttonLinkUrl: string
  }
}

// Sample data - this would come from Firebase
export const sampleEventPageData: EventPageData = {
  hero: {
    backgroundImageUrl: "/images/services/events.jpg",
    titlePart1: "Project Management ",
    titlePart2Gold: "and Supervision",
    tagline: "You dream it. We foster it all to life within your budget. Please note— that other services are agreed upon meeting and the listed services can also be included in the SLA, therefore services are customised depending on the project.", 

  }, 
  services: {
    title: "Our Project Management Services",
    items: [
      {
        id: "wedding",
        iconName: "Drill",
        label: "Construction",
        serviceList: [
          "Feasibility Studies",
          "Work Plan Development",
          "Stakeholder Coordination",
          "Permit and Compliance Management",
          "Budget Planning",

        ],
        quoteButtonText: "Get a Quote",
      },
      {
        id: "corporate",
        iconName: "Briefcase",
        label: "On-Site supervision",
        serviceList: [
          "Site Inspections",
          "Contractor Management",
          "Quality Control",
          "Safety Oversight",
          "Progress Reporting",
         
        ],
        quoteButtonText: "Get a Quote",
      },
      {
        id: "concert",
        iconName: "Forklift",
        label: "Resources and Logistics Management",
        serviceList: [
          "Material Procurement",
          "Equipment Coordination",
          "Inventory Management",
          "Logistics Planning",
          "Waste Management",
          
        ],
        quoteButtonText: "Get a Quote",
      },
      {
        id: "anniversary",
        iconName: "Gift",
        label: "Project Completion and Handover",
        serviceList: [
          "Final Inspections",
          "Defect Resolution",
          "Documentation Handover",
          "Client Training",
          "Post-Completion Support",
      
        ],
        quoteButtonText: "Get a Quote",
      },
      
    ],
  },
  quoteForm: {
    title: "Request a Quote",
    fullNameLabel: "Full Name",
    fullNamePlaceholder: "Enter your full name",
    phoneLabel: "Phone Number",
    phonePlaceholder: "e.g., +256 705 515 552",
    emailLabel: "Email Address",
    emailPlaceholder: "Enter your email address",
    eventTypeLabel: "Event Type",
    estimatedBudgetLabel: "Estimated Budget (USD)",
    estimatedBudgetPlaceholder: "e.g., 5000",
    detailsLabel: "Details / Special Requests",
    detailsPlaceholder: "Describe your..",
    submitButtonText: "Submit Request",
    successMessage: "Thank you! Your quote request has been sent.",
    errorMessage: "Sorry, there was an error. Please try again.",
  },
  howItWorks: {
    title: "How We Work",
    steps: [
      {
        id: "vision",
        iconName: "Lightbulb",
        title: "Tell Us Your Vision",
        description: "Share your project details, what you want to achieve, the scope and relevant documentation.",
      },
      {
        id: "plan",
        iconName: "ClipboardList",
        title: "We Craft the Perfect Plan",
        description:
          "We meticulously devise a work plan, overseeing resources and processes to ensure project completion in a way that is feasible.",
      },
      {
        id: "celebrate",
        iconName: "Smile",
        title: "We Handover ",
        description:
          "Its joy as you get to see a project that you once envisioned come to life in standard quality.",
      },
    ],
  },
  footerCallout: {
    buttonText: "Back to top",
    buttonLinkUrl: "", // Example URL
  },
}
