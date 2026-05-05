"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Utensils, Users, Clock, ShieldCheck, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

// Updated Stats for a Food Platform
const stats = [
  { label: "Partner Restaurants", value: "500+", icon: Utensils },
  { label: "Daily Deliveries", value: "2,500+", icon: ShoppingBag },
  { label: "Happy Foodies", value: "10k+", icon: Users },
  { label: "Avg. Delivery Time", value: "25min", icon: Clock },
];

// Updated "Skills" to "Service Excellence" metrics
const serviceMetrics = [
  { name: "Food Quality Assurance", percentage: 98 },
  { name: "On-Time Delivery", percentage: 92 },
  { name: "Partner Satisfaction", percentage: 88 },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* HERO SECTION */}
      <section className="relative h-[40vh] flex flex-col items-center justify-center bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Story</h1>
          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm uppercase tracking-widest">
            <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">About FoodHub</span>
          </div>
        </motion.div>
      </section>

      {/* MISSION SECTION */}
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative h-[400px]  rounded-3xl overflow-hidden group"
            >
              <Image
                src="https://i.ibb.co.com/Z1bBqCpq/about-6.jpg"
                alt="Kitchen operations"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 ring-1 ring-white/20 rounded-3xl" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <p className="text-orange-500 font-medium tracking-[0.3em] uppercase mb-4">Empowering Flavors</p>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  Connecting Kitchens <br /> To Your Doorstep
                </h2>
              </div>
              <p className="text-gray-400 leading-relaxed text-lg">
                FoodHub isn't just an ordering app; it's a dynamic ecosystem. Our
                role-based platform ensures that restaurant owners, delivery partners,
                and hungry customers stay perfectly synced. From real-time menu updates
                to precision tracking, we bridge the gap between great food and great
                experiences.
              </p>
              <Link href="/browse-meal" className="inline-block">
                <Button className="rounded-full px-8 py-6 text-lg bg-orange-500 text-white hover:bg-orange-600 transition-all transform hover:scale-105">
                  Explore Menu
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* METRICS & STATS SECTION */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Service Excellence */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              <div>
                <h2 className="text-4xl font-bold mb-6">Our Standards</h2>
                <p className="text-gray-400">
                  We maintain the highest benchmarks in the industry to ensure that
                  every role—from the chef to the rider—performs at their peak.
                </p>
              </div>

              <div className="space-y-8">
                {serviceMetrics.map((metric) => (
                  <div key={metric.name} className="space-y-3">
                    <div className="flex justify-between font-medium">
                      <span>{metric.name}</span>
                      <span>{metric.percentage}%</span>
                    </div>
                    <div className="h-[2px] bg-gray-800 w-full relative">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${metric.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute h-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors group text-center lg:text-left"
                >
                  <stat.icon className="w-8 h-8 mb-4 text-orange-500 mx-auto lg:mx-0" />
                  <h3 className="text-4xl font-bold mb-2 group-hover:text-orange-500 transition-colors">
                    {stat.value}
                  </h3>
                  <p className="text-gray-400 text-sm uppercase tracking-wider">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] rounded-[3rem] overflow-hidden flex flex-col items-center justify-center text-center px-6 bg-[url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974')] bg-cover bg-fixed bg-center"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div className="relative z-10 space-y-6">
              <p className="text-orange-500 font-medium tracking-[0.3em] uppercase">Join the Hub</p>
              <h2 className="text-4xl md:text-5xl font-bold max-w-2xl mx-auto leading-tight">
                Ready to Taste the <br /> Future of Food?
              </h2>
              <Link href="/login">
                <Button className="rounded-full px-10 py-7 text-lg bg-orange-500 text-white hover:bg-orange-600 transition-all shadow-xl">
                  Get Started
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}