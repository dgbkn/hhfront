import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Icon,
    Stack,
    Image,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { ReactElement } from 'react';
  import {
    FcAbout,
    FcAssistant,
    FcCollaboration,
    FcDonate,
    FcManager,
  } from 'react-icons/fc';
  
  





  const Card = ({ heading, description, icon, href,image }) => {
    return (
      <Box
          role={'group'}
          p={6}
          m={6}
          maxW={'330px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}>
          <Box
            rounded={'lg'}
            mt={-12}
            pos={'relative'}
            height={'230px'}
            _after={{
              transition: 'all .3s ease',
              content: '""',
              w: 'full',
              h: 'full',
              pos: 'absolute',
              top: 5,
              left: 0,
              backgroundImage: `url(${image})`,
              filter: 'blur(15px)',
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: 'blur(20px)',
              },
            }}>
            <Image
              rounded={'lg'}
              height={230}
              width={282}
              objectFit={'cover'}
              src={image}
            />
          </Box>
        <Stack align={'start'} spacing={2}>
          <Flex
            w={16}
            h={16}
            align={'center'}
            justify={'center'}
            color={'white'}
            rounded={'full'}
            bg={useColorModeValue('gray.100', 'gray.700')}>
            {icon}
          </Flex>
          <Box mt={2}>
            <Heading size="md">{heading}</Heading>
            <Text mt={1} fontSize={'sm'}>
              {description}
            </Text>
          </Box>
          
        </Stack>
      </Box>
    );
  };
  
  export default function Features() {
    return (
      <Box p={4}>
        <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
          <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
            Features
          </Heading>
          <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
            the concept.
          </Text>
        </Stack>
  
        <Container maxW={'8xl'} mt={12}>
          <Flex flexWrap="wrap" gridGap={6} justify="center">
            <Card
              heading={'Anonymity'}
              icon={<Icon as={FcAssistant} w={10} h={10} />}
              description={
                'Experience the freedom of complete anonymity with our  product, allowing you to work without fear of judgement or exposure.'
              }
              image={"https://i.ibb.co/4Y369Y7/hh4.jpg"}
              href={'#'}
            />
            <Card
              heading={'Job Ready'}
              icon={<Icon as={FcCollaboration} w={10} h={10} />}
              description={
                'With our product, freelancers can become job ready and start earning right away, without the need for extensive training or experience..'
              }
              image={"https://i.ibb.co/L1Z0tmk/hh7.jpg"}
              href={'#'}
            />

            <Card
              heading={'Membership Benefits'}
              icon={<Icon as={FcCollaboration} w={10} h={10} />}
              description={
                "Enjoy exclusive membership benefits including Canva Pro, GitHub Premium"
              }
              image={"https://i.ibb.co/qdw5hxz/hh6.jpg"}
              href={'#'}
            />

            <Card
              heading={'Proffesional Accreditation'}
              icon={<Icon as={FcDonate} w={10} h={10} />}
              description={
                'Earn Badges, Certifications, and Letters of Recommendation to Enhance Your Profile for future interns'
              }
              image={"https://i.ibb.co/vZJ7wDR/hh9.jpg"}

              href={'#'}
            />
            <Card
              heading={'Secure Transactions'}
              icon={<Icon as={FcManager} w={10} h={10} />}
              description={
                'Our point-based transaction system ensures transparency and reliability for both freelancers and clients, making payments simple and hassle-free.'
              }
              image={"https://i.ibb.co/F3BbBRp/hh10.jpg"}

              href={'#'}
            />
            <Card
              heading={'Trend-Driven Skill Suggestion'}
              icon={<Icon as={FcAbout} w={10} h={10} />}
              description={
                'Stay ahead of the competition with trend-driven skill suggestions provided by our product, keeping  up-to-date with the latest demands in the market.'
              }
              image={"https://i.ibb.co/HhpFqk5/hh8.jpg"}

              href={'#'}
            />
          </Flex>
        </Container>
      </Box>
    );
  }