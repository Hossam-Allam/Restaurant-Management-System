import React, { useRef, useEffect, useState } from 'react';
import { Button, Divider, Center, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Text, Input, FormControl, FormLabel, Stack, Menu, MenuButton, MenuList, MenuItem, MenuGroup, MenuDivider } from "@chakra-ui/react";
import { HamburgerIcon, AddIcon, ExternalLinkIcon, RepeatIcon, EditIcon } from "@chakra-ui/icons";
import { SimpleGrid, Box, Card, CardHeader, CardBody, CardFooter, Avatar, Heading} from "@chakra-ui/react";
import { EmailIcon, ArrowForwardIcon, DownloadIcon} from "@chakra-ui/icons";

import {Card as nextuiCard, CardHeader as nextuiCardHeader, CardBody as nextuiCardBody, CardFooter as nextuiCardFooter, Image as nextuiImage, Button as nextuiButton} from "@nextui-org/react";
import './App.css';

const App: React.FC = () => {
  const deviceAspectRatio = window.innerWidth / window.innerHeight;
  let firstVideoSrc = "/src/Logo/a1980x1024.mp4";
  let secondVideoSrc = "/src/Logo/b1980x1024.mp4";
  
  if (Math.abs(deviceAspectRatio - 1980 / 1024) < Math.abs(deviceAspectRatio - 1024 / 1980) && Math.abs(deviceAspectRatio - 1980 / 1024) < Math.abs(deviceAspectRatio - 1)) {
    // 1980:1024 is closest to device aspect ratio
    firstVideoSrc = "/src/Logo/a1980x1024.mp4";
    secondVideoSrc = "/src/Logo/b1980x1024.mp4";
  } else if (Math.abs(deviceAspectRatio - 1024 / 1980) < Math.abs(deviceAspectRatio - 1)) {
    // 1024:1980 is closest to device aspect ratio
    firstVideoSrc = "/src/Logo/a1024x1980.mp4";
    secondVideoSrc = "/src/Logo/b1024x1980.mp4";
  } else {
    // 1:1 is closest to device aspect ratio
    firstVideoSrc = "/src/Logo/a2880x2880.mp4";
    secondVideoSrc = "/src/Logo/b2880x2880.mp4";
  }

  const firstVideoRef = useRef<HTMLVideoElement>(null);
  const secondVideoRef = useRef<HTMLVideoElement>(null);
  const { isOpen: SignUpIsOpen, onOpen: SignUpOpen, onClose: SignUpClose } = useDisclosure();
  const [step, setStep] = useState(1);
  const [firstVideoEnded, setFirstVideoEnded] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [linksVisible, setLinksVisible] = useState(true);

  useEffect(() => {
    const handleFirstVideoEnded = () => {
      setFirstVideoEnded(true);
    };

    const firstVideoElement = firstVideoRef.current;

    if (firstVideoElement) {
      firstVideoElement.addEventListener('ended', handleFirstVideoEnded);
      firstVideoElement.play().catch(error => {
        console.error('Error playing first video:', error);
      });
    }

    return () => {
      if (firstVideoElement) {
        firstVideoElement.removeEventListener('ended', handleFirstVideoEnded);
      }
    };
  }, []);

  useEffect(() => {
    if (firstVideoEnded && secondVideoRef.current) {
      firstVideoRef.current.style.display = 'none';
      secondVideoRef.current.style.display = 'block';
      secondVideoRef.current.play();
    }
  }, [firstVideoEnded]);

let isScrolledPastTop = false;
let scrollTimeout;

function handleScroll() {
  clearTimeout(scrollTimeout);

  scrollTimeout = setTimeout(() => {

    const isAtTop = window.scrollY === 0;
    const buttonContainer = document.querySelector('.button-container');
    const continueGuestContainer = document.querySelector('.continue-guest-container');
    const menuButton = document.querySelector('.menu');
    const nav = document.querySelector('nav');
    

    if (window.scrollY > 0 && !isScrolledPastTop) {
      isScrolledPastTop = true;
      buttonContainer.classList.add('hidden');
      continueGuestContainer.classList.add('hidden');

      document.querySelectorAll('nav a').forEach(link => {
        link.style.transition = 'opacity 0.3s ease';
        link.style.opacity = '0';
      });

      setTimeout(() => {
        setMenuVisible(true);
        menuButton.classList.remove('deanimate-opacity');
        menuButton.classList.add('animate-opacity');

        document.querySelectorAll('nav a').forEach(link => {
          link.style.transition = 'opacity 0.3s ease';
          link.style.opacity = '1';
        });
      }, 305); 
    } else if (isAtTop && isScrolledPastTop) {
      
      buttonContainer.classList.remove('hidden');
      continueGuestContainer.classList.remove('hidden');
      document.querySelectorAll('nav a').forEach(link => {
        link.style.transition = 'opacity 0.3s ease';
        link.style.opacity = '0';
      });

      menuButton.classList.remove('animate-opacity');
      menuButton.classList.add('deanimate-opacity');
      
      setTimeout(() => {
        setMenuVisible(false);
      }, 305);

      setTimeout(() => {
        document.querySelectorAll('nav a').forEach(link => {
          link.style.transition = 'opacity 0.3s ease';
          link.style.opacity = '1';
        });
      }, 305);

      isScrolledPastTop = false;
    }
  }, 100);
}

window.addEventListener('scroll', () => {
  requestAnimationFrame(handleScroll);
});
document.addEventListener("DOMContentLoaded", function() {
  const loadingOverlay = document.querySelector('.loading-overlay');

  setTimeout(function() {
    loadingOverlay.style.display = 'none';
  }, 3000);
});
document.addEventListener('DOMContentLoaded', function() {
  const fadeIns = document.querySelectorAll('.fade-in');

  function checkFadeIns() {
    fadeIns.forEach(fadeIn => {
      const rect = fadeIn.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      if (rect.top >= 0 && rect.bottom <= windowHeight) {
        fadeIn.classList.add('visible');
      } else {
        fadeIn.classList.remove('visible');
      }
    });
  }

 
  checkFadeIns();

  
  window.addEventListener('scroll', checkFadeIns);
  
  
  window.addEventListener('resize', checkFadeIns);
});



  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSignUpOpen = () => {
    setStep(1);
    SignUpOpen();
  };

  return (

    <div>
      {/*<div class="loading-overlay"></div> ADD TO HTML LATER*/ }


      {/* Navbar */}
      <header>
        <div className="container">
          <i id="logo" aria-hidden="true"></i>
          <nav>
            {linksVisible && (
              <>
                <a href="">Demo</a>
                <a href="">About us</a>
                <a href="">Contact us</a>
              </>
            )}
            <div className={`menu ${menuVisible ? 'visible' : ''}`}>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label='Options'
                  icon={<HamburgerIcon />}
                  variant='ghost'
                  colorScheme='whiteAlpha'
                  sx={{
                    '&:hover': {
                      bg: 'transparent',
                      color: 'inherit',
                      boxShadow: 'none',
                    }
                  }}
                />
                <MenuList>
                  <MenuItem icon={<AddIcon />} command='⌘T'>
                    Sign up
                  </MenuItem>
                  <MenuItem icon={<EditIcon />} command='⌘O'>
                    Sign in
                  </MenuItem>
                  <MenuItem icon={<ExternalLinkIcon />} command='⌘N'>
                    Continue as guest
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          </nav>
        </div>
      </header>

      {/* First Video */}
      <div className="video-container">
        <video
          ref={firstVideoRef}
          autoPlay
          muted
          className="video"
        >
          <source src={firstVideoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Second Video */}
      <div className="video-container">
        <video
          ref={secondVideoRef}
          autoPlay
          muted
          loop
          className="video"
          style={{ display: 'none' }}
        >
          <source src={secondVideoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Sign In and Sign Up Buttons */}
      <div className="button-container">
        <Button colorScheme="whiteAlpha" variant="solid" mr={4} onClick={() => {}}>Sign In</Button>
        <Button colorScheme="whiteAlpha" variant="solid" onClick={handleSignUpOpen}>Sign Up</Button>
      </div>

      {/* Continue as guest Link */}
      <div className="continue-guest-container">
        <a href="#" className="link-button">Continue as guest</a>
      </div>

      {/* Sign In Modal */}
      <Modal isOpen={SignUpIsOpen} onClose={SignUpClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign In</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {step === 1 && (
              <Stack spacing={4}>
                <FormControl id="firstName">
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" />
                </FormControl>
                <FormControl id="middleName">
                  <FormLabel>Middle Name</FormLabel>
                  <Input type="text" />
                </FormControl>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Stack>
            )}
            {step === 2 && (
              <Stack spacing={4}>
                <FormControl id="username">
                  <FormLabel>Username</FormLabel>
                  <Input type="text" />
                </FormControl>
                <FormControl id="email">
                  <FormLabel>Email</FormLabel>
                  <Input type="email" />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input type="password" />
                </FormControl>
              </Stack>
            )}
            {step === 3 && (
              <Stack spacing={4}>
                <FormControl id="address">
                  <FormLabel>Address</FormLabel>
                  <Input type="text" />
                </FormControl>
                <FormControl id="phoneNumber">
                  <FormLabel>Phone Number</FormLabel>
                  <Input type="tel" />
                </FormControl>
              </Stack>
            )}
          </ModalBody>
          <ModalFooter>
            {step !== 1 && (
              <Button colorScheme="blue" mr={3} onClick={handlePreviousStep}>Back</Button>
            )}
            {step < 3 ? (
              <Button colorScheme="blue" onClick={handleNextStep}>Next</Button>
            ) : (
              <Button colorScheme="blue" onClick={SignUpClose}>Submit</Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Demo Section */}
      <div className="demo-section">
        <div className="demo-section-title">
          <div className="fade-in">
            <Text fontSize='6xl'>Demo</Text>
          </div>
        </div>
        <SimpleGrid columns={3} spacing={10}>
          <Card align='center' variant='elevated' bg="rgba(0, 0, 0, 0)" color="whiteAlpha"
            transition="background-color 0.3s"
            _hover={{
              bg: "rgba(255, 255, 255, 0.1)",
              transition: "background-color 0.3s",
            }}>
            <CardHeader>
              <Heading size='md'> Download our App</Heading>
            </CardHeader>
            <CardBody>
              <Text>Here you may Download our Demo of the Restaurant Management System to your device and use it</Text>
            </CardBody>
            <CardFooter>
              <Button leftIcon={<DownloadIcon />} colorScheme='blue' variant='outline'>Download</Button>
            </CardFooter>
          </Card>
          <Center>
            <Divider orientation='vertical' />
          </Center>
          <Card align='center'variant='elevated' bg="rgba(0, 0, 0, 0)" color="whiteAlpha"
            transition="background-color 0.3s"
            _hover={{
              bg: "rgba(255, 255, 255, 0.1)",
              transition: "background-color 0.3s",
            }}>
            <CardHeader>
              <Heading size='md'> Continue with Online Demo</Heading>
            </CardHeader>
            <CardBody>
              <Text>Here you may continue with our Online Demo of the Restaurant Management System</Text>
            </CardBody>
            <CardFooter>
              <Button leftIcon={<ExternalLinkIcon />} colorScheme='blue' variant='outline' >Continue</Button>
            </CardFooter>
          </Card>
        </SimpleGrid>
      </div>
      {/* FEATURES SECTION BUT NOT DONE, I WILL REDO THE WEBSITE AND FIX THIS SECTION
      <div className="features-section">
        <SimpleGrid columns={2} spacing={10} maxW="60vw">
          <div className="features-section-title" align='center'>
            <Heading as='h1' size='4xl' noOfLines={1}>
              <Text>Ease of use</Text>
            </Heading>
            <Heading as='h1' size='4xl' noOfLines={1} >
              <box as="span">for </box>
              <Text as="span" color="#46fa76" style={{ textShadow: "rgb(118 255 154 / 55%) 3px 3px 10px"                 }}>
                Customers
              </Text>
            </Heading>
          </div>
        
          <Text fontSize='xl'>We are a dedicated team of four computer engineering major students, passionate about innovation and technology. As part of our university project, we embarked on a journey to create an engaging and interactive platform that showcases our skills and knowledge in the field of computer engineering. With a shared vision of pushing boundaries and exploring new possibilities, we have combined our expertise to bring this project to life. Through countless hours of brainstorming, coding, and testing, we have crafted a platform that we are proud to present to you. Join us on this exciting adventure as we continue to learn, grow, and make a positive impact in the world of technology. Thank you for visiting and being part of our journey!</Text>
              <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
              <nextuiCard className="col-span-12 sm:col-span-4 h-[300px]">
                <nextuiCardHeader className="absolute z-10 top-1 flex-col !items-start">
                  <p className="text-tiny text-white/60 uppercase font-bold">What to watch</p>
                  <h4 className="text-white font-medium text-large">Stream the Acme event</h4>
                </nextuiCardHeader>
                <nextuiImage
                  removeWrapper
                  alt="Card background"
                  className="z-0 w-full h-full object-cover"
                  src="/images/card-example-4.jpeg"
                />
              </nextuiCard>
              <nextuiCard className="col-span-12 sm:col-span-4 h-[300px]">
                <nextuiCardHeader className="absolute z-10 top-1 flex-col !items-start">
                  <p className="text-tiny text-white/60 uppercase font-bold">Plant a tree</p>
                  <h4 className="text-white font-medium text-large">Contribute to the planet</h4>
                </nextuiCardHeader>
                <nextuiImage
                  removeWrapper
                  alt="Card background"
                  className="z-0 w-full h-full object-cover"
                  src="/images/card-example-3.jpeg"
                />
              </nextuiCard>
              <nextuiCard className="col-span-12 sm:col-span-4 h-[300px]">
                <nextuiCardHeader className="absolute z-10 top-1 flex-col !items-start">
                  <p className="text-tiny text-white/60 uppercase font-bold">Supercharged</p>
                  <h4 className="text-white font-medium text-large">Creates beauty like a beast</h4>
                </nextuiCardHeader>
                <nextuiImage
                  removeWrapper
                  alt="Card background"
                  className="z-0 w-full h-full object-cover"
                  src="/images/card-example-2.jpeg"
                />
              </nextuiCard>
              <nextuiCard isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5">
                <nextuiCardHeader className="absolute z-10 top-1 flex-col items-start">
                  <p className="text-tiny text-white/60 uppercase font-bold">New</p>
                  <h4 className="text-black font-medium text-2xl">Acme camera</h4>
                </nextuiCardHeader>
                <nextuiImage
                  removeWrapper
                  alt="Card example background"
                  className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                  src="/images/card-example-6.jpeg"
                />
                <nextuiCardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                  <div>
                    <p className="text-black text-tiny">Available soon.</p>
                    <p className="text-black text-tiny">Get notified.</p>
                  </div>
                  <nextuiButton className="text-tiny" color="primary" radius="full" size="sm">
                    Notify Me
                  </nextuiButton>
                </nextuiCardFooter>
              </nextuiCard>
              <nextuiCard isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7">
                <nextuiCardHeader className="absolute z-10 top-1 flex-col items-start">
                  <p className="text-tiny text-white/60 uppercase font-bold">Your day your way</p>
                  <h4 className="text-white/90 font-medium text-xl">Your checklist for better sleep</h4>
                </nextuiCardHeader>
                <nextuiImage
                  removeWrapper
                  alt="Relaxing app background"
                  className="z-0 w-full h-full object-cover"
                  src="/images/card-example-5.jpeg"
                />
                <nextuiCardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                  <div className="flex flex-grow gap-2 items-center">
                    <nextuiImage
                      alt="Breathing app icon"
                      className="rounded-full w-10 h-11 bg-black"
                      src="/images/breathing-app-icon.jpeg"
                    />
                    <div className="flex flex-col">
                      <p className="text-tiny text-white/60">Breathing App</p>
                      <p className="text-tiny text-white/60">Get a good night's sleep.</p>
                    </div>
                  </div>
                  <nextuiButton radius="full" size="sm">Get App</nextuiButton>
                </nextuiCardFooter>
              </nextuiCard>
            </div>

        </SimpleGrid>
      </div>
      */
      
      <div className="contact-us-section">
        <div className="title-container">
          <Text fontSize='6xl'>Contact Us</Text>
        </div>
        <video autoPlay loop muted className="contact-us-video">
          <source src={"/src/Logo/4kbg.mp4"} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="contact-us-content">
        <SimpleGrid columns={3} spacing={10} maxW="60vw">
          <Card align='center' variant='elevated' bg="rgba(0, 0, 0, 0)" color="whiteAlpha"
            transition="background-color 0.3s"
            _hover={{
              bg: "rgba(255, 255, 255, 0.1)", 
              transition: "background-color 0.3s",
            }}>
            <CardBody>
              <Button leftIcon={<EmailIcon />}  colorScheme='whiteAlpha' variant='solid'>
                Email
              </Button>
            </CardBody>
          </Card>
          <Center>
            <Divider orientation='vertical' />
          </Center>
          <Card align='center'variant='elevated' bg="rgba(0, 0, 0, 0)" color="whiteAlpha"
            transition="background-color 0.3s"
            _hover={{
              bg: "rgba(255, 255, 255, 0.1)",
              transition: "background-color 0.3s",
            }}>
            <CardBody>
              <Button rightIcon={<ArrowForwardIcon />} colorScheme='whiteAlpha' variant='solid'>
                Call us
              </Button>
            </CardBody>
          </Card>
        </SimpleGrid>
        </div>
      </div>}

      {/* About Us Section */}
      <div className="about-us-section">
        <div className="about-us-section-title">
          <div className="fade-in">
            <Text fontSize='6xl'>About Us</Text>
          </div>
        </div>
        <Text fontSize='xl'>We are a dedicated team of four computer engineering major students, passionate about innovation and technology. As part of our university project, we embarked on a journey to create an engaging and interactive platform that showcases our skills and knowledge in the field of computer engineering. With a shared vision of pushing boundaries and exploring new possibilities, we have combined our expertise to bring this project to life. Through countless hours of brainstorming, coding, and testing, we have crafted a platform that we are proud to present to you. Join us on this exciting adventure as we continue to learn, grow, and make a positive impact in the world of technology. Thank you for visiting and being part of our journey!</Text>
      </div>
      
      {/* Our Team Section */}
      <div className="our-team-section">
        <div className="title-container">
          <Text fontSize='6xl'>Meet Our Team</Text>
        </div>
        <video autoPlay loop muted className="team-video">
          <source src={"/src/Logo/4kbg.mp4"} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="team-content">
          <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(14vw, 1fr))'>
            <Card variant='outline' bg="rgba(0, 0, 0, 0.2)" color="whiteAlpha" 
            transition="background-color 0.3s"
            _hover={{
              bg: "rgba(0, 0, 0, 0.7)",
              transition: "background-color 0.3s",
            }}>
              <CardHeader>
                <Heading size='md' style={{ paddingTop: '10px', paddingBottom: '20px' }}> Abdurrahman Foudhaily</Heading>
                <Avatar size='2xl' name='Abdurrahman Foudhail' src='/src/images/Abdurrahman.jpg' />{' '}
              </CardHeader>
              <CardBody>
                <Text> Computer Engineering Student </Text>
                <Text> Lead Back-end Developer </Text>
              </CardBody>
              <CardFooter>
                <IconButton
                variant='outline'
                colorScheme='whiteAlpha'
                aria-label='Send email'
                icon={<EmailIcon />}
                />
              </CardFooter>
            </Card>
            <Card variant='outline' bg="rgba(0, 0, 0, 0.2)" color="whiteAlpha"
            transition="background-color 0.3s"
            _hover={{
              bg: "rgba(0, 0, 0, 0.7)", 
              transition: "background-color 0.3s",
            }}>
              <CardHeader>
                <Heading size='md' style={{ paddingTop: '10px', paddingBottom: '20px' }}> Berfin Duzgun</Heading>
                <Avatar size='2xl' name='Berfin Duzgun' src='/src/images/Berfin.jpg' />{' '}
              </CardHeader>
              <CardBody>
                <Text> Computer Engineering Student </Text>
                <Text> Team Leader </Text>
              </CardBody>
              <CardFooter>
                <IconButton
                variant='outline'
                colorScheme='whiteAlpha'
                aria-label='Send email'
                icon={<EmailIcon />}
                />
              </CardFooter>
            </Card>
            <Card variant='outline' bg="rgba(0, 0, 0, 0.2)" color="whiteAlpha"
            transition="background-color 0.3s"
            _hover={{
              bg: "rgba(0, 0, 0, 0.7)",
              transition: "background-color 0.3s",
            }}>
              <CardHeader>
                <Heading size='md' style={{ paddingTop: '10px', paddingBottom: '20px' }}> Hossam Allam</Heading>
                <Avatar size='2xl' name='Hossam Allam' src='/src/images/Hossam.jpg' />{' '}
              </CardHeader>
              <CardBody>
                <Text> Computer Engineer</Text>
                <Text> Lead Front-end Developer </Text>
              </CardBody>
              <CardFooter>
                <IconButton
                variant='outline'
                colorScheme='whiteAlpha'
                aria-label='Send email'
                icon={<EmailIcon />}
                />
              </CardFooter>
            </Card>
            <Card variant='outline' bg="rgba(0, 0, 0, 0.2)" color="whiteAlpha"
            transition="background-color 0.3s"
            _hover={{
              bg: "rgba(0, 0, 0, 0.7)",
              transition: "background-color 0.3s",
            }}>
              <CardHeader>
                <Heading size='md' style={{ paddingTop: '10px', paddingBottom: '20px' }}> Faris Zarqa</Heading>
                <Avatar size='2xl' name='Faris Zarqa' src='/src/images/Faris.jpg' />{' '}
              </CardHeader>
              <CardBody>
                <Text> Computer Engineering Student </Text>
                <Text> Lead of Referencing and Documentation </Text>
              </CardBody>
              <CardFooter>
                <IconButton
                variant='outline'
                colorScheme='whiteAlpha'
                aria-label='Send email'
                icon={<EmailIcon />}
                />
              </CardFooter>
            </Card>
          </SimpleGrid>
        </div>
      </div>
      

      
    </div>
  );
}

export default App;

/*<IconButton
  variant='outline'
  colorScheme='teal'
  aria-label='Send email'
  icon={<EmailIcon />}
/>*/