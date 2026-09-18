import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Building2, Droplets, Instagram, MessageCircle, Phone, Ruler, ShieldCheck } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
const heroAsset = { url: "/assets/hero-interior.jpg" };
const constructionAsset = { url: "/assets/construction.jpg" };
const roAsset = { url: "/assets/ro-water.jpg" };
const logoAsset = { url: "/assets/alanwar-logo.jpeg" };
const ownerAsset = { url: "/assets/anwar-basha.jpeg" };
import { Button } from "@/components/ui/button";
import { ContentCarousel, type ProjectItem, type ReviewItem } from "@/components/content-carousel";
import { EnquiryForm } from "@/components/enquiry-form";
import { ReviewForm } from "@/components/review-form";
import { SiteHeader } from "@/components/site-header";
import { supabase } from "@/integrations/supabase/client";
import { BUSINESS_NAME, BUSINESS_URL, CONTACT_ADDRESS, CONTACT_ADDRESS_LINES, MAPS_DIRECTIONS_URL, PHONE_DISPLAY, PHONE_LINK, serviceMessages, whatsappLink } from "@/lib/site";

const instagramUrl = "https://www.instagram.com/anwar_20191990?stkn=YXN6YnJrNHNiYWtw";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ALANWAR Build & Design | Interior Design, Construction & RO Water" },
      { name: "description", content: "ALANWAR Build & Design offers interior design, construction and building services, plus RO water purifier and Aqua water installation in Noombal, Thiruverkadu, Chennai." },
      { name: "keywords", content: "interior design Noombal, construction Thiruverkadu, building services Chennai, RO water purifier installation, Aqua water installation" },
      { name: "author", content: BUSINESS_NAME },
      { property: "og:title", content: "ALANWAR Build & Design | Interior Design, Construction & RO Water" },
      { property: "og:description", content: "Interior design, construction and building, and RO water purifier and Aqua water installation in Noombal, Thiruverkadu, Chennai." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: BUSINESS_URL },
      { property: "og:site_name", content: BUSINESS_NAME },
      { property: "og:image", content: `${BUSINESS_URL}${logoAsset.url}` },
      { property: "og:image:alt", content: "ALANWAR Build & Design logo" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: BUSINESS_URL }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      "@id": `${BUSINESS_URL}#business`,
      name: BUSINESS_NAME,
      url: BUSINESS_URL,
      telephone: "+919940566624",
      image: `${BUSINESS_URL}${logoAsset.url}`,
      founder: { "@type": "Person", name: "Anwar Basha A" },
      address: {
        "@type": "PostalAddress",
        streetAddress: `${CONTACT_ADDRESS.streetAddress}, ${CONTACT_ADDRESS.locality}`,
        addressLocality: CONTACT_ADDRESS.area,
        addressRegion: CONTACT_ADDRESS.region,
        postalCode: CONTACT_ADDRESS.postalCode,
        addressCountry: "IN",
      },
      areaServed: ["Noombal", "Thiruverkadu", "Chennai", "Tamil Nadu"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "ALANWAR Build & Design services",
        itemListElement: ["Interior Design", "Construction & Building", "RO Water Purifier Installation", "Aqua Water Installation"].map(name => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name, areaServed: "Chennai, Tamil Nadu" },
        })),
      },
    }) }],
  }),
  component: Home,
});

