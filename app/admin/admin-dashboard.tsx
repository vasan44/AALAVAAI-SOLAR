"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { leadStatuses } from "@/lib/site-data";
import type { Lead, GalleryImage } from "@/lib/db";

type LoadState = "idle" | "loading" | "ready" | "error";
type Tab = "enquiries" | "gallery";

const STATUS_COLORS: Record<string, string> = {
  new: "#3b82f6",
  contacted: "#8b5cf6",
  quoted: "#f59e0b",
  won: "#10b981",
  lost: "#ef4444",
};
const STATUS_BG: Record<string, string> = {
  new: "rgba(59,130,246,0.15)",
  contacted: "rgba(139,92,246,0.15)",
  quoted: "rgba(245,158,11,0.15)",
  won: "rgba(16,185,129,0.15)",
  lost: "rgba(239,68,68,0.15)",
};

const GALLERY_TAGS = [
  "Installation","Electrical","Safety","Wiring",
  "Protection","Maintenance","Grid","Mounting","Commercial","General",
];

/* ── SVG icon helpers ── */
function Icon({ d, size = 18 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

/* ── Premium Login ── */
function AdminLogin({ password, setPassword, onSubmit, loading, error }: {
  password: string; setPassword: (v: string) => void;
  onSubmit: () => void; loading: boolean; error: string;
}) {
  const [showPw, setShowPw] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="al-root">
      <div className="al-bg" aria-hidden="true">
        <div className="al-glow al-glow-1" /><div className="al-glow al-glow-2" />
        <div className="al-rays" /><div className="al-grid" />
        {[...Array(18)].map((_, i) => (
          <span key={i} className="al-particle" style={{
            left:`${(i*37+11)%100}%`, top:`${(i*53+7)%100}%`,
            animationDelay:`${(i*0.7)%6}s`, animationDuration:`${6+(i%5)}s`,
            width:i%3===0?3:2, height:i%3===0?3:2,
          }} />
        ))}
      </div>
      <div className="al-card">
        <a href="/" className="al-back">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to website
        </a>
        <div className="al-brand">
          <div className="al-logo">A</div>
          <div className="al-brand-text">
            <span className="al-brand-name">AALAVAAI SOLAR</span>
            <span className="al-brand-sub">LIGHT TODAY | SAVE TOMORROW</span>
          </div>
        </div>
        <div className="al-heading">
          <h1 className="al-title">Admin Panel</h1>
          <p className="al-subtitle">Secure access to manage your website</p>
        </div>
        <div className="al-form">
          <label className="al-label" htmlFor="al-pw">Admin Password</label>
          <div className="al-input-wrap">
            <svg className="al-lock-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <input ref={inputRef} id="al-pw" className="al-input"
              type={showPw?"text":"password"} value={password}
              onChange={(e)=>setPassword(e.target.value)}
              onKeyDown={(e)=>e.key==="Enter"&&onSubmit()}
              placeholder="Enter your password" autoComplete="current-password" />
            <button type="button" className="al-eye"
              onClick={()=>{setShowPw(v=>!v);inputRef.current?.focus();}}
              aria-label={showPw?"Hide password":"Show password"}>
              {showPw?(
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              ):(
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/>
                </svg>
              )}
            </button>
          </div>
          {error&&(
            <div className="al-error" role="alert">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"/>
                <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              {error}
            </div>
          )}
          <button className="al-btn" onClick={onSubmit} disabled={loading} type="button">
            {loading&&<span className="al-spinner" aria-hidden="true"/>}
            {loading?"Authenticating…":"Open Dashboard →"}
          </button>
        </div>
        <p className="al-note">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{flexShrink:0}}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
          </svg>
          Protected by password authentication
        </p>
      </div>
    </div>
  );
}

/* ── Stat Card ── */
function StatCard({ label, value, desc, accent, icon }: {
  label: string; value: number; desc: string; accent: string; icon: string;
}) {
  return (
    <div className="db-stat-card" style={{"--accent":accent} as React.CSSProperties}>
      <div className="db-stat-icon" style={{background:`${accent}18`,color:accent}}>
        <Icon d={icon} size={20}/>
      </div>
      <div className="db-stat-body">
        <span className="db-stat-label">{label}</span>
        <strong className="db-stat-value">{value}</strong>
        <span className="db-stat-desc">{desc}</span>
      </div>
      <div className="db-stat-bar" style={{background:`${accent}22`}}>
        <div className="db-stat-bar-fill" style={{background:accent,width:`${Math.min(100,value*10+10)}%`}}/>
      </div>
    </div>
  );
}

