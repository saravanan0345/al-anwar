import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export type ProjectItem = { id: string; title: string; alt_text: string; image_url: string };
export type ReviewItem = { id: string; customer_name: string; rating: number; review_text: string; photo_url: string | null };

function useSlider(count: number) {
  const [index, setIndex] = useState(0); const [paused, setPaused] = useState(false); const touch = useRef<number | null>(null);
  const move = useCallback((by: number) => setIndex((current) => count ? (current + by + count) % count : 0), [count]);
  useEffect(() => { if (paused || count < 2) return; const timer = window.setInterval(() => move(1), 5200); return () => window.clearInterval(timer); }, [paused, count, move]);
  return { index, move, setPaused, touch, touchProps: { onTouchStart: (e: React.TouchEvent) => { touch.current = e.touches[0]?.clientX ?? null; }, onTouchEnd: (e: React.TouchEvent) => { if (touch.current === null) return; const end = e.changedTouches[0]?.clientX ?? touch.current; if (Math.abs(end-touch.current)>45) move(end < touch.current ? 1 : -1); touch.current = null; } } };
}

export function ProjectsCarousel({ items }: { items: ProjectItem[] }) {
  const slider = useSlider(items.length); const [selected, setSelected] = useState<number | null>(null);
  useEffect(() => { function key(e: KeyboardEvent) { if (selected === null) return; if (e.key === "ArrowRight") setSelected((selected+1)%items.length); if (e.key === "ArrowLeft") setSelected((selected-1+items.length)%items.length); } window.addEventListener("keydown", key); return () => window.removeEventListener("keydown", key); }, [selected, items.length]);
  if (!items.length) return <div className="grid min-h-72 place-items-center border border-dashed border-border text-center text-muted-foreground"><p>Our project gallery is being prepared.<br/>New work will appear here soon.</p></div>;
  return <div onMouseEnter={() => slider.setPaused(true)} onMouseLeave={() => slider.setPaused(false)} {...slider.touchProps}>
    <div className="overflow-hidden"><div className="carousel-track flex transition-transform duration-700 ease-out" style={{ "--slide-index": slider.index } as React.CSSProperties}>{items.map((item, i) => <button key={item.id} className="group relative aspect-[4/3] w-full shrink-0 overflow-hidden border-r border-background focus-luxury md:w-1/3" onClick={() => setSelected(i)}><img src={item.image_url} alt={item.alt_text} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105"/><span className="absolute inset-x-0 bottom-0 bg-ink/80 p-4 text-left text-sm text-primary-foreground opacity-0 transition group-hover:opacity-100">{item.title}</span></button>)}</div></div>
    {items.length > 1 && <CarouselControls onPrev={() => slider.move(-1)} onNext={() => slider.move(1)} label={`${slider.index+1} / ${items.length}`} />}
    <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}><DialogContent className="max-w-6xl border-0 bg-ink p-2 text-primary-foreground"><DialogTitle className="sr-only">Project image</DialogTitle>{selected !== null && <div className="relative"><img src={items[selected]?.image_url} alt={items[selected]?.alt_text} className="max-h-[85vh] w-full object-contain"/><button aria-label="Previous image" onClick={() => setSelected((selected-1+items.length)%items.length)} className="absolute left-3 top-1/2 rounded-full bg-ink/70 p-3"><ChevronLeft/></button><button aria-label="Next image" onClick={() => setSelected((selected+1)%items.length)} className="absolute right-3 top-1/2 rounded-full bg-ink/70 p-3"><ChevronRight/></button></div>}</DialogContent></Dialog>
  </div>;
}

export function ReviewsCarousel({ items }: { items: ReviewItem[] }) {
  const slider = useSlider(items.length);
  if (!items.length) return <div className="grid min-h-60 place-items-center border border-dashed border-border text-center text-muted-foreground"><p>Approved customer reviews will appear here.</p></div>;
  return <div onMouseEnter={() => slider.setPaused(true)} onMouseLeave={() => slider.setPaused(false)} {...slider.touchProps}>
    <div className="overflow-hidden"><div className="carousel-track flex transition-transform duration-700 ease-out" style={{ "--slide-index": slider.index } as React.CSSProperties}>{items.map((item) => <article key={item.id} className="w-full shrink-0 border-r border-border px-5 sm:px-8 md:w-1/3"><div className="h-full rounded-md bg-card p-7 shadow-sm"><div className="flex gap-1 text-primary">{Array.from({length:5}).map((_,i)=><Star key={i} className={i<item.rating?"h-4 w-4 fill-primary":"h-4 w-4 text-border"}/>)}</div><blockquote className="mt-5 text-base leading-7">“{item.review_text}”</blockquote><div className="mt-6 flex items-center gap-3">{item.photo_url ? <img src={item.photo_url} alt={`${item.customer_name} profile`} loading="lazy" className="h-10 w-10 rounded-full object-cover"/> : <span className="grid h-10 w-10 place-items-center rounded-full bg-muted font-display">{item.customer_name.charAt(0)}</span>}<b className="text-sm">{item.customer_name}</b></div></div></article>)}</div></div>
    {items.length > 1 && <CarouselControls onPrev={() => slider.move(-1)} onNext={() => slider.move(1)} label={`${slider.index+1} / ${items.length}`} />}
  </div>;
}

function CarouselControls({ onPrev, onNext, label }: { onPrev:()=>void; onNext:()=>void; label:string }) { return <div className="mt-6 flex items-center justify-end gap-3"><span className="mr-auto text-xs text-muted-foreground">{label}</span><Button variant="outline" size="icon" onClick={onPrev} aria-label="Previous"><ChevronLeft/></Button><Button variant="outline" size="icon" onClick={onNext} aria-label="Next"><ChevronRight/></Button></div>; }

export function ContentCarousel({ type, items }: { type: "projects"; items: ProjectItem[] } | { type: "reviews"; items: ReviewItem[] }) {
  return type === "projects" ? <ProjectsCarousel items={items} /> : <ReviewsCarousel items={items} />;
}