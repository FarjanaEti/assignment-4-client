import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Banner() {
  return (
    <section className="relative h-[80vh] min-h-520px w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/banner-food.avif" 
        alt="Delicious food background"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 dark:bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center text-center">
        <div className="container max-w-3xl space-y-6 text-white">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            <span className="block">Fresh Meals.</span>
            <span className="block text-white">Fast Delivery.</span>
          </h1>

          <p className="text-lg text-white/90">
            Discover your favorite meals from top restaurants near you —
            delivered hot and fresh to your doorstep.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/meals">Browse Meals</Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white text-black hover:bg-white hover:text-black"
              asChild
            >
              <Link href="/restaurants">Partner with Us</Link>
            </Button>
          </div>
        </div>
        </div>
    </section>
  );
}
