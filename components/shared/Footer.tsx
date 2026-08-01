import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FaFacebookF } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

import { Wrench } from 'lucide-react';

const FOOTER_LINKS = {
  company: [
    { label: 'About us', href: '/about' },
    { label: 'How it works', href: '/how-it-works' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
  ],
  customers: [
    { label: 'Browse services', href: '/services' },
    { label: 'Find technicians', href: '/technicians' },
    { label: 'Booking help', href: '/help/booking' },
    { label: 'Cancellations', href: '/help/cancellations' },
  ],
  technicians: [
    { label: 'Become a pro', href: '/become-a-pro' },
    { label: 'Technician dashboard', href: '/technician/dashboard' },
    { label: 'Payouts', href: '/technician/payouts' },
    { label: 'Community', href: '/community' },
  ],
};

const SOCIALS = [
  { icon: <FaFacebookF />, href: 'https://facebook.com', label: 'Facebook' },
  { icon: <IoLogoYoutube />, href: 'https://instagram.com', label: 'youTube' },
  { icon: <FaInstagramSquare />, href: 'https://twitter.com', label: 'Instagram' },
  { icon: <FaTwitter />, href: 'https://linkedin.com', label: 'Twitter' },
];

const Footer = () => {
  return (
    <footer className="bg-neutral-950 text-white border-t border-neutral-900">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold">
              <Wrench className="h-5 w-5 text-blue-500" />
              FixItNow
            </Link>
            <p className="mt-4 text-sm text-neutral-400 max-w-xs">
              Connecting homeowners with trusted, verified service professionals since 2023.
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIALS.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 flex items-center justify-center rounded-full border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
                >
                  <div>
                    {icon}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <FooterColumn title="Company" links={FOOTER_LINKS.company} />

          {/* For customers */}
          <FooterColumn title="For customers" links={FOOTER_LINKS.customers} />

          {/* For technicians */}
          <FooterColumn title="For technicians" links={FOOTER_LINKS.technicians} />
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm font-medium">Stay updated</p>
            <p className="text-sm text-neutral-400">Tips and updates, no spam.</p>
          </div>
          <form className="flex w-full max-w-sm gap-2">
            <Input
              type="email"
              placeholder="you@email.com"
              className="h-10 bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-500"
            />
            <Button className="h-10 px-5 bg-white text-black hover:bg-neutral-200 shrink-0">
              Join
            </Button>
          </form>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
          <p>© FixItNow, Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">
              Sitemap
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterColumn = ({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) => (
  <div>
    <p className="text-xs font-medium tracking-wide text-neutral-500 uppercase">{title}</p>
    <ul className="mt-4 space-y-3">
      {links.map(({ label, href }) => (
        <li key={label}>
          <Link
            href={href}
            className="text-sm text-neutral-300 hover:text-white transition-colors"
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;