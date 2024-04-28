import { ChakraProvider, Box, Card, CardBody, Stack, Heading, Text, Divider, CardFooter, ButtonGroup, Button } from '@chakra-ui/react';
import React, { useState } from "react";
import tableCalls from './tableCalls';


const CallCard = ({call}) => {
    const [isOk, setIsOk] = useState(false);

    const handleOk = () => {
        setIsOk(true);
    };

    if(isOk)
    {
        return null;
    }
    
    if(!call.calling)
    {
      return null;
    }

  return (
    <ChakraProvider>
          <Box maxW='sm' transition='transform 0.2s, box-shadow 0.2s' _hover={{ transform: 'translateY(-5px)', boxShadow: 'xl' }}>
            <Card maxW='sm' bg='gray.300'>
            <CardBody>
            <Text color='purple.800' fontSize='2xl'>
                     {call.calling !== false ? "Table:" + call.id : "Calling"}
            </Text>
            <Text color='purple.800' fontSize='2xl'>
                    {"calling"} 
            </Text>
            </CardBody>
            <Divider borderColor='gray.400' />
            <CardFooter>
                <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='green' onClick={handleOk}>
                        Ok!
                    </Button>
                </ButtonGroup>
                
            </CardFooter>
            </Card>
          </Box> 
        </ChakraProvider>
  )
}

export default CallCard