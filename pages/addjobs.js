import React from 'react';
import Head from 'next/head';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Textarea,
    Button,
    Heading,
    useToast,
    Text,
    useColorModeValue,
    Link,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";

import { useRouter } from 'next/router'



export default function AddJobs() {
    const [authToken, setauthToken] = useLocalStorage("token", null);
    const [user, setUser] = useState({});
    const router = useRouter();

    const toast = useToast();


    useEffect(() => {
        if (authToken != null) {
            console.log(authToken);
            const current_user = jwt_decode(authToken);
            setUser(current_user.payload);
            console.log(current_user.payload);
        }
    }, [authToken]);


    var [name, setName] = useState("");
    var [description, setDes] = useState("");
    var [credits, setCredits] = useState(0);
    var [skills, setSkills] = useState("");

    const handleClick = () => {
        var postData = { name, description, credits, skills, userid: user.id };
        fetch(`https://hh.devgoyal3.repl.co/api/jobs/add`, {
            body: JSON.stringify(postData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization':authToken
            },
            method: 'POST'
        }).then( async (response) => {
            var dt = await response.json();
            console.log(dt);
            if('error' in dt){
                toast({
                    title: 'Error in adding Job.',
                    description: dt.error,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                  });

            }else if('success' in dt){
                toast({
                    title: 'Added Job.',
                    description: "We've added your job for freelancers.",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                  });
                  router.push('/dashboard');
            }
        });

    }


    return (
        <>
            <Head>
                <title>Add Jobs</title>
            </Head>

            <Flex
                minH={'80vh'}
                align={'center'}
                minW={'100vw'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack maxW={'lg'} py={12}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Add A Job
                        </Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            ✌️
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <HStack>
                                <Box>
                                    <FormControl id="firstName" isRequired >
                                        <FormLabel>Name</FormLabel>
                                        <Input type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                                    </FormControl>
                                </Box>

                                <Box>
                                    <FormControl id="firstName" isRequired >
                                        <FormLabel>Credits</FormLabel>
                                        <Input type="number" value={credits} onChange={(e) => { setCredits(e.target.value) }} />
                                    </FormControl>
                                </Box>
                                eth.

                            </HStack>
                            <FormControl id="name">
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    value={description}
                                    onChange={(e) => setDes(e.target.value)}
                                    borderColor="gray.300"
                                    _hover={{
                                        borderRadius: 'gray.300',
                                    }}
                                    placeholder="add some info..."
                                />
                            </FormControl>
                            <FormControl id="skills" isRequired>
                                <FormLabel>Skills</FormLabel>
                                <InputGroup>
                                    <Input type={'text'}
                                        value={skills}
                                        onChange={(e) => setSkills(e.target.value)}
                                    />
                                    <InputRightElement h={'full'}>

                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={'blue.400'}
                                    color={'white'}
                                    onClick={() => handleClick()}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Add
                                </Button>
                            </Stack>

                        </Stack>
                    </Box>
                </Stack>
            </Flex>

        </>
    )
}

