"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Activity, Clock, FileCheck, Mail, MessageCircle, 
  Send, CheckCircle, Clock4, User, Search, ChevronRight,
  Loader2, AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";

interface DashboardClientProps {
  initialData: any;
}

export function AdminDashboardClient({ initialData }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState<"metrics" | "messages">("metrics");
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const { total, successRate, avgTimeSec, popular, recent, contacts } = initialData;

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/admin/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactId: selectedContact._id,
          replyMessage,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setReplyMessage("");
        setTimeout(() => {
          setSelectedContact(null);
          setStatus("idle");
          // In a real app, you'd refresh the data here
          window.location.reload();
        }, 2000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Forge <span className="text-primary">Admin</span></h1>
          <p className="text-muted-foreground font-medium">Manage your platform and support your users.</p>
        </div>
        
        <div className="flex bg-muted p-1 rounded-2xl border shadow-sm">
          <button
            onClick={() => setActiveTab("metrics")}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
              activeTab === "metrics" ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <BarChart className="h-4 w-4" /> Metrics
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
              activeTab === "messages" ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Mail className="h-4 w-4" /> Messages
            {contacts.filter((c: any) => c.status === "pending").length > 0 && (
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "metrics" ? (
          <motion.div
            key="metrics"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Total Orders", value: total, icon: BarChart, color: "text-blue-500" },
                { label: "Success Rate", value: `${successRate}%`, icon: Activity, color: "text-emerald-500" },
                { label: "Avg Latency", value: `${avgTimeSec}s`, icon: Clock, color: "text-purple-500" },
                { label: "Files Handled", value: total, icon: FileCheck, color: "text-orange-500" },
              ].map((stat, i) => (
                <Card key={i} className="border-2 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</CardTitle>
                    <stat.icon className={cn("h-4 w-4", stat.color)} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-black">{stat.value.toLocaleString()}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Activity */}
              <Card className="lg:col-span-2 shadow-md border-2 overflow-hidden">
                <CardHeader className="bg-muted/30 border-b">
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest conversion requests across the platform</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {recent.map((req: any, i: number) => (
                      <div key={i} className="flex items-center justify-between p-4 hover:bg-muted/10 transition-colors">
                        <div className="min-w-0">
                          <p className="font-bold text-sm truncate">{req.originalFileName}</p>
                          <p className="text-[10px] text-muted-foreground font-mono uppercase mt-0.5">{req.conversionType}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className={cn(
                            "inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider",
                            req.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                          )}>
                            {req.status}
                          </span>
                          <p className="text-[10px] text-muted-foreground mt-1 font-medium">
                            {new Date(req.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Popular Types */}
              <Card className="shadow-md border-2">
                <CardHeader>
                  <CardTitle>Popular Types</CardTitle>
                  <CardDescription>Most requested forge modes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {popular.map((pop: any, i: number) => (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black uppercase">{pop._id}</span>
                          <span className="text-xs font-bold text-muted-foreground">{pop.count}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(pop.count / total) * 100}%` }}
                            className="bg-primary h-full rounded-full" 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="messages"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start"
          >
            {/* Messages List */}
            <Card className={cn("lg:col-span-2 shadow-md border-2 overflow-hidden h-[700px] flex flex-col", selectedContact && "hidden lg:flex")}>
              <CardHeader className="bg-muted/30 border-b flex-shrink-0">
                <CardTitle>User Inquiries</CardTitle>
                <CardDescription>Messages from the contact form</CardDescription>
              </CardHeader>
              <div className="flex-1 overflow-y-auto divide-y">
                {contacts.length > 0 ? (
                  contacts.map((contact: any) => (
                    <button
                      key={contact._id}
                      onClick={() => setSelectedContact(contact)}
                      className={cn(
                        "w-full text-left p-5 hover:bg-muted/10 transition-all group flex items-start gap-4",
                        selectedContact?._id === contact._id ? "bg-primary/5 border-l-4 border-primary" : "border-l-4 border-transparent"
                      )}
                    >
                      <div className={cn(
                        "p-2 rounded-xl transition-colors",
                        contact.status === "pending" ? "bg-orange-100 text-orange-600" : "bg-emerald-100 text-emerald-600"
                      )}>
                        {contact.status === "pending" ? <Clock4 className="h-5 w-5" /> : <CheckCircle className="h-5 w-5" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-bold text-sm text-foreground truncate">{contact.firstName} {contact.lastName}</p>
                          <span className="text-[10px] font-medium text-muted-foreground">{new Date(contact.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs font-bold text-primary mb-1 truncate">{contact.subject}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{contact.message}</p>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-12 text-center text-muted-foreground">No messages yet.</div>
                )}
              </div>
            </Card>

            {/* Message Detail & Reply Form */}
            <div className="lg:col-span-3 space-y-6">
              {selectedContact ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <Card className="shadow-md border-2 overflow-hidden">
                    <CardHeader className="bg-primary/5 border-b flex flex-row justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border">
                          <User className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{selectedContact.firstName} {selectedContact.lastName}</CardTitle>
                          <CardDescription className="font-medium text-primary">{selectedContact.email}</CardDescription>
                        </div>
                      </div>
                      <button 
                        onClick={() => setSelectedContact(null)}
                        className="lg:hidden p-2 hover:bg-muted rounded-full"
                      >
                        <ChevronRight className="h-6 w-6 rotate-180" />
                      </button>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                      <div className="space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Subject</span>
                        <h3 className="text-lg font-bold">{selectedContact.subject}</h3>
                      </div>
                      <div className="space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Message</span>
                        <div className="p-6 bg-muted/30 rounded-2xl border text-sm leading-relaxed whitespace-pre-wrap">
                          {selectedContact.message}
                        </div>
                      </div>

                      {selectedContact.status === "replied" && (
                        <div className="mt-8 pt-8 border-t space-y-4">
                          <div className="flex items-center gap-2 text-emerald-600">
                             <CheckCircle className="h-4 w-4" />
                             <span className="text-xs font-bold uppercase tracking-wider">Your Reply (Sent {new Date(selectedContact.repliedAt).toLocaleDateString()})</span>
                          </div>
                          <div className="p-6 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900 text-sm leading-relaxed whitespace-pre-wrap italic">
                            {selectedContact.adminReply}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {selectedContact.status === "pending" && (
                    <Card className="shadow-xl border-2 border-primary/20">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Send className="h-4 w-4 text-primary" /> Reply to {selectedContact.firstName}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleReply} className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-muted-foreground uppercase ml-1">Your Message</label>
                            <textarea
                              required
                              value={replyMessage}
                              onChange={(e) => setReplyMessage(e.target.value)}
                              className="w-full min-h-[150px] p-4 rounded-xl border-2 border-slate-100 bg-slate-50 dark:bg-slate-900/50 outline-none focus:border-primary transition-all text-sm"
                              placeholder={`Write your reply to ${selectedContact.firstName}...`}
                            />
                          </div>

                          {status === "success" && (
                            <div className="p-4 bg-emerald-100 text-emerald-700 rounded-xl flex items-center gap-2 text-sm font-bold">
                              <CheckCircle className="h-4 w-4" /> Message sent successfully!
                            </div>
                          )}

                          {status === "error" && (
                            <div className="p-4 bg-red-100 text-red-700 rounded-xl flex items-center gap-2 text-sm font-bold">
                              <AlertCircle className="h-4 w-4" /> Failed to send message.
                            </div>
                          )}

                          <Button 
                            disabled={isSubmitting || status === "success"}
                            className="w-full h-12 rounded-xl text-lg font-bold gap-3"
                          >
                            {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                            Send Reply
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              ) : (
                <div className="h-[700px] flex flex-col items-center justify-center text-center p-8 bg-muted/10 rounded-[2.5rem] border-2 border-dashed border-muted/50">
                  <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border mb-6">
                    <MessageCircle className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No message selected</h3>
                  <p className="text-muted-foreground max-w-xs">Select a message from the list on the left to read and reply.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
