"use client";

import { useState, useRef } from "react";
import { Search, ArrowRight, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { CONVERTERS } from "@/config/converters";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";

const POPULAR_SEARCHES = ["PDF to JPG", "Excel to JSON", "Compress PDF", "Image to WebP"];

export function ConverterSearch() {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const filtered = CONVERTERS.filter(c => {
    return c.title.toLowerCase().includes(search.toLowerCase()) || 
           c.category.toLowerCase().includes(search.toLowerCase());
  }).slice(0, 8);

  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.05 
      }
    },
    exit: { 
      opacity: 0, 
      y: 10,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative px-4">
      {/* Search Input Container */}
      <motion.div 
        animate={{ 
          scale: isFocused ? 1.02 : 1,
          boxShadow: isFocused ? "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" : "0 4px 6px -1px rgb(0 0 0 / 0.1)"
        }}
        className={cn(
          "relative group rounded-2xl transition-all duration-300",
          isFocused ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : "border-2 border-transparent"
        )}
      >
        <div className="relative flex items-center bg-background rounded-2xl overflow-hidden p-1 shadow-inner">
          <div className="pl-4 text-muted-foreground">
             <Search className={cn("h-5 w-5 transition-colors duration-300", isFocused ? "text-primary" : "text-slate-400")} />
          </div>
          <input 
            ref={inputRef}
            type="text" 
            placeholder="What would you like to forge today? (e.g., 'pdf')..."
            className="w-full pl-3 pr-12 py-4 bg-transparent outline-none text-base md:text-lg font-medium placeholder:text-slate-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          />
          
          <AnimatePresence>
            {search.length > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                onClick={() => setSearch("")}
                className="absolute right-4 p-1.5 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="h-4 w-4 text-slate-400" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Results Dropdown */}
      <AnimatePresence>
        {isFocused && (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-full left-4 right-4 mt-3 bg-background border border-slate-200 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden z-50 backdrop-blur-xl"
          >
            {search.length === 0 ? (
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Popular Converters</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearch(term)}
                      className="px-4 py-2 bg-slate-50 hover:bg-primary/10 hover:text-primary rounded-full text-sm font-medium transition-all border border-slate-200"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : filtered.length > 0 ? (
              <div className="py-2">
                <div className="px-5 py-2 border-b border-slate-100">
                   <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Search Results ({filtered.length})</span>
                </div>
                <div className="max-h-[350px] overflow-y-auto">
                  {filtered.map((converter) => (
                    <motion.div key={converter.id} variants={itemVariants}>
                      <Link 
                        href={`/converter/${converter.id}`}
                        className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2.5 bg-slate-100 rounded-xl text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            <converter.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{converter.title}</p>
                            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">{converter.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                          <span className="text-xs font-bold text-primary">Forge</span>
                          <ArrowRight className="h-4 w-4 text-primary" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <motion.div 
                variants={itemVariants}
                className="px-6 py-12 text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full mb-4">
                  <Search className="h-6 w-6 text-slate-400" />
                </div>
                <p className="text-slate-900 font-bold">No converters found</p>
                <p className="text-sm text-slate-500 mt-1">Try searching for something else like &quot;PDF&quot; or &quot;Excel&quot;</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
