import React from 'react'
import { Navbar } from "flowbite-react";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar className=' bg-gradient-to-r from-blue-800 to-black text-white font-bold'>
        <span className="bg-gradient-to-r from-purple-700 via-pink-900 to-red-600 font-bold text-white p-2 rounded-xl">
            PETROL PUMP MANAGEMENT
        </span>
            <Link to='/'>Home</Link>
            <Link to='/tanks'>Tanks</Link>
            <Link to='/products'>Products</Link>
            <Link to='/stock'>Stock</Link>
            <Link to='/transactions'>Transactions</Link>
            <Link to='/account'>Account</Link>
            <Link to='/lends'>Lends/Debts</Link>
            <Link to='/reports'>Report</Link>
    </Navbar>
  )
}

export default Header
