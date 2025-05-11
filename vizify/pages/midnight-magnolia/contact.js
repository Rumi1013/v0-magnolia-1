import { useState, useEffect } from 'react';
import Link from 'next/link';
import MidnightMagnoliaLayout from '../../components/MidnightMagnoliaLayout';
import styles from '../../styles/MidnightMagnolia.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'wedding',
    eventDate: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    // Initialize any client-side scripts here
    console.log('Midnight Magnolia Contact page loaded');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      // Here we would normally submit to an API endpoint
      // For now we'll just simulate a submission
      await new Promise(resolve => setTimeout(resolve, 1500));

      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: 'wedding',
        eventDate: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
    }
  };

  return (
    <MidnightMagnoliaLayout
      title="Contact Us"
      description="Contact Midnight Magnolia for exceptional event planning services. We'd love to hear about your upcoming event!"
    >
      <h1 className={styles.title}>Contact Us</h1>

      <div className={styles.contactContainer}>
        <div className={styles.contactInfo}>
          <h2>Get in Touch</h2>
          <p>
            We'd love to hear about your event! Fill out the form or contact us directly using the information below.
          </p>

          <div className={styles.contactDetails}>
            <div className={styles.contactItem}>
              <strong>Email:</strong>
              <a href="mailto:info@midnightmagnolia.com">info@midnightmagnolia.com</a>
            </div>

            <div className={styles.contactItem}>
              <strong>Phone:</strong>
              <a href="tel:+15551234567">(555) 123-4567</a>
            </div>

            <div className={styles.contactItem}>
              <strong>Address:</strong>
              <address>
                123 Event Street<br />
                Suite 456<br />
                Atlanta, GA 30303
              </address>
            </div>
          </div>

          <div className={styles.socialLinks}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">Pinterest</a>
          </div>
        </div>

        <div className={styles.contactForm}>
          <h2>Inquiry Form</h2>

          {formStatus === 'success' ? (
            <div className={styles.formSuccess}>
              <h3>Thank you for contacting us!</h3>
              <p>We've received your inquiry and will get back to you within 24-48 hours.</p>
              <button
                onClick={() => setFormStatus('')}
                className={styles.primaryButton}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="eventType">Event Type *</label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    required
                  >
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="social">Social Gathering</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="eventDate">Event Date</label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className={styles.primaryButton}
                disabled={formStatus === 'sending'}
              >
                {formStatus === 'sending' ? 'Sending...' : 'Send Inquiry'}
              </button>

              {formStatus === 'error' && (
                <div className={styles.formError}>
                  There was an error sending your message. Please try again.
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </MidnightMagnoliaLayout>
  );
}