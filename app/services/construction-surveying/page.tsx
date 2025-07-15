"use client"

import { CheckCircle, Calculator, Users, Clock, Shield, MapPin, FileText, Phone, Mail } from "lucide-react"

export default function ConstructionSurveyingPage() {
  return (
    <div className="min-h-screen pt-20 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#001934] mb-4">Construction Surveying Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Precise construction surveying for building projects, road construction, and infrastructure development
          </p>
        </div>

        {/* Service Overview */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-[#001934] mb-4">Service Overview</h2>
              <p className="text-gray-600 mb-6">
                Our construction surveying services provide accurate measurements and layout for all types of construction projects. We work closely with contractors and engineers to ensure precise positioning and quality control throughout the construction process.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#B8860B] mr-3" />
                  <span className="text-gray-700">Building layout and positioning</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#B8860B] mr-3" />
                  <span className="text-gray-700">Road and infrastructure surveys</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#B8860B] mr-3" />
                  <span className="text-gray-700">As-built surveys and verification</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#B8860B] mr-3" />
                  <span className="text-gray-700">Construction monitoring and quality control</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-[#001934] mb-4">Our Expertise</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Calculator className="w-5 h-5 text-[#B8860B] mr-3" />
                  <span className="text-gray-700">Building Layout Surveys</span>
                </div>
                <div className="flex items-center">
                  <Calculator className="w-5 h-5 text-[#B8860B] mr-3" />
                  <span className="text-gray-700">Road Construction Surveys</span>
                </div>
                <div className="flex items-center">
                  <Calculator className="w-5 h-5 text-[#B8860B] mr-3" />
                  <span className="text-gray-700">Infrastructure Development</span>
                </div>
                <div className="flex items-center">
                  <Calculator className="w-5 h-5 text-[#B8860B] mr-3" />
                  <span className="text-gray-700">As-Built Surveys</span>
                </div>
                <div className="flex items-center">
                  <Calculator className="w-5 h-5 text-[#B8860B] mr-3" />
                  <span className="text-gray-700">Quality Control Verification</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <MapPin className="w-12 h-12 text-[#B8860B] mb-4" />
            <h3 className="text-xl font-bold text-[#001934] mb-3">Building Layout Surveys</h3>
            <p className="text-gray-600 mb-4">
              Precise positioning and layout of building foundations, walls, and structural elements.
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Foundation layout and marking</li>
              <li>• Structural element positioning</li>
              <li>• Floor plan verification</li>
              <li>• Elevation control</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <Calculator className="w-12 h-12 text-[#B8860B] mb-4" />
            <h3 className="text-xl font-bold text-[#001934] mb-3">Road Construction Surveys</h3>
            <p className="text-gray-600 mb-4">
              Comprehensive surveying for road construction, highways, and transportation infrastructure.
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Alignment and grade control</li>
              <li>• Cross-section measurements</li>
              <li>• Drainage system layout</li>
              <li>• Traffic control setup</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <FileText className="w-12 h-12 text-[#B8860B] mb-4" />
            <h3 className="text-xl font-bold text-[#001934] mb-3">As-Built Surveys</h3>
            <p className="text-gray-600 mb-4">
              Verification and documentation of completed construction work for quality assurance.
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Construction verification</li>
              <li>• Quality control documentation</li>
              <li>• Compliance checking</li>
              <li>• Final project documentation</li>
            </ul>
          </div>
        </div>

        {/* Process Section */}
        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-[#001934] mb-6 text-center">Construction Surveying Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-[#B8860B] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold">1</div>
              <h3 className="font-semibold text-[#001934] mb-2">Project Planning</h3>
              <p className="text-sm text-gray-600">Review construction plans and requirements</p>
            </div>
            <div className="text-center">
              <div className="bg-[#B8860B] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold">2</div>
              <h3 className="font-semibold text-[#001934] mb-2">Site Setup</h3>
              <p className="text-sm text-gray-600">Establish control points and reference markers</p>
            </div>
            <div className="text-center">
              <div className="bg-[#B8860B] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold">3</div>
              <h3 className="font-semibold text-[#001934] mb-2">Construction Monitoring</h3>
              <p className="text-sm text-gray-600">Regular surveys during construction process</p>
            </div>
            <div className="text-center">
              <div className="bg-[#B8860B] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold">4</div>
              <h3 className="font-semibold text-[#001934] mb-2">Final Verification</h3>
              <p className="text-sm text-gray-600">As-built survey and quality control</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-[#001934] rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Start Your Construction Survey?</h2>
          <p className="text-gray-300 mb-6">
            Contact us today for professional construction surveying services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-[#B8860B] hover:bg-[#B8860B]/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Get Quote
            </a>
            <a
              href="tel:+256700000000"
              className="border border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 