"use client";

import React from "react";
import { motion } from "framer-motion";
import { Tag, Zap, Gift, Clock } from "lucide-react";

const offers = [
  {
    title: "50% Off First Order",
    code: "WELCOME50",
    type: "First Timer",
    icon: <Gift className="w-5 h-5" />,
    description: "Experience our finest culinary delights at half the price. Valid on all menu items for your very first order.",
    color: "from-primary/20 via-primary/5 to-transparent",
    borderColor: "border-primary/20",
    glow: "shadow-primary/10",
  },
  {
    title: "Free Delivery",
    code: "FREESHIP",
    type: "Flash Sale",
    icon: <Zap className="w-5 h-5" />,
    description: "No more extra charges. Order your favorite meals above ৳500 and we'll deliver them for free to your doorstep.",
    color: "from-accent/20 via-accent/5 to-transparent",
    borderColor: "border-accent/20",
    glow: "shadow-accent/10",
  },
  {
    title: "Buy 1 Get 1",
    code: "BOGO24",
    type: "Weekend Special",
    icon: <Clock className="w-5 h-5" />,
    description: "Make your weekends twice as tasty. Order any large meal and get another one absolutely free.",
    color: "from-secondary/20 via-secondary/5 to-transparent",
    borderColor: "border-secondary/20",
    glow: "shadow-secondary/10",
  },
];

export default function OfferSection() {
  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Promo code ${code} copied to clipboard!`);
  };

  return (
    <section className="relative container mx-auto px-4 py-24 overflow-hidden">
      {/* Premium Background Mesh */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] -z-10" />

      <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-1 w-12 bg-primary rounded-full" />
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs">
              Limited Time Deals
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-none">
            SAVOR THE <br />
            <span className="text-primary drop-shadow-sm">SAVINGS.</span>
          </h2>
        </div>
        <div className="max-w-md border-l-2 border-primary/20 pl-6 py-2">
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            From first-time treats to weekend feasts, we've curated the best 
            deals to make your dining experience extraordinary and affordable.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {offers.map((offer, index) => (
          <motion.div
            key={offer.code}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={`group relative overflow-hidden rounded-[2rem] border ${offer.borderColor} bg-gradient-to-br ${offer.color} p-8 hover:shadow-2xl ${offer.glow} transition-all duration-500`}
          >
            {/* Background Accent */}
            <div className={`absolute -right-10 -top-10 w-32 h-32 opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-all duration-500 ${
              index === 0 ? "bg-primary" : index === 1 ? "bg-accent" : "bg-secondary"
            }`} />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/10 shadow-inner">
                  {offer.icon}
                </div>
                <span className="text-xs font-black uppercase tracking-[0.2em] opacity-70">
                  {offer.type}
                </span>
              </div>

              <h3 className="text-2xl font-extrabold mb-4 group-hover:translate-x-1 transition-transform duration-300">
                {offer.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-10 leading-relaxed min-h-[3rem]">
                {offer.description}
              </p>

              <div 
                onClick={() => copyToClipboard(offer.code)}
                className="relative group/code cursor-pointer mb-8"
              >
                <div className="absolute inset-0 bg-background/50 backdrop-blur-sm rounded-2xl border-2 border-dashed border-white/20 group-hover/code:border-primary/40 transition-all duration-300" />
                <div className="relative py-5 px-6 flex items-center justify-between">
                  <span className="font-mono text-2xl font-black tracking-tighter text-foreground/90">
                    {offer.code}
                  </span>
                  <div className="bg-primary/10 p-2 rounded-lg group-hover/code:bg-primary group-hover/code:text-white transition-all duration-300">
                    <Tag className="w-4 h-4" />
                  </div>
                </div>
                <div className="absolute -top-3 left-6 bg-background border border-border px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary opacity-0 group-hover/code:opacity-100 -translate-y-2 group-hover/code:translate-y-0 transition-all duration-300 shadow-xl">
                  Copy Code
                </div>
              </div>

              <button 
                className="w-full bg-foreground text-background py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-primary hover:text-white transition-all active:scale-[0.97] shadow-xl"
              >
                Claim Offer
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
