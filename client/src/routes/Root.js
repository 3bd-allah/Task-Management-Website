import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router';
const Root = () => {
  return (
    <>
        <Header />
        <main className='vh-75'>
            <Outlet />
        </main>
        
    </>
  )
}

export default Root