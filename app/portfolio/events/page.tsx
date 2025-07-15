"use client"

// import { useEffect, useState } from "react"; // If fetching data
import HeroSectionPortfolioEM from "@/src/components/portfolio/HeroSectionPortfolioEM"
import PortfolioGridEM from "@/src/components/portfolio/PortfolioGridEM"
import { sampleEventPortfolioPageData } from "@/src/types/event-portfolio" // Using sample data
// import type { EventPortfolioPageData } from "@/src/types/event-portfolio";

// In a real app, you would fetch this data, e.g., from Firebase
const portfolioPageContent = sampleEventPortfolioPageData

export default function EventPortfolioPage() {
  // const [portfolioPageContent, setPortfolioPageContent] = useState<EventPortfolioPageData | null>(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Simulate fetching data from Firebase
  //   const fetchData = async () => {
  //     setLoading(true);
  //     // Replace with actual Firebase fetch logic
  //     await new Promise(resolve => setTimeout(resolve, 1000));
  //     setPortfolioPageContent(sampleEventPortfolioPageData);
  //     setLoading(false);
  //   };
  //   fetchData();
  // }, []);

  // if (loading || !portfolioPageContent) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-16 lg:pt-20">
  //       <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-royal-gold"></div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-white pt-16 lg:pt-20">
      {" "}
      {/* Navbar height offset */}
      <HeroSectionPortfolioEM heroData={portfolioPageContent.hero} />
      <PortfolioGridEM portfolioData={portfolioPageContent.portfolio} />
      {/* You can add more sections here if needed, e.g., testimonials related to portfolio items */}
    </div>
  )
}
