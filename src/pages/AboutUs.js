import React from 'react';
import '../styles.css';

const AboutUs = () => {
  return (
    <main className="about-us-container">
      <div className="container">
        <h2>About Us</h2>
        <section className="about-us-section">
          <div className="about-us-content">
            <h3>Our Story</h3>
            <p>
              Bean and Brew Cafe started with a simple idea - to create a place where coffee lovers can enjoy a perfect cup of coffee in a cozy and welcoming environment. Our journey began in 2010, and since then, we have grown into a beloved coffee shop known for our high-quality brews and friendly service.
            </p>
            <h3>Our Mission</h3>
            <p>
              Our mission is to provide an exceptional coffee experience to our customers. We are committed to sourcing the best coffee beans, supporting sustainable practices, and delivering top-notch customer service.
            </p>
            <h3>Our Team</h3>
            <p>
              Our team is made up of passionate coffee enthusiasts who are dedicated to making every visit to Bean and Brew Cafe a memorable one. From our skilled baristas to our welcoming staff, we strive to create a warm and inviting atmosphere for all.
            </p>
          </div>
          <div className="about-us-infographic">
            <img src="images/infographics.jpg" alt="Our Journey Infographic" className="img-fluid" />
          </div>
        </section>
      </div>
    </main>
  );
};

export default AboutUs;