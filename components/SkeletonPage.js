import React from 'react'
import { Skeleton, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react'

import { Spinner } from '@chakra-ui/react'


export default function SkeletonPage() {
    return (
        <div style={{padding:'10px'}}>
            
            <Stack alignItems={'center'}>
            <Spinner size={'xl'}  color={'blue'}/>
        </Stack>
        
        </div>
    )
}
