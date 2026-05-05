"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Utensils, ShieldCheck, LayoutDashboard } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Utensils,
    title: "Browse Meals Easily",
    description:
      "Explore meals from verified restaurants with filters for cuisine, dietary needs, and price range.",
  },
  {
    icon: Users,
    title: "Trusted Providers",
    description:
      "View detailed restaurant profiles, menus, and offerings before making a decision.",
  },
  {
    icon: LayoutDashboard,
    title: "Role-Based Dashboards",
    description:
      "Customers and providers access different dashboards tailored to their responsibilities.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Scalable",
    description:
      "Authentication and role-based access ensure a secure experience for every user.",
  },
];

export default function WhyFoodHub() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const stats = [
      { value: 98 },
      { value: 100 },
      { value: 95 }
    ];

    const features = [
      { progress: 100 },
      { progress: 92 },
      { progress: 96 },
      { progress: 100 }
    ];

    // Animate stats circles and numbers
    stats.forEach((stat, i) => {
      const circle = `.stat-circle-${i}`;
      const number = `.stat-number-${i}`;

      const circumference = 2 * Math.PI * 70;
      const offset = circumference - (stat.value / 100) * circumference;

      gsap.to(circle, {
        strokeDashoffset: offset,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: circle,
          start: "top 85%",
        }
      });

      gsap.to({ val: 0 }, {
        val: stat.value,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: number,
          start: "top 85%",
        },
        onUpdate: function () {
          const el = document.querySelector(number);
          if (el) el.textContent = Math.floor(this.targets()[0].val).toString();
        }
      });
    });

    // Animate feature bars and percentages
    features.forEach((feature, i) => {
      const bar = `.feature-bar-${i}`;
      const num = `.feature-number-${i}`;

      gsap.to(bar, {
        width: `${feature.progress}%`,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: bar,
          start: "top 90%",
        }
      });

      gsap.to({ val: 0 }, {
        val: feature.progress,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: num,
          start: "top 90%",
        },
        onUpdate: function () {
          const el = document.querySelector(num);
          if (el) el.textContent = `${Math.floor(this.targets()[0].val)}%`;
        }
      });
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="flex flex-col">
      {/* HERO */}

      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Why <span className="text-primary">FoodHub</span> Exists
            </h1>

            <p className="text-lg text-muted-foreground mb-6">
              FoodHub is designed to bridge the gap between customers and food
              providers through a role-based, scalable, and user-centric platform.
            </p>

            <p className="text-muted-foreground">
              Instead of mixing responsibilities, FoodHub separates public discovery
              from authenticated dashboards — ensuring clarity, security, and a
              smoother experience for everyone involved.
            </p>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-2xl bg-primary/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl shadow-xl border">
              <Image
                src="/why_food.jpeg"
                alt="FoodHub platform overview"
                width={700}
                height={500}
                className="object-cover"
              />
            </div>
          </motion.div>

        </div>
      </section>


      {/* PURPOSE */}
      <section className="container mx-auto px-6 py-16 text-center max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-6"
        >
          Built With Purpose
        </motion.h2>

        <p className="text-muted-foreground text-lg">
          FoodHub was created to simplify how people discover meals and how food
          providers manage their offerings. By separating public browsing from
          role-based dashboards, the platform ensures efficiency, security, and
          scalability.
        </p>
      </section>

      {/* FEATURES */}
      <section className="container mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-xl border bg-background p-6 text-center shadow-sm"
            >
              <feature.icon className="mx-auto mb-4 h-10 w-10 text-primary" />
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* COMPLETENESS SIGNAL */}


      {/* ROLE BASED */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-6"
          >
            Designed for Multiple Roles
          </motion.h2>

          <p className="text-muted-foreground text-lg">
            Customers can browse meals, explore restaurants, and place orders,
            while providers manage menus and track orders through a dedicated
            dashboard. This separation ensures clarity, accountability, and a
            smooth experience for everyone.
          </p>
        </div>
      </section>
    </div>
  );
}
