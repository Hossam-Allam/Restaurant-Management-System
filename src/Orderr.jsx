import { ChakraProvider, Box, Card, CardBody, Stack, Heading, Text, Divider, CardFooter, ButtonGroup, Button } from '@chakra-ui/react';
import React, { useState } from "react";
import orders from './orders';
const Orderr = ({ order }) => {
    const [isOrderReady, setIsOrderReady] = useState(false);
    const [filteredOrderItems, setFilteredOrderItems] = useState([...order.OrderItems]);

    const handleOrderReady = () => {
        setIsOrderReady(true);
        order.Ready = true;
        console.log(orders);
    };

    const handleItemRemove = (indexToRemove) => {
        const updatedOrderItems = filteredOrderItems.filter((_, index) => index !== indexToRemove);
        setFilteredOrderItems(updatedOrderItems);
    };

    if (order.Ready) {
        return null; 
    }

    

    return (
        <ChakraProvider>
          <Box maxW='sm' transition='transform 0.2s, box-shadow 0.2s' _hover={{ transform: 'translateY(-5px)', boxShadow: 'xl' }}>
            <Card maxW='sm' bg='gray.300'>
            <CardBody>
            <Text color='purple.800' fontSize='2xl'>
                    Ordered: {order.Time}
            </Text>
                <Stack mt='6' spacing='3'>
                <Heading size='md'>Pending Order</Heading>
                <Text>
                    {filteredOrderItems.map((item, index) => (
                        <React.Fragment key={index}>
                            <p style={{ color: 'black' }}> {item}</p>
                            <Button type="button" class="btn btn-outline-success" onClick={() => handleItemRemove(index)}>Item Ready!</Button> {/* Dish Name */}
                            
                            
                        </React.Fragment>
                    ))}
                </Text>
                <Text color='purple.800' fontSize='2xl'>
                    {order.Notes}
                </Text>
                </Stack>
            </CardBody>
            <Divider borderColor='gray.400' />
            <CardFooter>
                <ButtonGroup spacing='2'>
                <Button variant='solid' colorScheme='green' onClick={handleOrderReady}>
                    Order Ready
                </Button>
                <Text color='purple.800' fontSize='2xl'>
                    {order.Type}
                </Text>
                </ButtonGroup>
                
            </CardFooter>
            </Card>
          </Box> 
        </ChakraProvider>
    );
};

export default Orderr;
