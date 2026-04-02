import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GALLERY_IMAGES } from '../constants';
import { LazyImage } from './LazyImage';

export const Gallery: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {

    const track = trackRef.current;
    if (!track) return;

    // Get total scrollable width
    const getScrollAmount = () => {
      const trackWidth = track.scrollWidth;
      const windowWidth = window.innerWidth;
      // We want to scroll exactly enough to show the last image flush right
      return -(trackWidth - windowWidth);
    };

    const tween = gsap.to(track, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        // The 'end' value defines how "long" or "slow" the scroll feels.
        // relative to the viewport height. 
        // +=3000 means user scrolls 3000px vertically to complete the horizontal move.
        end: () => `+=${track.scrollWidth}`,
        pin: true,
        scrub: true, // Removes the artificial lag
        invalidateOnRefresh: true, // Recalculate on resize
        anticipatePin: 1,
      }
    });

    // Parallax for inner images
    // We select all images inside the track
    const images = gsap.utils.toArray('.gallery-img-inner');
    images.forEach((img: any) => {
      gsap.to(img, {
        scale: 1.2, // Subtle zoom during scroll
        ease: "none",
        scrollTrigger: {
          trigger: img.closest('.gallery-item'),
          containerAnimation: tween, // Link to the horizontal scroll tween
          start: "left right", // When image enters viewport (horizontally)
          end: "right left",   // When image leaves viewport
          scrub: true,
        }
      });
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative h-screen bg-zinc-950 overflow-hidden">
      {/* Header Overlay */}
      <div className="absolute top-8 left-8 z-20 mix-blend-difference pointer-events-none">
        <h2 className="text-3xl md:text-5xl font-display font-medium text-zinc-100 tracking-tight">Galeri Momen</h2>
        <p className="text-zinc-400 text-xs md:text-sm tracking-[0.2em] uppercase mt-2 font-serif italic">Momen Berharga</p>
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
            <div className="w-full h-full overflow-hidden rounded-[2rem] bg-zinc-900 relative group shadow-2xl border border-white/5">
              {/* Inner image for parallax */}
              <div className="gallery-img-inner w-full h-full will-change-transform relative">
                <LazyImage
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-full object-cover origin-center"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

              {/* Text */}
              <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-6xl md:text-8xl font-bold text-white/10 absolute -top-16 right-4 pointer-events-none select-none">
                  0{index + 1}
                </span>
                <h3 className="text-2xl md:text-4xl font-serif italic text-white relative z-10">
                  {img.caption}
                </h3>
              </div>
            </div>
          </div>
        ))}
        {/* End spacer to ensure last item is fully viewable */}
        <div className="w-[5vw] h-full flex-shrink-0" />
      </div>
    </section>
  );
};