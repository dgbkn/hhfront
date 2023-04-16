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
  
  export default function Login1(){
  return (<></>);
  };