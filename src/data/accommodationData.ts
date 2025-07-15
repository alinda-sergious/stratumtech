export interface AccommodationImage {
  id: string
  src: string
  caption: string
  location?: string
  rating?: number
}

export const apartmentImages: AccommodationImage[] = [
  {
    id: "apt-1",
    src: "/placeholder.svg?height=400&width=600",
    caption: "2-bedroom flat in Kigali City",
    location: "Kigali City Center",
  },
  {
    id: "apt-2",
    src: "/placeholder.svg?height=400&width=600",
    caption: "Fully equipped kitchen and dining area",
    location: "Nyarutarama",
  },
  {
    id: "apt-3",
    src: "/placeholder.svg?height=400&width=600",
    caption: "Comfortable master bedroom",
    location: "Kimihurura",
  },
  {
    id: "apt-4",
    src: "/placeholder.svg?height=400&width=600",
    caption: "Private balcony with hill views",
    location: "Kacyiru",
  },
  {
    id: "apt-5",
    src: "/placeholder.svg?height=400&width=600",
    caption: "Serviced apartment complex",
    location: "Gisozi",
  },
]

export const hotelImages: AccommodationImage[] = [
  {
    id: "hotel-1",
    src: "/images/accommodation/serena3.jpg",
    caption: "Kigali Serena Hotel",
    location: "Kigali City Center",
    rating: 5,
  },
  {
    id: "hotel-2",
    src: "/images/accommodation/retreat.jpg",
    caption: "The Retreat by Heaven",
    location: "Nyarutarama",
    rating: 4,
  },
  {
    id: "hotel-3",
    src: "/images/accommodation/raddison.jpg",
    caption: "Radisson Blu Hotel & Convention Centre",
    location: "Gasabo",
    rating: 5,
  },
  {
    id: "hotel-4",
    src: "/images/accommodation/mainho.jpg",
    caption: "Hotel des Mille Collines",
    location: "Kiyovu",
    rating: 4,
  },
  {
    id: "hotel-5",
    src: "/images/services/accomodation.webp",
    caption: "Bisate Lodge",
    location: "Volcanoes National Park",
    rating: 5,
  },
]
