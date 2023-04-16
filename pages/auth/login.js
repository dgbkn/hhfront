import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  useDisclosure,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Modal,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Icon,
  Spacer
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage.js';
import { useRouter } from 'next/router';

import Head from "next/head";
import Popup from "reactjs-popup";


import Web3 from 'web3';
let web3 = new Web3(Web3.givenProvider) // Will hold the web3 instance

const avatars = [
  {
    name: 'Ryan Florence',
    url: 'https://i.pravatar.cc/300?q',
  },
  {
    name: 'Segun Adebayo',
    url: 'https://i.pravatar.cc/300?m',
  },
  {
    name: 'Kent Dodds',
    url: 'https://i.pravatar.cc/300?n',
  },
  {
    name: 'Prosper Otemuyiwa',
    url: 'https://i.pravatar.cc/300?y',
  },
  {
    name: 'Christian Nwamba',
    url: 'https://i.pravatar.cc/300?t',
  },
];

export default function Login() {

  const [haveMetamask, sethaveMetamask] = useState(true);
  const [isProvider, setisProvider] = useState(null);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [address, setaddress] = useState("");
  const [authToken, setauthToken] = useLocalStorage("token", "");
  var router = useRouter();

  const [client, setclient] = useState({
    isConnected: false,
  });

  const checkConnection = async () => {

    const { ethereum } = window;
    if (ethereum) {
      sethaveMetamask(true);
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        setclient({
          isConnected: true,
          address: accounts[0],
        });
      } else {
        setclient({
          isConnected: false,
        });
      }
    } else {
      sethaveMetamask(false);
    }
  };

  const connectWeb3 = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Metamask not detected");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setclient({
        isConnected: true,
        address: accounts[0],
      });

      setaddress(accounts[0]);

      var users;

      fetch(`https://hh.devgoyal3.repl.co/api/users?publicAddress=${accounts[0]}`)
        .then(response => response.json())
        .then(
          users => {
            var user = users.length ? users[0] : handleSignup(accounts[0]);
            handleAuth(user);
          }
        );



    } catch (error) {
      console.log("Error connecting to metamask", error);
    }
  };

  const handleSignup =  (publicAddress) => {
    setisModalOpen(true);
    if (isProvider != null) {
      fetch(`https://hh.devgoyal3.repl.co/api/users/signup`, {
        body: JSON.stringify({ publicAddress,isProvider }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }).then((response) => {
        setisModalOpen(false);
        var dt = response.json();
        connectWeb3();
      });
    }

  }

  const handleAuth = async (user) => {
    console.log("Handle Auth Started");

    try {
      console.log({ user });
      const signatureHash = await web3.eth.personal.sign(`I am signing my one-time nonce: ${user.nonce}`, user.publicAddress);
      console.log(signatureHash);
      fetch(`https://hh.devgoyal3.repl.co/auth`, {
        body: JSON.stringify({ publicAddress:user.publicAddress, signature:signatureHash }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }).then(async (response) =>  {
        var authT = await response.json();
        var token = authT.accessToken;
        console.log({authToken:token});
        setauthToken(token);
        // router.push('/dashboard');
        window.location.replace('/dashboard');
      });

    } catch (err) {
      console.log(err.message);
      console.log('You need to sign the message to be able to log in.');
    }

    //   return new Promise((resolve, reject) =>
    //   Web3.personal.sign(
    //     Web3.fromUtf8(`I am signing my one-time nonce: ${user.nonce}`),
    //     user.publicAddress,
    //     (err, signature) => {
    //       if (err) return reject(err);
    //       fetch(`https://hh.devgoyal3.repl.co/auth`, {
    //         body: JSON.stringify({ publicAddress, signature }),
    //         headers: {
    //           'Content-Type': 'application/json'
    //         },
    //         method: 'POST'
    //       }).then(response => {
    //       var authT =  response.json();
    //       var token = authT.accessToken;
    //       setauthToken(token);
    //       });
    //     }
    //   )
    // );
  };


  useEffect(() => {
    checkConnection();
  }, []);


  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => { setisModalOpen(false) }} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Me up as</ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={
              () => {
                setisProvider(false);
                handleSignup(address);
                // setisModalOpen(false);
              }
            }>
              Work Seeker.
            </Button>
            <Button variant='ghost' onClick={() => {
              setisProvider(true);
              handleSignup(address);
              // setisModalOpen(false);
            }}>Work Provider.
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


      <Head>
        <title>
          Login
        </title>
      </Head>
      <Box position={'relative'}>
        <Container
          as={SimpleGrid}
          maxW={'7xl'}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, lg: 32 }}
          py={{ base: 10, sm: 20, lg: 32 }}>
          <Stack spacing={{ base: 10, md: 20 }}>
            <Heading
              lineHeight={1.1}
              fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
              Hustlers{' '}
              <Text
                as={'span'}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text">
                deserve
              </Text>{' '}
              Anonymity
            </Heading>
            <Stack direction={'row'} spacing={4} align={'center'}>
              <AvatarGroup>
                {avatars.map((avatar) => (
                  <Avatar
                    key={avatar.name}
                    name={avatar.name}
                    src={avatar.url}
                    size={{ base: 'md', md: 'lg' }}
                    position={'relative'}
                    zIndex={2}
                    _before={{
                      content: '""',
                      width: 'full',
                      height: 'full',
                      rounded: 'full',
                      transform: 'scale(1.125)',
                      bgGradient: 'linear(to-bl, red.400,pink.400)',
                      position: 'absolute',
                      zIndex: -1,
                      top: 0,
                      left: 0,
                    }}
                  />
                ))}
              </AvatarGroup>
              <Text fontFamily={'heading'} fontSize={{ base: '4xl', md: '6xl' }}>
                +
              </Text>
              <Flex
                align={'center'}
                justify={'center'}
                fontFamily={'heading'}
                fontSize={{ base: 'sm', md: 'lg' }}
                bg={'gray.800'}
                color={'white'}
                rounded={'full'}
                minWidth={useBreakpointValue({ base: '44px', md: '60px' })}
                minHeight={useBreakpointValue({ base: '44px', md: '60px' })}
                position={'relative'}
                _before={{
                  content: '""',
                  width: 'full',
                  height: 'full',
                  rounded: 'full',
                  transform: 'scale(1.125)',
                  bgGradient: 'linear(to-bl, orange.400,yellow.400)',
                  position: 'absolute',
                  zIndex: -1,
                  top: 0,
                  left: 0,
                }}>
                YOU
              </Flex>
            </Stack>
          </Stack>
          <Stack
            bg={'gray.50'}
            rounded={'xl'}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: 'lg' }}>
            <Stack spacing={4}>
              <Heading
                color={'gray.800'}
                lineHeight={1.1}
                fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
                Join our team
                <Text
                  as={'span'}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  bgClip="text">
                  !
                </Text>
              </Heading>
              <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                We are looking for amazing engineers just like you! Become a part
                of our anonymous freelancing platform and skyrocket your career!
              </Text>
            </Stack>
            <Box as={'form'} mt={10}>
              <Stack spacing={4}>
              </Stack>
              <Button
                fontFamily={'heading'}
                mt={8}
                w={300}
                bgGradient="linear(to-r, red.400,orange.400)"
                color={'white'}
                onClick={connectWeb3}
                _hover={{
                  bgGradient: 'linear(to-r, red.500,orange.500)',
                  boxShadow: 'xl',
                }}>


                <Spacer w={2}>
                </Spacer>
                Login/Signup with Metamask
              </Button>
            </Box>
            form
          </Stack>
        </Container>
        <Blur
          position={'absolute'}
          top={-5}
          left={-5}
          style={{ filter: 'blur(80px)' }}
        />
      </Box>
    </>
  );
}

export const Blur = (props) => {
  return (
    <Icon
      width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="200px"
      viewBox="0 -450 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};