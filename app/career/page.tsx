import type { Metadata } from "next";
import { PageHero, SiteShell } from "../site-components";
import { business } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Careers",
  description: "Career opportunities at AALAVAAI SOLAR. Current openings for Accountant and Tele Calling positions in Madurai.",
};

function CareersContent() {
  const openings = [
    {
      title: "ACCOUNTANT",
      qualification: "Any Degree",
      experience: "1 Year Working Experience",
      description: "We are looking for a detail-oriented Accountant to manage financial records, prepare reports and support our growing solar energy business.",
    },
    {
      title: "TELE CALLING",
      qualification: "Any Degree",
      experience: "1 Year Working Experience",
      description: "We are seeking a motivated Tele Calling executive to connect with potential customers, explain our solar solutions and generate leads.",
    },
  ];

  return (
    <>
      <section className="section" style={{ background: "var(--mist)" }}>
        <div className="section-head">
          <p className="eyebrow">Current Openings</p>
          <h2>Join the AALAVAAI SOLAR Team</h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.7, marginTop: 12 }}>
            Be part of a growing solar energy company committed to powering a sustainable future. We are looking for dedicated professionals to join our team.
          </p>
        </div>
        <div style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
          {openings.map((job) => (
            <article key={job.title} style={{
              background: "var(--white)",
              border: "1px solid var(--line)",
              borderRadius: 14,
              padding: 32,
              position: "relative",
              overflow: "hidden",
              transition: "box-shadow 240ms, transform 240ms",
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 4,
                background: "linear-gradient(90deg, var(--green), #1a9e72)",
              }} />
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(21,129,92,0.1)", borderRadius: 6,
                padding: "4px 12px", marginBottom: 16,
              }}>
                <span style={{ color: "var(--green)", fontSize: 12, fontWeight: 900, letterSpacing: "0.06em" }}>HIRING NOW</span>
              </div>
              <h3 style={{ color: "var(--navy)", fontSize: 22, fontWeight: 900, marginBottom: 16 }}>{job.title}</h3>
              <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.65, marginBottom: 20 }}>{job.description}</p>
              <div style={{ display: "grid", gap: 10, marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 16 }}>🎓</span>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Qualification</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--navy)" }}>{job.qualification}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 16 }}>💼</span>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Experience</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--navy)" }}>{job.experience}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 16 }}>📍</span>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Location</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--navy)" }}>Madurai</div>
                  </div>
                </div>
              </div>
              <a
                href={`tel:+91${business.phone}`}
                className="primary-btn"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14 }}
              >
                Apply Now →
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section" style={{ background: "var(--navy)", color: "var(--white)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <p className="eyebrow" style={{ color: "var(--sun)" }}>Get in Touch</p>
          <h2 style={{ color: "var(--white)", marginBottom: 16 }}>Ready to Join Our Team?</h2>
          <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.75, marginBottom: 32 }}>
            Contact us directly to apply or learn more about career opportunities at AALAVAAI SOLAR.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={`tel:+91${business.phone}`} className="primary-btn">📞 Call {business.phoneDisplay}</a>
            <a href={`https://wa.me/${business.whatsapp}`} className="secondary-btn" style={{ background: "#25D366", color: "#fff", border: "none" }}>💬 WhatsApp Us</a>
          </div>
        </div>
      </section>
    </>
  );
}

export default function CareerPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Careers"
        title="Build Your Career with AALAVAAI SOLAR"
        copy="Join our growing team and be part of the solar energy revolution. We are looking for passionate professionals to help us power a sustainable future."
        image="/carrer.webp"
      />
      <CareersContent />
    </SiteShell>
  );
}
