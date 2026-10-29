import Image from "next/image";
import type { Media } from "@/content/site";

const FRAME =
  "overflow-hidden rounded-lg border border-bone/10 bg-night shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]";

// One image in the site's frame with its caption underneath.
export default function Frame({
  media,
  sizes,
  className = "",
  imgClassName = "w-full",
}: {
  media: Media;
  sizes: string;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <figure className={className}>
      <div data-frame className={FRAME}>
        <Image
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          className={imgClassName}
          sizes={sizes}
        />
      </div>
      <figcaption className="mt-3 text-xs leading-relaxed text-stone">{media.caption}</figcaption>
    </figure>
  );
}
