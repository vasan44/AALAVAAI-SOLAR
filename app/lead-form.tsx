"use client";

import { useState } from "react";

type FormState = "idle" | "saving" | "saved" | "error";

export function LeadForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function submit(formData: FormData) {
    setState("saving");
    setMessage("");

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        phone: formData.get("phone"),
        area: formData.get("area"),
        propertyType: formData.get("propertyType"),
        monthlyBill: formData.get("monthlyBill"),
        message: formData.get("message"),
      }),
    });

    if (response.ok) {
      setState("saved");
      setMessage("Request saved. Our team will call you back.");
      return;
    }

    const result = await response.json().catch(() => null);
    setState("error");
    setMessage(result?.error ?? "Unable to save request right now.");
  }

  return (
    <form action={submit} className="lead-form">
      <h3>Request a free quote</h3>
      <div className="form-row">
        <label>
          Name
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          Phone
          <input name="phone" type="tel" autoComplete="tel" required />
        </label>
      </div>
      <div className="form-row">
        <label>
          Area / Village
          <input name="area" required />
        </label>
        <label>
          Property
          <select name="propertyType" defaultValue="Home" required>
            <option>Home</option>
            <option>Shop / Business</option>
            <option>Institution</option>
            <option>Not sure yet</option>
          </select>
        </label>
      </div>
      <label>
        Monthly bill
        <input name="monthlyBill" placeholder="Example: ₹4,000" />
      </label>
      <label>
        Message
        <textarea name="message" placeholder="Roof type, current load or preferred visit time" />
      </label>
      <button className="primary-btn" disabled={state === "saving"} type="submit">
        {state === "saving" ? "Saving..." : "Send Request"}
      </button>
      {message && <p className={`form-message ${state}`}>{message}</p>}
    </form>
  );
}
