import SearchComponent from "../components/SearchComponent";
import Navbar from "../components/Navbar";
import Head from "next/head";
import { Spacer, Container, Stack } from "@chakra-ui/react";
import Hero_Lol from "../components/Home/Hero_Lol";
import Features from "../components/Home/Features";

export default function Home() {
  return (
    <div>
      <Head>
        <title>
          Hidden Hustlers
        </title>
      </Head>

      {/* <SearchComponent /> */}

 <Hero_Lol />
 <Spacer h={5}>

 </Spacer>
  <Features />

<br/><br/><br/>


    </div>

  )
}
