import { useEffect } from 'react';
import Link from 'next/link';
import MidnightMagnoliaLayout from '../../components/MidnightMagnoliaLayout';
import styles from '../../styles/MidnightMagnolia.module.css';

export default function Overview() {
  useEffect(() => {
    // Initialize any client-side scripts here
    // This replaces the $w.onReady function from Wix
    console.log('Midnight Magnolia Overview page loaded');
  }, []);

  return (
    <MidnightMagnoliaLayout
      title="Overview"
      description="Midnight Magnolia offers premium event planning services for weddings, corporate events, and special occasions."
    >
      <h1 className={styles.title}>
        Welcome to Midnight Magnolia
      </h1>

      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h2>Elegant Planning for Your Special Events</h2>
          <p>
            Midnight Magnolia offers premium event planning services for weddings,
            corporate events, and special occasions. Our dedicated team ensures
            every detail is perfectly executed.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/midnight-magnolia/services" className={styles.primaryButton}>
              Our Services
            </Link>
            <Link href="/midnight-magnolia/contact" className={styles.secondaryButton}>
              Contact Us
            </Link>
          </div>
        </div>
        <div className={styles.heroImage}>
          {/* Image placeholder - will be replaced with actual image */}
          <div className={styles.imagePlaceholder}>
            [Event Planning Image]
          </div>
        </div>
      </div>

      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Why Choose Midnight Magnolia</h2>

        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <h3>Expert Planners</h3>
            <p>Our team brings years of experience to make your event shine.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Attention to Detail</h3>
            <p>We handle every aspect of your event with meticulous care.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Customized Experiences</h3>
            <p>Each event is uniquely tailored to reflect your vision and style.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Stress-Free Planning</h3>
            <p>Relax while we coordinate all the elements of your special day.</p>
          </div>
        </div>
      </section>

      <section className={styles.testimonialsSection}>
        <h2 className={styles.sectionTitle}>What Our Clients Say</h2>

        <div className={styles.testimonial}>
          <p>"Midnight Magnolia transformed our wedding into an unforgettable experience. Their attention to detail was remarkable."</p>
          <p className={styles.testimonialAuthor}>- Sarah & Michael</p>
        </div>
      </section>
    </MidnightMagnoliaLayout>
  );
}