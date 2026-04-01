import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// ============================================
// Islamic 8-Point Star
// ============================================
export const IslamicStar8Point: React.FC<{
    size?: number;
    className?: string;
    color?: string;
}> = ({ size = 60, className = '', color = '#D4AF37' }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            className={className}
            fill="none"
        >
            <path
                d="M50 0L56 38L94 50L56 62L50 100L44 62L6 50L44 38Z"
                fill={color}
                fillOpacity="0.15"
            />
            <path
                d="M50 15L53 42L85 50L53 58L50 85L47 58L15 50L47 42Z"
                stroke={color}
                strokeWidth="0.5"
                fill="none"
            />
            <circle cx="50" cy="50" r="8" fill={color} fillOpacity="0.3" />
        </svg>
    );
};

// ============================================
// Crescent Moon with Star
// ============================================
export const CrescentMoon: React.FC<{
    size?: number;
    className?: string;
    color?: string;
}> = ({ size = 40, className = '', color = '#059669' }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 50 50"
            className={className}
            fill="none"
        >
            <path
                d="M25 5C14 5 5 14 5 25C5 36 14 45 25 45C30 45 34.5 43 38 40C32 40 27 34 27 27C27 20 32 14 38 14C34.5 10.5 30 8 25 5Z"
                fill={color}
                fillOpacity="0.8"
            />
            <path
                d="M40 8L41.5 12L45.5 13.5L41.5 15L40 19L38.5 15L34.5 13.5L38.5 12Z"
                fill={color}
            />
        </svg>
    );
};

// ============================================
// Arabesque Border Pattern
// ============================================
export const ArabesqueBorder: React.FC<{
    width?: string;
    className?: string;
}> = ({ width = '100%', className = '' }) => {
    return (
        <svg
            width={width}
            height="24"
            viewBox="0 0 400 24"
            className={className}
            preserveAspectRatio="xMidYMid slice"
        >
            <defs>
                <pattern id="arabesque" x="0" y="0" width="50" height="24" patternUnits="userSpaceOnUse">
                    <path
                        d="M0 12C5 6 10 6 15 12C20 18 25 18 25 12C25 6 30 6 35 12C40 18 45 18 50 12"
                        stroke="#D4AF37"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                    />
                    <circle cx="0" cy="12" r="2" fill="#059669" />
                    <circle cx="25" cy="12" r="2" fill="#059669" />
                    <circle cx="50" cy="12" r="2" fill="#059669" />
                </pattern>
            </defs>
            <rect width="100%" height="24" fill="url(#arabesque)" />
        </svg>
    );
};

// ============================================
// Geometric Divider
// ============================================
export const GeometricDivider: React.FC<{
    className?: string;
}> = ({ className = '' }) => {
    return (
        <div className={`flex items-center justify-center gap-4 ${className}`}>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
            <IslamicStar8Point size={24} />
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
        </div>
    );
};

// ============================================
// Bismillah Header
// ============================================
export const BismillahHeader: React.FC<{
    className?: string;
}> = ({ className = '' }) => {
    return (
        <div className={`text-center ${className}`}>
            <p className="font-arabic text-3xl md:text-4xl text-emerald-700 leading-relaxed tracking-wide">
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </p>
            <p className="text-xs text-charcoal-700/60 mt-2 tracking-widest uppercase">
                Dengan Nama Allah Yang Maha Pengasih Lagi Maha Penyayang
            </p>
        </div>
    );
};

// ============================================
// Islamic Corner Ornament
// ============================================
export const IslamicCorner: React.FC<{
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    size?: number;
    className?: string;
}> = ({ position, size = 60, className = '' }) => {
    const rotations = {
        'top-left': 'rotate-0',
        'top-right': 'rotate-90',
        'bottom-right': 'rotate-180',
        'bottom-left': '-rotate-90',
    };

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 60 60"
            className={`${rotations[position]} ${className}`}
            fill="none"
        >
            <path
                d="M0 0L30 0C15 0 0 15 0 30L0 0Z"
                fill="#D4AF37"
                fillOpacity="0.1"
            />
            <path
                d="M0 0L25 0M0 0L0 25"
                stroke="#D4AF37"
                strokeWidth="2"
            />
            <path
                d="M5 5L20 5L20 8C15 8 10 12 8 20L5 20Z"
                fill="#059669"
                fillOpacity="0.2"
            />
            <circle cx="5" cy="5" r="3" fill="#D4AF37" />
        </svg>
    );
};

// ============================================
// Mosque Arch Frame
// ============================================
export const MosqueArch: React.FC<{
    children?: React.ReactNode;
    className?: string;
}> = ({ children, className = '' }) => {
    return (
        <div className={`relative ${className}`}>
            <svg
                className="absolute inset-x-0 top-0 w-full h-auto"
                viewBox="0 0 400 80"
                preserveAspectRatio="xMidYMin slice"
                fill="none"
            >
                <path
                    d="M0 80 L0 40 Q0 0 40 0 L360 0 Q400 0 400 40 L400 80"
                    stroke="#D4AF37"
                    strokeWidth="2"
                    fill="none"
                />
                <path
                    d="M200 0 L200 10"
                    stroke="#D4AF37"
                    strokeWidth="2"
                />
                <circle cx="200" cy="15" r="5" fill="#059669" />
            </svg>
            <div className="pt-20">{children}</div>
        </div>
    );
};

// ============================================
// Floating Geometry (replaces AmbientOrbs)
// ============================================
export const FloatingGeometry: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.to('.geo-float', {
            y: -40,
            x: 20,
            rotation: 360,
            duration: 25,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: {
                amount: 8,
                from: "random"
            }
        });

        gsap.to('.geo-float', {
            opacity: 0.8,
            duration: 6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: {
                amount: 3,
                from: "random"
            }
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Top Left Star */}
            <div className="geo-float absolute top-[10%] left-[5%] opacity-40">
                <IslamicStar8Point size={80} color="#D4AF37" />
            </div>

            {/* Top Right Crescent */}
            <div className="geo-float absolute top-[15%] right-[10%] opacity-30">
                <CrescentMoon size={60} color="#059669" />
            </div>

            {/* Middle Left */}
            <div className="geo-float absolute top-[40%] left-[8%] opacity-25">
                <IslamicStar8Point size={50} color="#059669" />
            </div>

            {/* Middle Right Star */}
            <div className="geo-float absolute top-[50%] right-[5%] opacity-35">
                <IslamicStar8Point size={70} color="#D4AF37" />
            </div>

            {/* Bottom Left Crescent */}
            <div className="geo-float absolute bottom-[20%] left-[15%] opacity-30">
                <CrescentMoon size={50} color="#D4AF37" />
            </div>

            {/* Bottom Right */}
            <div className="geo-float absolute bottom-[10%] right-[15%] opacity-20">
                <IslamicStar8Point size={90} color="#059669" />
            </div>
        </div>
    );
};

// ============================================
// Subtle Pattern Overlay (replaces NoiseOverlay)
// ============================================
export const PatternOverlay: React.FC = () => {
    return (
        <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03]">
            <div className="w-full h-full islamic-pattern" />
        </div>
    );
};

// ============================================
// Grid Pattern (bright version)
// ============================================
export const GridPattern: React.FC = () => (
    <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]"
        style={{
            backgroundImage: `linear-gradient(to right, #D4AF37 1px, transparent 1px), linear-gradient(to bottom, #D4AF37 1px, transparent 1px)`,
            backgroundSize: '4rem 4rem'
        }}
    />
);
