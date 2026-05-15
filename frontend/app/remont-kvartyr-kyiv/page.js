export const metadata = {
  title: 'Ремонт квартир у Києві під ключ — PRORAB',
  description: 'Ремонт квартир у Києві від PRORAB. Дизайн-проект, матеріали, роботи під ключ. Гарантія 2 роки. Кошторис безкоштовно.',
  keywords: 'ремонт квартир Київ, ремонт квартири під ключ, ремонт квартир ціна Київ',
};

export default function Page() {
  return (
    <main style={{ background: '#0F1113', color: '#F5F3EF', fontFamily: 'Montserrat, sans-serif', padding: '120px 10vw 80px', minHeight: '100vh', lineHeight: '1.8' }}>
      <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '2rem', color: '#F5F3EF' }}>
        РЕМОНТ КВАРТИР У КИЄВІ
      </h1>
      <p style={{ color: '#CFC7BD', marginBottom: '1.5rem' }}>
        PRORAB — команда, яка реалізує ремонт квартир у Києві без спотворень. Ми беремо на себе весь процес: від розробки дизайн-проекту до фінальної здачі об'єкта. Ваша квартира виглядатиме саме так, як на візуалізаціях.
      </p>
      <h2 style={{ fontSize: '1.4rem', fontWeight: 600, letterSpacing: '0.08em', margin: '2.5rem 0 1rem', color: '#F5F3EF' }}>
        ЩО ВХОДИТЬ У РЕМОНТ ПІД КЛЮЧ
      </h2>
      <p style={{ color: '#CFC7BD', marginBottom: '1rem' }}>
        Ремонт квартири під ключ у Києві від PRORAB включає повний цикл робіт: демонтаж, чорнові роботи, електрика та сантехніка, стяжка підлоги, штукатурка стін, встановлення дверей та вікон, чистові оздоблювальні роботи, монтаж меблів та освітлення. Ми координуємо всі підрядників та постачальників — вам не потрібно витрачати час на організацію процесу.
      </p>
      <h2 style={{ fontSize: '1.4rem', fontWeight: 600, letterSpacing: '0.08em', margin: '2.5rem 0 1rem', color: '#F5F3EF' }}>
        ЧОМУ ОБИРАЮТЬ PRORAB
      </h2>
      <ul style={{ color: '#CFC7BD', marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
        <li style={{ marginBottom: '0.75rem' }}>Кошторис з точністю до 95% — ціна не змінюється в процесі</li>
        <li style={{ marginBottom: '0.75rem' }}>Працюємо за договором — всі роботи та терміни зафіксовані</li>
        <li style={{ marginBottom: '0.75rem' }}>Поетапна оплата — платите тільки за виконану роботу</li>
        <li style={{ marginBottom: '0.75rem' }}>Гарантія 2 роки — усуваємо всі недоліки безкоштовно</li>
        <li style={{ marginBottom: '0.75rem' }}>Авторський нагляд — дизайнер контролює кожен етап реалізації</li>
      </ul>
      <h2 style={{ fontSize: '1.4rem', fontWeight: 600, letterSpacing: '0.08em', margin: '2.5rem 0 1rem', color: '#F5F3EF' }}>
        ВАРТІСТЬ РЕМОНТУ КВАРТИРИ У КИЄВІ
      </h2>
      <p style={{ color: '#CFC7BD', marginBottom: '1rem' }}>
        Вартість ремонту квартири у Києві залежить від площі, обраних матеріалів та складності дизайн-проекту. Економ-ремонт починається від 8 000 грн/м², бізнес-клас від 15 000 грн/м², преміум від 25 000 грн/м². Ми складаємо детальний кошторис безкоштовно після виїзду на об'єкт.
      </p>
      <h2 style={{ fontSize: '1.4rem', fontWeight: 600, letterSpacing: '0.08em', margin: '2.5rem 0 1rem', color: '#F5F3EF' }}>
        РАЙОНИ КИЄВА ДЕ МИ ПРАЦЮЄМО
      </h2>
      <p style={{ color: '#CFC7BD', marginBottom: '2rem' }}>
        Виконуємо ремонт квартир у всіх районах Києва: Печерськ, Поділ, Оболонь, Голосіїв, Солом'янка, Дарниця, Деснянський, Святошин, Шевченківський, Дніпровський райони. Також працюємо в передмісті та Київській області.
      </p>
      <a href="/" style={{ display: 'inline-block', border: '1px solid rgba(245,243,239,0.4)', color: '#F5F3EF', padding: '0.75rem 2rem', letterSpacing: '0.2em', fontSize: '0.75rem', textTransform: 'uppercase', textDecoration: 'none', transition: 'border-color 0.25s' }}>
        ← ПОВЕРНУТИСЬ НА ГОЛОВНУ
      </a>
    </main>
  );
}
