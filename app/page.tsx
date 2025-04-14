import ContactForm from "@/components/contact-form"
import StarryBackground from "@/components/starry-background"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <StarryBackground />

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center z-10 mb-20">
        <div className="relative w-32 h-32 mb-4">
          <Image
            src="/pixelated-gaze.png"
            alt="Alex Ivos"
            width={128}
            height={128}
            className="rounded-full filter contrast-125 grayscale"
          />
        </div>
        <h1 className="text-2xl font-mono tracking-wider">alex ivos</h1>
      </div>

      {/* Links Section */}
      <div className="flex space-x-6 mb-12 z-10">
        <Link href="https://github.com" className="font-mono text-sm hover:underline">
          github
        </Link>
        <Link href="https://twitter.com" className="font-mono text-sm hover:underline">
          twitter
        </Link>
        <Link href="https://linkedin.com" className="font-mono text-sm hover:underline">
          linkedin
        </Link>
      </div>

      {/* Contact Form Section */}
      <div className="w-full max-w-md z-10 mt-20 mb-20">
        <h2 className="text-xl font-mono mb-6 text-center">contact me</h2>
        <ContactForm />
      </div>
    </main>
  )
}
