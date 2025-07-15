"use client"
import ServiceCard from "@/src/components/ServiceCard"

interface Service {
  id: string
  title: string
  description: string
  imageUrl: string
  link: string
}

const servicesData: Service[] = [
  {
    id: "project-management",
    title: "Project Management and Supervision",
    description: "Professional project management and supervision services for construction and development projects. We ensure quality control, timeline management, and successful project delivery.",
    imageUrl: "/images/josue-isai-ramos-figueroa-qvBYnMuNJ9A-unsplash.jpg",
    link: "/services/event-management"
  },
  {
    id: "surveying-boqs",
    title: "Surveying and BOQs",
    description: "Comprehensive surveying services and Bill of Quantities (BOQ) preparation. Our expert surveyors provide accurate measurements, land assessments, and detailed cost estimates.",
    imageUrl: "/images/valerie-v-OO4laKg2HS0-unsplash.jpg",
    link: "/services/tours"
  },
  {
    id: "property-management",
    title: "Property Management",
    description: "Complete property management solutions including tenant management, maintenance coordination, and investment optimization. We handle all aspects of property administration.",
    imageUrl: "/images/towfiqu-barbhuiya-05XcCfTOzN4-unsplash.jpg",
    link: "/services/accommodation"
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-20 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#001934] mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional engineering and property management services tailored just for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
