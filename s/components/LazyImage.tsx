import React, { useState } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    skeletonClassName?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
    src,
    alt,
    className = '',
    skeletonClassName = '',
    ...rest
}) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    return (
        <span className="contents">
            {/* Skeleton shown while image is loading */}
            {!loaded && !error && (
                <span
                    className={`absolute inset-0 skeleton-shimmer ${skeletonClassName}`}
                    aria-hidden="true"
                />
            )}

            <img
                src={src}
                alt={alt}
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
                className={`${className} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                {...rest}
            />
        </span>
    );
};