/* ── Dashboard Header ── */
function DashHeader({ onBack }: { onBack: () => void }) {
  const now = new Date().toLocaleDateString("en-IN",{weekday:"short",day:"2-digit",month:"short",year:"numeric"});
  return (
    <header className="db-header">
      <div className="db-header-left">
        <div className="db-header-brand">
          <div className="db-header-logo">A</div>
          <div>
            <div className="db-header-title">Admin Dashboard</div>
            <div className="db-header-sub">Manage enquiries, customers and gallery content</div>
          </div>
        </div>
      </div>
      <div className="db-header-right">
        <div className="db-status-pill">
          <span className="db-status-dot" aria-hidden="true"/>
          System Online
        </div>
        <div className="db-header-date">{now}</div>
        <a href="/" className="db-back-btn" title="Back to website">
          <Icon d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" size={16}/>
          <span>Website</span>
        </a>
      </div>
    </header>
  );
}

/* ── Welcome Banner ── */
function WelcomeBanner() {
  return (
    <div className="db-welcome">
      <div className="db-welcome-bg" aria-hidden="true">
        <div className="db-welcome-glow"/>
        <div className="db-welcome-grid"/>
        <div className="db-welcome-sun"/>
      </div>
      <div className="db-welcome-content">
        <p className="db-welcome-eyebrow">
          <Icon d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2" size={14}/>
          AALAVAAI SOLAR
        </p>
        <h2 className="db-welcome-title">Welcome back, Admin</h2>
        <p className="db-welcome-copy">Here&apos;s what&apos;s happening with your business today.</p>
      </div>
    </div>
  );
}

/* ── Empty State ── */
function EmptyEnquiries({ filtered }: { filtered: boolean }) {
  return (
    <div className="db-empty">
      <div className="db-empty-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
        </svg>
      </div>
      <h3 className="db-empty-title">{filtered?"No results found":"No enquiries yet"}</h3>
      <p className="db-empty-copy">{filtered?"Try adjusting your search or filter.":"New customer enquiries will appear here automatically."}</p>
    </div>
  );
}

