import React, { useState } from "react";
import Image from "next/image";
import type { ImageProps } from "next/image";

type HandledImageProps = ImageProps & {
  fallbackSrc?: string;
};

const HandledImage: React.FC<HandledImageProps> = ({
  src,
  alt,
  fallbackSrc = "/images/errorImage.png",
  onError,
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }

    if (onError) {
      onError(e);
    }
  };

  return <Image src={imgSrc} alt={alt} onError={handleError} {...rest} />;
};

export default HandledImage;
