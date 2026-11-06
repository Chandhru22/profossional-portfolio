import { useRef, useState } from 'react';
import { CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';
import { contactForm } from '../data/portfolio.js';
import { submitContact, ContactError } from '../services/contactService.js';

const EMPTY = { name: '', email: '', subject: '', message: '', website: '' };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values) {
  const errors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();

  if (!name) errors.name = 'Please enter your name.';
  else if (name.length > 100) errors.name = 'Name must be 100 characters or fewer.';

  if (!email) errors.email = 'Please enter your email address.';
  else if (!EMAIL_PATTERN.test(email) || email.length > 254) errors.email = 'Please enter a valid email address.';

  if (!subject) errors.subject = 'Please enter a subject.';
  else if (subject.length > 150) errors.subject = 'Subject must be 150 characters or fewer.';

  if (!message) errors.message = 'Please enter a message.';
  else if (message.length < 10) errors.message = 'Message should be at least 10 characters.';
  else if (message.length > 2000) errors.message = 'Message must be 2000 characters or fewer.';

  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [feedback, setFeedback] = useState('');
  const submittingRef = useRef(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submittingRef.current) return; // blocks accidental double submits

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus('error');
      setFeedback('Please fix the highlighted fields and try again.');
      return;
    }

    submittingRef.current = true;
    setStatus('submitting');
    setFeedback('');

    try {
      const result = await submitContact({
        name: values.name.trim(),
        email: values.email.trim(),
        subject: values.subject.trim(),
        message: values.message.trim(),
        website: values.website, // honeypot: real visitors leave this empty
      });
      setStatus('success');
      setFeedback(result.message || 'Thanks! Your message has been received.');
      setValues(EMPTY); // reset only after the server confirmed the save
      setErrors({});
    } catch (err) {
      setStatus('error');
      if (err instanceof ContactError) {
        setFeedback(err.message);
        if (err.fieldErrors && Object.keys(err.fieldErrors).length) setErrors(err.fieldErrors);
      } else {
        setFeedback('Something went wrong. Please try again.');
      }
    } finally {
      submittingRef.current = false;
    }
  };

  const inputClass = (field) =>
    `w-full rounded-sm border bg-surface px-4 py-3.5 font-geist text-[15px] text-ink placeholder:text-muted/40 transition-colors focus:border-cyan focus:outline-none ${
      errors[field] ? 'border-red-400/70' : 'border-white/10'
    }`;

  const labelClass = 'font-geist text-xs font-medium uppercase tracking-[0.06em] text-muted';
  const isSubmitting = status === 'submitting';

  return (
    <form onSubmit={handleSubmit} noValidate aria-describedby="contact-feedback" className="glass relative flex flex-col gap-5 rounded-2xl p-6 shadow-2xl md:p-10">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-name" className={labelClass}>Your Name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Doe"
            value={values.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={inputClass('name')}
          />
          {errors.name && <p id="name-error" className="text-xs text-red-300">{errors.name}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-email" className={labelClass}>Your Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="jane@company.com"
            value={values.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={inputClass('email')}
          />
          {errors.email && <p id="email-error" className="text-xs text-red-300">{errors.email}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-subject" className={labelClass}>Subject / Inquiry</label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          placeholder={contactForm.subjectPlaceholder}
          value={values.subject}
          onChange={handleChange}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          className={inputClass('subject')}
        />
        {errors.subject && <p id="subject-error" className="text-xs text-red-300">{errors.subject}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className={labelClass}>Message Details</label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          placeholder={contactForm.messagePlaceholder}
          value={values.message}
          onChange={handleChange}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`${inputClass('message')} resize-y`}
        />
        {errors.message && <p id="message-error" className="text-xs text-red-300">{errors.message}</p>}
      </div>

      {/* Honeypot: hidden from people, often filled by spam bots. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={handleChange} />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="group flex w-full items-center justify-center gap-2 rounded-sm bg-brand-gradient-3 py-3.5 font-sora text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>

      <div id="contact-feedback" role="status" aria-live="polite" className="min-h-[1.5rem]">
        {status === 'success' && (
          <p className="flex items-center gap-2 text-sm text-mint-soft">
            <CheckCircle2 size={16} aria-hidden="true" /> {feedback}
          </p>
        )}
        {status === 'error' && feedback && (
          <p className="flex items-center gap-2 text-sm text-red-300">
            <AlertCircle size={16} aria-hidden="true" /> {feedback}
          </p>
        )}
      </div>
    </form>
  );
}
