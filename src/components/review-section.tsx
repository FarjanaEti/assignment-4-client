"use client";

import { motion } from "framer-motion";

const reviews = [
  {
    name: "Aisha Khan",
    role: "Food Lover",
    rating: 5,
    comment:
      "The delivery was lightning fast and every dish tasted amazing. I love the clean app experience and reliable service.",
    avatar: "/avatar-1.png",
  },
  {
    name: "Jonas Lee",
    role: "Busy Professional",
    rating: 5,
    comment:
      "Ordering is effortless and the meals always arrive fresh. The app saved me so much time this week.",
    avatar: "/avatar-2.png",
  },
  {
    name: "Maria Gomez",
    role: "Family Chef",
    rating: 4,
    comment:
      "My kids loved the food, and the tracking feature made it easy to know exactly when the order would arrive.",
    avatar: "/avatar-3.png",
  },
  {
    name: "Sarah Chen",
    role: "Gourmet Critic",
    rating: 5,
    comment:
      "Exceptional variety of cuisines. The quality of ingredients is clearly superior to other platforms.",
    avatar: "/avatar-4.png",
  },
  {
    name: "David Miller",
    role: "Fitness Enthusiast",
    rating: 5,
    comment:
      "The healthy options are fantastic. I can easily track my macros with the detailed meal descriptions.",
    avatar: "/avatar-1.png",
  },
  {
    name: "Elena Rodriguez",
    role: "Student",
    rating: 4,
    comment:
      "Affordable and delicious! The student discounts make it my go-to for late-night study sessions.",
    avatar: "/avatar-2.png",
  },
];

export default function ReviewSection() {
  return (
    <div className="h-full">
      <div className="h-full rounded-[2rem] border border-border bg-primary/5 p-8 shadow-lg backdrop-blur-xl flex flex-col">
        <div className="mb-8 text-left">
          <p className="text-sm uppercase tracking-[0.3em] text-primary/80">What customers say</p>
          <h2 className="mt-4 text-3xl font-bold text-secondary">Real reviews from happy customers</h2>
        </div>

        <div className="relative grow overflow-hidden h-100">
          {/* Fading effects for top and bottom */}
          <div className="absolute top-0 left-0 right-0 h-12 bg-linear-to-b from-primary/5 to-transparent z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-primary/5 to-transparent z-10" />

          <motion.div
            animate={{
              y: [0, -1000],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="space-y-6 py-4"
          >
            {/* Double the reviews for seamless scrolling */}
            {[...reviews, ...reviews].map((review, index) => (
              <div
                key={`${review.name}-${index}`}
                className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/85 p-6 shadow-xl backdrop-blur-xl dark:bg-slate-900/80"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 overflow-hidden rounded-full bg-primary/10">
                    <img src={review.avatar} alt={review.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-secondary">{review.name}</p>
                    <p className="text-sm text-muted-foreground">{review.role}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, star) => (
                      <span key={star} className="text-xs">
                        {star < review.rating ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-secondary italic">“{review.comment}”</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
