"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

export const IMAGE_FALLBACK_SRC = "/images/fallback-dish.svg";

type SafeImageProps = Omit<ImageProps, "src" | "onError"> & {
  src: string;
};

/**
 * Wraps `next/image` and swaps in a bundled local asset if the source fails to
 * load, so every image still renders offline or when a remote host is blocked.
 */
export function SafeImage({ src, alt, unoptimized, ...rest }: SafeImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const failed = failedSrc === src;

  return (
    <Image
      {...rest}
      src={failed ? IMAGE_FALLBACK_SRC : src}
      alt={alt}
      unoptimized={failed ? true : unoptimized}
      onError={() => setFailedSrc(src)}
    />
  );
}
