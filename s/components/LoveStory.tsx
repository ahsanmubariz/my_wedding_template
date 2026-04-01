import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { STORY_STEPS } from '../constants';
import { IslamicStar8Point, CrescentMoon } from './Ornaments';

export const LoveStory: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Animate each story item
        const items = gsap.utils.toArray('.story-item');
        items.forEach((item: any) => {
            gsap.from(item, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="py-32 bg-cream-50 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-5xl font-script text-emerald-700 mb-4">Kisah Cinta Kami</h2>
                    <p className="text-charcoal-700/60 font-serif italic text-lg">Setiap langkah adalah takdir dari Allah SWT.</p>
                </div>

                <div className="relative max-w-3xl mx-auto">
                    <div className="space-y-24 md:space-y-32">
                        {STORY_STEPS.map((step, index) => (
                            <div key={index} className="story-item flex flex-col items-center text-center">
                                <div className="mb-6 opacity-80">
                                    {index % 2 === 0 ? (
                                        <CrescentMoon size={32} color="#059669" />
                                    ) : (
                                        <IslamicStar8Point size={32} color="#D4AF37" />
                                    )}
                                </div>
                                <div className="relative mb-6 w-full flex justify-center">
                                    <span className="text-gold-400/20 font-display text-6xl md:text-8xl font-bold absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none whitespace-nowrap">
                                        {step.year}
                                    </span>
                                    <h3 className="text-2xl md:text-3xl font-script text-emerald-700 relative z-10">{step.title}</h3>
                                </div>
                                <p className="text-charcoal-700/80 leading-relaxed font-serif text-base md:text-lg max-w-2xl">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
