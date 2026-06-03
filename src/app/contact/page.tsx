"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageSquare, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Failed to connect to the server.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    // Map ID to the correct state key
    const fieldMap: Record<string, string> = {
      "first-name": "firstName",
      "last-name": "lastName",
      "email": "email",
      "subject": "subject",
      "message": "message"
    };
    
    setFormData((prev) => ({ ...prev, [fieldMap[id] || id]: value }));
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 px-4 bg-gradient-to-b from-primary/10 via-background to-background text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            Contact Support
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Have questions or feedback? We&apos;d love to hear from you. 
            Send us a message and we&apos;ll get back to you shortly.
          </p>
        </motion.div>
      </section>

      {/* Contact Content */}
      <section className="w-full py-12 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-10">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">How can we help?</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Whether it&apos;s a technical issue, a feature request, or just a friendly hello, 
                  our team is ready to assist you.
                </p>
              </div>

              <div className="grid gap-8">
                <div className="flex items-start gap-5 group">
                  <div className="p-4 bg-primary/10 rounded-2xl text-primary transition-colors group-hover:bg-primary group-hover:text-white shadow-sm">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Direct Email</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">tonyjanson121@gmail.com</p>
                    <p className="text-slate-400 text-xs mt-1 uppercase tracking-widest font-bold">Responds within 24h</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-2xl text-purple-600 dark:text-purple-400 transition-colors group-hover:bg-purple-600 group-hover:text-white shadow-sm">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Community</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">Join our Discord</p>
                    <p className="text-slate-400 text-xs mt-1 uppercase tracking-widest font-bold">24/7 Community support</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="p-4 bg-orange-100 dark:bg-orange-900/30 rounded-2xl text-orange-600 dark:text-orange-400 transition-colors group-hover:bg-orange-600 group-hover:text-white shadow-sm">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Global Reach</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">Remote First Team</p>
                    <p className="text-slate-400 text-xs mt-1 uppercase tracking-widest font-bold">Operating worldwide</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 p-1 bg-gradient-to-br from-primary/20 via-background to-secondary/20 rounded-[2.5rem] shadow-2xl"
            >
              <div className="bg-card rounded-[2.2rem] p-8 md:p-10 border shadow-inner">
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-12 text-center space-y-6"
                    >
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-4">
                        <CheckCircle2 className="h-10 w-10" />
                      </div>
                      <h2 className="text-3xl font-bold">Message Sent!</h2>
                      <p className="text-muted-foreground text-lg max-w-sm mx-auto">
                        Thank you for reaching out. We&apos;ve received your message and will get back to you shortly.
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => setStatus("idle")}
                        className="rounded-full px-8 h-12"
                      >
                        Send another message
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="first-name" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">First Name</label>
                          <Input 
                            id="first-name" 
                            required 
                            placeholder="John" 
                            className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900/50 border-slate-200" 
                            value={formData.firstName}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="last-name" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Last Name</label>
                          <Input 
                            id="last-name" 
                            required 
                            placeholder="Doe" 
                            className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900/50 border-slate-200" 
                            value={formData.lastName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                        <Input 
                          id="email" 
                          type="email" 
                          required 
                          placeholder="john@example.com" 
                          className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900/50 border-slate-200" 
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Subject</label>
                        <Input 
                          id="subject" 
                          required 
                          placeholder="What can we help you with?" 
                          className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900/50 border-slate-200" 
                          value={formData.subject}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Message</label>
                        <textarea 
                          id="message"
                          required
                          className="flex min-h-[160px] w-full rounded-xl border border-slate-200 bg-slate-50 dark:bg-slate-900/50 px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                          placeholder="Tell us more about your request..."
                          value={formData.message}
                          onChange={handleChange}
                        ></textarea>
                      </div>

                      {status === "error" && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-3 text-sm font-medium border border-red-100 dark:border-red-900/30"
                        >
                          <AlertCircle className="h-5 w-5 flex-shrink-0" />
                          {errorMessage}
                        </motion.div>
                      )}

                      <Button 
                        disabled={status === "loading"}
                        className="w-full h-14 rounded-xl gap-3 text-lg font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-[0.98]"
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" /> Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-5 w-5" /> Send Message
                          </>
                        )}
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
