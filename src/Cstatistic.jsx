import React from 'react'
import { ChakraProvider, Box, StatGroup, Stat, StatLabel, StatNumber, StatHelpText, StatArrow } from '@chakra-ui/react';

const Cstatistic = ({ customersNumber, totalSales, customersIncrease, Sales }) => {
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
              <StatLabel>Customers</StatLabel>
              <StatNumber>{customersNumber}</StatNumber>
              <StatHelpText>Unique customers today.</StatHelpText>
            </Stat>

            <Stat>
              <StatLabel>Sales amount</StatLabel>
              <StatNumber>{totalSales}</StatNumber>
              <StatHelpText>Based on sales data from
                today.</StatHelpText>
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
              <StatHelpText>Increase from the daily average.</StatHelpText>
            </Stat>

            <Stat>
              <StatLabel>Sales Trend</StatLabel>
              <StatNumber><StatArrow type="increase" />{Sales}</StatNumber>
              <StatHelpText>Increase from daily average</StatHelpText>
            </Stat>
          </StatGroup>
        </Box>
      </ChakraProvider>
    </>
  )
}

export default Cstatistic