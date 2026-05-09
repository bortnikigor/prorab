"use client";

import { useActionState, useRef } from "react";
import { submitContact } from "../actions";

const initialState = { success: false, error: null };

export default function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initialState);
  const formRef = useRef(null);

  if (state.success) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <div className="text-4xl">✓</div>
        <p className="text-lg font-light tracking-wide text-[var(--accent)]">
          Дякуємо за звернення
        </p>
        <p className="text-sm text-[var(--text-muted)]">
          Ми зв'яжемося з вами найближчим часом
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={action} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-xs tracking-widest uppercase text-[var(--text-muted)]">
            Ім'я <span className="text-[var(--accent)]">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="Ваше ім'я"
            className="w-full border border-[var(--border)] bg-[var(--muted)] px-4 py-3 text-sm text-[var(--foreground)] placeholder-[var(--text-muted)] outline-none transition-colors focus:border-[var(--accent-dim)]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs tracking-widest uppercase text-[var(--text-muted)]">
            Телефон <span className="text-[var(--accent)]">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            required
            placeholder="+380 XX XXX XX XX"
            className="w-full border border-[var(--border)] bg-[var(--muted)] px-4 py-3 text-sm text-[var(--foreground)] placeholder-[var(--text-muted)] outline-none transition-colors focus:border-[var(--accent-dim)]"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs tracking-widest uppercase text-[var(--text-muted)]">
          Повідомлення
        </label>
        <textarea
          name="message"
          rows={4}
          placeholder="Опишіть ваш проєкт..."
          className="w-full resize-none border border-[var(--border)] bg-[var(--muted)] px-4 py-3 text-sm text-[var(--foreground)] placeholder-[var(--text-muted)] outline-none transition-colors focus:border-[var(--accent-dim)]"
        />
      </div>

      {state.error && (
        <p className="text-sm text-red-400">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 border border-[var(--accent)] px-10 py-4 text-xs tracking-widest uppercase text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--background)] disabled:opacity-40 cursor-pointer"
      >
        {pending ? "Надсилається..." : "Надіслати запит"}
      </button>
    </form>
  );
}
