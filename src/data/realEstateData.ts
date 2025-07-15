export interface RealEstateSpecification {
  model: string
  year: number
  floors: number
  color: string
  entrances: number
  airSystem: string
  energy: string
  security: string
}

export interface RealEstateCapability {
  icon: string
  text: string
}

export interface RealEstate {
  id: string // Unique identifier for URL slug
  name: string
  shortDescription: string // For RealEstateCard
  detailedDescription: string // For details page
  mainImage: string // Primary image for RealEstateCard and details page
  galleryImages: string[] // Additional images for gallery
  capabilities: RealEstateCapability[] // For RealEstateCard display
  specifications: RealEstateSpecification
  price: string // Link to pricing page or contact form
  is_active?: boolean // Indicates if the property is active
}

export const realEstateData: RealEstate[] = [
  {
    id: "luxury-apartment-kigali",
    name: "Luxury Apartment in Kigali",
    shortDescription: "Premium apartment with modern amenities and city views.",
    detailedDescription:
      "This luxurious apartment in the heart of Kigali offers the perfect blend of comfort, style, and convenience. Featuring modern amenities, spacious rooms, and stunning city views, this property is ideal for professionals, families, or investors seeking premium accommodation in Rwanda's capital. The apartment includes fully equipped kitchen, private balcony, secure parking, and 24/7 security.",
    mainImage: "/images/accommodation/serena.jpeg",
    galleryImages: [
      "/images/accommodation/serena1.jpg",
      "/images/accommodation/serena2.jpg",
      "/images/accommodation/serena3.jpg",
    ],
    capabilities: [
      { icon: "bed", text: "3 Bedrooms" },
      { icon: "map-pin", text: "Kigali City Center" },
      { icon: "building", text: "Apartment" },
      { icon: "calendar", text: "2023 Built" },
    ],
    specifications: {
      model: "Apartment",
      year: 2023,
      floors: 3,
      color: "Modern White",
      entrances: 2,
      airSystem: "Central AC",
      energy: "Solar + Grid",
      security: "24/7 Security",
    },
    price: "Contact for pricing details",
  },
  {
    id: "villa-musanze",
    name: "Villa in Musanze",
    shortDescription: "Spacious villa with mountain views and garden.",
    detailedDescription:
      "Experience the beauty of Musanze with this stunning villa that offers breathtaking mountain views and a private garden. Perfect for families or those seeking tranquility away from the city, this property features multiple bedrooms, a large living area, and outdoor spaces for entertaining. The villa is built with quality materials and includes modern conveniences while maintaining traditional Rwandan architectural elements.",
    mainImage: "/images/accommodation/forest-lodge.jpeg",
    galleryImages: [
      "/images/accommodation/IMG_9914.JPG",
      "/images/accommodation/IMG_9915.JPG",
      "/images/accommodation/IMG_9916.JPG",
    ],
    capabilities: [
      { icon: "bed", text: "4 Bedrooms" },
      { icon: "map-pin", text: "Musanze District" },
      { icon: "building", text: "Villa" },
      { icon: "calendar", text: "2022 Built" },
    ],
    specifications: {
      model: "Villa",
      year: 2022,
      floors: 2,
      color: "Natural Stone",
      entrances: 3,
      airSystem: "Split Units",
      energy: "Solar Power",
      security: "Perimeter Fence",
    },
    price: "Visit Find My Stay for more details",
  },
  {
    id: "commercial-building-kigali",
    name: "Commercial Building in Kigali",
    shortDescription: "Prime commercial property for business opportunities.",
    detailedDescription:
      "This prime commercial building in Kigali's business district offers excellent opportunities for retail, office, or mixed-use development. Located in a high-traffic area with excellent accessibility, the property features modern infrastructure, ample parking, and flexible space configurations. Ideal for businesses looking to establish a presence in Rwanda's growing economy.",
    mainImage: "/images/accommodation/raddison-blu.jpeg",
    galleryImages: [
      "/images/accommodation/raddison.jpg",
      "/images/accommodation/parkinn.avif",
    ],
    capabilities: [
      { icon: "bed", text: "5 Floors" },
      { icon: "map-pin", text: "Kigali Business District" },
      { icon: "building", text: "Commercial" },
      { icon: "calendar", text: "2021 Built" },
    ],
    specifications: {
      model: "Commercial Building",
      year: 2021,
      floors: 5,
      color: "Modern Gray",
      entrances: 4,
      airSystem: "Central HVAC",
      energy: "Grid Power",
      security: "CCTV System",
    },
    price: "Contact for investment details",
  },
  {
    id: "eco-lodge-kivu",
    name: "Eco Lodge at Lake Kivu",
    shortDescription: "Sustainable eco-lodge with lakefront access.",
    detailedDescription:
      "This eco-friendly lodge on the shores of Lake Kivu offers a unique blend of luxury and sustainability. Built with environmentally conscious materials and powered by renewable energy, the lodge provides guests with an authentic Rwandan experience while minimizing environmental impact. Features include lakefront views, organic gardens, and activities that showcase local culture and nature.",
    mainImage: "/images/accommodation/kivu-retreat.jpeg",
    galleryImages: [
      "/images/accommodation/retreat.jpg",
      "/images/accommodation/volcano-eco.jpeg",
    ],
    capabilities: [
      { icon: "bed", text: "8 Cottages" },
      { icon: "map-pin", text: "Lake Kivu Shore" },
      { icon: "building", text: "Eco Lodge" },
      { icon: "calendar", text: "2020 Built" },
    ],
    specifications: {
      model: "Eco Lodge",
      year: 2020,
      floors: 1,
      color: "Natural Wood",
      entrances: 8,
      airSystem: "Natural Ventilation",
      energy: "Solar + Wind",
      security: "Local Guards",
    },
    price: "Visit Find My Stay for booking",
  },
  {
    id: "penthouse-kigali",
    name: "Penthouse in Kigali Heights",
    shortDescription: "Luxury penthouse with panoramic city views.",
    detailedDescription:
      "This exclusive penthouse offers the ultimate in luxury living with panoramic views of Kigali's skyline. Featuring high-end finishes, smart home technology, and private rooftop terrace, this property represents the pinnacle of urban living in Rwanda. The penthouse includes a private elevator, wine cellar, home theater, and 24/7 concierge service.",
    mainImage: "/images/accommodation/serena.jpeg",
    galleryImages: [
      "/images/accommodation/serena1.jpg",
      "/images/accommodation/serena2.jpg",
    ],
    capabilities: [
      { icon: "bed", text: "4 Bedrooms" },
      { icon: "map-pin", text: "Kigali Heights" },
      { icon: "building", text: "Penthouse" },
      { icon: "calendar", text: "2023 Built" },
    ],
    specifications: {
      model: "Penthouse",
      year: 2023,
      floors: 2,
      color: "Luxury White",
      entrances: 2,
      airSystem: "Smart HVAC",
      energy: "Hybrid System",
      security: "Biometric Access",
    },
    price: "Contact for exclusive pricing",
  },
  {
    id: "family-home-rubavu",
    name: "Family Home in Rubavu",
    shortDescription: "Spacious family home with garden and mountain views.",
    detailedDescription:
      "This beautiful family home in Rubavu offers the perfect setting for family life with its spacious rooms, large garden, and stunning mountain views. Built with quality materials and attention to detail, the home features modern amenities while maintaining a warm, family-friendly atmosphere. The property includes a children's play area, vegetable garden, and outdoor dining space.",
    mainImage: "/images/accommodation/game-lodge.jpeg",
    galleryImages: [
      "/images/accommodation/IMG_9917.JPG",
      "/images/accommodation/IMG_9918.JPG",
      "/images/accommodation/IMG_9919.JPG",
    ],
    capabilities: [
      { icon: "bed", text: "5 Bedrooms" },
      { icon: "map-pin", text: "Rubavu District" },
      { icon: "building", text: "Family Home" },
      { icon: "calendar", text: "2021 Built" },
    ],
    specifications: {
      model: "Family Home",
      year: 2021,
      floors: 2,
      color: "Warm Beige",
      entrances: 3,
      airSystem: "Split Units",
      energy: "Grid Power",
      security: "Gated Community",
    },
    price: "Visit Find My Stay for details",
  },
] 