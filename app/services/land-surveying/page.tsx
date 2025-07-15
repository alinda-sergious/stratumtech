"use client"

import { CheckCircle, MapPin, Users, Clock, Shield, Calculator, FileText, Phone, Mail } from "lucide-react"

export default function LandSurveyingPage() {
  return (
    <div className="min-h-screen pt-20 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#001934] mb-4">Land Surveying Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional land surveying services for accurate property boundaries, topographic mapping, and land development projects
          </p>
        </div>

        {/* Service Overview */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-[#001934] mb-4">Service Overview</h2>
              <p className="text-gray-600 mb-6">
                Our expert land surveyors provide comprehensive surveying services using advanced GPS technology and traditional surveying equipment. We ensure accurate measurements and detailed reports for all types of land development projects.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#B8860B] mr-3" />
                  <span className="text-gray-700">Licensed and certified surveyors</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#B8860B] mr-3" />
                  <span className="text-gray-700">Advanced GPS and traditional equipment</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#B8860B] mr-3" />
                  <span className="text-gray-700">Detailed survey reports and documentation</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#B8860B] mr-3" />
                  <span className="text-gray-700">Fast turnaround times</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-[#001934] mb-4">Our Expertise</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-[#B8860B] mr-3" />
                  <span className="text-gray-700">Boundary Surveys</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-[#B8860B] mr-3" />
                  <span className="text-gray-700">Topographic Mapping</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-[#B8860B] mr-3" />
                  <span className="text-gray-700">Land Subdivision</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-[#B8860B] mr-3" />
                  <span className="text-gray-700">Site Planning</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-[#B8860B] mr-3" />
                  <span className="text-gray-700">GPS Surveys</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <MapPin className="w-12 h-12 text-[#B8860B] mb-4" />
            <h3 className="text-xl font-bold text-[#001934] mb-3">Boundary Surveys</h3>
            <p className="text-gray-600 mb-4">
              Accurate property boundary determination and marking for legal and development purposes.
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Property line identification</li>
              <li>• Corner monumentation</li>
              <li>• Legal boundary documentation</li>
              <li>• Dispute resolution support</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <Calculator className="w-12 h-12 text-[#B8860B] mb-4" />
            <h3 className="text-xl font-bold text-[#001934] mb-3">Topographic Mapping</h3>
            <p className="text-gray-600 mb-4">
              Detailed topographic surveys showing elevation, contours, and natural features of the land.
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Elevation measurements</li>
              <li>• Contour mapping</li>
              <li>• Natural feature documentation</li>
              <li>• Digital terrain modeling</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <FileText className="w-12 h-12 text-[#B8860B] mb-4" />
            <h3 className="text-xl font-bold text-[#001934] mb-3">Land Subdivision</h3>
            <p className="text-gray-600 mb-4">
              Professional land subdivision services for property development and legal compliance.
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Subdivision planning</li>
              <li>• Lot creation and marking</li>
              <li>• Regulatory compliance</li>
              <li>• Legal documentation</li>
            </ul>
          </div>
        </div>

        {/* Process Section */}
        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-[#001934] mb-6 text-center">Our Surveying Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-[#B8860B] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold">1</div>
              <h3 className="font-semibold text-[#001934] mb-2">Initial Consultation</h3>
              <p className="text-sm text-gray-600">Discuss project requirements and scope</p>
            </div>
            <div className="text-center">
              <div className="bg-[#B8860B] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold">2</div>
              <h3 className="font-semibold text-[#001934] mb-2">Field Survey</h3>
              <p className="text-sm text-gray-600">Conduct on-site measurements and data collection</p>
            </div>
            <div className="text-center">
              <div className="bg-[#B8860B] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold">3</div>
              <h3 className="font-semibold text-[#001934] mb-2">Data Processing</h3>
              <p className="text-sm text-gray-600">Analyze and process survey data</p>
            </div>
            <div className="text-center">
              <div className="bg-[#B8860B] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold">4</div>
              <h3 className="font-semibold text-[#001934] mb-2">Final Report</h3>
              <p className="text-sm text-gray-600">Deliver detailed survey report and documentation</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-[#001934] rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Start Your Land Survey?</h2>
          <p className="text-gray-300 mb-6">
            Contact us today for professional land surveying services
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