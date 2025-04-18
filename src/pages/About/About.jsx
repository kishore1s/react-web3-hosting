import React, { useState } from 'react';
import {
  FaBitcoin,
  FaEthereum,
  FaTwitter,
  FaInstagram,
  FaTelegram,
  FaLinkedin,
  FaEnvelope
} from 'react-icons/fa';
import './About.css';
const About = () => {
  const [enquiry, setEnquiry] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [showTechStack, setShowTechStack] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false); // 👈 New state for features toggle
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEnquiry(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Enquiry submitted:', enquiry);
    setSubmitted(true);
    setEnquiry({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setTimeout(() => setSubmitted(false), 5000);
  };
  return (
    <div className="about-container">
      <section className="hero-section fade-in-up">
        <h1 className="fade-in-up">About CryptoVisit</h1>
        <p className="fade-in-up">Your gateway to the decentralized future of finance</p>
        <div className="crypto-icons fade-in-up">
          <FaBitcoin className="bitcoin-icon" />
          <FaEthereum className="ethereum-icon" />
        </div>
      </section>
      <section className="mission-section fade-in-up">
        <h2>Our Mission</h2>
        <p>
          At CryptoVisit, we're committed to democratizing cryptocurrency knowledge and empowering investors
          with real-time market trends, in-depth analysis, and blockchain insights. As a Web3 native platform
          running on blockchain technology, we provide transparent, tamper-proof data and analytics that you
          can trust.
        </p>
        <p>
          Our platform bridges the gap between complex blockchain technologies and everyday users, making
          cryptocurrency accessible to everyone from beginners to seasoned traders.
        </p>
      </section>
      {/* Toggle Anchor for What We Offer */}
      <section className="fade-in-up">
        <a
          href="#!"
          onClick={() => setShowFeatures(!showFeatures)}
          className="toggle-tech-stack"
          style={{ display: 'inline-block', margin: '10px 0', color: '#007bff', cursor: 'pointer' }}
        >
          <h2>what we offer</h2>
        </a>
      </section>
      {/* Conditionally render features section */}
      {showFeatures && (
        <section className="features-section fade-in-up"> 
          <div className="features-grid">
            <div className="feature-card fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h3>Real-time Market Data</h3>
              <p>Access up-to-the-second cryptocurrency prices, trends, and market capitalizations across all major exchanges.</p>
            </div>
            <div className="feature-card fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h3>Blockchain Analytics</h3>
              <p>Deep dive into on-chain metrics, wallet activities, and network health indicators for informed decision making.</p>
            </div>
            <div className="feature-card fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h3>Expert Analysis</h3>
              <p>Daily insights from our team of blockchain experts and technical analysts to guide your investment strategies.</p>
            </div>
            <div className="feature-card fade-in-up" style={{ animationDelay: '0.4s' }}>
              <h3>Educational Content</h3>
              <p>Comprehensive guides, tutorials, and explainers to help you navigate the complex world of cryptocurrencies.</p>
            </div>
            <div className="feature-card fade-in-up" style={{ animationDelay: '0.5s' }}>
              <h3>Web3 Integration</h3>
              <p>Connect your wallet, interact with DeFi protocols, and manage your portfolio directly through our platform.</p>
            </div>
            <div className="feature-card fade-in-up" style={{ animationDelay: '0.6s' }}>
              <h3>Community Driven</h3>
              <p>Participate in governance votes, suggest features, and help shape the future of CryptoVisit.</p>
            </div>
          </div>
        </section>
      )}
      <section className="team-section fade-in-up">
        <h2>Our Blockchain Foundation</h2>
        <p>
          CryptoVisit is built on cutting-edge blockchain technology ensuring transparency, security, and decentralization
          at its core. Our smart contracts handle content verification, reward distribution for contributors, and platform
          governance, all executed on-chain.
        </p>
        <a
          href="#!"
          onClick={() => setShowTechStack(!showTechStack)}
          className="toggle-tech-stack"
          style={{ display: 'inline-block', margin: '10px 0', color: '#007bff', cursor: 'pointer' }}
        >
          {showTechStack ? 'Hide Technology Stack' : 'Show Technology Stack'}
        </a>
        {showTechStack && (
          <div className="tech-stack fade-in-up">
            <h3>Technology Stack</h3>
            <ul>
              <li>Ethereum & Polygon for smart contract execution</li>
              <li>IPFS for decentralized content storage</li>
              <li>The Graph for indexing blockchain data</li>
              <li>Chainlink for price oracles and external data</li>
              <li>ENS for human-readable wallet addresses</li>
            </ul>
          </div>
        )}
      </section>
      <section className="contact-section fade-in-up">
        <div className="contact-content">
          <div className="contact-info">
            <h2>Get In Touch</h2>
            <p>Have questions about cryptocurrencies, blockchain, or our platform? Reach out to us!</p>
            <div className="social-links fade-in-up">
              <a href="mailto:kishoremultiverse@gmail.com" aria-label="Email"><FaEnvelope /></a>
              <a href="https://instagram.com/cryptovisit" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
              <a href="" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
              <a href=""><FaTelegram /></a>
              <a href="www.linkedin.com/in/sanjaykishore-t" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
            </div>
          </div>
          <div className="enquiry-form fade-in-up">
            <h3>Send Us Your Enquiry</h3>
            {submitted ? (
              <div className="success-message">
                Thank you for your enquiry! We'll get back to you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" value={enquiry.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" value={enquiry.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input type="text" id="subject" name="subject" value={enquiry.subject} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" value={enquiry.message} onChange={handleChange} required></textarea>
                </div>
                <button type="submit" className="submit-btn">Submit Enquiry</button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="cta-section fade-in-up">
        <h2>Join the Crypto Revolution</h2>
        <p>
          Connect your wallet today and experience the future of decentralized finance analytics and
          cryptocurrency market intelligence.
        </p>
        <button className="connect-wallet-btn">Connect Wallet</button>
        <p style={{ textAlign: 'center', color: 'red', fontSize: '16px', maxWidth: '600px', margin: '10px auto' }}>
          ⚠️ Please note: Some of the features listed on this page are part of upcoming updates and are not yet available. We're actively working to bring them to life — stay tuned!
        </p>
      </section>
    </div>
  );
};

export default About;
