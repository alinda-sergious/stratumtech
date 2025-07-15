import ContactInfoSection from "@/src/components/ContactInfoSection"
import ContactForm from "@/src/components/ContactForm"

export default function ContactPage() {
  return (
    <div className="relative pt-16 lg:pt-20 min-h-screen overflow-hidden bg-gradient-to-b from-black via-gray-900 to-[#001934]">
      <div className="relative z-10">
        {/* Main Page Heading */}
        <section className="py-16 lg:py-20 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-arizona">
              <span className="text-white">Get In </span>
              <span className="text-[#B8860B]">Touch</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Ready to tell us your mind and we bring that to life with our quality Engneering services.
            </p>
          </div>
        </section>

        {/* Contact Information & Form Section */}
        <section className="pb-16 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <ContactInfoSection />
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
