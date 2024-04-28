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
    Button,
    Modal
} from '@chakra-ui/react';
import EmployeeCard from './EmployeeCard';
import workers from './Worker';
import Menu from './Menu';
import MenuCard from './MenuCard';
import InitialFocus from './ModalComponent';

function Items() {
  return (
    <ChakraProvider>
        <div className='Modal'>
            <InitialFocus />
        </div>
        
        <div className='app'>
            <OwnerNavbar />
            <h2 className='header'>Menu Items</h2>
            {workers.length === 0 ? (
            <h2>No current orders pending</h2>
                ) : (
                    Menu.map((menu, index) => (
                    <div key={index} className='container'>
                        
                        <MenuCard menu={menu} />
                        
                    </div>
                    ))
                )}

                

        </div>
    </ChakraProvider>
  )
}

export default Items