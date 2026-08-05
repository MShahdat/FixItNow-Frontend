import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Wrench, ShieldCheck, Clock, Star } from "lucide-react";

const stats = [
  { label: "Vetted technicians", value: "1,200+" },
  { label: "Service categories", value: "40+" },
  { label: "Cities covered", value: "18" },
  { label: "Avg. rating", value: "4.8/5" },
];

const steps = [
  { n: "01", title: "Book a service", body: "Tell us what's broken, pick a time slot, and we match you with a nearby pro." },
  { n: "02", title: "Technician arrives", body: "Track your booking status in real time, from accepted to in-progress." },
  { n: "03", title: "Pay & review", body: "Pay securely once the job's done, then rate your technician." },
];

const values = [
  { icon: ShieldCheck, title: "Vetted, not just verified", body: "Every technician passes a background check and a skills review before they touch a single job." },
  { icon: Clock, title: "On time, or we make it right", body: "Live status updates mean no guessing when your technician will show up." },
  { icon: Star, title: "Reviewed by real customers", body: "Ratings are tied to completed jobs only — no fake five-stars." },
];

function ServiceTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-flex items-center gap-2 border border-dashed border-[#B8703E]/50 bg-[#B8703E]/5 px-3 py-1 text-xs font-mono uppercase tracking-wider text-[#B8703E]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#B8703E]" />
      {children}
    </span>
  );
}

export default function AboutPage() {
  return (
    <div className="bg-[#F5F2EC] text-[#1A2233]">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-16 text-center">
        <ServiceTag>Work Order — Our Story</ServiceTag>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
          Every home,
          <br />
          <span className="text-[#2F4A63]">one call away.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-[#1A2233]/70 sm:text-lg">
          FixItNow connects homeowners with vetted, local technicians for
          everything from a leaky faucet to a full rewiring job — booked in
          minutes, tracked in real time, paid for with a tap.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button size="lg" className="bg-[#2F4A63] hover:bg-[#25394D]" asChild>
            <Link href="/services">Browse services</Link>
          </Button>
          <Button size="lg" variant="outline" className="border-[#1A2233]/20" asChild>
            <Link href="/auth/register">Become a technician</Link>
          </Button>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-[#DDD6C9] bg-white">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="px-4 py-8 text-center">
              <div className="font-mono text-2xl font-semibold text-[#2F4A63] sm:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wide text-[#1A2233]/50">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-12 text-center">
          <ServiceTag>How it works</ServiceTag>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">
            From "it's broken" to "it's fixed."
          </h2>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.n} className="relative border-l-2 border-[#DDD6C9] pl-6">
              <span className="font-mono text-sm text-[#B8703E]">{step.n}</span>
              <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-[#1A2233]/65">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#2F4A63] py-20 text-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12 text-center">
            <span className="text-xs font-mono uppercase tracking-wider text-white/50">
              Why FixItNow
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              We take reliability personally.
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-lg bg-white/5 p-6">
                <v.icon className="h-6 w-6 text-[#B8703E]" strokeWidth={1.75} />
                <h3 className="mt-4 font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-white/70">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Ready to get something fixed?
        </h2>
        <p className="mt-3 text-[#1A2233]/65">
          Post a job, compare technicians, and book the right one in minutes.
        </p>
        <Button size="lg" className="mt-6 bg-[#B8703E] hover:bg-[#9c5f31]" asChild>
          <Link href="/services">Get started</Link>
        </Button>
      </section>
    </div>
  );
}