import React, { useEffect, useState } from "react";
import Image from "next/image";
import type { ImageProps } from "next/image";

type HandledImageProps = Omit<ImageProps, "src"> & {
  src: ImageProps["src"] | null | undefined;
  fallbackSrc?: string;
};

const HandledImage: React.FC<HandledImageProps> = ({
  src,
  alt,
  fallbackSrc = "/images/errorImage.png",
  onError,
  ...rest
}) => {
  // Use fallback directly if src is empty string, null or undefined
  const initialSrc = !src || src === "" ? fallbackSrc : src;

  const [imgSrc, setImgSrc] = useState(initialSrc);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(initialSrc);
  }, [initialSrc]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }

    if (onError) {
      onError(e);
    }
  };

  return (
    <Image src={imgSrc} alt={alt} onError={handleError} sizes="100" {...rest} />
  );
};

export default HandledImage;
