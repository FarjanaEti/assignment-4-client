"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How do I browse meals?",
    answer:
      "You can browse meals directly from the homepage or by navigating to the 'Browse Meals' section. Use filters to narrow down your search by cuisine, dietary needs, or price range.",
  },
  {
    question: "How can I become a food provider?",
    answer:
      "To become a provider, click on the 'Be a Provider' link in the navigation menu. You'll need to create an account and set up your restaurant profile.",
  },
  {
    question: "Is my payment secure?",
    answer:
      "FoodHub uses industry-standard encryption and secure payment gateways to ensure that your financial information is always protected.",
  },
  {
    question: "Can I track my order?",
    answer:
      "Yes! Once you place an order, you can track its status in real-time through your customer dashboard.",
  },
  {
    question: "What if I have issues with my order?",
    answer:
      "If you experience any problems, you can contact the restaurant directly through their profile page or reach out to FoodHub support for assistance.",
  },
];

export default function FAQSection() {
  return (
    <div className="h-full">
      <div className="h-full rounded-[2rem] border border-border bg-muted/10 p-8 shadow-lg backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-left mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>Support Center</span>
          </div>
          <h2 className="text-3xl font-bold mb-4 tracking-tight">
            Common <span className="text-primary">Questions</span>
          </h2>
          <p className="text-muted-foreground text-sm">
            Everything you need to know about using FoodHub.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border rounded-xl px-4 bg-background/50 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300 shadow-sm"
              >
                <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-xs pb-4 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </div>
  );
}
