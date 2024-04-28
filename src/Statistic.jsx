import React from 'react';
import { ChakraProvider, Box, StatGroup, Stat, StatLabel, StatNumber, StatHelpText, StatArrow } from '@chakra-ui/react';

const Statistic = ({ customersNumber, totalRevenue, customersIncrease, repeatCustomersDecrease }) => {
  return (
    <>
      <ChakraProvider>
        <Box
          display='flex'
          justifyContent='center'
          my='15px'>
          <StatGroup
            border='1px solid grey'
            borderRadius='15px' px='15px'>
            <Stat>
              <StatLabel>Customers (current month)</StatLabel>
              <StatNumber>{customersNumber}</StatNumber>
              <StatHelpText>Not including repeat customers.</StatHelpText>
            </Stat>

            <Stat>
              <StatLabel>Total Revenue</StatLabel>
              <StatNumber>{totalRevenue}</StatNumber>
              <StatHelpText>Based on sales data from
                the last month.</StatHelpText>
            </Stat>
          </StatGroup>
        </Box>

        <Box
          display='flex'
          justifyContent='center'
          my='15px'>
          <StatGroup
            border='1px solid grey'
            borderRadius='15px' px='15px'>
            <Stat>
              <StatLabel>Customer trend</StatLabel>
              <StatNumber><StatArrow type="increase" />{customersIncrease}</StatNumber>
              <StatHelpText>Increase from the previous month.</StatHelpText>
            </Stat>

            <Stat>
              <StatLabel>Repeat customers</StatLabel>
              <StatNumber><StatArrow type="decrease" />{repeatCustomersDecrease}</StatNumber>
              <StatHelpText>Decrease from the previous month.</StatHelpText>
            </Stat>
          </StatGroup>
        </Box>
      </ChakraProvider>
    </>
  )
}

export default Statistic;
