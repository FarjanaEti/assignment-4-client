
"use client";

export const dynamic = "force-dynamic";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

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
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="relative z-10 flex h-full items-center justify-center text-center"
      >
        <div className="container max-w-3xl space-y-8 text-white">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm uppercase tracking-[0.24em] text-white/80 shadow-sm backdrop-blur-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              Live restaurants. Fresh menus.
            </span>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              <span className="block">Fresh Meals.</span>
              <span className="block text-amber-300">Fast Delivery.</span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg text-white/85">
              Discover your favorite meals from top restaurants near you — delivered hot and fresh to your doorstep with instant tracking and easy checkout.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ scale: 1.03 }} className="inline-flex rounded-full shadow-lg">
              <Button size="lg" asChild>
                <Link href="/browsMeal">Browse Meals</Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} className="inline-flex rounded-full shadow-lg">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white bg-white/20 hover:bg-white hover:text-black"
                asChild
              >
                <Link href="/beAprovider">Be a Provider</Link>
              </Button>
            </motion.div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Trusted by", value: "12K+" },
              { label: "Average delivery", value: "25 min" },
              { label: "Restaurants", value: "250+" },
            ].map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ y: -6 }}
                className="rounded-3xl border border-white/15 bg-white/10 px-5 py-4 text-left shadow-sm backdrop-blur-xl"
              >
                <p className="text-sm uppercase tracking-[0.2em] text-white/70">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
