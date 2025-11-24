'use client'
import { CardContent } from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Image from "next/image";
import { useRef } from "react";

const images = [
   
    '/Sanaullah.jpg',
    '/Afshan Sindhi.jpg',
    '/Ghulam Hussain.jpg',
    '/Irfan.jpg',
    '/Shabana.jpg',
    '/Abdul Rauf.jpg',
    '/Waqar Shah.jpg',
    '/slideShow5.jpg',
    '/Naveed Shaikh.jpg',
    
];

const CarouselDemo = () => {
    const plugin = useRef(
        Autoplay({ delay: 1000, stopOnInteraction: true })
    )
    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full h-auto"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent className="flex justify-between items-center">
                {images.map((image, index) => (
                    <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3"> 
                        <div className="p-1">
                            <CardContent className="flex items-center justify-center p-6 h-[300px] md:h-[400px] lg:h-[500px]">
                                <Image
                                    src={image}
                                    alt={`image-${index}`}
                                    width={500}
                                    height={500}
                                    className="w-full h-full object-cover"
                                />
                            </CardContent>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}
export default CarouselDemo;