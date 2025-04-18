import React, { useState, useEffect, useContext } from 'react';
import './Home.css';
import { CoinContext } from '../../context/context';
import { Link } from 'react-router-dom';

const Home = () => {
  const { allcoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState('');
  const [showMore, setShowMore] = useState(false); // Added state for toggle

  const inputHandler = (event) => {
    setInput(event.target.value);
    if (event.target.value === '') {
      setDisplayCoin(allcoin);
    }
  };

  const searchHandler = async (event) => {
    event.preventDefault();
    const coins = await allcoin.filter((item) => {
      return (
        item.name.toLowerCase().includes(input.toLowerCase()) ||
        item.symbol.toLowerCase().includes(input.toLowerCase())
      );
    });
    setDisplayCoin(coins);
  };

  useEffect(() => {
    setDisplayCoin(allcoin);
  }, [allcoin]);

  return (
    <div className='home'>
      <div className='hero'>  
          <h1>Largest<br />Crypto Marketplace</h1>
          <form onSubmit={searchHandler} className='form'>
            <input
              onChange={inputHandler}
              list='coinlist'
              value={input}
              type='text'
              placeholder='Search for crypto'
              required
            />
            <datalist id='coinlist'>
              {allcoin.map((item, index) => (
                <option key={index} value={item.name} />
              ))}
            </datalist>
            <button className='btn' type='submit'>Search</button>
          </form>
        <img src='src\assets\hero-bg.jpg' alt='hero' className='hero-bg' />
      </div>

      {/* Move the info-box outside the hero section */}
      <div className='info-box'>
        <p className='main-text'>
          <strong>Top Tokens by Market Capitalization</strong><br />
          Get a comprehensive snapshot of all cryptocurrencies available on Binance. This page displays the latest prices, 24-hour trading volume, price changes, and market capitalizations for all cryptocurrencies on Binance. Users can quickly access key information about these digital assets and access the trade page from here.
        </p>

        {showMore && (
          <div className='extra-text'>
            <p>
              The data presented is for informational purposes only. Some data is provided by CoinMarketCap and is shown on an "as is" basis, without representation or warranty of any kind. Please view our General Risk Warning for more information.
            </p>
          </div>
        )}

        <a href="#" className='toggle-link' onClick={(e) => {
          e.preventDefault();
          setShowMore(prev => !prev);
        }}>
          {showMore ? 'Show Less' : 'Show More'}
        </a>
      </div>

      <div className='crypto-table'>
        <div className='table-header'>
          <div>#</div>
          <div>Coin</div>
          <div>Price</div>
          <div>24h Change</div>
          <div>Market Cap</div>
        </div>

        {displayCoin.slice(0, 10).map((item, index) => (
          <Link to={`/coin/${item.id}`} className='table-layout' key={index}>
            <div>{item.market_cap_rank}</div>
            <div>
              <img src={item.image} alt={item.name} />
              <span>{item.name} - {item.symbol}</span>
            </div>
            <div>{currency.symbol} {item.current_price.toLocaleString()}</div>
            <div className={item.price_change_percentage_24h > 0 ? 'green' : 'red'}>
              {Math.floor(item.price_change_percentage_24h * 100) / 100}%
            </div>
            <div>{currency.symbol} {item.market_cap.toLocaleString()}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;