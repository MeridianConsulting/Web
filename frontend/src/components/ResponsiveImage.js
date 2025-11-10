import React from 'react';
import LazyImage from './LazyImage';

const ResponsiveImage = ({ 
  src, 
  srcWebp,
  srcSet,
  sizes = '100vw',
  alt, 
  className = '',
  style = {},
  ...props 
}) => {
  // Si no hay srcSet, usar la imagen normal
  if (!srcSet && !srcWebp) {
    return <LazyImage src={src} alt={alt} className={className} style={style} {...props} />;
  }

  return (
    <picture>
      {/* WebP format con srcset si está disponible */}
      {srcWebp && (
        <source
          type="image/webp"
          srcSet={srcWebp}
          sizes={sizes}
        />
      )}
      
      {/* Fallback formato original */}
      {srcSet && (
        <source
          srcSet={srcSet}
          sizes={sizes}
        />
      )}
      
      {/* Imagen fallback */}
      <LazyImage 
        src={src} 
        alt={alt} 
        className={className}
        style={style}
        {...props}
      />
    </picture>
  );
};

export default ResponsiveImage;

