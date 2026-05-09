"use client";

import { useActionState } from "react";
import { submitContact } from "../actions";
import { useLanguage } from "../context/LanguageContext";

const initialState = { success: false, error: null };

export default function ContactForm() {
  const { t } = useLanguage();
  const c = t.contact;
  const [state, action, pending] = useActionState(submitContact, initialState);

  const errorMsg =
    state.error === "required"
      ? c.errorRequired
      : state.error === "invalid_phone"
        ? c.errorPhone
        : null;

  if (state.success) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <div className="text-4xl">✓</div>
        <p className="text-lg font-light tracking-wide text-[var(--accent)]">
          {c.successTitle}
        </p>
        <p className="text-sm text-[var(--text-muted)]">{c.successSub}</p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-xs tracking-widest uppercase text-[var(--text-muted)]">
            {c.name} <span className="text-[var(--accent)]">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder={c.namePlaceholder}
            className="w-full border border-[var(--border)] bg-[var(--muted)] px-4 py-3 text-sm text-[var(--foreground)] placeholder-[var(--text-muted)] outline-none transition-colors focus:border-[var(--accent-dim)]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs tracking-widest uppercase text-[var(--text-muted)]">
            {c.phone} <span className="text-[var(--accent)]">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            required
            placeholder={c.phonePlaceholder}
            className="w-full border border-[var(--border)] bg-[var(--muted)] px-4 py-3 text-sm text-[var(--foreground)] placeholder-[var(--text-muted)] outline-none transition-colors focus:border-[var(--accent-dim)]"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs tracking-widest uppercase text-[var(--text-muted)]">
          {c.message}
        </label>
        <textarea
          name="message"
          rows={4}
          placeholder={c.messagePlaceholder}
          className="w-full resize-none border border-[var(--border)] bg-[var(--muted)] px-4 py-3 text-sm text-[var(--foreground)] placeholder-[var(--text-muted)] outline-none transition-colors focus:border-[var(--accent-dim)]"
        />
      </div>

      {errorMsg && <p className="text-sm text-red-400">{errorMsg}</p>}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 border border-[var(--accent)] px-10 py-4 text-xs tracking-widest uppercase text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--background)] disabled:opacity-40 cursor-pointer"
      >
        {pending ? c.submitting : c.submit}
      </button>
    </form>
  );
}
