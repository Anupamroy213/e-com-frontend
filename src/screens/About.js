import React from 'react';
import './AboutUs.css'; // Import your CSS file for styling

const AboutUs = () => {
  return (
    <body id='aboutbody'>

    <div className="about-us-container">
      <div className="about-section">
        <h2 className="section-title">Why Choose Us?</h2>
        <p className="section-content">
          At E-Shop, we are committed to providing the best shopping experience for our customers. Here are some reasons why you should choose us:
        </p>
        <ul className="reasons-list">
          <li>We offer a wide range of high-quality products at competitive prices.</li>
          <li>Our user-friendly website makes it easy to browse and purchase products.</li>
          <li>Fast and reliable delivery ensures that you receive your orders promptly.</li>
          <li>Excellent customer service to assist you with any inquiries or issues.</li>
        </ul>
      </div>

      <div className="quality-assurance-section">
        <h2 className="section-title">Quality Assurance</h2>
        <p className="section-content">
          Ensuring the quality of our products is our top priority. We take the following measures to maintain high standards:
        </p>
        <ul className="quality-assurance-list">
          <li>Source products from trusted and reputable suppliers.</li>
          <li>Thorough quality checks before products are listed on our website.</li>
          <li>Regular monitoring and feedback collection from customers.</li>
          <li>Strict adherence to safety and quality regulations.</li>
        </ul>
      </div>

      <div className="team-section">
        <h2 className="section-title">Meet Our Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src="data:image/png;base64,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" alt="Team Member 1" className="team-member-img" />
            <h3 className="team-member-name">Anupam Roy</h3>
            <p className="team-member-role">CEO & Founder</p>
          </div>
        </div>
      </div>
    </div>
    </body>
  );
};

export default AboutUs;