function Home() {
  return <><SiteHeader/><main>
    <section id="home" className="relative min-h-[94svh] overflow-hidden bg-ink text-primary-foreground">
      <img src={heroAsset.url} alt="Luxurious modern living room designed with warm stone, walnut and brass" width={1920} height={1280} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover"/>
      <div className="absolute inset-0 bg-ink/40"/><div className="absolute inset-y-0 left-0 z-20 w-1/2 door-left border-r border-primary/40 bg-ink"><div className="absolute inset-0 opacity-35 [background:repeating-linear-gradient(90deg,transparent_0_15%,var(--bronze)_15%_15.3%)]"/><span className="absolute right-5 top-1/2 h-3 w-3 rounded-full bg-bronze"/></div><div className="absolute inset-y-0 right-0 z-20 w-1/2 door-right border-l border-primary/40 bg-ink"><div className="absolute inset-0 opacity-35 [background:repeating-linear-gradient(90deg,transparent_0_15%,var(--bronze)_15%_15.3%)]"/><span className="absolute left-5 top-1/2 h-3 w-3 rounded-full bg-bronze"/></div>
      <div className="section-shell relative z-10 flex min-h-[94svh] items-end pb-16 pt-28 sm:items-center sm:pb-0"><div className="hero-reveal max-w-3xl"><div className="mb-6 flex items-center gap-4"><img src={logoAsset.url} alt="AL-ANWAR logo" className="h-16 w-16 rounded-full object-cover shadow-luxury"/><div><p className="text-2xl font-display">AL-ANWAR</p><p className="text-[10px] tracking-[.3em] text-primary-foreground/75">BUILD & DESIGN</p></div></div><h1 className="text-5xl leading-[1.02] sm:text-7xl lg:text-8xl">Designing Spaces.<br/><span className="text-bronze-soft">Building Dreams.</span></h1><p className="mt-6 max-w-2xl text-sm leading-7 text-primary-foreground/80 sm:text-base">Interior Design <span className="text-bronze-soft">|</span> Construction & Building <span className="text-bronze-soft">|</span> RO Water Purification</p><div className="mt-8 flex flex-wrap gap-3"><Button asChild variant="luxury" size="luxury"><a href="#contact">Get a Consultation</a></Button><Button asChild variant="glass" size="luxury"><a href="#projects">View Our Work</a></Button><Button asChild variant="whatsapp" size="luxury"><a href={whatsappLink(serviceMessages.interior)} target="_blank" rel="noreferrer"><MessageCircle/>WhatsApp Us</a></Button></div></div></div>
    </section>

    <section id="about" className="overflow-hidden py-24 sm:py-32"><div className="section-shell grid items-center gap-16 lg:grid-cols-[.9fr_1.1fr] lg:gap-20"><div className="relative mx-auto grid w-full max-w-md place-items-center py-6"><div className="founder-orbit absolute aspect-square w-[92%] rounded-full border border-primary/35" aria-hidden="true"><span className="absolute -right-1 top-1/2 h-2.5 w-2.5 rounded-full bg-primary shadow-luxury"/></div><div className="absolute aspect-square w-[82%] rounded-full border border-border bg-muted/45 shadow-luxury" aria-hidden="true"/><div className="relative aspect-square w-[72%] overflow-hidden rounded-full border-[6px] border-background shadow-luxury"><img src={ownerAsset.url} alt="Anwar Basha A, Founder of AL-ANWAR Build & Design" width={768} height={768} loading="lazy" className="h-full w-full object-cover object-center"/></div><div className="absolute bottom-2 right-[8%] h-20 w-20 rounded-full border border-primary/25 bg-background/70 backdrop-blur-sm sm:h-24 sm:w-24" aria-hidden="true"/></div><div><p className="eyebrow">Meet the founder</p><h2 className="mt-4 text-4xl sm:text-6xl">Anwar Basha A</h2><p className="mt-4 text-sm font-semibold uppercase tracking-[.16em] text-primary">Founder</p><p className="mt-2 font-display text-xl">AL-ANWAR Build & Design</p><p className="mt-6 max-w-2xl leading-8 text-muted-foreground">Anwar leads AL-ANWAR Build & Design with a focus on thoughtful design, dependable workmanship and customer-focused support. He brings the company’s three service areas together to create stylish, functional spaces and practical solutions shaped around each customer’s needs.</p><div className="mt-7 inline-flex items-center border-l-2 border-primary bg-muted px-4 py-3 text-sm font-medium">Creating Beautiful Spaces &amp; Reliable Solutions</div><div className="mt-8 grid gap-3 sm:grid-cols-3"><div className="founder-service flex items-center gap-3 border-t border-border pt-4"><Ruler className="h-5 w-5 shrink-0 text-primary"/><span className="text-sm font-medium">Interior Design</span></div><div className="founder-service flex items-center gap-3 border-t border-border pt-4"><Building2 className="h-5 w-5 shrink-0 text-primary"/><span className="text-sm font-medium">Construction &amp; Building</span></div><div className="founder-service flex items-center gap-3 border-t border-border pt-4"><Droplets className="h-5 w-5 shrink-0 text-primary"/><span className="text-sm font-medium">RO Water Purification</span></div></div></div></div></section>

    <section id="services" className="bg-ink py-24 text-primary-foreground sm:py-32"><div className="section-shell"><p className="eyebrow">What we do</p><h2 className="mt-4 max-w-3xl text-4xl sm:text-6xl">Three disciplines. One standard of care.</h2><div className="mt-16 space-y-20">
      <ServiceRow number="01" title="Interior Design" text="Residential interiors shaped around the way you live—from room and furniture planning to customized, stylish and functional spaces." points={["Residential interior design","Modern room design","Furniture & space planning","Customized interiors"]} image={heroAsset.url} alt="Premium modern interior design" icon={<Ruler/>} message={serviceMessages.interior}/>
      <ServiceRow reverse number="02" title="Construction & Building" text="Thoughtful project planning, quality workmanship and professional execution for dependable residential building outcomes." points={["Building construction","Residential construction","Project planning","Professional execution"]} image={constructionAsset.url} alt="Residential building under construction" icon={<Building2/>} message={serviceMessages.construction}/>
      <ServiceRow number="03" title="RO Water Purification" text="Clean, practical water solutions for the home, including RO purifier installation and maintenance support where applicable." points={["RO purifier installation","Water purification solutions","Home water solutions","Maintenance & service"]} image={roAsset.url} alt="Modern RO water purifier installed in a kitchen" icon={<Droplets/>} message={serviceMessages.ro} water/>
    </div></div></section>

    <DynamicContent/>

    <section id="contact" className="bg-navy py-24 text-primary-foreground sm:py-32"><div className="section-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start"><div><p className="eyebrow">Start a conversation</p><h2 className="mt-4 text-4xl sm:text-6xl">Let’s Build Something Beautiful Together.</h2><p className="mt-6 max-w-lg leading-7 text-primary-foreground/70">Tell us about your project and our team will get in touch with you for interior design, construction, or RO water purifier and Aqua water installation in Noombal, Thiruverkadu, Chennai.</p><address className="mt-8 border-l-2 border-primary pl-4 text-sm not-italic leading-7 text-primary-foreground/80">{CONTACT_ADDRESS_LINES.map(line => <span key={line} className="block">{line}</span>)}</address><div className="mt-8 flex flex-wrap gap-3"><Button asChild variant="glass"><a href={PHONE_LINK}><Phone/>Call {PHONE_DISPLAY}</a></Button><Button asChild variant="glass"><a href={MAPS_DIRECTIONS_URL} target="_blank" rel="noreferrer">Get Directions</a></Button><Button asChild variant="glass"><a href={instagramUrl} target="_blank" rel="noreferrer"><Instagram/>Instagram</a></Button><Button asChild variant="whatsapp"><a href={whatsappLink(serviceMessages.interior)} target="_blank" rel="noreferrer"><MessageCircle/>Interior / Construction</a></Button><Button asChild variant="whatsapp"><a href={whatsappLink(serviceMessages.ro)} target="_blank" rel="noreferrer"><Droplets/>RO WhatsApp</a></Button></div></div><EnquiryForm/></div></section>
  </main><Footer/></>;
}

