export const metadata = {
  title: 'Ремонт офісів у Києві під ключ — PRORAB',
  description: 'Ремонт офісів та комерційних приміщень у Києві від PRORAB. Мінімальні терміни, максимальний результат. Гарантія 2 роки.',
  keywords: 'ремонт офісів Київ, ремонт комерційних приміщень, офіс під ключ Київ',
};

export default function Page() {
  return (
    <main style={{ background: '#0F1113', color: '#F5F3EF', fontFamily: 'Montserrat, sans-serif', padding: '120px 10vw 80px', minHeight: '100vh', lineHeight: '1.8' }}>
      <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '2rem', color: '#F5F3EF' }}>
        РЕМОНТ ОФІСІВ У КИЄВІ
      </h1>
      <p style={{ color: '#CFC7BD', marginBottom: '1.5rem' }}>
        PRORAB виконує ремонт офісів та комерційних приміщень у Києві з мінімальним простоєм вашого бізнесу. Ми розуміємо що кожен день простою — це втрачений прибуток, тому чітко дотримуємось термінів та працюємо в зручний для вас час, включаючи вихідні та нічні зміни.
      </p>
      <h2 style={{ fontSize: '1.4rem', fontWeight: 600, letterSpacing: '0.08em', margin: '2.5rem 0 1rem', color: '#F5F3EF' }}>
        ТИПИ ОФІСНИХ ПРИМІЩЕНЬ
      </h2>
      <p style={{ color: '#CFC7BD', marginBottom: '1rem' }}>
        Виконуємо ремонт офісів будь-якого типу: відкритий простір open-space, кабінетна система, переговорні кімнати, ресепшн та зони очікування, серверні кімнати, склади та виробничі приміщення, ресторани та кафе, магазини та шоуруми, медичні клініки та салони краси.
      </p>
      <h2 style={{ fontSize: '1.4rem', fontWeight: 600, letterSpacing: '0.08em', margin: '2.5rem 0 1rem', color: '#F5F3EF' }}>
        ПЕРЕВАГИ РЕМОНТУ ОФІСУ З PRORAB
      </h2>
      <ul style={{ color: '#CFC7BD', marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
        <li style={{ marginBottom: '0.75rem' }}>Чіткі терміни — штрафні санкції за порушення зафіксовані в договорі</li>
        <li style={{ marginBottom: '0.75rem' }}>Мінімальний простій — можемо працювати поетапно без зупинки роботи офісу</li>
        <li style={{ marginBottom: '0.75rem' }}>Комплексний підхід — від дизайн-проекту до меблювання та декору</li>
        <li style={{ marginBottom: '0.75rem' }}>Гарантія 2 роки на всі види робіт</li>
        <li style={{ marginBottom: '0.75rem' }}>Офіційний договір та закриваючі документи для бухгалтерії</li>
      </ul>
      <h2 style={{ fontSize: '1.4rem', fontWeight: 600, letterSpacing: '0.08em', margin: '2.5rem 0 1rem', color: '#F5F3EF' }}>
        ВАРТІСТЬ РЕМОНТУ ОФІСУ
      </h2>
      <p style={{ color: '#CFC7BD', marginBottom: '2rem' }}>
        Вартість ремонту офісу у Києві розраховується індивідуально залежно від площі, стану приміщення та обраної концепції. Базовий косметичний ремонт від 5 000 грн/м², капітальний ремонт з дизайн-проектом від 12 000 грн/м². Виїзд на об'єкт та складання кошторису — безкоштовно.
      </p>
      <a href="/" style={{ display: 'inline-block', border: '1px solid rgba(245,243,239,0.4)', color: '#F5F3EF', padding: '0.75rem 2rem', letterSpacing: '0.2em', fontSize: '0.75rem', textTransform: 'uppercase', textDecoration: 'none' }}>
        ← ПОВЕРНУТИСЬ НА ГОЛОВНУ
      </a>
    </main>
  );
}
