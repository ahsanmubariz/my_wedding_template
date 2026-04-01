import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const STORY_STEPS = [
    {
        year: '2023',
        title: 'When We Met',
        description: 'Kami tidak bertemu lewat rencana besar. Hanya sebuah pertemuan sederhana... Namun dari sana, percakapan kecil berubah menjadi rasa nyaman yang diam-diam tumbuh di hati.',
    },
    {
        year: '2024',
        title: 'Becoming Us',
        description: 'Hari demi hari, kami belajar saling mengenal. Bukan hanya tentang bahagia, tetapi juga tentang perbedaan, luka, dan doa. Karena cinta bukan tentang kesempurnaan, melainkan tentang saling bertahan.',
    },
    {
        year: '2026',
        title: 'A Sacred Promise',
        description: 'Dengan keyakinan yang semakin kuat, dan restu dari kedua keluarga, kami mengikat sebuah janji dalam pertunangan. Sebagai langkah serius menuju masa depan bersama',
    },
    {
        year: '2026',
        title: 'Our Forever Begins',
        description: 'Kini, dengan niat yang sama dan doa yang menyertai, kami memilih untuk menyempurnakan perjalanan ini dalam ikatan suci pernikahan. Sebagai awal baru untuk berbagi hidup, tumbuh, dan menua bersama.',
    }
];

export const LoveStory: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Animate each story item
        const items = gsap.utils.toArray('.story-item');
        items.forEach((item: any, i) => {
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
        <section ref={sectionRef} className="py-32 bg-zinc-950 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-5xl font-display font-medium text-white mb-4">Kisah Cinta Kami</h2>
                    <p className="text-zinc-500 font-serif italic text-lg">Setiap langkah membawa kami lebih dekat.</p>
                </div>

                <div className="relative max-w-3xl mx-auto">
                    <div className="space-y-24 md:space-y-32">
                        {STORY_STEPS.map((step, index) => (
                            <div key={index} className="story-item flex flex-col items-center text-center">
                                <div className="relative mb-6">
                                    <span className="text-gold-400 font-display text-6xl md:text-8xl font-bold opacity-10 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10 select-none whitespace-nowrap">
                                        {step.year}
                                    </span>
                                    <h3 className="text-2xl md:text-3xl font-display text-white relative z-10">{step.title}</h3>
                                </div>
                                <p className="text-zinc-400 leading-relaxed font-serif text-base md:text-lg max-w-2xl">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
