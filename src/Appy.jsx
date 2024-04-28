
import './Appy.css';
import backgroundImage from './Background.mp4';
import React from 'react';
import { useEffect, useState } from 'react';
import Orderr from './Orderr';
import Chef from './Chef';
import { ChakraProvider } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter, Text, Image, Stack, Heading, Divider, ButtonGroup, Button } from '@chakra-ui/react'
import Video from './Video'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Waiter from './Waiter';
import { Link } from 'react-router-dom';
import orders from './orders';
import Navbar from './Navbar';






const chef = {
  "FirstName": "Hossam",
  "LastName": "Allam",
  "Photo": "https://hips.hearstapps.com/hmg-prod/images/pasta-salad-horizontal-jpg-1522265695.jpg?crop=0.8890666666666666xw:1xh;center,top&resize=1200:*"
};




function Appy() {

 
  
  function callWaiter() {
    alert('Waiter has been called!');
  }


  return (
    <ChakraProvider>
    <div className='BGVD'>
     <Video autoPlay loop muted /> 
    
    <div className='app'> 
      <Navbar />
      <Chef chef = {chef} />
      <div className='log-out'>
        <button type="button" class="btn btn-danger">Log Out?</button>
      </div>
      <div className='waiter-call'>
        <button type="button" class="btn btn-success" onClick={callWaiter}>Call waiter!</button>
      </div>
      <h1 className='h1'>Orderly</h1>
      <Link to="/waiter">
        <button>Go to Waiter Interface</button>
      </Link>
      {orders.length === 0 ? (
        <h2>No current orders pending</h2>
      ) : (
        orders.map((order, index) => (
          <div key={index} className='container'>
            
            <Orderr order={order} />
            
          </div>
        ))
      )}

  
    </div>
    </div>
    </ChakraProvider>  
    
  );
}

export default Appy;

