import Link from "next/link";
import Image from "next/image";

const LogoImageList: { image: string }[] = [
  {
    image: "/images/logo1.png",
  },
  {
    image: "/images/logo2.png",
  },
  {
    image: "/images/logo3.png",
  },
  {
    image: "/images/logo4.png",
  },
];

export default function HeroSection() {
  return (
    <section className="w-full bg-gray-50 py-6 md:py-12">
      <div className="container xl:px-6 mx-auto px-4 flex flex-col items-center gap-12">
        <div className="max-w-3xl mx-auto text-center flex flex-col gap-4 lg:gap-6 items-center">
          <h3 className="text-xl md:text-2xl lg:text-4xl font-bold">
            Better clothing for the planet
          </h3>
          <p className="text-[#979797] text-lg md:text-xl">
            Create screens directly in Method or add your images from Sketch or
            Figma. You can even sync designs from your cloud storage!
          </p>
          <Link
            href="/shop"
            className="px-16 py-2 h-auto text-base border border-black bg-white text-black hover:bg-gray-100 grow-0"
          >
            Shop All
          </Link>
        </div>
        <div className="w-full max-w-5xl">
          <div className="aspect-[16/9] bg-gray-300 w-full relative">
            <Image
              src={"/images/wallpaper.png"}
              alt={`new event`}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        <div className="w-full max-w-4xl gap-0 flex justify-center flex-wrap">
          {LogoImageList.map((img, index) => (
            <div key={index} className="w-1/4 relative h-10">
              <Image
                key={index}
                src={img.image}
                alt={`branch ${index}`}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
