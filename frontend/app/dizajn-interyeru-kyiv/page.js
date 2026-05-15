export const metadata = {
  title: 'Дизайн інтер\'єру у Києві — PRORAB',
  description: 'Авторський дизайн інтер\'єру у Києві від PRORAB. Реалізація без спотворень. Від концепції до фінальної здачі.',
  keywords: 'дизайн інтер\'єру Київ, дизайн квартири Київ, інтер\'єр під ключ',
};

export default function Page() {
  return (
    <main style={{ background: '#0F1113', color: '#F5F3EF', fontFamily: 'Montserrat, sans-serif', padding: '120px 10vw 80px', minHeight: '100vh', lineHeight: '1.8' }}>
      <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '2rem', color: '#F5F3EF' }}>
        ДИЗАЙН ІНТЕР'ЄРУ У КИЄВІ
      </h1>
      <p style={{ color: '#CFC7BD', marginBottom: '1.5rem' }}>
        PRORAB створює авторський дизайн інтер'єру у Києві та реалізує його без спотворень. Більшість дизайн-студій зупиняються на проекті — ми йдемо далі і контролюємо кожен етап будівництва, щоб результат виглядав саме так як на візуалізаціях. Без компромісів. Без "майже так".
      </p>
      <h2 style={{ fontSize: '1.4rem', fontWeight: 600, letterSpacing: '0.08em', margin: '2.5rem 0 1rem', color: '#F5F3EF' }}>
        ЕТАПИ РОЗРОБКИ ДИЗАЙН-ПРОЕКТУ
      </h2>
      <ul style={{ color: '#CFC7BD', marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
        <li style={{ marginBottom: '0.75rem' }}>Обмірювальне креслення та технічне завдання</li>
        <li style={{ marginBottom: '0.75rem' }}>Концепція — стиль, матеріали, колірне рішення</li>
        <li style={{ marginBottom: '0.75rem' }}>3D візуалізація всіх приміщень</li>
        <li style={{ marginBottom: '0.75rem' }}>Робоча документація — креслення для будівельників</li>
        <li style={{ marginBottom: '0.75rem' }}>Специфікація матеріалів та меблів</li>
        <li style={{ marginBottom: '0.75rem' }}>Авторський нагляд під час реалізації</li>
      </ul>
      <h2 style={{ fontSize: '1.4rem', fontWeight: 600, letterSpacing: '0.08em', margin: '2.5rem 0 1rem', color: '#F5F3EF' }}>
        СТИЛІ ІНТЕР'ЄРУ
      </h2>
      <p style={{ color: '#CFC7BD', marginBottom: '1rem' }}>
        Реалізуємо інтер'єри в будь-якому стилі: сучасний мінімалізм, скандинавський стиль, лофт, неокласика, ар-деко, контемпорарі, japandi, wabi-sabi. Підбираємо стиль відповідно до вашого способу життя та особистості, а не поточних трендів.
      </p>
      <h2 style={{ fontSize: '1.4rem', fontWeight: 600, letterSpacing: '0.08em', margin: '2.5rem 0 1rem', color: '#F5F3EF' }}>
        ВАРТІСТЬ ДИЗАЙН-ПРОЕКТУ
      </h2>
      <p style={{ color: '#CFC7BD', marginBottom: '2rem' }}>
        Вартість дизайн-проекту інтер'єру у Києві від 350 грн/м². Повний пакет з авторським наглядом та реалізацією розраховується індивідуально. Перша консультація безкоштовна — зв'яжіться з нами щоб обговорити ваш проект.
      </p>
      <a href="/" style={{ display: 'inline-block', border: '1px solid rgba(245,243,239,0.4)', color: '#F5F3EF', padding: '0.75rem 2rem', letterSpacing: '0.2em', fontSize: '0.75rem', textTransform: 'uppercase', textDecoration: 'none' }}>
        ← ПОВЕРНУТИСЬ НА ГОЛОВНУ
      </a>
    </main>
  );
}
