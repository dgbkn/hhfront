import React, { useState, useEffect } from 'react';
import Stats from '../components/Dashboard/Stats.js';
import SearchComponent from '../components/SearchComponent.js';
import { Spacer, Box, Flex, chakra, useColorModeValue, useToast, IconButton,Button } from '@chakra-ui/react';

import { useLocalStorage } from '../hooks/useLocalStorage.js';
import jwt_decode from "jwt-decode";
import { useRouter } from 'next/router'
import { AiFillDelete } from 'react-icons/fa';

const backgrounds = [
  `url("data:image/svg+xml, %3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'560\' height=\'185\' viewBox=\'0 0 560 185\' fill=\'none\'%3E%3Cellipse cx=\'102.633\' cy=\'61.0737\' rx=\'102.633\' ry=\'61.0737\' fill=\'%23ED64A6\' /%3E%3Cellipse cx=\'399.573\' cy=\'123.926\' rx=\'102.633\' ry=\'61.0737\' fill=\'%23F56565\' /%3E%3Cellipse cx=\'366.192\' cy=\'73.2292\' rx=\'193.808\' ry=\'73.2292\' fill=\'%2338B2AC\' /%3E%3Cellipse cx=\'222.705\' cy=\'110.585\' rx=\'193.808\' ry=\'73.2292\' fill=\'%23ED8936\' /%3E%3C/svg%3E")`,
  `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%23ED8936'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%2348BB78'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%230BC5EA'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%23ED64A6'/%3E%3C/svg%3E")`,
  `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='102.633' cy='61.0737' rx='102.633' ry='61.0737' fill='%23ED8936'/%3E%3Cellipse cx='399.573' cy='123.926' rx='102.633' ry='61.0737' fill='%2348BB78'/%3E%3Cellipse cx='366.192' cy='73.2292' rx='193.808' ry='73.2292' fill='%230BC5EA'/%3E%3Cellipse cx='222.705' cy='110.585' rx='193.808' ry='73.2292' fill='%23ED64A6'/%3E%3C/svg%3E")`,
  `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%23ECC94B'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%239F7AEA'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%234299E1'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%2348BB78'/%3E%3C/svg%3E")`,
];

function TestimonialCard(props) {
  const { name, role, content, index } = props;
  return (
    <Flex
      boxShadow={'lg'}
      maxW={'640px'}
      direction={{ base: 'column-reverse', md: 'row' }}
      width={'full'}
      rounded={'xl'}
      marginTop={10}
      p={10}
      justifyContent={'space-between'}
      position={'relative'}
      bg={useColorModeValue('white', 'gray.800')}

      _before={{
        content: '""',
        position: 'absolute',
        zIndex: '-1',
        height: 'full',
        maxW: '640px',
        width: 'full',
        filter: 'blur(40px)',
        transform: 'scale(0.98)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        top: 0,
        left: 0,
        backgroundImage: backgrounds[index % 4],
      }}>
      <Flex
        direction={'column'}
        textAlign={'left'}
        justifyContent={'space-between'}>

        <chakra.p fontFamily={'Work Sans'} fontWeight={'bold'} fontSize={20}>
          {name}
          <chakra.span
            fontFamily={'Inter'}
            fontWeight={'medium'}
            color={'gray.500'}>
            {' '}
            - {role}
          </chakra.span>
        </chakra.p>
        <chakra.p
          fontFamily={'Inter'}
          fontWeight={'medium'}
          fontSize={'15px'}
          pb={4}>
          {content}
        </chakra.p>

<Button>
  Accept
</Button>

        {/* {user.isProvider && <IconButton
          size="md"
          fontSize="lg"
          aria-label={`Delete `}
          variant="ghost"
          color="current"
          marginLeft="2"
          onClick={() => {

          }}
          icon={<AiFillDelete />}

        />} */}
      </Flex>


    </Flex>
  );
}

export default function Dashboard() {
  var router = useRouter();
  const [authToken, setauthToken] = useLocalStorage("token", null);
  const [user, setUser] = useState({});
  const [jobs, setJobs] = useState(null);
  const toast = useToast()

  useEffect(() => {
    if (authToken != null && user != null) {
      console.log(authToken);
      const current_user = jwt_decode(authToken);
      setUser(current_user.payload);
      console.log(current_user.payload);
      var fetch_url = "https://hh.devgoyal3.repl.co/api/jobs/getAll";
      if (current_user.payload.isProvider) {
        fetch_url = "https://hh.devgoyal3.repl.co/api/jobs/get";
      }

      fetch(fetch_url + "?userid=" + current_user.payload.id, {
        // body:`{'userid':${user.id}}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken
        },
        method: 'GET'
      }).then(async (response) => {
        var dt = await response.json();
        console.log(dt);
        if ('error' in dt) {
          toast({
            title: 'Error in getting Jobs.',
            description: dt.error,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });

        } else {
          setJobs(dt);
        }
      });
    }
  }, [authToken]);


  return (
    <>
      <Stats />
      <Spacer h={10}></Spacer>
      <div style={{ marginLeft: "20px", marginRight: "20px" }}>
        <Flex
          textAlign={'center'}
          pt={10}
          justifyContent={'center'}
          direction={'column'}
          width={'full'}
          overflow={'hidden'}>
          <Box width={{ base: 'full', sm: 'lg', lg: 'xl' }} margin={'auto'}>


            {user && !user.isProvider && <SearchComponent />}

            <chakra.h3
              fontWeight={'bold'}
              fontSize={20}
              style={{ marginTop: 40 }}
              textTransform={'uppercase'}
              color={'purple.400'}>



              {user && !user.isProvider && "New Jobs"}
              {user && user.isProvider && "Your Jobs"}

            </chakra.h3>

            {jobs &&
              jobs.slice(0).reverse().map(item => <TestimonialCard key={item.id} name={item.name} role={item.skills} content={item.description}></TestimonialCard>
              )
            }


          </Box>
        </Flex>
      </div>
    </>
  )
}
