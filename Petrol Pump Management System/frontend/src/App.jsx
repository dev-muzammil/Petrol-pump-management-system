import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Tank from './Pages/Tank'
import Header from './Components/Header'
import Home from './Pages/Home'
import Product from './Pages/Product'
import Stock from './Pages/Stock'
import Transaction from './Pages/Transaction'
import Account from './Pages/Account'
import Bottom from './Components/Bottom'
import Lend from './Pages/Lend'
import ReportOneDay from './Pages/ReportOneDay'
import ReportSelection from './Pages/ReportSelection'
import ReportThreeDay from './Pages/ReportThreeDay'

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/tanks' element={<Tank/>} />
      <Route path='/products' element={<Product/>} />
      <Route path='/stock' element={<Stock/>} />
      <Route path='/transactions' element={<Transaction/>} />
      <Route path='/account' element={<Account/>} />
      <Route path='/lends' element={<Lend/>} />
      <Route path='/report-three-day' element={<ReportThreeDay/>} />
      <Route path='/report-one-day' element={<ReportOneDay/>} />
      <Route path='/reports' element={<ReportSelection/>} />
    </Routes>
    <Bottom/>
    </BrowserRouter>
  )
}

export default App
