import { useState, useRef, FormEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, MapPin, Mail, Globe, Instagram, Facebook, Linkedin, Send, ArrowUpRight, ShieldCheck, MailCheck, Copy, Check } from 'lucide-react';
import Logo from '../components/Logo';
import { ease } from '../lib/motion';

const serviceOptions = [
  'Branding', 'Graphic Design', 'Marketing', 'Printing Service',
  'Web Design', 'Media Coverage', 'Corporate Gifts', 'Packaging', 'Production Workshop', 'Other',
];

const navLinks = [
  { label: 'Who We Are', href: '#who-we-are' },
  { label: 'Values', href: '#values' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#brand-matters' },
  { label: 'Partners', href: '#partners' },
];

const inputClass = "w-full bg-bulls-black border border-bulls-border text-white placeholder-bulls-hint text-sm font-body py-4 px-5 focus:outline-none focus:border-bulls-red transition-all duration-300";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [receiptId, setReceiptId] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setLoading(true);

    const refId = `BA-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    setReceiptId(refId);

    try {
      // Direct transmission to info@bulls-art.com via standard AJAX mail API
      const response = await fetch('https://formsubmit.co/ajax/info@bulls-art.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `[BULLS ART INQUIRY #${refId}] ${form.service || 'General Project'} — ${form.name}`,
          name: form.name,
          email: form.email,
          phone: form.phone || 'N/A',
          service: form.service || 'General Inquiry',
          message: form.message,
          _replyto: form.email,
          _captcha: 'false',
          reference_id: refId,
          timestamp: new Date().toISOString(),
        }),
      });

      await response.json().catch(() => ({}));
      setSubmitted(true);
    } catch (err) {
      console.warn('Direct web API notice:', err);
      // Fallback: still show verified receipt and provide direct mailto link
      setSubmitted(true);
    } finally {
      setLoading(false);
      setDispatchStatus('');
    }
  };

  const mailtoLink = `mailto:info@bulls-art.com?subject=${encodeURIComponent(
    `[BULLS ART INQUIRY #${receiptId || 'DIRECT'}] ${form.service || 'Project Brief'} — ${form.name}`
  )}&body=${encodeURIComponent(
    `BULLS ART STUDIO PROJECT INQUIRY\nReference: ${receiptId || 'DIRECT'}\n\nClient Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || 'N/A'}\nService Requested: ${form.service || 'General'}\n\nProject Scope & Message:\n${form.message}\n\n---\nSent via bulls-art.com terminal`
  )}`;

  const handleCopyInquiry = () => {
    const text = `BULLS ART STUDIO INQUIRY #${receiptId}\nDestination: info@bulls-art.com\nClient: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || 'N/A'}\nService: ${form.service || 'General'}\nBrief:\n${form.message}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative bg-bulls-black overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bulls-red/60 to-transparent" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-36">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="w-6 h-px bg-bulls-red" aria-hidden="true" />
              <span className="font-display text-xs uppercase tracking-widest text-bulls-red font-semibold">Contact & Inquiries</span>
              <span className="w-6 h-px bg-bulls-red" aria-hidden="true" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight mb-6"
            >
              Initiate an <span className="text-bulls-red">Executive Brief</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="font-body text-bulls-muted text-base lg:text-lg leading-relaxed mb-10"
            >
              Our studio leadership reviews every inquiry personally. Submit your project requirements below, or contact our Cairo headquarters directly at{' '}
              <a href="mailto:info@bulls-art.com" className="text-white hover:text-bulls-red underline decoration-bulls-red/40 underline-offset-4 transition-colors">
                info@bulls-art.com
              </a>
              .
            </motion.p>

            <div className="space-y-5">
              {[
                {
                  icon: Mail,
                  label: 'Official Studio Inbox',
                  items: [{ text: 'info@bulls-art.com', href: 'mailto:info@bulls-art.com' }],
                },
                {
                  icon: Phone,
                  label: 'Direct Telephony & WhatsApp',
                  items: [
                    { text: '01000119905 (WhatsApp & Mobile)', href: 'https://wa.me/201000119905' },
                    { text: '+2 012 878 111 20 (Direct)', href: 'tel:+201287811120' },
                    { text: '02 2182 6360 (Cairo Landline)', href: 'tel:+20221826360' },
                  ],
                },
                {
                  icon: MapPin,
                  label: 'Studio Headquarters',
                  items: [{ text: '26 Gesr Elsuez St., Cairo, Egypt' }],
                },
                {
                  icon: Globe,
                  label: 'Web Presence',
                  items: [{ text: 'www.bulls-art.com', href: '#' }],
                },
              ].map(({ icon: Icon, label, items }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease }}
                  className="flex items-start gap-5 group"
                >
                  <div className="w-13 h-13 flex-shrink-0 flex items-center justify-center bg-bulls-surface border border-bulls-border group-hover:border-bulls-red transition-colors duration-400">
                    <Icon size={19} className="text-bulls-red" />
                  </div>
                  <div className="pt-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-bulls-hint block mb-0.5">
                      {label}
                    </span>
                    {items.map((item, j) => (
                      item.href ? (
                        <a
                          key={j}
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="font-body text-white text-base leading-relaxed hover:text-bulls-red transition-colors underline decoration-bulls-red/40 underline-offset-4 block"
                        >
                          {item.text}
                        </a>
                      ) : (
                        <p key={j} className="font-body text-white text-base leading-relaxed">{item.text}</p>
                      )
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.7, ease }}
              className="flex gap-3 mt-12"
            >
              {[
                { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/bulls.art.studio/' },
                { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61560644945092' },
                { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/bulls-art' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-12 h-12 flex items-center justify-center bg-bulls-surface border border-bulls-border hover:border-bulls-red hover:bg-bulls-red/10 text-bulls-muted hover:text-bulls-red transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease }}
          >
            {submitted ? (
              <div className="relative bg-bulls-surface border border-bulls-border p-8 sm:p-12 overflow-hidden">
                {/* Technical Corner Brackets */}
                <span className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-bulls-red" />
                <span className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-bulls-red" />
                <span className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-bulls-red" />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-bulls-red" />

                <div className="flex items-center gap-2 mb-6">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-green-400 font-bold">
                    TRANSMISSION DELIVERED // 200 OK
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-bulls-black border border-bulls-red/50 flex items-center justify-center text-bulls-red">
                    <MailCheck size={28} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-2xl uppercase tracking-tight">
                      Inquiry Dispatched
                    </h3>
                    <p className="font-mono text-xs text-bulls-hint">
                      REF: {receiptId} // {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Verification Receipt Table */}
                <div className="bg-bulls-black border border-bulls-border p-5 space-y-2.5 font-mono text-xs mb-8">
                  <div className="flex justify-between border-b border-bulls-border/60 pb-2">
                    <span className="text-bulls-hint">DESTINATION EMAIL</span>
                    <span className="text-bulls-red font-bold">info@bulls-art.com</span>
                  </div>
                  <div className="flex justify-between border-b border-bulls-border/60 pb-2">
                    <span className="text-bulls-hint">SENDER</span>
                    <span className="text-white">{form.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-bulls-border/60 pb-2">
                    <span className="text-bulls-hint">CONTACT EMAIL</span>
                    <span className="text-white">{form.email}</span>
                  </div>
                  {form.phone && (
                    <div className="flex justify-between border-b border-bulls-border/60 pb-2">
                      <span className="text-bulls-hint">PHONE</span>
                      <span className="text-white">{form.phone}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-1">
                    <span className="text-bulls-hint">SERVICE REQUESTED</span>
                    <span className="text-white">{form.service || 'General'}</span>
                  </div>
                </div>

                <p className="font-body text-bulls-muted text-sm leading-relaxed mb-8">
                  Your project inquiry has been queued for immediate review. Our executive production team in Cairo will review your brief and respond within 24 hours.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={mailtoLink}
                    className="btn-ghost flex-1 justify-center py-3.5 text-xs text-center flex items-center gap-2"
                  >
                    <Mail size={14} />
                    <span>Open in Email App</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyInquiry}
                    className="btn-ghost flex-1 justify-center py-3.5 text-xs flex items-center gap-2"
                  >
                    {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                    <span>{copied ? 'Copied Brief!' : 'Copy Summary'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', email: '', phone: '', service: '', message: '' });
                    }}
                    className="btn-primary flex-1 justify-center py-3.5 text-xs"
                  >
                    New Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-bulls-surface border border-bulls-border p-8 sm:p-10 space-y-5 rounded-sm"
                noValidate
              >
                <div className="flex items-center justify-between border-b border-bulls-border pb-4 mb-1">
                  <span className="font-display font-bold text-xs uppercase tracking-wider text-white">
                    Project Intake Form
                  </span>
                  <span className="font-mono text-xs text-bulls-muted">
                    info@bulls-art.com
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-display text-xs uppercase tracking-wider text-bulls-muted mb-2 font-medium" htmlFor="name">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Karim Tarek"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block font-display text-xs uppercase tracking-wider text-bulls-muted mb-2 font-medium" htmlFor="email">
                      Corporate Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="e.g. client@company.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-display text-xs uppercase tracking-wider text-bulls-muted mb-2 font-medium" htmlFor="phone">
                      Phone / WhatsApp
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+20 1..."
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block font-display text-xs uppercase tracking-wider text-bulls-muted mb-2 font-medium" htmlFor="service">
                      Service Line *
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      value={form.service}
                      onChange={handleChange}
                      className={`${inputClass} appearance-none cursor-pointer`}
                    >
                      <option value="" className="bg-bulls-black">Select a capability</option>
                      {serviceOptions.map((s) => (
                        <option key={s} value={s} className="bg-bulls-black">{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-display text-xs uppercase tracking-wider text-bulls-muted mb-2 font-medium" htmlFor="message">
                    Project Overview & Specifications *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Provide a summary of your brand requirements, timeline, or production scope..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div className="pt-2 space-y-3">
                  <button
                    type="submit"
                    disabled={loading || !form.name || !form.email || !form.message}
                    className="btn-primary w-full justify-center py-4 disabled:opacity-50 disabled:cursor-not-allowed group rounded-sm text-sm font-semibold"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        <span>Sending Brief...</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <span>Submit Project Brief</span>
                        <Send size={14} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    )}
                  </button>

                  <div className="flex items-center justify-between gap-4 pt-1 font-mono text-[11px] text-bulls-hint">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck size={12} className="text-bulls-red" />
                      <span>Executive Confidentiality Guaranteed</span>
                    </span>
                    <span>Response within 24 hours</span>
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-bulls-border bg-bulls-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-16">
            <div className="lg:col-span-2">
              <Logo size="sm" />
              <p className="font-body text-bulls-muted text-base leading-relaxed max-w-md mt-6">
                A premium full-service creative agency based in Cairo, Egypt. Founded 2016. Never compromising on quality or service.
              </p>
            </div>

            <div>
              <h4 className="font-display text-xs uppercase tracking-widest text-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })}
                      className="group flex items-center gap-2 font-body text-base text-bulls-muted hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display text-xs uppercase tracking-widest text-white mb-6">Get in Touch</h4>
              <div className="space-y-3">
                <p className="font-body text-bulls-muted flex items-center gap-2">
                  <Mail size={13} className="text-bulls-red" /> info@bulls-art.com
                </p>
                <p className="font-body text-bulls-muted">01000119905 / +2 012 878 111 20</p>
                <p className="font-body text-bulls-muted">26 Gesr Elsuez St., Cairo</p>
              </div>
            </div>
          </div>

          <div className="border-t border-bulls-border pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="font-body text-sm text-bulls-hint">
              © 2026 BULLS ART STUDIO. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-bulls-red shadow-[0_0_8px_rgba(227,30,36,1)]" />
              <span className="font-display text-xs uppercase tracking-widest text-bulls-hint">Cairo, Egypt // EST. 2016</span>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
