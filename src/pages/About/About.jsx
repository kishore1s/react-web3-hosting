import React, { useState } from 'react';
import { FaBitcoin, FaEthereum, FaTwitter, FaInstagram, FaTelegram, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './About.css'; // You'll need to create this CSS file

const About = () => {
  const [enquiry, setEnquiry] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEnquiry(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend or email service
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
      <section className="hero-section">
        <div className="hero-content">
          <h1>About CryptoVisit</h1>
          <p>Your gateway to the decentralized future of finance</p>
          <div className="crypto-icons">
            <FaBitcoin className="bitcoin-icon" />
            <FaEthereum className="ethereum-icon" />
          </div>
        </div>
      </section>

      <section className="mission-section">
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

      <section className="features-section">
        <h2>What We Offer</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Real-time Market Data</h3>
            <p>Access up-to-the-second cryptocurrency prices, trends, and market capitalizations across all major exchanges.</p>
          </div>
          <div className="feature-card">
            <h3>Blockchain Analytics</h3>
            <p>Deep dive into on-chain metrics, wallet activities, and network health indicators for informed decision making.</p>
          </div>
          <div className="feature-card">
            <h3>Expert Analysis</h3>
            <p>Daily insights from our team of blockchain experts and technical analysts to guide your investment strategies.</p>
          </div>
          <div className="feature-card">
            <h3>Educational Content</h3>
            <p>Comprehensive guides, tutorials, and explainers to help you navigate the complex world of cryptocurrencies.</p>
          </div>
          <div className="feature-card">
            <h3>Web3 Integration</h3>
            <p>Connect your wallet, interact with DeFi protocols, and manage your portfolio directly through our platform.</p>
          </div>
          <div className="feature-card">
            <h3>Community Driven</h3>
            <p>Participate in governance votes, suggest features, and help shape the future of CryptoVisit.</p>
          </div>
        </div>
      </section>

      <section className="team-section">
        <h2>Our Blockchain Foundation</h2>
        <p>
          CryptoVisit is built on cutting-edge blockchain technology ensuring transparency, security, and decentralization 
          at its core. Our smart contracts handle content verification, reward distribution for contributors, and platform 
          governance, all executed on-chain.
        </p>
        <div className="tech-stack">
          <h3>Technology Stack</h3>
          <ul>
            <li>Ethereum & Polygon for smart contract execution</li>
            <li>IPFS for decentralized content storage</li>
            <li>The Graph for indexing blockchain data</li>
            <li>Chainlink for price oracles and external data</li>
            <li>ENS for human-readable wallet addresses</li>
          </ul>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-content">
          <div className="contact-info">
            <h2>Get In Touch</h2>
            <p>Have questions about cryptocurrencies, blockchain, or our platform? Reach out to us!</p>
            
            <div className="social-links">
              <a href="mailto:kishoremultiverse@gmail.com" aria-label="Email">
                <FaEnvelope />
              </a>
              <a href="https://instagram.com/cryptovisit" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://twitter.com/cryptovisit" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="https://t.me/cryptovisit" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                <FaTelegram />
              </a>
              <a href="https://linkedin.com/company/cryptovisit" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
            </div>
          </div>

          <div className="enquiry-form">
            <h3>Send Us Your Enquiry</h3>
            {submitted ? (
              <div className="success-message">
                Thank you for your enquiry! We'll get back to you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={enquiry.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={enquiry.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={enquiry.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={enquiry.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  Submit Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="cta-section">
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