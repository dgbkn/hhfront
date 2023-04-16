import {
    Box,
    Button,
    IconButton,
    Flex,
    Spacer,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FaSignOutAlt } from 'react-icons/fa';

import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';

import { useLocalStorage } from '../hooks/useLocalStorage.js';
import React, { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";

export default function Navbar() {
    var router = useRouter();
    const [authToken, setauthToken] = useLocalStorage("token", null);
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

        <Box className='header' paddingX={2} paddingY={5} >
            <Flex as="header" width="100%" align="center" px={10} wrap={'wrap'} paddingBottom={2}>
                <Logo />

                <Box marginLeft={'auto'} >
                    {authToken == null && <><Button colorScheme='red' variant='outline' onClick={() => router.push('/auth/login')}>
                        Get Started.
                    </Button></>}

                    {authToken != null && <><Button colorScheme='red' variant='outline' onClick={() => router.push('/dashboard')}>
                        Dashboard.
                    </Button>

                        {user && user.isProvider && <>
                            <Button colorScheme='red' variant='outline' onClick={() => router.push('/addjobs')}>
                                Add jobs.
                            </Button>
                        </>}


                        {user && !user.isProvider && <>
                            <Button colorScheme='red' variant='outline' onClick={() => window.location.replace('/skilltest.html')}>
                                Skill Test.
                            </Button>
                        </>}

                        <IconButton
                            size="md"
                            fontSize="lg"
                            aria-label={`Logout`}
                            variant="ghost"
                            color="current"
                            marginLeft="2"
                            onClick={() => { setauthToken(null); window.location.replace('/') }}
                            icon={<FaSignOutAlt />}
                        />
                    </>}



                    <ColorModeSwitcher />
                </Box>

            </Flex>
        </Box>

    )
        ;
}
