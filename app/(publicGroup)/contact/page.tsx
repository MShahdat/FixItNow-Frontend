"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const contactDetails = [
  { icon: Mail, label: "Email", value: "mdshahdat2504@gmail.com" },
  { icon: Phone, label: "Phone", value: "+880 1885374041" },
  { icon: MapPin, label: "Office", value: "Dhaka, Bangladesh" },
  { icon: Clock, label: "Hours", value: "Sat–Thu, 9AM–7PM" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire to POST /api/contact
    setSubmitted(true);
  }

  return (
    <div className="bg-[#F5F2EC] text-[#1A2233]">
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-8 text-center">
        <span className="inline-flex items-center gap-2 border border-dashed border-[#B8703E]/50 bg-[#B8703E]/5 px-3 py-1 text-xs font-mono uppercase tracking-wider text-[#B8703E]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#B8703E]" />
          Contact
        </span>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
          Let's talk.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[#1A2233]/70">
          Questions about a booking, a technician application, or a
          partnership? Send it over — we reply within one business day.
        </p>
      </section>

      <section className="mx-auto grid max-w-5xl gap-8 px-6 pb-24 md:grid-cols-[1.3fr_1fr]">
        {/* Form */}
        <div className="rounded-lg border border-[#DDD6C9] bg-white p-8">
          {submitted ? (
            <div className="flex h-full flex-col items-center justify-center py-16 text-center">
              <div className="font-mono text-sm text-[#B8703E]">
                TICKET SUBMITTED
              </div>
              <h3 className="mt-3 text-xl font-semibold">
                We've got your message.
              </h3>
              <p className="mt-2 max-w-sm text-sm text-[#1A2233]/65">
                A member of our team will reach out to the email you provided
                shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" placeholder="Jane Rahman" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <Select required>
                  <SelectTrigger id="topic">
                    <SelectValue placeholder="What's this about?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="booking">A booking issue</SelectItem>
                    <SelectItem value="technician">Technician application</SelectItem>
                    <SelectItem value="billing">Billing & payments</SelectItem>
                    <SelectItem value="press">Press & partnerships</SelectItem>
                    <SelectItem value="other">Something else</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us what's going on..."
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-[#2F4A63] hover:bg-[#25394D] sm:w-auto">
                Send message
              </Button>
            </form>
          )}
        </div>

        {/* Details card */}
        <div className="h-fit rounded-lg bg-[#2F4A63] p-8 text-white">
          <h3 className="font-mono text-xs uppercase tracking-wider text-white/50">
            Direct lines
          </h3>
          <div className="mt-6 space-y-6">
            {contactDetails.map((c) => (
              <div key={c.label} className="flex items-start gap-3">
                <c.icon className="mt-0.5 h-4 w-4 text-[#B8703E]" strokeWidth={1.75} />
                <div>
                  <div className="text-xs uppercase tracking-wide text-white/50">
                    {c.label}
                  </div>
                  <div className="text-sm">{c.value}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 border-t border-white/10 pt-6 text-sm text-white/60">
            For urgent, active-job issues, use the "Report a problem" button
            on your booking page for the fastest response.
          </div>
        </div>
      </section>
    </div>
  );
}