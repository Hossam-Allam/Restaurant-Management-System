import React, { useState } from 'react';
import { ChakraProvider, Box, Card, CardBody, Stack, Heading, Text, Divider, CardFooter, ButtonGroup, Button, Image, Input, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react';

const EmployeeCard = ({ worker }) => {
  const [isRemoved, setIsRemoved] = useState(false);
  const [isAdjustingSalary, setIsAdjustingSalary] = useState(false);
  const [newSalary, setNewSalary] = useState(worker.Salary);

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
    worker.Salary = newSalary;
  }

  if (isRemoved) {
    return null;
  }

  return (
    <ChakraProvider>
      <Card maxW='sm' bg='gray.100'>
        <CardBody >
          <Image
            src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8RDhAQEA8PEhAQEA0PDRAPEA8QDQ0PFREWFxYRExQYHSggGBolGxUVITEhJSkrLi4uGB8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQQFAgMH/8QAMhABAAEBBAgEBQQDAAAAAAAAAAECAwQRIQUSMUFRYXGRMoGhsSJCwdHwIzNy8VJigv/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD6iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKt6vcU5RnV6R1Z9pa1VeKZn27A1pt6I+anvBF4o/wA6e8MYBuROOzPolh0VzGcTMdFuxv8AMeKMecZSDRHFla01RjTOPvDsAAAAAAAAAAAAAAAAAAAAB43q21Kcd85U9XF4vlNOUZz6R5s+3t6q5jHDLZEbIB5zIAAAAAJormJxiZieS/dr9E5V5Tx3T14M8BujLut7mnKc6fWno06aomMYzidgJAAAAAAAAAAAAAAAAUr/AHnD4KdvzTw5LldWETPCJliVVYzMztmcZBAAAAAAAAAACzcbxqzqz4Z9J4qwDdHjdbTWoid+yesPYAAAAAAAAAAAAAAHje5/Tq6Mhs3inGiqOUsYAAAAAAAAAAAAGpo+P045zVPrh9Fl43OMLOnpj3nF7AAAAAAAAAAAAAAAMW3s9WqY4Tl03NpT0jY4xrRuynoDOAAAAAAAAAAQl3YUa1URzjsDYs6cIiOERHo6AAAAAAAAAAAAAAABVvV7imdXVxy+LPCMJ3LTJv37lXl7QDxriMctm7ogQCQAAAAIACfzYALmj6qInOfiqyiOSm9LvTjXTH+0emYNkAAAAAAAAAAAAAAABn6Ss84q45T1aDwvtONnVyz7AyBKABICEJAD7CQQAAs6NztOkTP53Vl7RdOdU8ojv/QNAAAAAAAAAAAAAAAABFUYxMcYmJSAybW6VU0zM8YjLhx9ng2rajWpmOMZddzFAAAAAAAAB3YUa1URxnPpva9lZU0xhTH3lQ0bRjVM8I9Z/JaQAAAAAAAAAAAAAAAAAADJv1lq1zwqzj6tZ4Xyx1qecZx9gZIhIAAAAALmjrKJmap+XDCOfEFq6WOrRhO2c5+z3AAAAAAAAAAAAAAAAAAAAkcV2tMbaojzzBiQkAAAAAF7Rc+KP4z7qKzcLSKapxnCJjDzxgGoOaa4nZMT0nF0AAAAAAAAAAAAAAAAAACrpGrCjrMR9foy17SdWdMcIme/9KQAAAAAAAADbs6saYnjET6MRqXCvGzjlMx+dwWQAAAAAAAAAAAAAARVVEbZiOs4AkVrW+0Rs+KeWzuo296qqynKOEbPMHN5tNauZ8o6Q8wAAAAAAAAAW9HWuFU0zsq2dYVAG6MeyvNdOycuE5wt2ekI+aJjnGcAujiztaavDMT79nYAAAAAAAAAKF8vfy0+c/SAdXq+4fDTt3zujooVVTM4zMzPNAAAAAAAAAAAAAAAAABErl3v0xlXnHHfHXipgNymqJjGJxid6WPd7eaJy2b43S1qK4mImNkg6AAAAABxb+Cr+NXsxEgAAAAAAAAAAAAAAAAAAAADVuH7cf8AXuALAAAAP//Z'
            alt='Green double couch with wooden legs'
            borderRadius='lg'
          />
          <Stack mt='6' spacing='3'>
            <Heading size='md'>{worker.Name}</Heading>
            <Text color='black'>
              Born: {worker.Birth} <br />
              {worker.Place}<br />
              Employed since: {worker.Since}
            </Text>
            <Text color='green.600' fontSize='2xl'>
              Salary: ${worker.Salary}
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
                  Adjust Salary
                </Button>
              )}
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='red' onClick={handleRemove}>
              Remove
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </ChakraProvider>
  )
}

export default EmployeeCard;

