import React from 'react'
import { Skeleton, SkeletonCircle, SkeletonText ,  
    Card, CardHeader, CardBody, CardFooter, Heading, Flex,
    Box, Text, Button
} from '@chakra-ui/react'
import { BiLike, BiChat, BiShare } from 'react-icons/bi'
const Skeletons = () => {
  return (
    <div>
        <Card minH='10vh' mb={3}>
        <CardHeader w='100%'>
            <Flex spacing='4'>
            <Flex flex='1' gap='4' w='100%' alignItems='center' flexWrap='wrap'>
                <SkeletonCircle  size='10' />
                <Box>
                <Heading size='sm'><SkeletonText skeletonHeight='3.5' noOfLines={2} width={200}/></Heading>
                </Box>
            </Flex>
            </Flex>
            <SkeletonText skeletonHeight='2' pt={6} noOfLines={3} width='100%'/>
        </CardHeader>
            <CardBody px={0} pb={1} pt={1}>
                <SkeletonText skeletonHeight='50vh' noOfLines={1} width='100%'/>
            </CardBody>
            {/* <SkeletonText skeletonHeight='4' px={2} noOfLines={1} width='100%'/> */}
            <CardFooter pt={1} pb={2} 
            justify='space-between'
            w='100%'
            sx={{
            '& > button': { maxW: '136px', minW: "100px"},}}
            >
            
            <Box display={'flex'} variant='ghost' >
            <BiLike className='text-2xl text-gray-500'/>
            <Text color={'gray.500'}>Like</Text>

            </Box>
            <Box display={'flex'} variant='ghost'>
            <BiChat className='text-2xl text-gray-500'/>
            <Text color={'gray.500'}>comment</Text>
            </Box>
            <Box  display={'flex'} variant='ghost' >
            <BiShare className='text-2xl text-gray-500'/>
            <Text color={'gray.500'}>share</Text>
            
            </Box>
        </CardFooter>
        </Card>
    </div>
  )
}

export default Skeletons