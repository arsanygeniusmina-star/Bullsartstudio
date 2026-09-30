import { useState, useRef, FormEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Phone,
  MapPin,
  Mail,
  Globe,
  Instagram,
  Facebook,
  Linkedin,
  Send,
  ArrowUpRight,
  ShieldCheck,
  MailCheck,
  Copy,
  Check,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import Logo from '../components/Logo';
import { ease } from '../lib/motion';

const serviceOptions = [
  'Branding & Identity',
  'Graphic Design',
  'Strategic Marketing',
  'Industrial Printing',
  'Web & Digital Experience',
  'Media & Film Production',
  'Executive Corporate Gifting',
  'Packaging Engineering',
  'Architectural Fabrication',
  'General Project / Other',
];

const navLinks = [
  { label: 'Who We Are', href: '#who-we-are' },
  { label: 'Values', href: '#values' },
  { label: 'Services', href: '#services' },
  { label: 'Selected Work', href: '#gallery' },
  { label: 'Why Branding', href: '#brand-matters' },
  { label: 'Partners', href: '#partners' },
];

const inputClass =
  'w-full bg-bulls-black border border-bulls-border text-white placeholder-bulls-hint text-sm font-body py-3.5 px-4 focus:outline-none focus:border-bulls-red transition-all duration-200 rounded-sm';

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [receiptId, setReceiptId] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (errorNotice) setErrorNotice(null);
  };

  const getSubject = (id: string) =>
    `[BULLS ART INQUIRY #${id || 'DIRECT'}] ${form.service || 'Project Brief'} — ${form.name || 'Client'}`;

  const getBodyText = (id: string) =>
    `BULLS ART STUDIO — PROJECT INQUIRY\nReference ID: #${id || 'DIRECT'}\n\nClient Name: ${form.name}\nEmail: ${form.email}\nPhone / WhatsApp: ${form.phone || 'Not provided'}\nCapability / Service: ${form.service || 'General Inquiry'}\n\nProject Scope & Specifications:\n${form.message}\n\n---\nDispatched from bullsartstudio.com\nHeadquarters: 26 Gesr Elsuez St., Cairo, Egypt`;

  const getMailtoUrl = (id: string) => {
    const subject = getSubject(id);
    const body = getBodyText(id);
    return `mailto:info@bulls-art.com?cc=arsany.genius.mina@gmail.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const getGmailWebUrl = (id: string) => {
    const subject = getSubject(id);
    const body = getBodyText(id);
    return `https://mail.google.com/mail/?view=cm&fs=1&to=info@bulls-art.com&cc=arsany.genius.mina@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const getOutlookWebUrl = (id: string) => {
    const subject = getSubject(id);
    const body = getBodyText(id);
    return `https://outlook.live.com/default.aspx?rru=compose&to=info@bulls-art.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const getWhatsAppUrl = (id: string) => {
    const msg = `*BULLS ART STUDIO BRIEF (#${id || 'DIRECT'})*\n\n*Name:* ${form.name}\n*Email:* ${form.email}\n*Phone:* ${form.phone || 'N/A'}\n*Service:* ${form.service || 'General'}\n\n*Project Details:*\n${form.message}`;
    return `https://wa.me/201000119905?text=${encodeURIComponent(msg)}`;
  };

  const handleDirectEmailOpen = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setErrorNotice('Please fill in your Name, Email, and Project Overview first.');
      return;
    }
    const currentId = receiptId || `BA-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    setReceiptId(currentId);
    window.location.href = getMailtoUrl(currentId);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setErrorNotice('Please fill in all required fields (Name, Corporate Email, and Project Overview).');
      return;
    }

    setLoading(true);
    setErrorNotice(null);

    const refId = `BA-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    setReceiptId(refId);

    try {
      // Send directly to studio inbox and CC management via form gateway
      await fetch('https://formsubmit.co/ajax/info@bulls-art.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `[BULLS ART INQUIRY #${refId}] ${form.service || 'General Project'} — ${form.name}`,
          name: form.name,
          email: form.email,
          phone: form.phone || 'N/A',
          service: form.service || 'General Inquiry',
          message: form.message,
          _cc: 'arsany.genius.mina@gmail.com',
          _replyto: form.email,
          _captcha: 'false',
          reference_id: refId,
          timestamp: new Date().toISOString(),
        }),
      });

      setSubmitted(true);
    } catch (err) {
      console.warn('Form gateway notice:', err);
      // Even if external gateway is blocked by CORS/adblocker, display confirmation with immediate email/WhatsApp dispatch
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyInquiry = () => {
    const text = getBodyText(receiptId);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative bg-bulls-black overflow-hidden border-t border-bulls-border"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-36">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column: Studio Information */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="w-6 h-px bg-bulls-red" aria-hidden="true" />
              <span className="font-display text-xs uppercase tracking-widest text-bulls-red font-semibold">
                Direct Consultation
              </span>
              <span className="w-6 h-px bg-bulls-red" aria-hidden="true" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-6"
            >
              Initiate an <span className="text-bulls-red">Executive Brief</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="font-body text-bulls-muted text-base lg:text-lg leading-relaxed mb-10"
            >
              Our leadership reviews every brief personally. Submit your project scope below, connect directly via email client, or contact our Cairo headquarters directly at{' '}
              <a
                href="mailto:info@bulls-art.com?cc=arsany.genius.mina@gmail.com"
                className="text-white hover:text-bulls-red underline decoration-bulls-red/40 underline-offset-4 transition-colors font-medium"
              >
                info@bulls-art.com
              </a>
              .
            </motion.p>

            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  label: 'Official Inboxes',
                  items: [
                    {
                      text: 'info@bulls-art.com',
                      href: 'mailto:info@bulls-art.com?cc=arsany.genius.mina@gmail.com',
                    },
                  ],
                },
                {
                  icon: Phone,
                  label: 'Direct Phone & WhatsApp',
                  items: [
                    {
                      text: '01000119905 (WhatsApp & Mobile)',
                      href: 'https://wa.me/201000119905',
                    },
                    {
                      text: '+2 012 878 111 20 (Direct Line)',
                      href: 'tel:+201287811120',
                    },
                    {
                      text: '02 2182 6360 (Cairo Studio Landline)',
                      href: 'tel:+20221826360',
                    },
                  ],
                },
                {
                  icon: MapPin,
                  label: 'Studio Headquarters',
                  items: [{ text: '26 Gesr Elsuez St., Cairo, Egypt' }],
                },
                {
                  icon: Globe,
                  label: 'Domain & Web Presence',
                  items: [{ text: 'bullsartstudio.com', href: 'https://bullsartstudio.com' }],
                },
              ].map(({ icon: Icon, label, items }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center bg-bulls-surface border border-bulls-border group-hover:border-bulls-red transition-colors rounded-sm">
                    <Icon size={18} className="text-bulls-red" />
                  </div>
                  <div className="pt-0.5">
                    <span className="font-display text-[10px] uppercase tracking-wider text-bulls-hint block mb-1 font-semibold">
                      {label}
                    </span>
                    {items.map((item, j) =>
                      item.href ? (
                        <a
                          key={j}
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="font-body text-white text-sm sm:text-base leading-relaxed hover:text-bulls-red transition-colors block"
                        >
                          {item.text}
                        </a>
                      ) : (
                        <p key={j} className="font-body text-white text-sm sm:text-base leading-relaxed">
                          {item.text}
                        </p>
                      )
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.7, ease }}
              className="flex gap-3 mt-10"
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
                  className="w-11 h-11 flex items-center justify-center bg-bulls-surface border border-bulls-border hover:border-bulls-red hover:bg-bulls-red/10 text-bulls-muted hover:text-bulls-red transition-all rounded-sm"
                >
                  <Icon size={17} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Clean Executive Intake Form & Email Dispatch */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease }}
          >
            {submitted ? (
              <div className="bg-bulls-surface border border-bulls-border p-8 sm:p-10 rounded-sm shadow-xl space-y-6">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 bg-bulls-black border border-bulls-red/60 flex items-center justify-center text-bulls-red rounded-sm">
                    <MailCheck size={24} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-xl uppercase tracking-tight">
                      Brief Formatted & Ready
                    </h3>
                    <p className="font-body text-xs text-bulls-hint">
                      Reference #{receiptId} · Prepared for info@bulls-art.com
                    </p>
                  </div>
                </div>

                {/* Verification Confirmation Table */}
                <div className="bg-bulls-black/80 border border-bulls-border p-5 space-y-2.5 font-body text-xs rounded-sm">
                  <div className="flex justify-between border-b border-bulls-border/60 pb-2">
                    <span className="text-bulls-hint font-medium">Recipient:</span>
                    <span className="text-bulls-red font-semibold">info@bulls-art.com</span>
                  </div>
                  <div className="flex justify-between border-b border-bulls-border/60 pb-2">
                    <span className="text-bulls-hint font-medium">CC:</span>
                    <span className="text-white/80 font-mono text-[11px]">arsany.genius.mina@gmail.com</span>
                  </div>
                  <div className="flex justify-between border-b border-bulls-border/60 pb-2">
                    <span className="text-bulls-hint font-medium">Sender:</span>
                    <span className="text-white font-medium">{form.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-bulls-border/60 pb-2">
                    <span className="text-bulls-hint font-medium">Contact Email:</span>
                    <span className="text-white">{form.email}</span>
                  </div>
                  {form.phone && (
                    <div className="flex justify-between border-b border-bulls-border/60 pb-2">
                      <span className="text-bulls-hint font-medium">Phone / WhatsApp:</span>
                      <span className="text-white">{form.phone}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-1">
                    <span className="text-bulls-hint font-medium">Service Selected:</span>
                    <span className="text-white font-semibold">{form.service || 'General Inquiry'}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="font-display text-[11px] uppercase tracking-wider text-bulls-hint block font-semibold">
                    Select Your Preferred Dispatch Channel:
                  </span>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {/* Native Email App */}
                    <a
                      href={getMailtoUrl(receiptId)}
                      className="btn-primary justify-center py-3 text-xs flex items-center gap-2"
                    >
                      <Mail size={15} />
                      <span>Open in Mail App</span>
                    </a>

                    {/* Gmail Web */}
                    <a
                      href={getGmailWebUrl(receiptId)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost justify-center py-3 text-xs flex items-center gap-2 border-bulls-red/50 hover:border-bulls-red"
                    >
                      <ExternalLink size={14} className="text-bulls-red" />
                      <span>Open in Gmail Web</span>
                    </a>

                    {/* Outlook Web */}
                    <a
                      href={getOutlookWebUrl(receiptId)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost justify-center py-3 text-xs flex items-center gap-2 border-bulls-border hover:border-white"
                    >
                      <ExternalLink size={14} className="text-blue-400" />
                      <span>Open in Outlook Web</span>
                    </a>

                    {/* WhatsApp */}
                    <a
                      href={getWhatsAppUrl(receiptId)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost justify-center py-3 text-xs flex items-center gap-2 text-green-400 border-green-500/30 hover:border-green-500 hover:text-green-300"
                    >
                      <MessageSquare size={14} />
                      <span>Send via WhatsApp</span>
                    </a>

                    {/* Copy to Clipboard */}
                    <button
                      type="button"
                      onClick={handleCopyInquiry}
                      className="btn-ghost justify-center py-3 text-xs flex items-center gap-2 sm:col-span-2"
                    >
                      {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                      <span>{copied ? 'Copied to Clipboard' : 'Copy Full Summary'}</span>
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center border-t border-bulls-border/60">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', email: '', phone: '', service: '', message: '' });
                    }}
                    className="text-bulls-hint hover:text-white font-mono text-xs transition-colors underline underline-offset-4"
                  >
                    ← Submit Another Project Brief
                  </button>

                  <span className="font-mono text-[10px] text-bulls-hint">
                    Direct Studio Response: &lt; 24h
                  </span>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-bulls-surface border border-bulls-border p-7 sm:p-9 space-y-4 rounded-sm shadow-xl"
                noValidate
              >
                <div className="flex items-center justify-between border-b border-bulls-border pb-3 mb-2">
                  <span className="font-display font-bold text-xs uppercase tracking-wider text-white">
                    Project Intake Form
                  </span>
                  <span className="font-body text-xs text-bulls-muted">
                    Direct to: <strong className="text-white">info@bulls-art.com</strong>
                  </span>
                </div>

                {errorNotice && (
                  <div className="p-3 bg-red-950/40 border border-bulls-red text-bulls-red font-body text-xs rounded-sm">
                    {errorNotice}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block font-display text-xs uppercase tracking-wider text-bulls-muted mb-1.5 font-semibold"
                      htmlFor="name"
                    >
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
                    <label
                      className="block font-display text-xs uppercase tracking-wider text-bulls-muted mb-1.5 font-semibold"
                      htmlFor="email"
                    >
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

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block font-display text-xs uppercase tracking-wider text-bulls-muted mb-1.5 font-semibold"
                      htmlFor="phone"
                    >
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
                    <label
                      className="block font-display text-xs uppercase tracking-wider text-bulls-muted mb-1.5 font-semibold"
                      htmlFor="service"
                    >
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
                      <option value="" className="bg-bulls-black">
                        Select a capability
                      </option>
                      {serviceOptions.map((s) => (
                        <option key={s} value={s} className="bg-bulls-black">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    className="block font-display text-xs uppercase tracking-wider text-bulls-muted mb-1.5 font-semibold"
                    htmlFor="message"
                  >
                    Project Overview & Specifications *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Provide a summary of your brand requirements, production volume, or desired timeline..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div className="pt-2 space-y-3">
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {/* Primary Submit */}
                    <button
                      type="submit"
                      disabled={loading || !form.name || !form.email || !form.message}
                      className="btn-primary justify-center py-3.5 disabled:opacity-50 disabled:cursor-not-allowed group text-xs sm:text-sm font-bold tracking-wider"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          <span>Formatting Brief...</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <span>Submit & Review Brief</span>
                          <Send size={14} className="transition-transform group-hover:translate-x-1" />
                        </span>
                      )}
                    </button>

                    {/* Instant Direct Email Launch */}
                    <button
                      type="button"
                      onClick={handleDirectEmailOpen}
                      className="btn-ghost justify-center py-3.5 text-xs font-bold tracking-wider flex items-center gap-2"
                      title="Directly launch your installed email client (Gmail/Apple Mail/Outlook)"
                    >
                      <Mail size={14} className="text-bulls-red" />
                      <span>Open in Email App</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-1 font-body text-[11px] text-bulls-hint">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck size={13} className="text-bulls-red" />
                      <span>Executive Confidentiality Guaranteed</span>
                    </span>
                    <span>Direct response within 24 hours</span>
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Clean Editorial Footer */}
      <footer className="border-t border-bulls-border bg-bulls-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-14">
            <div className="lg:col-span-2">
              <Logo size="sm" />
              <p className="font-body text-bulls-muted text-sm sm:text-base leading-relaxed max-w-md mt-6">
                A premier integrated creative agency & industrial fabrication facility based in Cairo, Egypt. Established in 2016. Dedicated to absolute quality and precision execution.
              </p>
            </div>

            <div>
              <h4 className="font-display text-xs uppercase tracking-widest text-white mb-5 font-bold">Quick Navigation</h4>
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })}
                      className="group flex items-center gap-2 font-body text-sm text-bulls-muted hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display text-xs uppercase tracking-widest text-white mb-5 font-bold">Cairo Headquarters</h4>
              <div className="space-y-2.5 font-body text-sm text-bulls-muted">
                <p className="flex items-center gap-2">
                  <Mail size={13} className="text-bulls-red" />
                  <a
                    href="mailto:info@bulls-art.com?cc=arsany.genius.mina@gmail.com"
                    className="hover:text-white transition-colors"
                  >
                    info@bulls-art.com
                  </a>
                </p>
                <p>
                  <a href="tel:+201000119905" className="hover:text-white transition-colors">
                    01000119905
                  </a>{' '}
                  /{' '}
                  <a href="tel:+201287811120" className="hover:text-white transition-colors">
                    +2 012 878 111 20
                  </a>
                </p>
                <p>26 Gesr Elsuez St., Cairo, Egypt</p>
              </div>
            </div>
          </div>

          <div className="border-t border-bulls-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-body text-xs text-bulls-hint">
              © 2026 BULLS ART STUDIO. All rights reserved.
            </p>
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 bg-bulls-red rounded-full" />
              <span className="font-display text-[11px] uppercase tracking-wider text-bulls-hint font-medium">
                Cairo, Egypt · Established 2016
              </span>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
