"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Utensils, ShieldCheck, LayoutDashboard } from "lucide-react";

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
  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="relative h-[60vh] flex min-h-420px">
        <Image
          src="/why-foodHub.jpeg"
          alt="FoodHub Experience"
          fill
          className="object-cover"
          priority
        />
        {/* <div className="absolute inset-0 bg-black/60" /> */}

        <div className=" flex h-full items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl text-white"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Why FoodHub?
            </h1>
            <p className="text-lg text-white/90">
              A modern food ordering platform built to connect customers and
              providers through clarity, control, and convenience.
            </p>
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
