import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Divider, Flex, Avatar, Text, Box, Heading, useDisclosure
  } from '@chakra-ui/react'
import { BiSearch, BiMessage} from "react-icons/bi"
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
const FollowModal = ({follow}) => {
    // console.log(follow);
    const closeRef = useRef(null)
    const navigate = useNavigate()
  return (
    <div>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader alignItems={'center'}>
                <div></div>
                <div className='w-11/12 pt-2'>
                    <BiSearch className='absolute text-2xl mt-1 mx-2'/>
                    <input type="text" className='w-full h-8 bg-gray-200 pl-12 pb-1 rounded-sm' placeholder='search'/>
                </div>
            <Divider pt={2}/>
          </ModalHeader>
          <ModalCloseButton ref={closeRef}/>
          <ModalBody>
            {follow.length == 0 ? <>no data </> : <>
            {follow.map((item, i)=>{
                return  <><Flex spacing='' pt={3}>
                <Flex flex='1' gap='2' w='100%' alignItems='center' flexWrap='wrap'>
                    <Avatar src={item.pic} size='md' cursor={'pointer'} onClick={()=> {
                        window.location.href = `../../profile/${item.username}/${item._id}`
                        console.log(closeRef.current.click());
                    }}/>
                    <Box>
                        <Heading size='sm'><Text fontFamily={'serif'}>{item.fullname}</Text></Heading>
                        <Text fontSize={'xs'} color={'gray.500'}>@{item.username}</Text>
                    </Box>
                </Flex>
                </Flex>
            <Divider pt={3}/>

                </>
                
            })}
            </>}
          </ModalBody>
        </ModalContent>
    </div>
  )
}

export default FollowModal