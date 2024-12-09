import Image from 'next/image'

const logos = [
  {
    src: "/prologis.png",
    alt: "Prologis",
    width: 180,
    height: 100
  },
  {
    src: "/tower.png",
    alt: "American Tower",
    width: 180,
    height: 100
  },
  {
    src: "/equinix.png",
    alt: "Equinix",
    width: 180,
    height: 100
  },
  {
    src: "/realty.png",
    alt: "Digital Realty",
    width: 180,
    height: 100
  }
]

export function LogoSlider() {
  return (
    <div className="w-full bg-white/5 backdrop-blur-sm py-12">
      <div className="relative flex overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {logos.concat(logos).map((logo, index) => (
            <div
              key={index}
              className="mx-12 flex items-center justify-center"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center">
          {logos.concat(logos).map((logo, index) => (
            <div
              key={`duplicate-${index}`}
              className="mx-12 flex items-center justify-center"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

