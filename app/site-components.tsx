import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { SiteHeader } from "./site-header";
import {
  benefits,
  business,
  executionDetails,
  faqs,
  galleryItems,
  highlights,
  packages,
  products,
  proofPoints,
  projectTypes,
  safetyChecks,
  services,
  steps,
  systemDetails,
  testimonials,
  whyChooseUs,
} from "@/lib/site-data";
import { LeadForm } from "./lead-form";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <a className="footer-brand" href="/">
            <span className="brand-mark">
              <Image src="/logo.png" alt="AALAVAAI SOLAR" width={92} height={66} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </span>
            <span>
              AALAVAAI SOLAR
              <small>LIGHT TODAY | SAVE TOMORROW</small>
            </span>
          </a>
          <p>Premium solar street lights and solar energy solutions in Madurai and surrounding areas.</p>
          <p style={{ marginTop: 8, fontSize: 13, color: "var(--sun)", fontWeight: 800, letterSpacing: "0.06em" }}>LIGHT TODAY | SAVE TOMORROW</p>
        </div>
        <div>
          <h2>Products</h2>
          <a href="/projects">60W Solar Street Light</a>
          <a href="/projects">90W Solar Street Light</a>
          <a href="/projects">120W Solar Street Light</a>
          <a href="/services">Solar Power Solutions</a>
        </div>
        <div>
          <h2>Services</h2>
          <a href="/services">Solar Installation</a>
          <a href="/services">Solar Product Supply</a>
          <a href="/services">Solar Maintenance</a>
          <a href="/services">Solar Consultation</a>
        </div>
        <div>
          <h2>Contact</h2>
          <address>
            <strong>AALAVAAI SOLAR</strong>
            <span>{business.addressLine1}</span>
            <span>{business.addressLine2}</span>
            <a href={`tel:+91${business.phone}`}>{business.phoneDisplay}</a>
            <a href={`https://wa.me/${business.whatsapp}`}>WhatsApp enquiry</a>
            <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer">View on Google Maps</a>
          </address>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 AALAVAAI SOLAR</span>
        <span>LIGHT TODAY | SAVE TOMORROW</span>
      </div>
    </footer>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <main>
      <SiteHeader />
      {children}
      <SiteFooter />
    </main>
  );
}

export function PageHero({
  eyebrow,
  title,
  copy,
  image = "/solar-hero.webp",
}: {
  eyebrow: string;
  title: string;
  copy: string;
  image?: string;
}) {
  return (
    <section className="page-hero">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt="" aria-hidden="true" className="page-hero-img" />
      <div className="page-hero-overlay" />
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="hero-copy">{copy}</p>
      </div>
    </section>
  );
}

