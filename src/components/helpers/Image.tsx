import type { Any } from "@/lib/types";
import LoadingImage from "@/assets/images/Photo.gif";
import FallbackImage from "@/assets/images/drink_image.png";
import React, {
  useEffect,
  useState,
  forwardRef,
  type ImgHTMLAttributes,
} from "react";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  loadingSrc?: string;
  fallbackSrc?: string;
}

const AppImage = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      loadingSrc = LoadingImage,
      fallbackSrc = FallbackImage,
      onLoad,
      onError,
      alt,
      ...rest
    },
    ref
  ) => {
    const [currentSrc, setCurrentSrc] = useState<string>(loadingSrc);

    useEffect(() => {
      let cancelled = false;
      setCurrentSrc(loadingSrc);
      const img = new Image();
      img.src = src;
      const handleSuccess = () => {
        if (cancelled) return;
        setCurrentSrc(src);
      };
      const handleError = () => {
        if (cancelled) return;
        setCurrentSrc(fallbackSrc);
      };

      if ("decode" in img && typeof (img as Any).decode === "function") {
        (img as Any).decode().then(handleSuccess).catch(handleError);
      } else {
        img.onload = handleSuccess;
        img.onerror = handleError;
      }

      return () => {
        cancelled = true;
      };
    }, [src, loadingSrc, fallbackSrc]);

    return (
      <img
        ref={ref}
        alt={alt}
        src={currentSrc}
        onLoad={(e) => onLoad?.(e)}
        onError={(e) => {
          onError?.(e);
        }}
        {...rest}
      />
    );
  }
);

export default AppImage;
