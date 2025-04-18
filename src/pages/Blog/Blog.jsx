import React, { useEffect, useState } from 'react';
import './Blog.css';

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [error, setError] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          'https://api.mediastack.com/v1/news?access_key=bc1f95c56793080eefd0f12fee96e0b9&keywords=crypto&languages=en&countries=us,gb,de&categories=business,technology'
        );
        const data = await response.json();
        setArticles(data.data || []);
      } catch (err) {
        setError('Failed to fetch news. Please check your API key or network.');
        console.error(err);
      }
    };

    fetchNews();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="crypto-blog">
      {/* Updated Educational Content Section */}
      {/* News Section (unchanged) */}
      <section className="crypto-news">
        <h2>🌍 Live Crypto News</h2>
        {error && <p className="error">{error}</p>}
        <div className="news-grid">
          {articles.slice(0, visibleCount).map((article, index) => (
            <div key={index} className="news-card">
              <img
                src={article.image || '../../assets/blog.jpg'}
                alt={article.title}
              />
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <p className="meta">
                📅 {new Date(article.published_at).toLocaleDateString()} | 
                📰 {article.source}
              </p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read Full Article
              </a>
            </div>
          ))}
        </div>
        {visibleCount < articles.length && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button className="load-more" onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}
      </section>
      <section className="educational-content">
        <h2>📚 Crypto Educational Resources</h2>

        {/* Risk Management Section */}
        <div className="education-category">
          <div className="category-header" onClick={() => toggleSection('risk')}>
            <h3>🛡️ Risk Management in Crypto Investments</h3>
          </div>

          {expandedSection === 'risk' && (
            <div className="category-articles">
              <div className="article-card">
                <h4>Crypto Market Volatility: Why You Need a Risk Management Strategy</h4>
                <p>Explains the volatile nature of crypto markets and the importance of having a risk management plan, including tips like setting stop-loss orders, using portfolio diversification, and investing only what one can afford to lose.</p>
              </div>

              <div className="article-card">
                <h4>The Importance of Setting Limits: Protecting Your Investments in the Crypto Space</h4>
                <p>Teach your audience how to set personal risk limits, such as the percentage of their portfolio they're willing to risk in a single trade, and the importance of adhering to those limits.</p>
              </div>

              <div className="article-card">
                <h4>Understanding Crypto Volatility: How to Use Stop-Loss and Take-Profit Orders</h4>
                <p>Explain how and why investors use stop-loss orders to limit losses and take-profit orders to lock in gains, with examples of how this can work in the crypto market.</p>
              </div>

              <div className="article-card">
                <h4>Hedging Your Crypto Investments: Is It Possible?</h4>
                <p>Offer strategies for hedging against market downturns using crypto options, futures, or other tools available on exchanges.</p>
              </div>
            </div>
          )}
        </div>

        {/* Staking and Yield Farming Section */}
        <div className="education-category">
          <div className="category-header" onClick={() => toggleSection('staking')}>
            <h3>💰 Staking and Yield Farming: Passive Income in Crypto</h3>
          </div>

          {expandedSection === 'staking' && (
            <div className="category-articles">
              <div className="article-card">
                <h4>How Staking Works: Earning Passive Income from Your Crypto</h4>
                <p>Write a guide explaining what staking is, how it works, and the benefits of staking for earning passive income. Include details on popular coins that can be staked (e.g., Ethereum 2.0, Cardano, Polkadot) and the annual percentage yields (APYs) they offer.</p>
              </div>

              <div className="article-card">
                <h4>Yield Farming vs. Staking: What's the Difference and Which is Right for You?</h4>
                <p>Contrast staking and yield farming, explaining which is better suited for different types of investors. Highlight the pros and cons of both approaches and their associated risks (e.g., impermanent loss in yield farming).</p>
              </div>

              <div className="article-card">
                <h4>A Beginner's Guide to Yield Farming: How to Earn Rewards on Decentralized Platforms</h4>
                <p>Focus on how yield farming works, where to start (e.g., platforms like Uniswap, PancakeSwap, or Aave), and the potential returns and risks involved.</p>
              </div>

              <div className="article-card">
                <h4>The Risks of Staking and Yield Farming: What You Need to Know</h4>
                <p>Educate about risks like liquidity risk, smart contract vulnerabilities, and potential impermanent loss in yield farming, and how to mitigate these risks.</p>
              </div>
            </div>
          )}
        </div>

        {/* Portfolio Building Section */}
        <div className="education-category">
          <div className="category-header" onClick={() => toggleSection('portfolio')}>
            <h3>📊 How to Build a Crypto Portfolio</h3>
          </div>

          {expandedSection === 'portfolio' && (
            <div className="category-articles">
              <div className="article-card">
                <h4>A Beginner's Guide to Building a Crypto Portfolio</h4>
                <p>Guide for new investors on how to select cryptocurrencies based on their risk tolerance and investment goals (long-term or short-term). Highlight the importance of diversification and discuss different types of assets to include (e.g., large-cap, mid-cap, and small-cap cryptos).</p>
              </div>

              <div className="article-card">
                <h4>Portfolio Diversification: Key to Successful Crypto Investing</h4>
                <p>Explain how diversification helps mitigate risks, with examples of how to mix different types of cryptocurrencies (e.g., Bitcoin, Ethereum, DeFi tokens, and NFTs) for balance.</p>
              </div>

              <div className="article-card">
                <h4>The 70-30 Strategy: Crypto Portfolio for Long-Term Growth</h4>
                <p>Focus on a portfolio strategy where 70% of assets are allocated to blue-chip cryptocurrencies like Bitcoin and Ethereum, and 30% to more speculative, high-risk altcoins with higher potential upside.</p>
              </div>

              <div className="article-card">
                <h4>The 80-20 Strategy for Short-Term Traders</h4>
                <p>Guide for active traders focusing on high-volatility altcoins, with 80% allocated to well-established cryptocurrencies for stability, and 20% to high-risk, high-reward altcoins.</p>
              </div>
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default Blog;
