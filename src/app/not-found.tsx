"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, FileQuestion, Hammer, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            rotate: -360,
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto space-y-8">
        {/* Animated 404 Visual */}
        <div className="relative h-48 md:h-64 flex items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[120px] md:text-[200px] font-black text-slate-200 dark:text-slate-800 leading-none select-none"
          >
            404
          </motion.h1>
          
          {/* Floating "Broken" Forge Animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
              className="relative"
            >
              <div className="p-6 md:p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 relative z-20">
                <div className="relative">
                  <motion.div
                    animate={{ 
                      rotate: [0, -10, 10, -10, 0],
                      y: [0, -5, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <FileQuestion className="w-16 h-16 md:w-24 md:h-24 text-primary" />
                  </motion.div>
                  
                  {/* Hammer hitting "wrong" spot */}
                  <motion.div
                    animate={{ 
                      rotate: [-20, -60, -20],
                      x: [0, -10, 0],
                      y: [0, -10, 0]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-4 -right-4 md:-top-8 md:-right-8 text-slate-400"
                  >
                    <Hammer className="w-8 h-8 md:w-12 md:h-12" />
                  </motion.div>
                </div>
              </div>
              
              {/* Spinning Gears */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 text-slate-300 dark:text-slate-700"
              >
                <Settings className="w-12 h-12 md:w-16 md:h-16" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-2"
        >
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
            Oops! This file is <span className="text-primary">missing from the forge.</span>
          </h2>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-4"
        >
          <Button asChild size="lg" className="rounded-full px-8 h-14 text-lg font-bold gap-2 shadow-lg shadow-primary/25">
            <Link href="/">
              <Home className="w-5 h-5" /> Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg font-bold gap-2">
            <Link href="/contact">
              Report Issue
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 0.4, 0]
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          className="absolute w-2 h-2 bg-primary/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}
    </div>
  );
}
