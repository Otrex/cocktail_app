import FallbackImage from "@/assets/images/drink_image.png";
import { forwardRef, type ImgHTMLAttributes } from "react";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  loadingSrc?: string;
  fallbackSrc?: string;
}

const AppImage = forwardRef<HTMLImageElement, ImageProps>(
  (
    { src, fallbackSrc = FallbackImage, onLoad, onError, alt, ...rest },
    ref
  ) => {
    return (
      <img
        ref={ref}
        alt={alt}
        src={src}
        onLoad={(e) => onLoad?.(e)}
        onError={(e) => {
          if (e.target) {
            (e.target as HTMLImageElement).src = fallbackSrc;
          }
          onError?.(e);
        }}
        {...rest}
      />
    );
  }
);

export default AppImage;
