import React from 'react'
import { ChakraProvider, Box, StatGroup, Stat, StatLabel, StatNumber, StatHelpText, StatArrow } from '@chakra-ui/react';

const Estatistic = ({employeeNumber, Salaries }) => {
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
              <StatLabel>Employees</StatLabel>
              <StatNumber>{employeeNumber}</StatNumber>
              <StatHelpText>Kitchen workers, Waiters</StatHelpText>
            </Stat>

            <Stat>
              <StatLabel>Total Salaries</StatLabel>
              <StatNumber>{Salaries}</StatNumber>
              <StatHelpText>Expected Salary total for this month.</StatHelpText>
            </Stat>
          </StatGroup>
        </Box>
    </ChakraProvider>
    </>
  )
}

export default Estatistic