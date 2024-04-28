import { ChakraProvider, Box, Card, CardBody, Stack, Heading, Text, Divider, CardFooter, ButtonGroup, Button } from '@chakra-ui/react';
import React, { useState } from "react";
import orders from './orders';

const Waiter = ({order}) => {

  const [isOrderReady, setIsOrderReady] = useState(false);
  const [filteredOrderItems, setFilteredOrderItems] = useState([...order.OrderItems]);
  const [buttonClicked1, setButtonClicked1] = useState(false);
  const [buttonClicked2, setButtonClicked2] = useState(false);

    const handleOrderReady = () => {
        setIsOrderReady(true);
        setButtonClicked1(true);
    };

    const [areDuesPaid, setAreDuesPaid] = useState(false);

    const handleDuesPaid = () => {
      setAreDuesPaid(true);
      setButtonClicked2(true);
  };

    const handleItemRemove = (indexToRemove) => {
        const updatedOrderItems = filteredOrderItems.filter((_, index) => index !== indexToRemove);
        setFilteredOrderItems(updatedOrderItems);
    };

    if (isOrderReady && areDuesPaid || !order.Ready){
        return null; 
    }


  return (
    <ChakraProvider>
          <Box maxW='sm' transition='transform 0.2s, box-shadow 0.2s' _hover={{ transform: 'translateY(-5px)', boxShadow: 'xl' }}>
            <Card maxW='sm' bg='gray.300'>
            <CardBody>
            <Text color='purple.800' fontSize='2xl'>
                     {order.Table !== null ? "Table:" + order.Table : "Takeway"}
            </Text>
                <Stack mt='6' spacing='3'>
                <Heading size='md'>Pending Order</Heading>
                <Text>
                    {filteredOrderItems.map((item, index) => (
                        <React.Fragment key={index}>
                            <p style={{ color: 'black' }}> {item}</p>
                        </React.Fragment>
                    ))}
                </Text>
                <Text color='purple.800' fontSize='2xl'>
                    {"Total: " + order.Price + "$"} 
                </Text>
                </Stack>
            </CardBody>
            <Divider borderColor='gray.400' />
            <CardFooter>
                <ButtonGroup spacing='2'>
                {!buttonClicked1 && ( 
                    <Button variant='solid' colorScheme='green' onClick={handleOrderReady}>
                        Order Delivered
                    </Button>
                )}
                {!buttonClicked2 && (
                  <Button variant='solid' colorScheme='blue' onClick={handleDuesPaid}>
                    Dues paid!
                  </Button>
                )}
                </ButtonGroup>
                
            </CardFooter>
            </Card>
          </Box> 
        </ChakraProvider>
  );
}

export default Waiter;