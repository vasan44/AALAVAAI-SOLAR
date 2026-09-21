import type { Metadata } from "next";
import type { CSSProperties } from "react";
import {
  HomeHero,
  WhyChooseUsSection,
  TestimonialsSection,
  ProcessSection,
  ContactSection,
  SiteShell,
  ProductsSection,
} from "./site-components";
import { services, faqs, business } from "@/lib/site-data";
import Image from "next/image";

export const metadata: Metadata = {
  title: { absolute: "AALAVAAI SOLAR | Solar Street Lights 60W 90W 120W | Madurai" },
  description:
    "AALAVAAI SOLAR provides premium solar street lights (60W, 90W, 120W) and solar energy solutions in Madurai. Solar powered, long life battery, water resistant, remote control. LIGHT TODAY | SAVE TOMORROW.",
};

function HomeServicesPreview() {
  return (
    <section className="section services" id="services">
      <div className="section-head wide-head">
        <div>
          <p className="eyebrow">Our Services</p>
          <h2>Complete solar energy solutions for every need.</h2>
        </div>
        <p>
          From solar street lights to full solar power systems — AALAVAAI SOLAR handles consultation, supply, installation and maintenance.
        </p>
      </div>
      <div className="service-grid">
        {services.slice(0, 4).map((service, index) => (
          <article
            className="service-card reveal-card fade-up"
            key={service.title}
            style={{ "--delay": `${index * 90}ms` } as CSSProperties}
          >
            <div className="service-card-img">
              <Image
                src={service.image}
                alt={service.title}
                width={400}
                height={160}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div className="service-card-body">
              <div className="service-icon">
                {service.icon === "solar"
                  ? "☀"
                  : service.icon === "bolt"
                  ? "⚡"
                  : service.icon === "tools"
                  ? "🔧"
                  : "📋"}
              </div>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
              <div className="service-stat">
                <strong>{service.stat}</strong>
                <span>{service.statLabel}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 36 }}>
        <a className="primary-btn" href="/services">
          Explore Our Services →
        </a>
      </div>
    </section>
  );
}

function HomeAboutStrip() {
  return (
    <section className="section home-about-strip">
      <div className="home-about-grid">
        <div>
          <p className="eyebrow" style={{ color: "var(--sun)" }}>
            About AALAVAAI SOLAR
          </p>
          <h2 style={{ color: "var(--white)", marginBottom: 16 }}>
            Reliable Solar Energy Solutions for a Brighter Tomorrow
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.75 }}>
            AALAVAAI SOLAR is dedicated to providing high-quality solar street lights and solar power solutions that help homes, businesses and public spaces reduce energy costs while contributing to a sustainable future.
          </p>
          <p style={{ color: "var(--sun)", fontWeight: 900, letterSpacing: "0.06em", marginTop: 16, fontSize: 15 }}>
            LIGHT TODAY | SAVE TOMORROW
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 24, flexWrap: "wrap" }}>
            <a className="primary-btn" href="/about">About Us</a>
            <a className="secondary-btn" href="/contact" style={{ borderColor: "rgba(255,255,255,0.4)" }}>Contact Us</a>
          </div>
        </div>
        <div className="home-about-stats">
          <div className="home-stat-card">
            <strong>60W</strong>
            <span>Solar Street Light</span>
          </div>
          <div className="home-stat-card">
            <strong>90W</strong>
            <span>Solar Street Light</span>
          </div>
          <div className="home-stat-card">
            <strong>120W</strong>
            <span>Solar Street Light</span>
          </div>
          <div className="home-stat-card">
            <strong>100%</strong>
            <span>Solar Powered</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeFaqPreview() {
  const topFaqs = faqs.slice(0, 4);
  return (
    <section className="section" style={{ background: "var(--mist)" }}>
      <div className="section-head">
        <p className="eyebrow">Common questions</p>
        <h2>Quick answers about our solar products and services.</h2>
      </div>
      <div className="faq-grid">
        {topFaqs.map(([question, answer]) => (
          <article key={question}>
            <h3>{question}</h3>
            <p>{answer}</p>
          </article>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 32 }}>
        <a className="primary-btn" href="/contact">
          Ask Your Question →
        </a>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <SiteShell>
      <HomeHero />
      <ProductsSection />
      <HomeServicesPreview />
      <HomeAboutStrip />
      <WhyChooseUsSection />
      <ProcessSection />
      <TestimonialsSection />
      <HomeFaqPreview />
      <ContactSection />
    </SiteShell>
  );
}
