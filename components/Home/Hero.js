import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  Image,
  useBreakpointValue,
} from '@chakra-ui/react';


export default function Hero() {
  return (
    // <Flex
    //   w={'full'}
    //   h={'80vh'}
    //   backgroundImage={
    //     'url("./thehero.jpg")'
    //   }
    //   backgroundSize={'cover'}
    //   backgroundPosition={'center center'}>
    //   <VStack
    //     w={'full'}
    //     justify={'center'}
    //     px={useBreakpointValue({ base: 4, md: 8 })}
    //     bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
    //     <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
    //       <Text
    //         color={'white'}
    //         fontWeight={700}
    //         lineHeight={1.2}
    //         fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
    //         Welcome to the unified platform of anonymous freelancing platform.
    //       </Text>
    //       <Stack direction={'row'}>
    //         <Text
    //           color={'orange'}
    //           fontWeight={700}
    //           lineHeight={1.2}
    //           fontSize={useBreakpointValue({ base: 'xl', md: 'xl' })}>
    //           No Strings Attached.
    //         </Text>

    //       </Stack>
    //     </Stack>
    //   </VStack>
    // </Flex>

    <>
       <section id="hero-animated" className="hero-animated d-flex align-items-center">
        <div className="container d-flex flex-column justify-content-center align-items-center text-center position-relative" data-aos="zoom-out">
          <Image src="assets/img/hh2.jpg" className="img-fluid animated" alt="HeroImage" />
          <h2>Welcome To <span>HiddenHustlers</span></h2>
          <p>Because those who hustle win.</p>
          <div className="d-flex">
            <a href="#about" className="btn-get-started scrollto">Get Started</a>
            <a href="https://www.youtube.com/watch?v=LXb3EKWsInQ" className="glightbox btn-watch-video d-flex align-items-center"><i className="bi bi-play-circle" /><span>Watch Video</span></a>
          </div>
        </div>
      </section>
    </>
  );
}