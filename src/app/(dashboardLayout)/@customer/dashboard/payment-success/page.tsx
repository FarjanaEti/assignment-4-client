"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Download, Home, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl bg-card border border-border/50 rounded-[3rem] shadow-2xl shadow-primary/5 p-8 md:p-12 relative backdrop-blur-sm"
      >
        {/* Animated Success Icon */}
        <div className="flex justify-center mb-10">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20, 
              delay: 0.3 
            }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-ping" />
            <div className="relative bg-linear-to-br from-primary to-primary/80 p-6 rounded-full shadow-2xl shadow-primary/40">
              <CheckCircle2 size={48} className="text-white" strokeWidth={2.5} />
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="text-center space-y-4 mb-12">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-4xl md:text-5xl font-black tracking-tight text-foreground"
          >
            Payment <span className="text-primary">Successful!</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed"
          >
            Your order has been confirmed and is now being prepared by our chefs. 
            Get ready for a delicious experience!
          </motion.p>
        </div>

        {/* Info Grid */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12"
        >
          <div className="p-6 rounded-3xl bg-muted/30 border border-border/50 space-y-1">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Order Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <p className="font-bold text-lg">Confirmed</p>
            </div>
          </div>
          <div className="p-6 rounded-3xl bg-muted/30 border border-border/50 space-y-1">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Estimated Delivery</p>
            <p className="font-bold text-lg text-primary">30-45 Mins</p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/dashboard/orders" className="flex-1">
            <Button size="lg" className="w-full h-16 rounded-2xl font-black text-base gap-3 group shadow-xl shadow-primary/20">
              Track Order
              <ShoppingBag size={20} className="group-hover:rotate-12 transition-transform" />
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button variant="outline" size="lg" className="w-full h-16 rounded-2xl font-black text-base gap-3 border-2 hover:bg-muted/50">
              <Home size={20} />
              Home
            </Button>
          </Link>
        </motion.div>

        {/* Quick Receipt Link */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center"
        >
          <button className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors group">
            <Download size={16} className="group-hover:-translate-y-0.5 transition-transform" />
            Download Receipt
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}