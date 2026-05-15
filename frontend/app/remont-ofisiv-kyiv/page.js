export const metadata = {
  title: 'Ремонт офісів у Києві — PRORAB',
  description: 'Комерційні приміщення та офіси під ключ у Києві. Мінімальні терміни, максимальний результат. PRORAB.',
};

const styles = {
  page: {
    backgroundColor: '#0F1113',
    color: '#F5F3EF',
    fontFamily: "'Montserrat', sans-serif",
    minHeight: '100vh',
    padding: '80px 24px',
    boxSizing: 'border-box',
  },
  inner: {
    maxWidth: '760px',
    margin: '0 auto',
  },
  back: {
    display: 'inline-block',
    color: '#CFC7BD',
    textDecoration: 'none',
    fontSize: '0.8rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginBottom: '48px',
    borderBottom: '1px solid #CFC7BD',
    paddingBottom: '2px',
  },
  h1: {
    fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
    fontWeight: 300,
    letterSpacing: '0.06em',
    lineHeight: 1.3,
    marginBottom: '48px',
    color: '#F5F3EF',
  },
  body: {
    fontSize: '0.9rem',
    fontWeight: 300,
    lineHeight: 1.85,
    letterSpacing: '0.04em',
    color: '#CFC7BD',
  },
  p: {
    marginBottom: '24px',
  },
};

export default function RemontOfisivKyiv() {
  return (
    <main style={styles.page}>
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400&display=swap"
        rel="stylesheet"
      />
      <div style={styles.inner}>
        <a href="/" style={styles.back}>← Головна</a>

        <h1 style={styles.h1}>Ремонт офісів у Києві</h1>

        <div style={styles.body}>
          <p style={styles.p}>
            Офіс — це середовище, яке впливає на продуктивність команди, враження клієнтів і репутацію компанії. Ремонт комерційного приміщення вимагає іншого підходу, ніж житловий: жорсткіші терміни, більш складна інженерія, необхідність мінімізувати простій бізнесу. Саме з цим працює PRORAB.
          </p>
          <p style={styles.p}>
            Ми реалізуємо ремонт офісів різного масштабу — від невеликих приймальних до багатоповерхових комерційних просторів. Перед стартом фіксуємо в договорі обсяг робіт, вартість і терміни. Ніяких прихованих доплат у процесі.
          </p>
          <p style={styles.p}>
            Наша команда має досвід у монтажі систем вентиляції та кондиціювання, прокладанні електрики з урахуванням комерційного навантаження, облаштуванні переговорних кімнат, ресепшнів, open space зон і серверних. Ми знаємо, які рішення витримують щоденне комерційне навантаження.
          </p>
          <p style={styles.p}>
            Ремонт в орендованих приміщеннях — окремий напрям. Ми враховуємо вимоги орендодавця, узгоджуємо технічну документацію та виконуємо роботи без порушення умов договору оренди. Здаємо приміщення в стані, готовому до негайного використання.
          </p>
          <p style={styles.p}>
            Терміни — принципова для бізнесу тема. Ми формуємо графік робіт таким чином, щоб скоротити час простою до мінімуму. При необхідності організовуємо роботи в нічний час або у вихідні — без додаткових узгоджень з вашого боку.
          </p>
          <p style={styles.p}>
            PRORAB координує всіх суміжних підрядників: електриків, сантехніків, вентиляційників, оздоблювачів. Вам не потрібно контролювати кожну бригаду окремо — ми ведемо єдину точку відповідальності за весь об'єкт.
          </p>
          <p style={styles.p}>
            Після здачі офісу діє гарантія 2 роки. Якщо протягом цього терміну виникнуть питання по роботах — ми усуваємо їх без додаткової оплати.
          </p>
          <p style={{ ...styles.p, marginBottom: 0 }}>
            Залиште заявку на головній сторінці — отримайте попередній кошторис та консультацію щодо термінів безкоштовно.
          </p>
        </div>
      </div>
    </main>
  );
}
