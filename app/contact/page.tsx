"use client";

import { useState } from "react";
import Link from "next/link";
import { fetchGraphQL } from "@/lib/wpgraphql";

type FormState = "idle" | "sending" | "sent" | "error";





export default function contact() {
   const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<FormState>("idle");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    // Simulate async send — replace with real endpoint when ready
    setTimeout(() => setStatus("sent"), 1400);
  }

  return (
    <div className="bg-cream text-charcoal">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end pt-16">
        <img
          src="https://images.unsplash.com/photo-1482961667792-d164d3e7ab3d?w=1920&h=800&fit=crop&auto=format"
          alt="Woman hiking on a mountain trail"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/10 to-charcoal/75" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-cream/50 mb-3">
            Get in touch
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-cream leading-tight">
            Say Hello
          </h1>
          <p className="mt-3 text-sm text-cream/60 max-w-md">
            Whether you want to talk trails, books, races or collaborations — I
            would love to hear from you.
          </p>
        </div>
      </section>

      {/* Main grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-px bg-border">

            {/* Left — info */}
            <div className="lg:col-span-2 bg-cream p-10 space-y-12">
              <div>
                <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-muted-fg mb-5">
                  Ways to reach me
                </p>
                <div className="space-y-6">
                  {[
                    {
                      label: "Email",
                      value: "dixitanchal11@gmail.com",
                      href: "mailto:dixitanchal11@gmail.com",
                    },
                    {
                      label: "Strava",
                      value: "Anchal on Strava",
                      href: "https://www.strava.com/athletes/anchal_dixit",
                    },
                    {
                      label: "Instagram",
                      value: "@dazzling.anchal",
                      href: "https://www.instagram.com/dazzlinganchal/",
                    },
                    
                     {
                      label: "Facebook",
                      value: "#dazzling_anchal",
                      href: "https://www.facebook.com/anchaldixit11/",
                    },
                  ].map((c) => (
                    <div key={c.label} className="border-b border-border pb-5">
                      <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-fg mb-1">
                        {c.label}
                      </p>
                      <a
                        href={c.href}
                        className="text-sm text-charcoal hover:text-earth transition-colors" target="_blank"
                      >
                        {c.value}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-muted-fg mb-5">
                  I am open to
                </p>
                <ul className="space-y-3">
                  {[
                    "Trek or run collaborations",
                    "Travel writing & features",
                    "Brand partnerships aligned with my values",
                    "Photography enquiries",
                    "Just a good conversation",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-1 h-1 rounded-full bg-earth mt-2 flex-shrink-0" />
                      <span className="text-sm text-muted-fg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <blockquote className="pl-5 border-l border-earth">
                <p className="font-serif italic text-base text-charcoal leading-relaxed">
                  &ldquo;The best adventures often start with a single conversation.&rdquo;
                </p>
              </blockquote>
            </div>

            {/* Right — form */}
            <div className="lg:col-span-3 bg-cream p-10">
              <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-muted-fg mb-8">
                Send a message
              </p>

              {status === "sent" ? (
                <div className="h-full flex flex-col justify-center py-16 text-center">
                  <span className="font-mono text-3xl text-earth block mb-4">✓</span>
                  <h2 className="font-serif text-2xl text-charcoal mb-3">
                    Message sent.
                  </h2>
                  <p className="text-sm text-muted-fg max-w-xs mx-auto leading-relaxed">
                    Thanks for reaching out. I read every message and will get
                    back to you soon.
                  </p>
                  <button
                    onClick={() => { setStatus("idle"); setForm({ name: "", email: "", subject: "", message: "" }); }}
                    className="mt-8 mx-auto text-xs tracking-[0.12em] uppercase text-charcoal border-b border-charcoal/30 pb-0.5 hover:border-charcoal transition-colors"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Field label="Your name" required>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Anchal Sharma"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Email address" required>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="hello@example.com"
                        className={inputCls}
                      />
                    </Field>
                  </div>

                  <Field label="Subject">
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className={inputCls}
                    >
                      <option value="">Select a topic</option>
                      <option>Trek / Run collaboration</option>
                      <option>Travel writing feature</option>
                      <option>Brand partnership</option>
                      <option>Photography enquiry</option>
                      <option>Just saying hello</option>
                      <option>Other</option>
                    </select>
                  </Field>

                  <Field label="Message" required>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Tell me what you have in mind..."
                      className={`${inputCls} resize-none`}
                    />
                  </Field>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full sm:w-auto px-10 py-3.5 bg-charcoal text-cream text-xs tracking-[0.15em] uppercase font-mono hover:bg-earth transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === "sending" ? "Sending…" : "Send message"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Location strip */}
      <section className="bg-charcoal text-cream py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-cream/10">
            {[
              { label: "Based in", value: "Pune, Maharashtra" },
              { label: "Usually found", value: "On a trail or at a starting line" },
              { label: "Response time", value: "Within 48 hours" },
            ].map((item) => (
              <div key={item.label} className="py-8 px-6 text-center">
                <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-cream/40 mb-2">
                  {item.label}
                </p>
                <p className="font-serif text-lg text-cream">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const inputCls =
  "w-full bg-cream border border-border text-charcoal text-sm font-sans px-4 py-3 placeholder:text-muted-fg/50 focus:outline-none focus:border-charcoal transition-colors";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block font-mono text-[9px] tracking-[0.2em] uppercase text-muted-fg mb-2">
        {label}
        {required && <span className="text-earth ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}
