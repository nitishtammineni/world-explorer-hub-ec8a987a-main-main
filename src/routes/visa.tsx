import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SiteLayout } from "@/components/site/Layout";
import { DiscoTitle } from "@/components/ui/DiscoTitle";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe2, Send, BadgeCheck, Globe, HelpCircle } from "lucide-react";
import { toast } from "sonner";

const visaSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  destination: z.string().min(1, "Destination country is required"),
  visaType: z.enum(["tourist", "business", "student", "work"]),
  duration: z.string().min(1, "Expected duration is required"),
  message: z.string().optional(),
});

type VisaFormValues = z.infer<typeof visaSchema>;

export const Route = createFileRoute("/visa")({
  head: () => ({
    meta: [
      { title: "Visa Services — Vicky Ryoko Tours and Party's" },
      {
        name: "description",
        content:
          "Get your travel visa processed quickly. Expert assistance for tourist, business, student, and work visas worldwide.",
      },
    ],
  }),
  component: VisaPage,
});

function VisaPage() {
  const form = useForm<VisaFormValues>({
    resolver: zodResolver(visaSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      destination: "",
      visaType: "tourist",
      duration: "",
      message: "",
    },
  });

  const onSubmit = (data: VisaFormValues) => {
    const phoneNumber = "918639888490";
    const text = `*New Visa Application Inquiry*
-----------------------------
*Full Name:* ${data.fullName}
*Email:* ${data.email}
*Phone:* ${data.phone}
*Destination:* ${data.destination}
*Visa Type:* ${data.visaType.charAt(0).toUpperCase() + data.visaType.slice(1)}
*Expected Duration:* ${data.duration}
*Additional Message:* ${data.message || "None"}
-----------------------------
Sent from Vicky Ryoko Tours`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
    toast.success("Redirecting to WhatsApp...");
  };

  return (
    <SiteLayout>
<div className="pt-32 pb-20 bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
        <div className="container-app">
          {/* Enhanced Hero Section */}
          <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-3xl p-12 text-white mb-16 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
            <div className="relative flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 text-center md:text-left">
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-bold uppercase tracking-wider mb-4">
                  Visa Assistance
                </span>
                <DiscoTitle>
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
                    Travel the World Without the Paperwork Stress
                  </h1>
                </DiscoTitle>
                <p className="text-lg text-white/90 leading-relaxed max-w-2xl">
                  We specialize in simplifying the complex world of visas. From tourist entries to
                  long-term work permits, our team ensures your application is flawless and fast.
                </p>
              </div>
              <div className="hidden lg:block w-72 h-72 bg-white/10 rounded-3xl rotate-3 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center -rotate-3">
                  <Globe2 className="w-32 h-32 text-white/30" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <Card className="border-none shadow-xl shadow-slate-200 ring-1 ring-slate-100 overflow-hidden">
                <CardHeader className="bg-slate-900 text-white p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">Visa Application Inquiry</CardTitle>
                      <CardDescription className="text-slate-400 mt-1">
                        Tell us where you want to go, we'll handle the rest.
                      </CardDescription>
                    </div>
                    <Globe className="h-10 w-10 text-indigo-400 opacity-50" />
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="John Doe"
                                  {...field}
                                  className="h-12 border-slate-200"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="john@example.com"
                                  {...field}
                                  className="h-12 border-slate-200"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="+91 12345 67890"
                                  {...field}
                                  className="h-12 border-slate-200"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="destination"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Destination Country</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. USA, France, Japan"
                                  {...field}
                                  className="h-12 border-slate-200"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="visaType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Type of Visa</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-12 border-slate-200">
                                    <SelectValue placeholder="Select visa type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="tourist">Tourist Visa</SelectItem>
                                  <SelectItem value="business">Business Visa</SelectItem>
                                  <SelectItem value="student">Student Visa</SelectItem>
                                  <SelectItem value="work">Work Visa</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="duration"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expected Stay Duration</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. 15 Days, 6 Months"
                                  {...field}
                                  className="h-12 border-slate-200"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Details (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Do you have any specific concerns or questions?"
                                className="min-h-[100px] border-slate-200 resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-lg font-bold shadow-lg shadow-indigo-100 transition-all"
                      >
                        Inquire via WhatsApp <Send className="ml-2 h-5 w-5" />
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900">
                  <BadgeCheck className="text-indigo-500 h-6 w-6" /> Why Us?
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                      99%
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Success Rate</h4>
                      <p className="text-sm text-slate-500">
                        Highest approval rate in the industry due to meticulous document checks.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                      24h
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Expert Feedback</h4>
                      <p className="text-sm text-slate-500">
                        Get a professional review of your case within one business day.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                      <Globe2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Global Coverage</h4>
                      <p className="text-sm text-slate-500">
                        We handle visas for over 150 countries worldwide.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-xl shadow-indigo-200">
                <div className="flex items-center gap-3 mb-4">
                  <HelpCircle className="h-6 w-6" />
                  <h3 className="text-xl font-bold">Need Help?</h3>
                </div>
                <p className="text-indigo-100 text-sm mb-6">
                  Unsure about which visa type you need or having trouble with the form? Chat with
                  our experts directly.
                </p>
                <a
                  href="https://wa.me/918639888490"
                  target="_blank"
                  className="block w-full text-center py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-colors"
                >
                  Direct Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
