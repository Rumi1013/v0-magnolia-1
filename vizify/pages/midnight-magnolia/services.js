import { useEffect } from 'react';
import Link from 'next/link';
import MidnightMagnoliaLayout from '../../components/MidnightMagnoliaLayout';
import styles from '../../styles/MidnightMagnolia.module.css';

export default function Services() {
  useEffect(() => {
    // Initialize any client-side scripts here
    console.log('Midnight Magnolia Services page loaded');
  }, []);

  return (
    <MidnightMagnoliaLayout
      title="Services"
      description="Explore Midnight Magnolia's premium event planning services for weddings, corporate events, and special occasions."
    >
      <h1 className={styles.title}>Our Services</h1>

      <p className={styles.subtitle}>
        Exceptional planning for every occasion
      </p>

      <section className={styles.servicesGrid}>
        <div className={styles.serviceCard}>
          <div className={styles.serviceImageContainer}>
            <div className={styles.imagePlaceholder}>
              [Wedding Planning Image]
            </div>
          </div>
          <div className={styles.serviceContent}>
            <h2>Wedding Planning</h2>
            <p>
              From intimate gatherings to grand celebrations, our wedding planning services ensure your special day is
              perfect in every way. We handle everything from venue selection and vendor coordination to day-of
              execution, allowing you to enjoy your celebration worry-free.
            </p>
            <ul className={styles.serviceFeatures}>
              <li>Full-service planning</li>
              <li>Partial planning</li>
              <li>Day-of coordination</li>
              <li>Destination weddings</li>
            </ul>
            <Link href="/midnight-magnolia/contact" className={styles.primaryButton}>
              Inquire Now
            </Link>
          </div>
        </div>

        <div className={styles.serviceCard}>
          <div className={styles.serviceImageContainer}>
            <div className={styles.imagePlaceholder}>
              [Corporate Events Image]
            </div>
          </div>
          <div className={styles.serviceContent}>
            <h2>Corporate Events</h2>
            <p>
              Elevate your corporate gatherings with our professional planning services. Whether you're organizing
              a conference, team-building retreat, or holiday party, we create memorable experiences that reflect
              your company's values and goals.
            </p>
            <ul className={styles.serviceFeatures}>
              <li>Conferences and seminars</li>
              <li>Team-building events</li>
              <li>Product launches</li>
              <li>Award ceremonies</li>
            </ul>
            <Link href="/midnight-magnolia/contact" className={styles.primaryButton}>
              Inquire Now
            </Link>
          </div>
        </div>

        <div className={styles.serviceCard}>
          <div className={styles.serviceImageContainer}>
            <div className={styles.imagePlaceholder}>
              [Special Occasions Image]
            </div>
          </div>
          <div className={styles.serviceContent}>
            <h2>Special Occasions</h2>
            <p>
              Life's milestones deserve to be celebrated. From birthday parties and anniversaries to retirement
              celebrations and family reunions, we design and execute events that honor your special moments
              with style and sophistication.
            </p>
            <ul className={styles.serviceFeatures}>
              <li>Birthday celebrations</li>
              <li>Anniversary parties</li>
              <li>Graduation events</li>
              <li>Baby and bridal showers</li>
            </ul>
            <Link href="/midnight-magnolia/contact" className={styles.primaryButton}>
              Inquire Now
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.pricingSection}>
        <h2 className={styles.sectionTitle}>Pricing & Packages</h2>
        <p className={styles.pricingDescription}>
          We offer customized packages tailored to your specific needs and budget. Contact us for a detailed quote.
        </p>

        <div className={styles.packageGrid}>
          <div className={styles.packageCard}>
            <h3>Essential</h3>
            <p className={styles.packagePrice}>Starting at $2,500</p>
            <ul>
              <li>Day-of coordination</li>
              <li>Vendor recommendations</li>
              <li>Timeline development</li>
              <li>On-site management</li>
            </ul>
          </div>

          <div className={styles.packageCard}>
            <h3>Premium</h3>
            <p className={styles.packagePrice}>Starting at $5,000</p>
            <ul>
              <li>Partial planning assistance</li>
              <li>Vendor coordination</li>
              <li>Budget management</li>
              <li>Design consultation</li>
              <li>On-site management</li>
            </ul>
          </div>

          <div className={styles.packageCard}>
            <h3>Luxury</h3>
            <p className={styles.packagePrice}>Starting at $8,000</p>
            <ul>
              <li>Full-service planning</li>
              <li>Complete vendor management</li>
              <li>Custom design and styling</li>
              <li>Budget development and tracking</li>
              <li>RSVP management</li>
              <li>Full day-of team</li>
            </ul>
          </div>
        </div>
      </section>

      <div className={styles.ctaSection}>
        <h2>Ready to create an unforgettable event?</h2>
        <p>Contact us today to schedule a consultation and discuss your vision.</p>
        <Link href="/midnight-magnolia/contact" className={styles.primaryButton}>
          Get Started
        </Link>
      </div>
    </MidnightMagnoliaLayout>
  );
}