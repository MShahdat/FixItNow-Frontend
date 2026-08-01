'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Wrench, Zap, Sparkles, PaintRoller, ShieldCheck, Clock } from 'lucide-react';

const CATEGORIES = [
  { label: 'Plumbing', icon: Wrench },
  { label: 'Electrical', icon: Zap },
  { label: 'Cleaning', icon: Sparkles },
  { label: 'Painting', icon: PaintRoller },
];

const STATS = [
  { value: '50,000+', label: 'Bookings' },
  { value: '4.8', label: 'Avg rating' },
  { value: '24/7', label: 'Support' },
];

const HeroSection = () => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    console.log('search for:', query);
  };

  return (
    <section className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-5xl px-4 py-20 flex flex-col items-center text-center">
        <Badge
          variant="outline"
          className="mb-5 border-neutral-700 text-neutral-300 gap-1.5 px-3 py-1"
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          Verified professionals only
        </Badge>

        <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold tracking-tight leading-[1.1] max-w-3xl">
          Find trusted home service professionals
        </h1>

        <p className="mt-4 text-neutral-400 text-base md:text-lg">
          Book verified technicians for any home service
        </p>

        <div className="mt-8 flex w-full max-w-xl items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What service do you need?"
              className="h-10 md:h-12 pl-9 bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-500 focus-visible:ring-neutral-600"
            />
          </div>
          <Button
            onClick={handleSearch}
            className="h-10 md:h-12 px-6 bg-white text-black hover:bg-neutral-200"
          >
            Search
          </Button>
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map(({ label, icon: Icon }) => (
            <Badge
              key={label}
              variant="secondary"
              className="bg-neutral-900 text-neutral-200 hover:bg-neutral-800 border border-neutral-800 px-3 py-1.5 gap-1.5 cursor-pointer"
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </Badge>
          ))}
        </div>

        <div className="mt-12 flex gap-10 md:gap-14">
          {STATS.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold">{value}</span>
              <span className="text-sm text-neutral-500">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;