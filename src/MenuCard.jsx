import { ChakraProvider, Box, Card, CardBody, Stack, Heading, Text, Divider, CardFooter, ButtonGroup, Button, Image, Input, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react';
import React, { useState } from "react";
import Menu from './Menu';

const MenuCard = ({menu}) => {
    const [filteredIngredients, setFilteredIngredients] = useState([...menu.Ingredients]);

    const [isRemoved, setIsRemoved] = useState(false);
    const [isAdjustingSalary, setIsAdjustingSalary] = useState(false);
    const [newSalary, setNewSalary] = useState(menu.Price);
  
    const handleRemove = () => {
      setIsRemoved(true);
    }
  
    const handleAdjustSalary = () => {
      setIsAdjustingSalary(true);
    }
  
    const handleSalaryChange = (value) => {
      setNewSalary(value);
    }
  
    const handleConfirmSalary = () => {
      
      console.log('New Salary:', newSalary);
  
      
      setIsAdjustingSalary(false);
      menu.Price = newSalary;
    }
  
    if (isRemoved) {
      return null;
    }
    
  return (
    <ChakraProvider>
      <Card maxW='sm' bg='gray.100'>
        <CardBody >

          <Stack mt='6' spacing='3'>
            <Heading size='md'>{menu.Item}</Heading>
            <Text color='black'>
            {filteredIngredients.map((item, index) => (
                <React.Fragment key={index}>
                    <p style={{ color: 'black' }}> {item}</p>           
                </React.Fragment>
            ))}
            </Text>
            <Text color='green.600' fontSize='2xl'>
              Price: ${menu.Price}
            </Text>
            {isAdjustingSalary ? (
              <Box>
                <NumberInput value={newSalary} min={0} onChange={(value) => handleSalaryChange(value)}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Button onClick={handleConfirmSalary}>Confirm</Button>
              </Box>
            ) : (
                <Button variant='ghost' colorScheme='blue' onClick={handleAdjustSalary}>
                  Adjust Price
                </Button>
              )}
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='red' onClick={handleRemove}>
              Remove Item
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </ChakraProvider>
  )
}

export default MenuCard