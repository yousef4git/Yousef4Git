import Image from "next/image";
import signature from "@/public/media/yos-signature-ui.png";

// The site mark: Yousef's signature in its own amber, cut out of
// brand/yos-logo-source.png by scripts/build-brand.mjs, which also derives
// the favicon, the Apple icon and both social cards from it. This copy has a
// slightly heavier stroke so it holds at nav size. The class sets the
// height; the width follows the signature's proportions.
export default function Mark({ className = "h-7" }: { className?: string }) {
  return <Image src={signature} alt="" aria-hidden sizes="96px" className={`${className} w-auto`} />;
}
