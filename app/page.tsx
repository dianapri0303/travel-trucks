import Button from '@/components/Button/Button';
import css from './page.module.css';

export default function HomePage() {
  return (
    <main>
      <section className={css.hero} aria-label="Hero section">
        <div className={css.overlay} aria-hidden="true" />
        <div className={css.content}>
          <div className={css.textGroup}>
            <h1 className={css.title}>Campers of your dreams</h1>
            <p className={css.subtitle}>
              You can find everything you want in our catalog
            </p>
          </div>
          <Button href="/catalog" className={css.heroButton}>
            View Now
          </Button>
        </div>
      </section>
    </main>
  );
}
