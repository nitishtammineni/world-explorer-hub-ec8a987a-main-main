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
import { FileText, Send, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const passportSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  dob: z.string().min(1, "Date of birth is required"),
  destinationCountry: z.string().min(1, "Destination country is required"),
  passportType: z.enum(["fresh", "renewal"]),
  address: z.string().min(10, "Please provide your full address"),
  message: z.string().optional(),
});

type PassportFormValues = z.infer<typeof passportSchema>;

export const Route = createFileRoute("/passport")({
  head: () => ({
    meta: [
      { title: "Passport Services — Vicky Ryoko Tours and Party's" },
      {
        name: "description",
        content:
          "Apply for fresh passport or renewal with ease. Fast-track your travel documentation with our expert assistance.",
      },
    ],
  }),
  component: PassportPage,
});

function PassportPage() {
  const form = useForm<PassportFormValues>({
    resolver: zodResolver(passportSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      dob: "",
      destinationCountry: "",
      passportType: "fresh",
      address: "",
      message: "",
    },
  });

  const onSubmit = (data: PassportFormValues) => {
    const phoneNumber = "918639888490";
    const text = `*New Passport Application Request*
-----------------------------
*Full Name:* ${data.fullName}
*Email:* ${data.email}
*Phone:* ${data.phone}
*Date of Birth:* ${data.dob}
*Destination Country:* ${data.destinationCountry}
*Application Type:* ${data.passportType === "fresh" ? "Fresh Passport" : "Renewal"}
*Address:* ${data.address}
*Additional Message:* ${data.message || "None"}
-----------------------------
Sent from Vicky Ryoko Tours`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
    toast.success("Redirecting to WhatsApp...");
  };

  return (
    <SiteLayout>
<div className="pt-32 pb-20 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
        <div className="container-app">
          {/* Hero Section with enhanced styling */}
          <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-12 text-white mb-16 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
            <div className="relative text-center max-w-3xl mx-auto">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-bold uppercase tracking-wider mb-4">Passport Services</span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
                World-Class Passport Assistance
              </h1>
              <p className="text-lg text-white/90 leading-relaxed">
                Experience a seamless passport application process. Whether you're applying for a
                fresh passport or a renewal, our experts handle the complexity so you can focus on
                your journey.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2">
              <Card className="border-none shadow-2xl shadow-slate-200/60 overflow-hidden">
                <CardHeader className="bg-primary text-primary-foreground p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="h-6 w-6" />
                    <CardTitle className="text-2xl">Application Form</CardTitle>
                  </div>
                  <CardDescription className="text-primary-foreground/80 text-base">
                    Please fill in your details accurately. All information will be sent securely.
                  </CardDescription>
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
                              <FormLabel>Full Name (as per ID)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="John Doe"
                                  {...field}
                                  className="bg-slate-50 border-slate-200 focus:bg-white transition-all"
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
                                  className="bg-slate-50 border-slate-200 focus:bg-white transition-all"
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
                                  className="bg-slate-50 border-slate-200 focus:bg-white transition-all"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="dob"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date of Birth</FormLabel>
                              <FormControl>
                                <Input
                                  type="date"
                                  {...field}
                                  className="bg-slate-50 border-slate-200 focus:bg-white transition-all"
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
                          name="destinationCountry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Destination Country</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. USA, UK, Canada"
                                  {...field}
                                  className="bg-slate-50 border-slate-200 focus:bg-white transition-all"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="passportType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Application Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-slate-50 border-slate-200 focus:bg-white transition-all">
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="fresh">Fresh Passport</SelectItem>
                                  <SelectItem value="renewal">Renewal / Re-issue</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Permanent Address</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter your full residential address"
                                className="min-h-[100px] bg-slate-50 border-slate-200 focus:bg-white transition-all"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Requirements (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Any specific requests or questions?"
                                className="min-h-[80px] bg-slate-50 border-slate-200 focus:bg-white transition-all"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full py-6 text-lg font-semibold shadow-lg shadow-primary/20 hover:scale-[1.01] transition-transform"
                      >
                        Submit & Continue to WhatsApp <Send className="ml-2 h-5 w-5" />
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <div className="card-elev p-8 bg-white border border-slate-100">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <ShieldCheck className="text-primary h-5 w-5" /> Why Choose Us?
                </h3>
                <ul className="space-y-4">
                  {[
                    "Expert Documentation Review",
                    "Fast-track Appointment Booking",
                    "End-to-End Application Support",
                    "Zero Stress, High Success Rate",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-slate-600 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card-elev p-8 bg-slate-900 text-white border-none">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold">Process Timeline</h3>
                </div>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                  Most applications are processed and appointments scheduled within 24-48 business
                  hours of submission.
                </p>
                <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-700">
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold">
                      1
                    </div>
                    <p className="font-semibold text-sm">Submit Details</p>
                    <p className="text-xs text-slate-500">Fill the form and connect on WhatsApp</p>
                  </div>
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-400">
                      2
                    </div>
                    <p className="font-semibold text-sm">Expert Consultation</p>
                    <p className="text-xs text-slate-500">We review your documents via chat</p>
                  </div>
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-400">
                      3
                    </div>
                    <p className="font-semibold text-sm">Final Submission</p>
                    <p className="text-xs text-slate-500">We handle the official application</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
