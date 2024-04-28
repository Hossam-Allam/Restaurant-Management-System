import React from 'react'
import './Employee.css';
import OwnerNavbar from './OwnerNavbar'
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
    Grid,
    Select,
    Box,
    Text,
    ChakraProvider,
    Divider,
    Center,
    AbsoluteCenter,
    Button
} from '@chakra-ui/react';
import EmployeeCard from './EmployeeCard';
import workers from './Worker';

function Employees() {
  return (
    <ChakraProvider>
        <div className='app'>
            <OwnerNavbar />
            <h2 className='header'>Employee List</h2>
            {workers.length === 0 ? (
            <h2>No current orders pending</h2>
                ) : (
                    workers.map((worker, index) => (
                    <div key={index} className='container'>
                        
                        <EmployeeCard worker={worker} />
                        
                    </div>
                    ))
                )}
        </div>
    </ChakraProvider>
  )
}

export default Employees