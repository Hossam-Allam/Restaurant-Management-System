import React from 'react'
import './Calls.css';
import Waiter from './Waiter'
import { ChakraProvider } from '@chakra-ui/react'
import orders from './orders'
import Chef from './Chef';
import Video from './Video'
import { Link } from 'react-router-dom';
import { Button, ButtonGroup } from '@chakra-ui/react'
import tableCalls from './tableCalls';
import CallCard from './CallCard';
import Navbar from './Navbar';

function Calls() {

    const chef = {
        "FirstName": "Hossam",
        "LastName": "Allam",
        "Photo": "https://hips.hearstapps.com/hmg-prod/images/pasta-salad-horizontal-jpg-1522265695.jpg?crop=0.8890666666666666xw:1xh;center,top&resize=1200:*"
      };
    

  return (
    <ChakraProvider>
    <div className='BGVD'>
     <Video autoPlay loop muted /> 
    
    <div className='app'> 
      <Navbar buttonText="Orders" linkTo="/waiter" />
      <Chef chef = {chef} />
      <div className='log-out'>
        <button type="button" class="btn btn-danger">Log Out?</button>
      </div>
      <h1>Orderly</h1>
      <div className='Waiter-buttons'>
        
      </div>
      <Link to="/">
        <button>Go to chef Interface</button>
      </Link>
      {orders.length === 0 ? (
        <h2>No current orders pending</h2>
      ) : (
        tableCalls.map((call, index) => (
          <div key={index} className='container'>
            <div>
            <CallCard call={call} />
            </div>
          </div>
        ))
      )}

  
    </div>
    </div>
    </ChakraProvider>
  );
}

export default Calls