function ServiceRow({number,title,text,points,image,alt,icon,message,reverse=false,water=false}:{number:string;title:string;text:string;points:string[];image:string;alt:string;icon:ReactNode;message:string;reverse?:boolean;water?:boolean}) { return <article className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${reverse?'lg:[&>*:first-child]:order-2':''}`}><div className="group relative overflow-hidden rounded-sm"><img src={image} alt={alt} loading="lazy" className="aspect-[4/3] h-full w-full object-cover transition duration-1000 group-hover:scale-[1.03]"/>{water&&<div className="water-wave absolute inset-x-0 bottom-0 h-20 bg-navy/50 [clip-path:ellipse(65%_45%_at_50%_100%)]"/>}<span className="absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-background text-ink">{icon}</span></div><div><p className="eyebrow">Service {number}</p><h3 className="mt-3 text-4xl sm:text-5xl">{title}</h3><p className="mt-5 max-w-xl leading-8 text-primary-foreground/68">{text}</p><ul className="mt-7 grid gap-3 sm:grid-cols-2">{points.map(p=><li key={p} className="flex items-center gap-3 text-sm"><ShieldCheck className="h-4 w-4 text-bronze-soft"/>{p}</li>)}</ul><div className="mt-8 flex flex-wrap gap-3"><Button asChild variant="glass"><a href={PHONE_LINK}><Phone/>Call</a></Button><Button asChild variant="whatsapp"><a href={whatsappLink(message)} target="_blank" rel="noreferrer"><MessageCircle/>WhatsApp</a></Button><Button asChild variant="luxury"><a href="#contact">Consultation<ArrowRight/></a></Button></div></div></article> }

function DynamicContent(){
  const [projects,setProjects]=useState<ProjectItem[]>([]); const [reviews,setReviews]=useState<ReviewItem[]>([]);
  useEffect(()=>{let active=true; async function load(){try{const [{data:p,error:projectError},{data:r,error:reviewError}]=await Promise.all([supabase.from('projects').select('*').order('sort_order').order('created_at'),supabase.from('reviews').select('*').eq('status','approved').order('created_at',{ascending:false})]); if(projectError||reviewError) throw projectError??reviewError; const pp=await Promise.all((p??[]).map(async x=>({...x,image_url:(await supabase.storage.from('project-photos').createSignedUrl(x.image_path,3600)).data?.signedUrl??''}))); const rr=await Promise.all((r??[]).map(async x=>({...x,photo_url:x.photo_path?(await supabase.storage.from('review-photos').createSignedUrl(x.photo_path,3600)).data?.signedUrl??null:null}))); if(active){setProjects(pp.filter(x=>x.image_url));setReviews(rr)}}catch(error){console.error('Unable to load public content',error); if(active){setProjects([]);setReviews([])}}} void load(); return()=>{active=false}},[]);
  return <><section id="projects" className="py-24 sm:py-32"><div className="section-shell"><p className="eyebrow">Selected projects</p><div className="mb-12 flex items-end justify-between gap-4"><h2 className="mt-4 text-4xl sm:text-6xl">Our Work</h2><p className="hidden max-w-sm text-right text-sm text-muted-foreground sm:block">A living portfolio, updated as new work is completed.</p></div><ContentCarousel type="projects" items={projects}/></div></section><section id="reviews" className="bg-muted py-24 sm:py-32"><div className="section-shell"><div className="mb-12 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4"><div><p className="eyebrow">Client voices</p><h2 className="mt-4 text-4xl sm:text-6xl">Reviews</h2></div><ReviewForm/></div><ContentCarousel type="reviews" items={reviews}/></div></section></>
}

function Footer(){return <footer className="bg-ink py-16 text-primary-foreground"><div className="section-shell grid gap-10 md:grid-cols-3"><div><p className="font-display text-3xl">AL-ANWAR</p><p className="mt-1 text-[10px] tracking-[.3em] text-primary-foreground/55">BUILD & DESIGN</p><a href={PHONE_LINK} className="mt-6 block text-sm text-bronze-soft">{PHONE_DISPLAY}</a><address className="mt-5 text-sm not-italic leading-6 text-primary-foreground/60">{CONTACT_ADDRESS_LINES.map(line => <span key={line} className="block">{line}</span>)}</address><div className="mt-4 flex flex-wrap gap-4 text-sm"><a href={MAPS_DIRECTIONS_URL} target="_blank" rel="noreferrer" className="text-bronze-soft">Get directions</a><a href={instagramUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-bronze-soft"><Instagram className="h-4 w-4"/>Instagram</a></div></div><div><h3 className="text-xs font-semibold uppercase tracking-[.18em]">Services</h3><ul className="mt-5 space-y-3 text-sm text-primary-foreground/60"><li>Interior Design</li><li>Construction & Building</li><li>RO Water Purifier &amp; Aqua Water Installation</li></ul></div><div><h3 className="text-xs font-semibold uppercase tracking-[.18em]">Quick links</h3><div className="mt-5 grid grid-cols-2 gap-3 text-sm text-primary-foreground/60">{['Home','About','Services','Projects','Reviews','Contact'].map(x=><a key={x} href={`#${x.toLowerCase()}`}>{x}</a>)}</div></div></div><div className="section-shell mt-12 flex items-center justify-between border-t border-primary-foreground/10 pt-6 text-[11px] text-primary-foreground/40"><span>© ALANWAR Build & Design. All rights reserved.</span></div></footer>}