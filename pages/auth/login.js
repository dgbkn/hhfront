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
  // const [authToken, setauthToken] = useLocalStorage("token", "");
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

  };


  useEffect(() => {
    checkConnection();
  }, []);


  return (
    <div>
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

                <Box>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 212 189" id="metamask"><g fill="none" fillRule="evenodd"><polygon fill="#CDBDB2" points="60.75 173.25 88.313 180.563 88.313 171 90.563 168.75 106.313 168.75 106.313 180 106.313 187.875 89.438 187.875 68.625 178.875"></polygon><polygon fill="#CDBDB2" points="105.75 173.25 132.75 180.563 132.75 171 135 168.75 150.75 168.75 150.75 180 150.75 187.875 133.875 187.875 113.063 178.875" transform="matrix(-1 0 0 1 256.5 0)"></polygon><polygon fill="#393939" points="90.563 152.438 88.313 171 91.125 168.75 120.375 168.75 123.75 171 121.5 152.438 117 149.625 94.5 150.188"></polygon><polygon fill="#F89C35" points="75.375 27 88.875 58.5 95.063 150.188 117 150.188 123.75 58.5 136.125 27"></polygon><polygon fill="#F89D35" points="16.313 96.188 .563 141.75 39.938 139.5 65.25 139.5 65.25 119.813 64.125 79.313 58.5 83.813"></polygon><polygon fill="#D87C30" points="46.125 101.25 92.25 102.375 87.188 126 65.25 120.375"></polygon><polygon fill="#EA8D3A" points="46.125 101.813 65.25 119.813 65.25 137.813"></polygon><polygon fill="#F89D35" points="65.25 120.375 87.75 126 95.063 150.188 90 153 65.25 138.375"></polygon><polygon fill="#EB8F35" points="65.25 138.375 60.75 173.25 90.563 152.438"></polygon><polygon fill="#EA8E3A" points="92.25 102.375 95.063 150.188 86.625 125.719"></polygon><polygon fill="#D87C30" points="39.375 138.938 65.25 138.375 60.75 173.25"></polygon><polygon fill="#EB8F35" points="12.938 188.438 60.75 173.25 39.375 138.938 .563 141.75"></polygon><polygon fill="#E8821E" points="88.875 58.5 64.688 78.75 46.125 101.25 92.25 102.938"></polygon><polygon fill="#DFCEC3" points="60.75 173.25 90.563 152.438 88.313 170.438 88.313 180.563 68.063 176.625"></polygon><polygon fill="#DFCEC3" points="121.5 173.25 150.75 152.438 148.5 170.438 148.5 180.563 128.25 176.625" transform="matrix(-1 0 0 1 272.25 0)"></polygon><polygon fill="#393939" points="70.313 112.5 64.125 125.438 86.063 119.813" transform="matrix(-1 0 0 1 150.188 0)"></polygon><polygon fill="#E88F35" points="12.375 .563 88.875 58.5 75.938 27"></polygon><path fill="#8E5A30" d="M12.3750002,0.562500008 L2.25000003,31.5000005 L7.87500012,65.250001 L3.93750006,67.500001 L9.56250014,72.5625 L5.06250008,76.5000011 L11.25,82.1250012 L7.31250011,85.5000013 L16.3125002,96.7500014 L58.5000009,83.8125012 C79.1250012,67.3125004 89.2500013,58.8750003 88.8750013,58.5000009 C88.5000013,58.1250009 63.0000009,38.8125006 12.3750002,0.562500008 Z"></path><g transform="matrix(-1 0 0 1 211.5 0)"><polygon fill="#F89D35" points="16.313 96.188 .563 141.75 39.938 139.5 65.25 139.5 65.25 119.813 64.125 79.313 58.5 83.813"></polygon><polygon fill="#D87C30" points="46.125 101.25 92.25 102.375 87.188 126 65.25 120.375"></polygon><polygon fill="#EA8D3A" points="46.125 101.813 65.25 119.813 65.25 137.813"></polygon><polygon fill="#F89D35" points="65.25 120.375 87.75 126 95.063 150.188 90 153 65.25 138.375"></polygon><polygon fill="#EB8F35" points="65.25 138.375 60.75 173.25 90 153"></polygon><polygon fill="#EA8E3A" points="92.25 102.375 95.063 150.188 86.625 125.719"></polygon><polygon fill="#D87C30" points="39.375 138.938 65.25 138.375 60.75 173.25"></polygon><polygon fill="#EB8F35" points="12.938 188.438 60.75 173.25 39.375 138.938 .563 141.75"></polygon><polygon fill="#E8821E" points="88.875 58.5 64.688 78.75 46.125 101.25 92.25 102.938"></polygon><polygon fill="#393939" points="70.313 112.5 64.125 125.438 86.063 119.813" transform="matrix(-1 0 0 1 150.188 0)"></polygon><polygon fill="#E88F35" points="12.375 .563 88.875 58.5 75.938 27"></polygon><path fill="#8E5A30" d="M12.3750002,0.562500008 L2.25000003,31.5000005 L7.87500012,65.250001 L3.93750006,67.500001 L9.56250014,72.5625 L5.06250008,76.5000011 L11.25,82.1250012 L7.31250011,85.5000013 L16.3125002,96.7500014 L58.5000009,83.8125012 C79.1250012,67.3125004 89.2500013,58.8750003 88.8750013,58.5000009 C88.5000013,58.1250009 63.0000009,38.8125006 12.3750002,0.562500008 Z"></path></g></g></svg>
                </Box>

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
    </div>
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