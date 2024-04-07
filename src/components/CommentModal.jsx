import React, { useContext, useState } from 'react'
import {
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,Avatar,Link,Input, Flex,Tooltip,Text,Box, Button
  } from '@chakra-ui/react'
import { useRef } from 'react'
import { FaPlus, FaRegSmile, FaRegImage , FaPaperclip } from "react-icons/fa";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import context from './store/context';
import { PulseLoader, ScaleLoader } from 'react-spinners'

const CommentModal = ({post}) => {
  const ctx = useContext(context)
  const inputRef = useRef(null)
  
  return (
    <div>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>Modal Title</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody>
            <div className='pt-8 flex'>
                <Avatar src={post.userId.pic}  size='md' cursor={'pointer'}/>
                <div className='pl-2 w-full'>
                <span className='font-bold '>{post.userId.fullname}</span>
                <span className='text-muted text-sm pl-2'>@{post.userId.username}</span>
                <div className='w-full'>
                {post.text}
                </div>
                <div className='w-full'>
                {post.pic && post.pic.map((item, i)=>{
                  return <Link key={i} href={`${item}`} color={'blue.500'}>media {i + 1} </Link>
                })}
                </div>
                <div className='text-sm  mt-1 mb-2'>replying to <Link href={``} className='' color={'blue.500'}>@{post.userId.username} </Link></div>
                <div className='w-full'>
                  <Input ref={inputRef} value={ctx.value} onChange={ctx.handleInputChange} variant='filled'  placeholder='post your reply' w={'full'}/>
                </div>
                </div>
              
            </div>
            <Box display={'flex'} pt={'8'} justifyContent={'space-between'}>
              <Box display={'flex'} className='w-3/12' pt={2} justifyContent={'space-around'}>
              <Tooltip label='add emoji'><Text fontSize={'16px'} color={'blue.600'} cursor={'pointer'} onClick={()=> ctx.open_Emoji()}><FaRegSmile /></Text></Tooltip>
              <Tooltip label='add media'><Text fontSize={'16px'} color={'green.600'} cursor={'pointer'} ><FaRegImage /></Text></Tooltip>
              <Tooltip label="add document"><Text fontSize={'16px'} color={'brown'} cursor={'pointer'} onClick={()=> {}}><FaPaperclip /></Text></Tooltip>
              </Box>
              <Box>
                <Button size={'sm'} colorScheme='teal' isDisabled={ctx.button} onClick={()=>ctx.postComment(inputRef,post._id)} >
                  {ctx.spin ? <PulseLoader color="#fcfcfc" size={8} width={4}/> : <>Post</>}
                </Button>
              </Box>
               
            </Box>
          </ModalBody>
          {ctx.Emoji && <div className='' >
             <div onMouseLeave={()=> {ctx.close_Emoji()}} className='absolute'>
             <Picker  data={data}  onEmojiSelect={ctx.addEmoji} > </Picker>
             </div>
            
          </div>}
        </ModalContent>

    </div>
  )
}

export default CommentModal