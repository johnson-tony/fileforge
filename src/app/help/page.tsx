"use client";

import { motion } from "framer-motion";
import { Search, BookOpen, MessageCircle, PlayCircle, LifeBuoy } from "lucide-react";
import { Input } from "@/components/ui/input";

const GUIDES = [
  { title: "Getting Started", icon: PlayCircle, articles: 5 },
  { title: "File Security", icon: ShieldCheck, articles: 3 },
  { title: "Converter Types", icon: BookOpen, articles: 12 },
  { title: "Troubleshooting", icon: LifeBuoy, articles: 8 },
];

import { ShieldCheck } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-4 px-4 bg-primary text-white text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            How can we help?
          </h1>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              className="h-14 pl-12 pr-4 bg-white text-foreground rounded-full border-none text-lg shadow-xl" 
              placeholder="Search for articles, guides..."
            />
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="w-full py-4 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {GUIDES.map((guide, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 bg-card border rounded-3xl shadow-sm hover:shadow-md transition-all cursor-pointer space-y-4"
              >
                <div className="p-3 bg-primary/10 rounded-2xl w-fit text-primary">
                  <guide.icon className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{guide.title}</h3>
                  <p className="text-muted-foreground text-sm">{guide.articles} articles</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 grid md:grid-cols-2 gap-12">
            <div className="p-10 bg-muted/30 rounded-3xl border border-dashed border-primary/20 space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary rounded-2xl text-white">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold">Community Forum</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Join our community of developers and users to share tips, ask questions, and suggest new features for Universal File Converter.
              </p>
              <button className="text-primary font-bold hover:underline">Visit Community →</button>
            </div>

            <div className="p-10 bg-muted/30 rounded-3xl border border-dashed border-secondary/20 space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary rounded-2xl text-white">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold">API Documentation</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Want to integrate our conversion tools into your own application? Check out our developer-friendly API documentation.
              </p>
              <button className="text-secondary font-bold hover:underline">View Documentation →</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
