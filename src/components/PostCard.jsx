import React from 'react'
import { Avatar, Divider, Skeleton } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import Skeletons from './Skeletons'
import context from './store/context'
import {  
    Card, CardHeader, CardBody, CardFooter, Heading, Flex,
    Box, Text, Button,Menu, MenuButton, MenuList, MenuItem, IconButton, useDisclosure,Modal,ModalOverlay
} from '@chakra-ui/react'
import { BiLike, BiChat, BiShare } from 'react-icons/bi'
import { FaRegThumbsUp , FaThumbsUp, FaEllipsisVertical} from "react-icons/fa6";
import { FaRegBookmark , FaLink, FaTrash} from "react-icons/fa";
import { RiUserUnfollowFill } from "react-icons/ri";
import { Carousel } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import { Time } from './functions/Functions'
import CommentModal from './CommentModal'
const PostCard = ({item, Open}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const ctx = useContext(context)
    const navigate = useNavigate()

  return (
    <>
    <Card minH='10vh' position={'relative'} rounded={'md'} mb={3} style={{border:'1px solid #dfdedb'}}>
                    <Box   position={'absolute'} display={'flex'} right={'2'} top={'2'}>
                    {ctx.userData._id != item.userId._id && !ctx.userData.following.includes(item.userId._id) && 
                    <Button  onClick={()=> ctx.followUser(item.userId._id)} colorScheme='telegram' size={'sm'} mt={1} mx={2} variant={'outline'}> follow</Button>}
                    <Menu >
                        <MenuButton
                            as={IconButton}
                            aria-label='Options'
                            icon={<FaEllipsisVertical />}
                            variant='outline'
                          
                        />
                        <MenuList>
                            <MenuItem icon={<FaRegBookmark />}>
                            save
                            </MenuItem>
                            <MenuItem icon={<FaLink />}>
                            copy link
                            </MenuItem>
                            {ctx.userData._id != item.userId._id && ctx.userData.following.includes(item.userId._id) && 
                            <MenuItem onClick={()=> ctx.unfollowUser(item.userId._id)} icon={<RiUserUnfollowFill />}>
                            unfollow 
                            </MenuItem>}
                           {ctx.userData._id == item.userId._id && 
                            <MenuItem icon={<FaTrash />} onClick={()=> ctx.deletePost(item._id)}>
                            delete Post
                            </MenuItem>}
                        </MenuList>
                    </Menu>
                    </Box>
                   
                <CardHeader w='100%' >
                    <Flex spacing='4'>
                    <Flex flex='1' gap='4' w='100%' alignItems='center' flexWrap='wrap'>
                        <Avatar src={item.userId.pic} size='md' cursor={'pointer'} onClick={()=> navigate(`profile/${item.userId.username}/${item.userId._id}`)}/>
                        <Box>
                            <Heading size='sm'><Text>{item.userId.fullname}</Text></Heading>
                            <Text fontSize={'xs'} color={'gray.500'}>@{item.userId.username}</Text>
                            <Text fontSize={'xs'} color={'gray.500'}>{Time(new Date(item.createdAt))}</Text>
                        </Box>
                    </Flex>
                    </Flex>
                </CardHeader>

                    <CardBody px={0} pb={1} pt={1} onClick={()=> navigate(`post/${item.userId.username}/${item._id}`)}>
                        <Box px={3} pb={4}>
                            {item.text != null && <Text fontSize={'sm'}>{String.raw`${item.text}`}</Text>}
                        </Box>
                       {item.pic.length != 0 &&
                       <div className='h-screen'>
                        <Carousel slide={false} className='w-full flex-shrink-0 transform max-h-fit cursor-grab snap-center' leftControl='.' rightControl='.'>
                         {item.pic.map((i)=>{
                            return <img className='h-full ' src={i} />
                        })}
                       </Carousel>
                       </div>
                    
                       }
                  
                    </CardBody>
                    <Text px={4} py={1} color={"gray.400"} fontSize={'xs'}>
                        {item.likes.find((item)=>{return item._id == ctx.userData._id})?
                        <>{item.likes.length == 1 ?<>you liked</>: <>you and {item.likes.length - 1} others liked</>}</>:
                        <>{item.likes.length} likes</>
                    }
                    </Text>
                    <Divider w='94%' mx={4}/>
                    
                    <CardFooter pt={1} pb={2} 
                    justify='space-between'
                    w='100%'
                    sx={{
                    '& > button': { maxW: '136px', minW: "100px"},}}
                    >
                    
                    <Button display={'flex'} variant='ghost' cursor={'default'}>
                    {item.likes.find((item)=>{return item._id == ctx.userData._id}) ? 
                    <FaThumbsUp onClick={()=> ctx.unLikePost(item._id)} className=' cursor-pointer text-2xl text-blue-600'/> : 
                    <FaRegThumbsUp onClick={()=> ctx.likePost(item._id)}  className='cursor-pointer text-2xl text-gray-500'/>}
                    <Text color={'gray.500'} pl={2}>{item.likes.length}</Text>
                    </Button>
                    <Button display={'flex'} onClick={()=> {Open(); ctx.store_feed_posts(item)}} variant='ghost'>
                    <BiChat className='text-2xl text-gray-500'/>
                    <Text color={'gray.500'} pl={2}>{item.comments.length}</Text>
                    </Button>
                    <Button  display={'flex'} variant='ghost' >
                    <BiShare className='text-2xl text-gray-500'/>
                    <Text color={'gray.500'} pl={2}>{item.shares.length}</Text>
                    </Button>
                </CardFooter>
                
                </Card>
    </>
  )
}

export default PostCard