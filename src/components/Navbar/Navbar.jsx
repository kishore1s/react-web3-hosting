import React, { useContext } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import arrow_icon from '../../assets/arrow_icon.png';
import { CoinContext } from '../../context/context';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);
  const navigate = useNavigate();

  const currencyHandler = (event) => {
    switch (event.target.value) {
      case 'usd':
        setCurrency({ name: 'usd', symbol: '$' });
        break;
      case 'inr':
        setCurrency({ name: 'inr', symbol: '₹' });
        break;
      case 'eur':
        setCurrency({ name: 'eur', symbol: '€' });
        break;
      default:
        setCurrency({ name: 'usd', symbol: '$' });
        break;
    }
  };

  const handleBlogClick = () => {
    navigate('/blog');
  };
  const handleAboutClick = () => {
    navigate('/About');
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={logo} alt="logo" className="logo" />
      </Link>

      <ul>
        <Link to="/"><li>Home</li></Link>
        <li onClick={handleBlogClick} style={{ cursor: 'pointer' }}>Blog</li>
        <li onClick={handleAboutClick} style={{ cursor: 'pointer' }}>About</li>
      </ul>

      <div className="nav-right">
        <select onChange={currencyHandler} className="select">
          <option value="usd">USD</option>
          <option value="inr">INR</option>
          <option value="eur">EUR</option>
        </select>
        <button className="btn">
          Login <img src={arrow_icon} alt="arrow" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
