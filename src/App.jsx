//rafce
import React from 'react'
import Navbar from './components/Navbar/Navbar'
import {Routes, Route, } from 'react-router-dom'
import Home from './pages/Home/Home'
import Coin from './pages/Coin/Coin'
import Footer from './components/footer/footer'
import Blog from './pages/Blog/Blog'
import About from './pages/About/About'
const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/coin/:coinId' element={<Coin/>} />
        <Route path='/blog' element={<Blog/>} />
        <Route path='/about' element={<About/>} />
      </Routes>
      <Footer />
    </div>
  )
}
export default App