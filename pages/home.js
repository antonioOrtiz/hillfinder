import Image from 'next/image'
import hilfinderBackgroundImg from 'public/home-page-bg/hillfinder-hero-1x.jpg'

export default function Home() {
  return (
    <div className="flex items-center justify-center pt-10">
      <Image
        alt="Hillfinder hero"
        src={hilfinderBackgroundImg}
        width={960}
        height={540}
        // blurDataURL="data:..." automatically provided
        placeholder="blur" // Optional blur-up while loading
      />
    </div>
  );
}
