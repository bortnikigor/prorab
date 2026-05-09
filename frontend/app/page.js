import ContactForm from "./components/ContactForm";

const services = [
  {
    title: "Квартири",
    description:
      "Комплексний ремонт під ключ — від демонтажу до фінішного оздоблення. Дизайн-проєкт, авторський нагляд.",
    icon: "◻",
  },
  {
    title: "Будинки",
    description:
      "Будівництво та ремонт приватних будинків. Фасади, покрівля, внутрішні роботи будь-якої складності.",
    icon: "◼",
  },
  {
    title: "Офіси",
    description:
      "Комерційні приміщення та офіси. Швидкі строки, мінімальний простій у роботі вашого бізнесу.",
    icon: "▣",
  },
];

const stats = [
  { value: "12+", label: "Років досвіду" },
  { value: "340+", label: "Завершених об'єктів" },
  { value: "100%", label: "Гарантія якості" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 backdrop-blur-sm border-b border-[var(--border)]/50">
        <span className="text-lg font-semibold tracking-[0.3em] uppercase text-[var(--foreground)]">
          PRORAB
        </span>
        <a
          href="#contact"
          className="text-xs tracking-widest uppercase text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
        >
          Зв'язатися
        </a>
      </nav>

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 79px, var(--foreground) 79px, var(--foreground) 80px)",
            }}
          />
        </div>

        <div className="relative flex flex-col items-center gap-8">
          <p className="text-xs tracking-[0.5em] uppercase text-[var(--accent)]">
            Преміальний ремонт
          </p>

          <h1 className="text-[clamp(5rem,18vw,16rem)] font-semibold leading-none tracking-[-0.03em] text-[var(--foreground)]">
            PRORAB
          </h1>

          <p className="max-w-md text-lg font-light leading-relaxed tracking-wide text-[var(--text-muted)]">
            Перетворюємо простори на витвори архітектури.
            <br />
            Від ідеї до фінішного штриха.
          </p>

          <a
            href="#services"
            className="mt-4 border border-[var(--accent)] px-10 py-4 text-xs tracking-widest uppercase text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--background)]"
          >
            Наші послуги
          </a>
        </div>

        <a
          href="#services"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
          aria-label="Прокрутити вниз"
        >
          <span className="text-xs tracking-widest uppercase">Далі</span>
          <span className="text-lg leading-none">↓</span>
        </a>
      </section>

      {/* Stats */}
      <section className="border-y border-[var(--border)] bg-[var(--muted)]">
        <div className="mx-auto grid max-w-5xl grid-cols-3 divide-x divide-[var(--border)]">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 px-6 py-10">
              <span className="text-3xl font-semibold text-[var(--accent)] sm:text-4xl">
                {s.value}
              </span>
              <span className="text-xs tracking-widest uppercase text-[var(--text-muted)]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-6xl px-6 py-32">
        <div className="mb-16 flex flex-col gap-4">
          <p className="text-xs tracking-[0.5em] uppercase text-[var(--accent)]">
            Послуги
          </p>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Що ми робимо
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-px border border-[var(--border)] bg-[var(--border)] sm:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group flex flex-col gap-6 bg-[var(--background)] p-10 transition-colors hover:bg-[var(--muted)]"
            >
              <span className="text-2xl text-[var(--accent)]">{service.icon}</span>
              <h3 className="text-xl font-semibold tracking-tight">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                {service.description}
              </p>
              <div className="mt-auto pt-4">
                <span className="text-xs tracking-widest uppercase text-[var(--accent)] opacity-0 transition-opacity group-hover:opacity-100">
                  Дізнатися більше →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-[var(--border)] bg-[var(--muted)] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 flex flex-col gap-4">
            <p className="text-xs tracking-[0.5em] uppercase text-[var(--accent)]">
              Підхід
            </p>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Як ми працюємо
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "01", title: "Консультація", desc: "Обговорюємо ваші побажання та бюджет" },
              { n: "02", title: "Проєктування", desc: "Дизайн-проєкт та кошторис" },
              { n: "03", title: "Виконання", desc: "Ремонтні роботи у строк" },
              { n: "04", title: "Здача", desc: "Прийом об'єкта та гарантія" },
            ].map((step) => (
              <div key={step.n} className="flex flex-col gap-4">
                <span className="text-4xl font-semibold text-[var(--border)]">{step.n}</span>
                <h3 className="text-base font-semibold tracking-wide">{step.title}</h3>
                <p className="text-sm text-[var(--text-muted)]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-3xl px-6 py-32">
        <div className="mb-16 flex flex-col gap-4">
          <p className="text-xs tracking-[0.5em] uppercase text-[var(--accent)]">
            Контакт
          </p>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Обговоримо ваш проєкт
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-[var(--text-muted)]">
            Залиште заявку і ми зв'яжемося з вами протягом одного робочого дня
          </p>
        </div>

        <ContactForm />
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <span className="text-sm tracking-[0.3em] uppercase text-[var(--text-muted)]">
            PRORAB
          </span>
          <p className="text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} PRORAB. Усі права захищено.
          </p>
        </div>
      </footer>
    </div>
  );
}
