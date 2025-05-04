export default function AccessibilityPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif text-[#FAF3E0] mb-8">Accessibility Statement</h1>

        <div className="prose prose-invert prose-headings:font-serif prose-headings:text-[#FAF3E0] prose-p:text-gray-300 prose-a:text-[#D4AF37] prose-a:no-underline hover:prose-a:underline max-w-none">
          <p>Last updated: May 1, 2023</p>

          <h2>Our Commitment</h2>
          <p>
            Midnight Magnolia is committed to ensuring digital accessibility for people with disabilities. We are
            continually improving the user experience for everyone and applying the relevant accessibility standards.
          </p>

          <h2>Measures Taken</h2>
          <p>We take the following measures to ensure accessibility:</p>
          <ul>
            <li>Include accessibility as part of our mission statement</li>
            <li>Integrate accessibility into our procurement practices</li>
            <li>Provide accessibility training for our staff</li>
            <li>Assign clear accessibility goals and responsibilities</li>
            <li>Employ formal accessibility quality assurance methods</li>
          </ul>

          <h2>Conformance Status</h2>
          <p>
            The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve
            accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and
            Level AAA.
          </p>
          <p>
            Midnight Magnolia's website is partially conformant with WCAG 2.1 level AA. Partially conformant means that
            some parts of the content do not fully conform to the accessibility standard.
          </p>

          <h2>Accessibility Features</h2>
          <p>Our website includes the following accessibility features:</p>
          <ul>
            <li>Keyboard navigation support</li>
            <li>Text alternatives for non-text content</li>
            <li>Proper heading structure</li>
            <li>Sufficient color contrast</li>
            <li>Resizable text without loss of content or functionality</li>
            <li>Reduced motion options for animations</li>
            <li>ARIA landmarks and attributes where appropriate</li>
            <li>Focus indicators for keyboard users</li>
          </ul>

          <h2>Limitations and Alternatives</h2>
          <p>
            Despite our best efforts to ensure accessibility of Midnight Magnolia's website, there may be some
            limitations. Below is a description of known limitations, and potential solutions:
          </p>
          <ul>
            <li>
              <strong>PDF Documents:</strong> Some older PDF documents may not be fully accessible. Please contact us
              for alternative formats if needed.
            </li>
            <li>
              <strong>Third-party Content:</strong> We cannot claim responsibility for the accessibility of external
              websites and third-party applications. However, we make every effort to work with vendors that comply with
              accessibility standards.
            </li>
            <li>
              <strong>Video Content:</strong> Some older video content may not have captions or audio descriptions. We
              are working to update these materials.
            </li>
          </ul>

          <h2>Feedback</h2>
          <p>
            We welcome your feedback on the accessibility of Midnight Magnolia's website. Please let us know if you
            encounter accessibility barriers:
          </p>
          <ul>
            <li>Phone: (803) 387-2552</li>
            <li>E-mail: accessibility@midnightmagnolia.com</li>
            <li>Postal address: 10070 Dorchester Rd, #51599, Summerville, SC 29485</li>
          </ul>
          <p>We try to respond to feedback within 3 business days.</p>

          <h2>Assessment Approach</h2>
          <p>Midnight Magnolia assessed the accessibility of our website by the following approaches:</p>
          <ul>
            <li>Self-evaluation</li>
            <li>External evaluation using automated tools</li>
            <li>User testing with assistive technologies</li>
          </ul>

          <h2>Compatibility with Browsers and Assistive Technology</h2>
          <p>Midnight Magnolia's website is designed to be compatible with the following assistive technologies:</p>
          <ul>
            <li>Screen readers (NVDA, JAWS, VoiceOver)</li>
            <li>Screen magnifiers</li>
            <li>Speech recognition software</li>
            <li>Keyboard-only navigation</li>
          </ul>
          <p>
            The website is compatible with recent versions of major browsers including Chrome, Firefox, Safari, and
            Edge.
          </p>

          <h2>Technical Specifications</h2>
          <p>
            Accessibility of Midnight Magnolia's website relies on the following technologies to work with the
            particular combination of web browser and any assistive technologies or plugins installed on your computer:
          </p>
          <ul>
            <li>HTML</li>
            <li>WAI-ARIA</li>
            <li>CSS</li>
            <li>JavaScript</li>
          </ul>
          <p>These technologies are relied upon for conformance with the accessibility standards used.</p>
        </div>
      </div>
    </div>
  )
}
