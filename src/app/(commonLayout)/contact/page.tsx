"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  LifeBuoy,
  MapPin,
  Phone,
  Send,
  Instagram,
  Facebook,
  Twitter,
  ChefHat,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";

const contactMethods = [
  {
    icon: MessageSquare,
    title: "Chat to Sales",
    description: "Speak to our restaurant partnership team.",
    contact: "sales@foodhub.com",
  },
  {
    icon: LifeBuoy,
    title: "Chat to Support",
    description: "We're here to help with your orders.",
    contact: "support@foodhub.com",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Visit our HQ in the heart of the city.",
    contact: "Dhaka, Bangladesh",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Mon-Fri from 9am to 6pm.",
    contact: "+880 1234-567890",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden">
      {/* COMBINED HERO & FORM SECTION */}
      <section className="container mx-auto px-6 py-20 relative">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -top-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"
          />
          <motion.div
            animate={{
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, delay: 1 }}
            className="absolute top-1/2 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-[120px]"
          />
        </div>

        <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-black/40 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Left Side: Visual & Info with BG Image */}
            <div className="relative p-12 lg:p-20 flex flex-col justify-between min-h-[600px] overflow-hidden group">
              {/* Background Image with Parallax-like effect */}
              <motion.div
                initial={{ scale: 1.1 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 10 }}
                className="absolute inset-0 z-0"
              >
                <Image
                  src="/contact-bg.png"
                  alt="Delicious Food"
                  fill
                  className="object-cover opacity-60 group-hover:opacity-70 transition-opacity duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
              </motion.div>

              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 mb-6"
                >
                  <div className="p-2 bg-primary/20 backdrop-blur-md rounded-lg border border-primary/20">
                    <ChefHat className="text-primary w-5 h-5" />
                  </div>
                  <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">Get in Touch</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-6xl lg:text-7xl font-black leading-none mb-8 tracking-tighter"
                >
                  Savor the <br />
                  <span className="text-primary drop-shadow-2xl">Connection.</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-300 text-lg max-w-md leading-relaxed border-l-2 border-primary/30 pl-6"
                >
                  We're crafting the future of food delivery. Whether you're hungry,
                  hosting, or helping us grow, your voice matters.
                </motion.p>
              </div>

              <div className="relative z-10 grid grid-cols-2 gap-8 pt-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-black mb-3">Headquarters</p>
                  <p className="text-gray-300 text-xs font-medium leading-loose uppercase opacity-80">
                    123 Culinary Boulevard<br />
                    Gourmet District<br />
                    Dhaka, Bangladesh
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-black mb-3">Follow the Taste</p>
                  <div className="flex gap-4">
                    {[Instagram, Facebook, Twitter].map((Icon, i) => (
                      <div key={i} className="p-2 rounded-full border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-all cursor-pointer group/icon">
                        <Icon size={16} className="text-gray-400 group-hover/icon:text-primary transition-colors" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Side: Glassmorphism Form */}
            <div className="relative bg-white/5 backdrop-blur-xl p-12 lg:p-20 flex flex-col justify-center">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />

              <div className="mb-10">
                <h2 className="text-4xl font-black mb-3 flex items-center gap-3 tracking-tight">
                  Drop a Message <Sparkles className="text-primary w-6 h-6 animate-pulse" />
                </h2>
                <p className="text-muted-foreground font-medium">Expect a delightful response within 24 hours.</p>
              </div>

              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase font-bold text-primary px-1">First Name</p>
                    <Input placeholder="John" className="bg-white/5 border-white/10 h-14 rounded-2xl focus:border-primary/50 focus:ring-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase font-bold text-primary px-1">Last Name</p>
                    <Input placeholder="Doe" className="bg-white/5 border-white/10 h-14 rounded-2xl focus:border-primary/50 focus:ring-primary/20" />
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] uppercase font-bold text-primary px-1">Email Address</p>
                  <Input placeholder="john@example.com" type="email" className="bg-white/5 border-white/10 h-14 rounded-2xl focus:border-primary/50 focus:ring-primary/20" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase font-bold text-primary px-1">Subject</p>
                    <select className="flex h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-gray-300">
                      <option className="bg-[#0a0a0a]">General Inquiry</option>
                      <option className="bg-[#0a0a0a]">Partnership</option>
                      <option className="bg-[#0a0a0a]">Support</option>
                      <option className="bg-[#0a0a0a]">Feedback</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase font-bold text-primary px-1">Phone (Optional)</p>
                    <Input placeholder="+880..." className="bg-white/5 border-white/10 h-14 rounded-2xl focus:border-primary/50 focus:ring-primary/20" />
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] uppercase font-bold text-primary px-1">Your Message</p>
                  <Textarea placeholder="What's on your mind?" className="bg-white/5 border-white/10 rounded-2xl min-h-[150px] focus:border-primary/50 focus:ring-primary/20 py-4" />
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-white h-16 text-lg rounded-2xl transition-all shadow-2xl shadow-primary/20 font-black uppercase tracking-widest group">
                  Send Message <Send className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* GRID SECTION */}
      <section className="pb-32 container mx-auto px-6 relative">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black mb-4 tracking-tight">Our Friendly <span className="text-primary">Team</span></h2>
          <p className="text-muted-foreground font-medium text-lg italic">We're just a heartbeat away.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:border-primary/30 hover:bg-white/[0.05] transition-all duration-500 group text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-primary/10 transition-all" />

              <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center mb-8 mx-auto group-hover:bg-primary group-hover:scale-110 transition-all duration-500 shadow-inner">
                <method.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-black mb-3 tracking-tight">{method.title}</h3>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed px-2">{method.description}</p>
              <p className="text-primary font-black cursor-pointer hover:scale-105 transition-transform inline-block border-b-2 border-primary/20 pb-1">
                {method.contact}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
