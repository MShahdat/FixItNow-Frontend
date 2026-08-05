import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, MessageCircle, FileText } from "lucide-react";

const faqGroups = [
  {
    group: "Booking",
    items: [
      { q: "How do I cancel a booking?", a: "Go to your customer dashboard, open the booking, and select Cancel. Cancellation is only available before the technician marks the job In Progress." },
      { q: "Can I reschedule instead of cancelling?", a: "Yes — open the booking and choose Reschedule to pick a new available time slot with the same technician." },
      { q: "What happens if no technician accepts my request?", a: "Requests left unaccepted for 24 hours are automatically cancelled and refunded if payment was already held." },
    ],
  },
  {
    group: "Payments",
    items: [
      { q: "When am I charged?", a: "You're only charged after a technician accepts your booking. You'll see a Pay Now button appear on the booking card." },
      { q: "What payment methods are supported?", a: "We support cards and mobile wallets through our checkout partner. All payments are encrypted end-to-end." },
    ],
  },
  {
    group: "For technicians",
    items: [
      { q: "How do I set my availability?", a: "From your technician dashboard, open the Availability tab and click a day to add or remove working hours." },
      { q: "How and when do I get paid?", a: "Earnings are released to your linked account once the customer marks a job as Completed." },
    ],
  },
  {
    group: "Account",
    items: [
      { q: "How do I change my role after signing up?", a: "Roles can't be switched directly — contact support and we'll help migrate your profile." },
      { q: "How do I delete my account?", a: "Go to Settings → Account, and select Delete account. This is permanent and can't be undone." },
    ],
  },
];

export default function SupportPage() {
  return (
    <div className="bg-[#F5F2EC] text-[#1A2233]">
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-12 text-center">
        <span className="inline-flex items-center gap-2 border border-dashed border-[#B8703E]/50 bg-[#B8703E]/5 px-3 py-1 text-xs font-mono uppercase tracking-wider text-[#B8703E]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#B8703E]" />
          Support
        </span>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
          How can we help?
        </h1>
        <div className="relative mx-auto mt-8 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1A2233]/40" />
          <Input placeholder="Search help articles..." className="pl-9 bg-white" />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-20">
        {faqGroups.map((group) => (
          <div key={group.group} className="mb-10">
            <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-[#B8703E]">
              {group.group}
            </h2>
            <Accordion type="single" collapsible className="rounded-lg border border-[#DDD6C9] bg-white">
              {group.items.map((item, i) => (
                <AccordionItem key={item.q} value={`${group.group}-${i}`} className="border-[#DDD6C9] px-4">
                  <AccordionTrigger className="text-left text-sm font-medium">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-[#1A2233]/65">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </section>

      <section className="border-t border-[#DDD6C9] bg-white py-16">
        <div className="mx-auto grid max-w-3xl gap-6 px-6 sm:grid-cols-2">
          <div className="flex items-start gap-4 rounded-lg border border-[#DDD6C9] p-6">
            <MessageCircle className="h-5 w-5 shrink-0 text-[#2F4A63]" />
            <div>
              <h3 className="font-semibold">Still stuck?</h3>
              <p className="mt-1 text-sm text-[#1A2233]/65">
                Reach our support team directly and we'll get back within a
                business day.
              </p>
              <Button variant="link" className="mt-2 h-auto p-0 text-[#2F4A63]" asChild>
                <Link href="/contact">Contact support →</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-lg border border-[#DDD6C9] p-6">
            <FileText className="h-5 w-5 shrink-0 text-[#2F4A63]" />
            <div>
              <h3 className="font-semibold">Check a booking</h3>
              <p className="mt-1 text-sm text-[#1A2233]/65">
                Most status questions are answered right on your booking
                page.
              </p>
              <Button variant="link" className="mt-2 h-auto p-0 text-[#2F4A63]" asChild>
                <Link href="/dashboard/customer">Go to dashboard →</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}