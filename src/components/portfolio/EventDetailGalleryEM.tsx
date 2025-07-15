"use client"

import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

interface EventDetailGalleryEMProps {
  imageUrls: string[]
  eventName: string
}

export default function EventDetailGalleryEM({ imageUrls, eventName }: EventDetailGalleryEMProps) {
  if (!imageUrls || imageUrls.length === 0) {
    return null
  }

  return (
    <div className="w-full max-w-full overflow-hidden">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-4 sm:mb-6 text-royal-blue break-words">
        Event Gallery
      </h2>
      <div className="relative w-full">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-full"
        >
          <CarouselContent className="-ml-2 sm:-ml-4">
            {imageUrls.map((url, index) => (
              <CarouselItem key={index} className="pl-2 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <div className="h-full">
                  <Card className="overflow-hidden h-full">
                    <CardContent className="flex aspect-video items-center justify-center p-0 h-full">
                      <div className="relative w-full h-full min-h-[200px] sm:min-h-[250px]">
                        <Image
                          src={url || "/placeholder.svg"}
                          alt={`${eventName} gallery image ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Buttons - Mobile Optimized */}
          <CarouselPrevious className="left-2 sm:left-4 bg-white/90 hover:bg-white text-royal-blue border-royal-blue w-8 h-8 sm:w-10 sm:h-10" />
          <CarouselNext className="right-2 sm:right-4 bg-white/90 hover:bg-white text-royal-blue border-royal-blue w-8 h-8 sm:w-10 sm:h-10" />
        </Carousel>

        {/* Image Counter */}
        <div className="text-center mt-3 sm:mt-4">
          <span className="text-xs sm:text-sm text-gray-600 bg-white/80 px-2 sm:px-3 py-1 rounded-full">
            {imageUrls.length} {imageUrls.length === 1 ? "image" : "images"}
          </span>
        </div>
      </div>
    </div>
  )
}