/* ── Enquiry Row ── */
function EnquiryCard({ lead, onStatus, onDelete }: {
  lead: Lead;
  onStatus: (id:number,s:string)=>void;
  onDelete: (id:number)=>void;
}) {
  return (
    <article className="db-lead-row">
      <div className="db-lead-avatar">
        {lead.name.charAt(0).toUpperCase()}
      </div>
      <div className="db-lead-main">
        <div className="db-lead-name">{lead.name}</div>
        <div className="db-lead-meta">
          <span>
            <Icon d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" size={13}/>
            <a href={`tel:${lead.phone}`}>{lead.phone}</a>
          </span>
          <span>
            <Icon d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" size={13}/>
            {lead.area}
          </span>
          <span>
            <Icon d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" size={13}/>
            {lead.property_type}
          </span>
          {lead.monthly_bill&&(
            <span>
              <Icon d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" size={13}/>
              {lead.monthly_bill}
            </span>
          )}
        </div>
        {lead.message&&<div className="db-lead-msg">&ldquo;{lead.message}&rdquo;</div>}
      </div>
      <div className="db-lead-actions">
        <span className="db-status-badge" style={{background:STATUS_BG[lead.status],color:STATUS_COLORS[lead.status],border:`1px solid ${STATUS_COLORS[lead.status]}33`}}>
          {lead.status.toUpperCase()}
        </span>
        <time className="db-lead-time">
          {new Date(lead.created_at).toLocaleString("en-IN",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}
        </time>
        <select className="db-status-select" value={lead.status} onChange={(e)=>onStatus(lead.id,e.target.value)} aria-label="Change status">
          {leadStatuses.map(s=><option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
        </select>
        <button className="db-delete-btn" onClick={()=>onDelete(lead.id)} aria-label="Delete enquiry">
          <Icon d="M3 6h18M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" size={14}/>
          Delete
        </button>
      </div>
    </article>
  );
}

/* ── Gallery Add Form ── */
function GalleryAddForm({ imgFile, setImgFile, imgPreview, setImgPreview, imgLabel, setImgLabel, imgTag, setImgTag, imgSaving, imgError, imgFileError, imgLabelError, onAdd }: {
  imgFile: File|null; setImgFile:(v:File|null)=>void;
  imgPreview: string; setImgPreview:(v:string)=>void;
  imgLabel:string; setImgLabel:(v:string)=>void;
  imgTag:string; setImgTag:(v:string)=>void;
  imgSaving:boolean; imgError:string;
  imgFileError:string; imgLabelError:string;
  onAdd:()=>void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function handleFile(file: File | undefined) {
    if (!file) return;
    const allowed = ["image/jpeg","image/jpg","image/png","image/webp","image/svg+xml"];
    if (!allowed.includes(file.type)) return;
    setImgFile(file);
    const reader = new FileReader();
    reader.onload = e => setImgPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault(); setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }

  function clearFile() {
    setImgFile(null); setImgPreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div className="db-gallery-form">
      <div className="db-gallery-form-header">
        <Icon d="M12 5v14M5 12h14" size={18}/>
        <h3>Add New Image</h3>
      </div>
      <div className="db-gallery-form-fields">
        {/* Upload box */}
        <div className="db-field-label">
          <span>Select Image</span>
          {!imgPreview ? (
            <div
              className={`db-upload-box${dragging ? " db-upload-box--drag" : ""}`}
              onDragOver={e=>{e.preventDefault();setDragging(true);}}
              onDragLeave={()=>setDragging(false)}
              onDrop={handleDrop}
              onClick={()=>fileInputRef.current?.click()}
              role="button" tabIndex={0}
              onKeyDown={e=>(e.key==="Enter"||e.key==" ")&&fileInputRef.current?.click()}
              aria-label="Select image to upload"
            >
              <svg className="db-upload-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <span className="db-upload-btn">Select Image</span>
              <span className="db-upload-hint">Choose an image from your device</span>
              <span className="db-upload-formats">JPG · JPEG · PNG · WEBP · SVG</span>
            </div>
          ) : (
            <div className="db-upload-preview">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imgPreview} alt="preview" className="db-upload-preview-img"/>
              <div className="db-upload-preview-info">
                <span className="db-upload-preview-name">{imgFile?.name}</span>
                <div className="db-upload-preview-actions">
                  <button type="button" className="db-upload-change" onClick={()=>fileInputRef.current?.click()}>
                    <Icon d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" size={13}/>
                    Change
                  </button>
                  <button type="button" className="db-upload-remove" onClick={clearFile}>
                    <Icon d="M18 6L6 18M6 6l12 12" size={13}/>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          )}
          {imgFileError&&<span className="db-field-error">{imgFileError}</span>}
          <input ref={fileInputRef} type="file" accept="image/jpeg,image/jpg,image/png,image/webp,image/svg+xml"
            style={{display:"none"}} onChange={e=>handleFile(e.target.files?.[0])}/>
        </div>

        <label className="db-field-label">
          Label
          <input className="db-field-input" placeholder="e.g. Rooftop panel mounting"
            value={imgLabel} onChange={e=>setImgLabel(e.target.value)}/>
          {imgLabelError&&<span className="db-field-error">{imgLabelError}</span>}
        </label>

        <label className="db-field-label">
          Tag
          <select className="db-field-input" value={imgTag} onChange={e=>setImgTag(e.target.value)}>
            {GALLERY_TAGS.map(t=><option key={t}>{t}</option>)}
          </select>
        </label>
      </div>
      {imgError&&<p className="db-gallery-error" style={{marginTop:12}}>{imgError}</p>}
      <button className="db-add-btn" onClick={onAdd} disabled={imgSaving}>
        {imgSaving?(
          <><span className="al-spinner" aria-hidden="true"/> Saving…</>
        ):(
          <><Icon d="M12 5v14M5 12h14" size={16}/> Add to Gallery</>
        )}
      </button>
    </div>
  );
}

export function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [state, setState] = useState<LoadState>("idle");
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("enquiries");

  const [leads, setLeads] = useState<Lead[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [images, setImages] = useState<GalleryImage[]>([]);
  const [imgFile, setImgFile] = useState<File|null>(null);
  const [imgPreview, setImgPreview] = useState("");
  const [imgLabel, setImgLabel] = useState("");
  const [imgTag, setImgTag] = useState("General");
  const [imgSaving, setImgSaving] = useState(false);
  const [imgError, setImgError] = useState("");
  const [imgFileError, setImgFileError] = useState("");
  const [imgLabelError, setImgLabelError] = useState("");

  const stats = useMemo(()=>({
    total: leads.length,
    new: leads.filter(l=>l.status==="new").length,
    contacted: leads.filter(l=>l.status==="contacted").length,
    quoted: leads.filter(l=>l.status==="quoted").length,
    won: leads.filter(l=>l.status==="won").length,
  }),[leads]);

  const filteredLeads = useMemo(()=>leads.filter(l=>{
    const matchStatus = statusFilter==="all"||l.status===statusFilter;
    const q = search.toLowerCase();
    const matchSearch = !q||l.name.toLowerCase().includes(q)||l.phone.includes(q)||l.area.toLowerCase().includes(q);
    return matchStatus&&matchSearch;
  }),[leads,statusFilter,search]);

  function authHeaders(){ return {Authorization:`Bearer ${password}`}; }

  async function loadDashboard() {
    setState("loading"); setError("");
    try {
      const [leadsRes,galleryRes] = await Promise.all([
        fetch("/api/leads",{headers:authHeaders()}),
        fetch("/api/gallery",{headers:authHeaders()}),
      ]);
      if(!leadsRes.ok){
        setState("error");
        setError(leadsRes.status===401?"Wrong admin password.":"Unable to load leads.");
        return;
      }
      const leadsData = await leadsRes.json();
      const galleryData = galleryRes.ok?await galleryRes.json():{images:[]};
      setLeads(leadsData.leads);
      setImages(galleryData.images??[]);
      setState("ready");
    } catch {
      setState("error");
      setError("Network error. Please try again.");
    }
  }

  async function changeStatus(id:number,status:string){
    const res = await fetch("/api/leads",{method:"PATCH",headers:{"Content-Type":"application/json",...authHeaders()},body:JSON.stringify({id,status})});
    if(!res.ok) return;
    const data = await res.json();
    setLeads(prev=>prev.map(l=>l.id===id?data.lead:l));
  }

  async function deleteLead(id:number){
    if(!confirm("Delete this enquiry permanently?")) return;
    const res = await fetch("/api/leads",{method:"DELETE",headers:{"Content-Type":"application/json",...authHeaders()},body:JSON.stringify({id})});
    if(res.ok) setLeads(prev=>prev.filter(l=>l.id!==id));
  }

  async function addImage(){
    let valid = true;
    if(!imgFile){setImgFileError("Please select an image.");valid=false;}else{setImgFileError("");}
    if(!imgLabel.trim()){setImgLabelError("Please enter a label.");valid=false;}else{setImgLabelError("");}
    if(!valid) return;
    setImgSaving(true); setImgError("");
    // Upload file first
    const form = new FormData();
    form.append("file", imgFile!);
    const upRes = await fetch("/api/gallery/upload",{method:"POST",headers:{...authHeaders()},body:form});
    if(!upRes.ok){const d=await upRes.json().catch(()=>null);setImgError(d?.error??"Upload failed.");setImgSaving(false);return;}
    const {url} = await upRes.json();
    // Save metadata
    const res = await fetch("/api/gallery",{method:"POST",headers:{"Content-Type":"application/json",...authHeaders()},body:JSON.stringify({url,label:imgLabel.trim(),tag:imgTag})});
    setImgSaving(false);
    if(!res.ok){const d=await res.json().catch(()=>null);setImgError(d?.error??"Unable to save image.");return;}
    const data = await res.json();
    setImages(prev=>[data.image,...prev]);
    setImgFile(null); setImgPreview(""); setImgLabel(""); setImgTag("General");
  }

  async function deleteImage(id:number){
    if(!confirm("Delete this image permanently?")) return;
    const res = await fetch("/api/gallery",{method:"DELETE",headers:{"Content-Type":"application/json",...authHeaders()},body:JSON.stringify({id})});
    if(res.ok) setImages(prev=>prev.filter(img=>Number(img.id)!==id));
  }

  if(state!=="ready"){
    return <AdminLogin password={password} setPassword={setPassword} onSubmit={loadDashboard} loading={state==="loading"} error={error}/>;
  }

  return (
    <div className="db-root">
      <div className="db-bg" aria-hidden="true">
        <div className="db-bg-glow-1"/><div className="db-bg-glow-2"/>
        <div className="db-bg-grid"/>
      </div>
      <div className="db-layout">
        <DashHeader onBack={()=>{}}/>
        <WelcomeBanner/>
        <div className="db-stats-grid">
          <StatCard label="Total Enquiries" value={stats.total} desc="All enquiries received" accent="#14b8a6"
            icon="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
          <StatCard label="New" value={stats.new} desc="Awaiting first contact" accent="#3b82f6"
            icon="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <StatCard label="Contacted" value={stats.contacted} desc="In conversation" accent="#8b5cf6"
            icon="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          <StatCard label="Quoted" value={stats.quoted} desc="Proposal sent" accent="#f59e0b"
            icon="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8"/>
          <StatCard label="Won" value={stats.won} desc="Projects confirmed" accent="#10b981"
            icon="M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3"/>
        </div>

        <div className="db-workspace">
          <div className="db-tabs">
            <button className={`db-tab${tab==="enquiries"?" active":""}`} onClick={()=>setTab("enquiries")}>
              <Icon d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8z" size={16}/>
              Enquiries
              <span className="db-tab-count">{leads.length}</span>
            </button>
            <button className={`db-tab${tab==="gallery"?" active":""}`} onClick={()=>setTab("gallery")}>
              <Icon d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" size={16}/>
              Gallery
              <span className="db-tab-count">{images.length}</span>
            </button>
          </div>

          {tab==="enquiries"&&(
            <section aria-label="Enquiries">
              <div className="db-controls">
                <div className="db-search-wrap">
                  <Icon d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" size={16}/>
                  <input className="db-search" placeholder="Search enquiries by name, phone or area…"
                    value={search} onChange={e=>setSearch(e.target.value)}/>
                </div>
                <div className="db-filter-wrap">
                  <Icon d="M3 4h18M7 8h10M11 12h2" size={16}/>
                  <select className="db-filter" value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} aria-label="Filter by status">
                    <option value="all">All statuses</option>
                    {leadStatuses.map(s=><option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
                  </select>
                </div>
              </div>
              {filteredLeads.length===0?(
                <EmptyEnquiries filtered={leads.length>0&&filteredLeads.length===0}/>
              ):(
                <div className="db-lead-list">
                  {filteredLeads.map(lead=>(
                    <EnquiryCard key={lead.id} lead={lead} onStatus={changeStatus} onDelete={deleteLead}/>
                  ))}
                </div>
              )}
            </section>
          )}

          {tab==="gallery"&&(
            <section aria-label="Gallery management">
              <GalleryAddForm
                imgFile={imgFile} setImgFile={setImgFile}
                imgPreview={imgPreview} setImgPreview={setImgPreview}
                imgLabel={imgLabel} setImgLabel={setImgLabel}
                imgTag={imgTag} setImgTag={setImgTag}
                imgSaving={imgSaving} imgError={imgError}
                imgFileError={imgFileError} imgLabelError={imgLabelError}
                onAdd={addImage}
              />
              {images.length===0?(
                <div className="db-empty" style={{marginTop:20}}>
                  <div className="db-empty-icon">
                    <Icon d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" size={48}/>
                  </div>
                  <h3 className="db-empty-title">No gallery images yet</h3>
                  <p className="db-empty-copy">Add your first image using the form above.</p>
                </div>
              ):(
                <div className="db-gallery-grid">
                  {images.map(img=>(
                    <div key={img.id} className="db-gallery-card">
                      <div className="db-gallery-img">
                        <Image src={img.url} alt={img.label} fill style={{objectFit:"cover"}} unoptimized/>
                        <div className="db-gallery-overlay">
                          <button className="db-gallery-del" onClick={()=>deleteImage(img.id)} aria-label="Delete image">
                            <Icon d="M3 6h18M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6M10 11v6M14 11v6" size={15}/>
                          </button>
                        </div>
                      </div>
                      <div className="db-gallery-meta">
                        <span className="db-gallery-tag">{img.tag}</span>
                        <span className="db-gallery-label">{img.label}</span>
                        <span className="db-gallery-date">{new Date(img.created_at).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