export function HomeHero() {
  return (
    <>
      <section className="hero" id="top">
        <video className="hero-media" autoPlay muted loop playsInline preload="auto" aria-hidden="true">
          <source src="/home.mp4" type="video/mp4" />
        </video>
        <div className="hero-content">
          <p className="eyebrow">AALAVAAI SOLAR — LIGHT TODAY | SAVE TOMORROW</p>
          <h1>Powering a Brighter, Sustainable Future</h1>
          <p className="hero-copy">
            LIGHT TODAY | SAVE TOMORROW — AALAVAAI SOLAR delivers premium solar street lights and solar energy solutions for homes, businesses and public spaces in Madurai and surrounding areas.
          </p>
          <div className="hero-actions">
            <a className="primary-btn" href="/contact">Get a Free Quote</a>
            <a className="secondary-btn" href="/services">Explore Our Solutions</a>
          </div>
          <div className="stats" aria-label="Product highlights">
            <span><strong>60W</strong>Solar Street Light</span>
            <span><strong>90W</strong>Solar Street Light</span>
            <span><strong>120W</strong>Solar Street Light</span>
          </div>
        </div>
        <div className="social-rail" aria-label="Quick contact links">
          <a href={`tel:+91${business.phone}`} aria-label="Call AALAVAAI SOLAR">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
          </a>
          <a href={`https://wa.me/${business.whatsapp}`} aria-label="WhatsApp AALAVAAI SOLAR">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
        </div>
        <a className="scroll-cue" href="#services" aria-label="Scroll down">⌄</a>
      </section>

      <section className="trust-strip" aria-label="Product highlights">
        {highlights.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </section>

      <section className="quick-panel-wrap" aria-label="Key features">
        <div className="quick-panel">
          <article>
            <span>☀️</span>
            <strong>Solar Powered</strong>
            <p>100% solar energy — no electricity bills, no grid wiring required.</p>
          </article>
          <article>
            <span>🔋</span>
            <strong>Long Life Battery</strong>
            <p>High-capacity battery backup for reliable all-night operation.</p>
          </article>
          <article>
            <span>📡</span>
            <strong>Remote Control</strong>
            <p>Easy brightness adjustment and scheduling from ground level.</p>
          </article>
        </div>
      </section>
    </>
  );
}

export function AboutSection() {
  return (
    <section className="section about" id="about">
      <div className="about-copy">
        <p className="eyebrow">About AALAVAAI SOLAR</p>
        <h2>Dedicated to Solar Energy Solutions and a Sustainable Future.</h2>
        <p>
          AALAVAAI SOLAR is a professional solar energy company based in Madurai, committed to delivering reliable, high-quality solar street lights and solar power solutions. We focus on understanding each customer&apos;s unique requirements and providing products that deliver real value.
        </p>
        <p>
          Our range of 60W, 90W and 120W solar street lights are solar powered, water resistant, equipped with long-life batteries and remote control — designed for easy installation and long-term performance.
        </p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 24 }}>
          <a className="primary-btn" href="/contact">Contact Us</a>
          <a className="secondary-btn" href="/services" style={{ border: "2px solid var(--navy)", color: "var(--navy)", background: "transparent" }}>Our Solutions</a>
        </div>
      </div>
      <div>
        <div className="about-img fade-up">
          <Image
            src="/local-about.webp"
            alt="AALAVAAI SOLAR solar installation"
            width={600}
            height={420}
            style={{ width: "100%", height: "420px", objectFit: "cover", objectPosition: "center" }}
            priority
          />
          <div className="about-img-badge">
            <span className="about-img-badge-num">3</span>
            <span className="about-img-badge-label">Product models</span>
          </div>
        </div>
        <div className="proof-grid">
          {proofPoints.map((item, i) => (
            <article className="fade-up" key={item.value} style={{ animationDelay: `${i * 80}ms` } as CSSProperties}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductsSection() {
  return (
    <section className="section" id="products" style={{ background: "var(--mist)" }}>
      <div className="section-head">
        <p className="eyebrow">Solar Street Lights</p>
        <h2>Premium solar street lights for every application.</h2>
        <p style={{ color: "var(--muted)", lineHeight: 1.7, marginTop: 8 }}>
          All models are solar powered, water resistant, equipped with long-life battery and remote control for easy installation and reliable performance.
        </p>
      </div>
      <div className="product-grid">
        {products.map((product, index) => (
          <article className="product-card fade-up" key={product.name} style={{ "--delay": `${index * 100}ms` } as CSSProperties}>
            <div className="product-badge">{product.badge}</div>
            <div className="product-wattage">{product.wattage}</div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <ul className="product-features">
              {product.features.map((f) => (
                <li key={f}>
                  <span className="product-feature-dot">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a className="primary-btn" href="/contact" style={{ marginTop: "auto", width: "100%", justifyContent: "center" }}>
              Enquire Now
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <>
      <section className="section services" id="services">
        <div className="section-head wide-head">
          <div>
            <p className="eyebrow">Our Services</p>
            <h2>Complete solar energy solutions under one roof.</h2>
          </div>
          <p>
            From solar street lights to full solar power systems — AALAVAAI SOLAR handles consultation, supply, installation, maintenance and ongoing support.
          </p>
        </div>
        <div className="service-grid">
          {services.map((service, index) => (
            <article className="service-card reveal-card fade-up" key={service.title} style={{ "--delay": `${index * 90}ms` } as CSSProperties}>
              <div className="service-card-img">
                <Image src={service.image} alt={service.title} width={400} height={200} style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }} />
              </div>
              <div className="service-card-body">
                <div className="service-icon">{service.icon === "solar" ? "☀" : service.icon === "bolt" ? "⚡" : service.icon === "tools" ? "🔧" : "📋"}</div>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
                <ul>
                  {service.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
                <div className="service-stat">
                  <strong>{service.stat}</strong>
                  <span>{service.statLabel}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section details">
        <div className="section-head">
          <p className="eyebrow">Product Features</p>
          <h2>Built for performance, reliability and ease of use.</h2>
        </div>
        <div className="detail-grid">
          {systemDetails.map(([title, body]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export function WhyChooseUsSection() {
  return (
    <section className="section" style={{ background: "var(--mist)" }}>
      <div className="section-head">
        <p className="eyebrow">Why Choose Us</p>
        <h2>Six reasons customers choose AALAVAAI SOLAR.</h2>
      </div>
      <div className="why-grid">
        {whyChooseUs.map((item) => (
          <article className="why-card fade-up" key={item.title}>
            <div className="why-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ExecutionDetailSection() {
  return (
    <section className="section execution">
      <div className="execution-photo">
        <Image src="/execution.webp" alt="AALAVAAI SOLAR professional solar installation" width={560} height={560} style={{ width: "100%", height: "560px", objectFit: "cover", borderRadius: 12 }} />
      </div>
      <div className="execution-content">
        <p className="eyebrow">Our Approach</p>
        <h2>Every project is planned for quality and long-term performance.</h2>
        <p>
          AALAVAAI SOLAR ensures thorough planning before installation begins — pole placement, panel orientation, battery positioning and cable routing are all carefully considered for maximum performance.
        </p>
        <div className="execution-grid">
          {executionDetails.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SafetySection() {
  return (
    <section className="section safety">
      <div className="section-head wide-head">
        <div>
          <p className="eyebrow">Quality Standards</p>
          <h2>Every installation checked for quality and long-term reliability.</h2>
        </div>
        <p>
          Every solar street light installation is verified for secure mounting, correct panel angle, weatherproof connections and full system testing.
        </p>
      </div>
      <div className="safety-grid">
        {safetyChecks.map((item, index) => (
          <article key={item} style={{ "--delay": `${index * 70}ms` } as CSSProperties}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{item}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ProjectsSection() {
  return (
    <>
      <section className="section projects" id="projects">
        <div className="section-head wide-head">
          <div>
            <p className="eyebrow">Applications</p>
            <h2>Solar lighting solutions for every application.</h2>
          </div>
          <p>
            AALAVAAI SOLAR delivers solar street light projects for residential colonies, main roads, schools, industrial areas and public spaces.
          </p>
        </div>
        <div className="project-grid">
          {projectTypes.map((project) => (
            <article className="fade-up" key={project.title} style={{ background: "var(--white)", border: "1px solid var(--line)", borderRadius: 10, padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" as const, minHeight: "auto" }}>
              <div className="project-card-img">
                <Image src={project.image} alt={project.title} width={400} height={200} style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ padding: "20px 24px 24px" }}>
                <span className="project-capacity">{project.capacity}</span>
                <h3 style={{ color: "var(--navy)", marginBottom: 8 }}>{project.title}</h3>
                <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.65, marginBottom: 16 }}>{project.body}</p>
                <a className="primary-btn" href="/contact" style={{ fontSize: 13, padding: "10px 18px" }}>Enquire Now</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section packages" style={{ background: "var(--mist)" }}>
        <div className="section-head wide-head">
          <div>
            <p className="eyebrow">Product Comparison</p>
            <h2>Choose the right solar street light for your needs.</h2>
          </div>
          <p>Compare our 60W, 90W and 120W solar street lights to find the perfect fit for your application.</p>
        </div>
        <div className="package-grid">
          {packages.map((item, index) => (
            <article key={item.name} className={index === 1 ? "featured-package" : ""} style={{ display: "grid", minHeight: "auto" }}>
              <small>{item.capacity}</small>
              <h3>{item.name}</h3>
              <p>{item.bestFor}</p>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <a href="/contact" className="primary-btn" style={{ marginTop: 24 }}>Enquire Now</a>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export function TestimonialsSection() {
  return (
    <section className="section testimonials">
      <div className="section-head">
        <p className="eyebrow">Customer Feedback</p>
        <h2>What our customers say about AALAVAAI SOLAR.</h2>
        <p>Real feedback from customers who chose AALAVAAI SOLAR for their solar street light and solar energy needs.</p>
      </div>
      <div className="testimonial-grid">
        {testimonials.map((t) => (
          <article className="testimonial-card fade-up" key={t.name}>
            <p className="testimonial-quote">{t.text}</p>
            <div className="testimonial-meta">
              <div>
                <div className="testimonial-name">{t.name}</div>
                <div className="testimonial-loc">📍 {t.location}</div>
              </div>
              <div>
                <div className="testimonial-system">{t.system}</div>
                <div style={{ color: "var(--sun)", fontSize: 12, fontWeight: 900, textAlign: "right", marginTop: 4 }}>{t.savings}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function BenefitsSection() {
  return (
    <section className="section benefits">
      <div className="benefit-panel">
        <p className="eyebrow">Why Choose AALAVAAI SOLAR</p>
        <h2>Quality solar solutions designed for real results.</h2>
        <p style={{ color: "rgba(255,255,255,0.7)", marginTop: 12, lineHeight: 1.7 }}>
          Every product is built for your specific needs with quality components, professional installation and reliable long-term support.
        </p>
      </div>
      <div className="benefit-grid">
        {benefits.map(([title, body], index) => (
          <article key={title} style={{ "--delay": `${index * 100}ms` } as CSSProperties}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function GallerySection({ dbImages }: { dbImages?: { id: number; url: string; label: string; tag: string }[] }) {
  const svgImages = [
    "/solar-panel.svg",
    "/electrical-panel.svg",
    "/commercial-solar.svg",
    "/net-meter.svg",
    "/technician.svg",
    "/solar-panel.svg",
    "/commercial-solar.svg",
    "/electrical-panel.svg",
    "/net-meter.svg",
  ];

  const items = dbImages && dbImages.length > 0
    ? dbImages.map((img) => ({ label: img.label, tag: img.tag, src: img.url }))
    : galleryItems.map((item, i) => ({ label: item.label, tag: item.tag, src: svgImages[i % svgImages.length] }));

  return (
    <section className="section gallery" id="gallery">
      <div>
        <p className="eyebrow">Gallery</p>
        <h2>Our solar products and installation work.</h2>
        <p style={{ color: "var(--muted)", lineHeight: 1.7, marginTop: 12 }}>
          Solar street light products, installation work and completed projects across Madurai and surrounding areas.
        </p>
        <a className="primary-btn" href="/gallery" style={{ marginTop: 24, display: "inline-flex" }}>View Full Gallery</a>
      </div>
      <div className="gallery-grid">
        {items.map((item, index) => (
          <article key={item.label + index} className={`gallery-tile tile-${index + 1}`} style={{ position: "relative", overflow: "hidden", padding: 0 }}>
            <Image src={item.src} alt={item.label} width={300} height={300} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} unoptimized />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(13,43,26,0.88))" }} />
            <div style={{ position: "relative", zIndex: 2, padding: 16, display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
              <span className="gallery-tag">{item.tag}</span>
              <span style={{ fontWeight: 900, fontSize: 13 }}>{item.label}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section className="section process" style={{ background: "var(--mist)" }}>
      <div className="section-head">
        <p className="eyebrow">Our Process</p>
        <h2>From consultation to commissioning.</h2>
      </div>
      <div className="process-grid">
        {steps.map(([num, title, body]) => (
          <article key={num}>
            <span>{num}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className="section contact" id="contact">
      <div className="contact-copy">
        <p className="eyebrow">Contact</p>
        <h2>Get in touch with AALAVAAI SOLAR.</h2>
        <p>Send your details and our team will get back to you to discuss your solar energy requirements and provide a free consultation.</p>
        <address>
          <strong>AALAVAAI SOLAR</strong>
          <span>{business.addressLine1}</span>
          <span>{business.addressLine2}</span>
          <a href={`tel:+91${business.phone}`}>{business.phoneDisplay}</a>
          <a href={`https://wa.me/${business.whatsapp}`}>WhatsApp: {business.phoneDisplay}</a>
          <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer">📍 View on Google Maps</a>
        </address>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 20 }}>
          <a href={`tel:+91${business.phone}`} className="primary-btn" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            📞 Call Now
          </a>
          <a href={`https://wa.me/${business.whatsapp}`} className="secondary-btn" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#25D366", color: "#fff", border: "none" }}>
            💬 WhatsApp
          </a>
        </div>
        <div style={{ marginTop: 28, borderRadius: 12, overflow: "hidden", background: "var(--line)", height: 280, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <iframe
            src="https://maps.google.com/maps?q=Mela+Ponnagaram+Main+Road+Karimedu+Madurai&output=embed"
            width="100%"
            height="280"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="AALAVAAI SOLAR location map"
          />
        </div>
      </div>
      <LeadForm />
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="section faq">
      <div className="section-head">
        <p className="eyebrow">Questions</p>
        <h2>Common questions about our solar products and services.</h2>
      </div>
      <div className="faq-grid">
        {faqs.map(([question, answer]) => (
          <article key={question}>
            <h3>{question}</h3>
            <p>{answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
