import React from 'react'
import Waiter from './Waiter'
import { ChakraProvider } from '@chakra-ui/react'
import orders from './orders'
import './WaiterInterface.css';
import Chef from './Chef';
import Video from './Video'
import { Link } from 'react-router-dom';
import { Button, ButtonGroup } from '@chakra-ui/react'
import Navbar from './Navbar';

function WaiterInterface() {

    const chef = {
        "FirstName": "Hossam",
        "LastName": "Allam",
        "Photo": "https://hips.hearstapps.com/hmg-prod/images/pasta-salad-horizontal-jpg-1522265695.jpg?crop=0.8890666666666666xw:1xh;center,top&resize=1200:*"
      };
    
    return(
    <ChakraProvider>
    <div className='BGVD'>
     <Video autoPlay loop muted /> 
    
    <div className='app'> 
    <Navbar buttonText="Calls" linkTo="/calls" />
      <Chef chef = {chef} />
      <div className='log-out'>
        <button type="button" class="btn btn-danger">Log Out?</button>
      </div>
      <h1 className='h1'>Orderly</h1>
      <Link to="/">
        <button>Go to chef Interface</button>
      </Link>
      {orders.length === 0 ? (
        <h2>No current orders pending</h2>
      ) : (
        orders.map((order, index) => (
          <div key={index} className='container'>
            
            <Waiter order={order} />
            
          </div>
        ))
      )}

  
    </div>
    </div>
    </ChakraProvider>  
    
  );
}

export default WaiterInterface