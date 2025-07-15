"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function AboutUsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image Column */}
          <div className="relative h-[400px] lg:h-[500px] overflow-hidden rounded-xl shadow-xl">
            <img src="/images/hero/about-home.jpg" alt="Stratum Tech Construction" className="w-full  object-cover" />
            <div className="absolute inset-0 bg-[#001934]/20"></div>
          </div>

          {/* Content Column */}
          <div className="space-y-6">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[#B8860B] font-script text-3xl"
            >
              About Us
            </motion.h3>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-[#001934]"
            >
              Lets get innovative
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-700 text-lg leading-relaxed"
            >
              Stratum Tech Uganda Limited is a licensed construction company located in the heart of Uganda providing cutting edge construction 
              services with use of latest technologies there is. We specialise in customized construction of all kinds of engineering pieces
              with an added advantage of a skilled work force leading to our mission which is to ensure availabity and accessbility to 
              affordable structures in Uganda while maintaining quality and innovation.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-gray-700 text-lg leading-relaxed"
            >
              We are a fully licensed company overseen by Uganda Bureau of Standards and there by comply to all there regulations in archieving 
              a common goal as we shape this nation with innovation that is boarderless.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-[#B8860B] text-[#001934] font-semibold py-3 px-6 rounded-lg hover:bg-[#B8860B]/90 transition-all duration-200"
              >
                Learn More
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
