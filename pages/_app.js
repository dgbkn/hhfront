
import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Head from "next/head";
import Script from "next/script";

// import './main.css';


function MyApp({ Component, pageProps }) {
  return <ChakraProvider theme={theme}>

    <Navbar />
    <Component {...pageProps} />
    <Footer/>
  </ChakraProvider>

}

export default MyApp
