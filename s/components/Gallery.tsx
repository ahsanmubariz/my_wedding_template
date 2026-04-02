import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GALLERY_IMAGES } from '../constants';
import { IslamicCorner } from './Ornaments';
import { LazyImage } from './LazyImage';

export const Gallery: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const track = trackRef.current;
        if (!track) return;

        const getScrollAmount = () => {
            const trackWidth = track.scrollWidth;
            const windowWidth = window.innerWidth;
            return -(trackWidth - windowWidth);
        };

        const tween = gsap.to(track, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: () => `+=${track.scrollWidth}`,
                pin: true,
                scrub: true,
                invalidateOnRefresh: true,
                anticipatePin: 1,
            }
        });

        const images = gsap.utils.toArray('.gallery-img-inner');
        images.forEach((img: any) => {
            gsap.to(img, {
                scale: 1.2,
                ease: "none",
                scrollTrigger: {
                    trigger: img.closest('.gallery-item'),
                    containerAnimation: tween,
                    start: "left right",
                    end: "right left",
                    scrub: true,
                }
            });
        });

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative h-screen bg-cream-100 overflow-hidden">
            {/* Header Overlay */}
            <div className="absolute top-8 left-8 z-20">
                <h2 className="text-3xl md:text-5xl font-script text-emerald-700">Galeri Momen</h2>
                <p className="text-gold-600 text-xs md:text-sm tracking-[0.2em] uppercase mt-2 font-display">Momen Berharga</p>
            </div>

            {/* Horizontal Track */}
            <div
                ref={trackRef}
                className="flex h-full w-fit items-center px-[5vw] md:px-[10vw] will-change-transform"
            >
                {GALLERY_IMAGES.map((img, index) => (
                    <div
                        key={img.id}
                        className="gallery-item relative h-[60vh] md:h-[70vh] w-[80vw] md:w-[45vw] mr-[5vw] md:mr-[8vw] flex-shrink-0"
                    >
                        <div className="w-full h-full overflow-hidden rounded-[2rem] bg-cream-50 relative group shadow-soft border border-gold-200">
                            {/* Islamic Corner Ornaments */}
                            <div className="absolute top-0 left-0 z-30">
                                <IslamicCorner position="top-left" size={40} />
                            </div>
                            <div className="absolute top-0 right-0 z-30">
                                <IslamicCorner position="top-right" size={40} />
                            </div>
                            <div className="absolute bottom-0 left-0 z-30">
                                <IslamicCorner position="bottom-left" size={40} />
                            </div>
                            <div className="absolute bottom-0 right-0 z-30">
                                <IslamicCorner position="bottom-right" size={40} />
                            </div>

                            {/* Inner image for parallax */}
                            <div className="gallery-img-inner w-full h-full will-change-transform relative">
                                <LazyImage
                                    src={img.url}
                                    alt={img.caption}
                                    className="w-full h-full object-cover origin-center"
                                />
                            </div>

                            {/* Soft Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-cream-50/80 via-transparent to-transparent opacity-60" />

                            {/* Text */}
                            <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <span className="text-6xl md:text-8xl font-bold text-gold-400/20 absolute -top-16 right-4 pointer-events-none select-none font-display">
                                    0{index + 1}
                                </span>
                                <h3 className="text-2xl md:text-4xl font-script text-emerald-700 relative z-10">
                                    {img.caption}
                                </h3>
                            </div>
                        </div>
                    </div>
                ))}
                {/* End spacer */}
                <div className="w-[5vw] h-full flex-shrink-0" />
            </div>
        </section>
    );
};
