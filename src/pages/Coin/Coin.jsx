import React, { useEffect, useContext, useState } from 'react';
import './Coin.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../context/context';
import LineChart from '../../components/LineChart/LineChart';

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const { currency } = useContext(CoinContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [days, setDays] = useState(10); // Default to 10 days
  const [interval, setInterval] = useState('daily'); // Default interval

  // Function to update the chart data based on selected time range
  const updateChart = (timeRange) => {
    let daysValue;
    let intervalValue;
    let fromTimestamp;
    let toTimestamp = Math.floor(Date.now() / 1000); // Current time in UNIX timestamp (to)

    switch (timeRange) {
      case '1day':
        daysValue = 1;
        intervalValue = '4hour';
        fromTimestamp = toTimestamp - 60 * 60 * 24;
        break;
      case '7days':
        daysValue = 7;
        intervalValue = 'daily';
        fromTimestamp = toTimestamp - 60 * 60 * 24 * 7;
        break;
      case '1month':
        daysValue = 30;
        intervalValue = '2days';
        fromTimestamp = toTimestamp - 60 * 60 * 24 * 30;
        break;
      case '1year':
        daysValue = 365;
        intervalValue = 'monthly';
        fromTimestamp = toTimestamp - 60 * 60 * 24 * 365;
        break;
      default:
        daysValue = 10;
        intervalValue = 'daily';
        fromTimestamp = toTimestamp - 60 * 60 * 24 * 10;
    }

    setDays(daysValue);
    setInterval(intervalValue);
    fetchCoinData(fromTimestamp, toTimestamp, intervalValue);
  };

  const fetchCoinData = async (fromTimestamp, toTimestamp, intervalValue) => {
    setLoading(true);
    setError(null);

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-HrQugAJjZfjR1VKrwzAfm1aB'
      }
    };

    try {
      const [chartResponse, coinResponse] = await Promise.all([
        fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart/range?vs_currency=${currency.name}&from=${fromTimestamp}&to=${toTimestamp}`,
          options
        ),
        fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      ]);

      if (!chartResponse.ok || !coinResponse.ok) {
        throw new Error('Failed to fetch coin data');
      }

      const chartData = await chartResponse.json();
      const coinInfo = await coinResponse.json();

      setHistoricalData(chartData);
      setCoinData(coinInfo);
      console.log('Coin data:', coinInfo);
      console.log(currency.name);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoinData(
      Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 10,
      Math.floor(Date.now() / 1000),
      'daily'
    );
  }, [currency, coinId]);

  if (loading) {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!coinData || !historicalData) {
    return <div className="error-message">No data available for this coin</div>;
  }

  return (
    <div className="coin">
      <div className="coin-header">
        <div className="coin-name">
          {coinData.image?.large && (
            <img src={coinData.image.large} alt={coinData.name} />
          )}
          <p>
            <b>
              {coinData.name} {coinData.symbol && `(${coinData.symbol.toUpperCase()})`}
            </b>
          </p>
        </div>
      </div>

      <div className="coin-content">
        <div className="coin-time-range">
          <a href="#" onClick={() => updateChart('1day')}>
            1d
          </a>
          <a href="#" onClick={() => updateChart('7days')}>
            7d
          </a>
          <a href="#" onClick={() => updateChart('1month')}>
            1M
          </a>
          <a href="#" onClick={() => updateChart('1year')}>
            1Y
          </a>
        </div>

        <div className="coin-chart">
          <LineChart historicalData={historicalData} currencySymbol={currency.symbol} />
        </div>

        <div className="coin-info-grid">
          {[
            { label: '⚡Crypto Market Rank', value: coinData.market_cap_rank },
            {
              label: '🔥Current Price',
              value:
                currency.symbol +
                (coinData.market_data?.current_price[currency.name.toLowerCase()]?.toLocaleString() || 'N/A')
            },
            {
              label: 'Market Cap',
              value:
                currency.symbol +
                (coinData.market_data?.market_cap?.[currency.name.toLowerCase()]?.toLocaleString() || 'N/A')
            },
            {
              label: 'Total Supply',
              value:
                coinData.market_data?.total_supply != null
                  ? `${coinData.market_data.total_supply.toLocaleString()}`
                  : 'N/A'
            },
            {
              label: '24 Hour High',
              value: (
                <span style={{ color: 'green' }}>
                  {currency.symbol}
                  {coinData.market_data?.high_24h?.[currency.name.toLowerCase()]?.toLocaleString() || 'N/A'}
                </span>
              )
            },

            {
              label: '24 Hour Low',
              value: (
                <span style={{ color: '#e53935' }}>🔻
                  {currency.symbol}
                  {coinData.market_data?.low_24h?.[currency.name.toLowerCase()]?.toLocaleString() || 'N/A'}
                </span>
              )
            },
  
            {
              label: 'All Time High',
              value:(
                <span style={{ color: 'green' }}>
                  {currency.symbol}
                  {coinData.market_data?.ath?.[currency.name.toLowerCase()]?.toLocaleString() || 'N/A'}
                </span>
              )
            },

            {
              label: 'All Time Low',
              value:(
                <span style={{ color: '#e53935' }}>🔻
                  {currency.symbol}
                  {coinData.market_data?.atl?.[currency.name.toLowerCase()]?.toLocaleString() || 'N/A'}
                </span>
              )
            },
            {
              label: 'Sentiment Votes Up',
              value:
                coinData.sentiment_votes_up_percentage != null
                  ?  <span style={{ color: 'green' }}>{coinData.sentiment_votes_down_percentage}%</span>
                  : 'N/A'
            },
            {
              label: 'Sentiment Votes Down',
              value:
                coinData.sentiment_votes_down_percentage != null
                  ? <span style={{ color: '#e53935' }}>🔻{coinData.sentiment_votes_down_percentage}%</span>
                  : 'N/A'
            }
            
          ].map((item, idx) => (
            <div className="info-grid-section" key={idx}>
              <div className="info-grid-item">
                <span className="info-label">{item.label}</span>
                <span className="info-value">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Coin;
