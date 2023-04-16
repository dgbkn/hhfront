import {
    Box,
    chakra,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
} from '@chakra-ui/react';

import jwt_decode from "jwt-decode";
import React, { useState, useEffect } from 'react';

import { useLocalStorage } from '../../hooks/useLocalStorage.js';

function StatsCard(props) {
    const { title, stat } = props;


    return (
        <Stat
            px={{ base: 4, md: 8 }}
            py={'5'}
            shadow={'xl'}
            border={'1px solid'}
            borderColor={useColorModeValue('gray.800', 'gray.500')}
            rounded={'lg'}>
            <StatLabel fontWeight={'medium'} isTruncated>
                {title}
            </StatLabel>
            <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                {stat}
            </StatNumber>
        </Stat>
    );
}

export default function Stats() {
    const [authToken, setauthToken] = useLocalStorage("token", "");
    const [user, setUser] = useState({});



    useEffect(() => {
        if (authToken != null) {
            console.log(authToken);
            const current_user = jwt_decode(authToken);
            setUser(current_user.payload);
            console.log(current_user.payload);
        }
    }, [authToken]);


    return (
        <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
            <chakra.h1
                textAlign={'center'}
                fontSize={'4xl'}
                py={10}
                fontWeight={'bold'}>
                Welcome <span style={{ color: 'purple' }}>{user ? user.username : ""}.</span> 
            </chakra.h1>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
                <StatsCard title={'We serve'} stat={'3,548 people'} />
                {/* <StatsCard title={'In'} stat={'30 different countries'} /> */}
                <StatsCard title={'Current Jobs'} stat={'12,658'} />
            </SimpleGrid>
        </Box>
    );
}