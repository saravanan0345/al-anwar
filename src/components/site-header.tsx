import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const logoAsset = { url: "/assets/alanwar-logo.jpeg" };

const links = ["About", "Services", "Projects", "Reviews", "Contact"];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-primary-foreground/15 bg-ink/80 text-primary-foreground backdrop-blur-xl">
      <div className="section-shell grid h-18 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="AL-ANWAR home">
          <img src={logoAsset.url} alt="AL-ANWAR Build & Design logo" className="h-11 w-11 shrink-0 rounded-full object-cover" />
          <span className="min-w-0"><b className="block truncate font-display text-lg">AL-ANWAR</b><small className="block text-[9px] tracking-[.26em] text-primary-foreground/65">BUILD & DESIGN</small></span>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          <a href="#home" className="text-xs hover:text-bronze-soft">Home</a>
          {links.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="text-xs hover:text-bronze-soft">{item}</a>)}
        </nav>
        <div className="hidden lg:block"><Button asChild variant="luxury" size="luxury"><a href="#contact">Get Consultation</a></Button></div>
        <Button variant="glass" size="icon" className="lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</Button>
      </div>
      {open && <nav className="border-t border-primary-foreground/15 bg-ink px-5 py-5 lg:hidden" aria-label="Mobile navigation">
        <a href="#home" onClick={() => setOpen(false)} className="block py-3 text-sm">Home</a>
        {links.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)} className="block border-t border-primary-foreground/10 py-3 text-sm">{item}</a>)}
      </nav>}
    </header>
  );
}