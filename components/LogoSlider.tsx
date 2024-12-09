import Image from 'next/image'

const logos = [
  {
    src: "/prologis.png",
    alt: "Prologis",
    width: 250,
    height: 200
  },
  {
    src: "/tower.png",
    alt: "American Tower",
    width: 250,
    height: 200
  },
  {
    src: "/equinix.png",
    alt: "Equinix",
    width: 250,
    height: 200
  },
  {
    src: "/realty.png",
    alt: "Digital Realty",
    width: 250,
    height: 200
  }
]

export function LogoSlider() {
  return (
    <div className="w-full bg-white/5 backdrop-blur-sm py-8 sm:py-12 overflow-hidden">
      <div className="relative flex">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {logos.concat(logos).map((logo, index) => (
            <div
              key={index}
              className="mx-4 sm:mx-8 md:mx-12 flex items-center justify-center"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={250}
                height={200}
                className="w-250 sm:w-320 md:w-auto grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center">
          {logos.concat(logos).map((logo, index) => (
            <div
              key={`duplicate-${index}`}
              className="mx-4 sm:mx-8 md:mx-12 flex items-center justify-center"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={250}
                height={200}
                className="w-250 sm:w-320 md:w-auto grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

