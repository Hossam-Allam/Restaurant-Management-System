import React, { useState } from 'react';
import OwnerNavbar from './OwnerNavbar';
import './Owner.css';
import Statistic from './Statistic';
import Cstatistic from './Cstatistic';
import Estatistic from './Estatistic';
import PieChart from './PieChart';
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
    AbsoluteCenter
} from '@chakra-ui/react';

function Owner() {
   

    return (
    
     <ChakraProvider>
        <OwnerNavbar />
        <div className='stat1'>
            <h2>Customer Insights:</h2>
            <Statistic
                customersNumber={1000}
                totalRevenue="$70,000"
                customersIncrease="25%"
                repeatCustomersDecrease="15%"
            />
        </div>
        <Center height='150px'>
            <Divider className='divider' orientation='vertical' borderWidth='2px' borderColor='blue.500' />
        </Center>
        <div className='stat2'>
            <Cstatistic
                customersNumber={35}
                totalSales="$3430"
                customersIncrease="3"
                Sales="15%"
            />
        </div> 
        <Box position='relative' padding='10'>
            <Divider position='absolute' top='275px' left='175px' borderWidth='2px' borderColor='blue.500' width='250px' />
            <AbsoluteCenter position='absolute' top='290px' left='300px' bg='white' px='4'>
                Daily
            </AbsoluteCenter>
        </Box>
        <h2 className='insights'>Employee Insights:</h2>
        <div className='stat3'>
            <Estatistic
                 employeeNumber={18}
                 Salaries="$22,300"
            />
        </div>
        <Box position='relative' padding='10'>
            <Divider position='absolute' top='200px' right='230px' borderWidth='2px' borderColor='blue.500' width='250px' />
        </Box>
        <div className='RevChart'>
            <PieChart />
        </div>
            
        
     </ChakraProvider>
    );
}

export default Owner;
