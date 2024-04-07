import { Avatar, Tabs, TabList, TabPanels, TabIndicator, Tab, TabPanel, AbsoluteCenter, IconButton} from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import context from '../../components/store/context'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { FadeLoader } from 'react-spinners'
import {  
    Card, CardHeader, CardBody, CardFooter, Heading, Flex,
    Box, Text, Button, Image, Divider,Modal, useDisclosure,Menu, MenuButton, MenuItem, MenuList,Tooltip
} from '@chakra-ui/react'
import { BiLike, BiChat, BiShare } from 'react-icons/bi'
import { FaRegThumbsUp , FaThumbsUp, FaEllipsisVertical} from "react-icons/fa6";
import { FaRegBookmark , FaLink, FaTrash} from "react-icons/fa";
import { LuMessageCircle } from "react-icons/lu";
import { Carousel } from 'flowbite-react'
import FollowModal from './FollowModal'

const UserProfile = () => {
  const {id} = useParams()
  const ctx = useContext(context)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [follow, setFollow] = useState()
  useEffect(() => {
    ctx.fetchUser(id)
    ctx.get_user_posts(id)     
  }, [ctx.userPosts, ctx.userData])
//   console.log(ctx.User);
  const media = ctx.userPosts.filter((item)=>{
    return item.pic.length > 0
  })
//   console.log(media);
const myfollowers = Array(ctx.User.followers)[0]
let followers ;
if(myfollowers == undefined){
   followers = '0'
}else{
    followers = Array(ctx.User.followers)[0].length
}
const myfollowing = Array(ctx.User.following)[0]
let following ;
if(myfollowing == undefined){
   following = '0'
}else{
    following = Array(ctx.User.following)[0].length
}
  return (
    <div className='container-lg w-5/12 mx-auto'>
        <Modal isOpen={isOpen} onClose={onClose}>
            <FollowModal follow={follow} />
        </Modal>
        <div className='pt-12'>
            <div className='bg-white relative h-full rounded-lg shadow-md'>
                {ctx.spin && ctx.User == 0 ? <AbsoluteCenter><FadeLoader/></AbsoluteCenter>:
                <div className='text-center pt-12 '>
                  <div className='w-12/12 absolute top-0 right-0'> 
                    <Button variant={'unstyled'}  rounded={'full'}>
                      <FaEllipsisVertical className='text-2xl' />
                    </Button>
                  </div>
                  <div>
                    <Avatar src={ctx.User.pic} size={'2xl'} className='shadow-xl' onClick={()=>{
                        window.open(ctx.User.pic, '_self')
                    }} />
                  </div>
                  <div>
                    <div className='font-extrabold pt-3'>{ctx.User.fullname}</div>
                    <div className='font-light text-sm text-gray-500'>@{ctx.User.username}</div>
                    <div className='font-bold text-gray-500'>{ctx.User.bio}</div>
                    <div className='mt-2 mb-2'>
                        <Button variant={'solid'} leftIcon={<LuMessageCircle className='xl' />} colorScheme='teal' rounded={'full'} size={'sm'}>
                          message
                        </Button>
                    </div>
                    <div className='container w-10/12 mx-auto pt-5'>
                        <div className='flex w-full justify-around'>
                            <div className='text-center'>
                                <div className='font-extrabold'>Posts</div>
                                <div className='font-semibold'>{ctx.userPosts.length}</div>
                            </div>
                            <div className='text-center'>
                                <div className='font-extrabold hover:underline cursor-pointer'  onClick={()=> {
                                    setFollow(ctx.User.followers)
                                    onOpen()
                                }}>followers</div>
                                <div className='font-semibold'>{followers}</div>
                            </div>
                            <div className='text-center'>
                                <div className='font-extrabold hover:underline cursor-pointer' onClick={()=> {
                                    setFollow(ctx.User.following)
                                    onOpen()
                                    }}>following</div>
                                <div className='font-semibold'>{following}</div>
                            </div>
                        </div>
                    </div>
                    <div className='container-md w-12/12 pt-5'>
                         <Tabs align='center' variant='soft-rounded' colorScheme='green'>
                         <TabList >
                            <Tab fontSize={'sm'}>posts</Tab>
                            <Tab fontSize={'sm'}>media</Tab>
                            <Tab fontSize={'sm'}>replies</Tab>
                         </TabList>
                         <TabPanels textAlign={'left'}>
                            <TabPanel textAlign={'left'} px={0}>
                            {ctx.userPosts.length == 0 ? <div className='text-center pt-16 pb-8 h-4/6'><AbsoluteCenter><FadeLoader color='#6b7270'/> </AbsoluteCenter></div>: <div>
                                {ctx.userPosts.map((item, i)=>{
                                
                                    return  <Card  key={i} minH='10vh' mb={0} rounded={'none'} position={'relative'} style={{border:'1px solid #dfdedb'}}>
                                    <Menu >
                                        <MenuButton
                                            as={IconButton}
                                            aria-label='Options'
                                            icon={<FaEllipsisVertical />}
                                            variant='outline'
                                            position={'absolute'}
                                            right={'2'}
                                            top={'2'}
                                        />
                                        <MenuList>
                                            <MenuItem icon={<FaRegBookmark />}>
                                            save
                                            </MenuItem>
                                            <MenuItem icon={<FaLink />}>
                                            copy link
                                            </MenuItem>
                                            {/* <MenuItem icon={<RiUserUnfollowFill />}>
                                            unfollow 
                                            </MenuItem> */}
                                            {ctx.userData._id == item.userId._id && 
                                            <MenuItem icon={<FaTrash />} onClick={()=> ctx.deletePost(item._id)}>
                                            delete Post
                                            </MenuItem>}
                                        </MenuList>
                                    </Menu>
                                    <CardHeader w='100%' >
                                        <Flex spacing='4'>
                                        <Flex flex='1' gap='4' w='100%' alignItems='center' flexWrap='wrap'>
                                            <Avatar src={item.userId.pic} size='md' cursor={'pointer'} onClick={()=> navigate(`profile/${item.userId.username}/${item.userId._id}`)}/>
                                            <Box>
                                                <Heading size='sm'><Text fontFamily={'serif'}>{item.userId.fullname}</Text></Heading>
                                                <Text fontSize={'xs'} color={'gray.500'}>@{item.userId.username}</Text>
                                                <Text fontSize={'xs'} color={'gray.500'}>{new Date(item.createdAt).toLocaleString()}</Text>
                                            </Box>
                                        </Flex>
                                        </Flex>
                                    </CardHeader>

                                        <CardBody px={0} pb={1} pt={1}>
                                            <Box px={3} pb={4}>
                                                {item.text != null && <Text fontSize={'sm'}>{item.text}</Text>}
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
                                        <Button display={'flex'} variant='ghost'>
                                        <BiChat className='text-2xl text-gray-500'/>
                                        <Text color={'gray.500'} pl={2}>{item.comments.length}</Text>
                                        </Button>
                                        <Button  display={'flex'} variant='ghost' >
                                        <BiShare className='text-2xl text-gray-500'/>
                                        <Text color={'gray.500'} pl={2}>{item.shares.length}</Text>
                                        </Button>
                                    </CardFooter>
                                    </Card>
                                })}
                            </div>}
                            </TabPanel>
                            <TabPanel textAlign={'left'} px={0}>
                            {media.length == 0 ? <div className='text-center pt-16 pb-8 h-4/6'><AbsoluteCenter><FadeLoader color='#6b7270'/> </AbsoluteCenter></div>: <div>
                                {media.map((item, i)=>{
                                
                                    return  <Card  key={i} minH='10vh' mb={0} rounded={'none'} position={'relative'} style={{border:'1px solid #dfdedb'}}>
                                         <Menu >
                                        <MenuButton
                                            as={IconButton}
                                            aria-label='Options'
                                            icon={<FaEllipsisVertical />}
                                            variant='outline'
                                            position={'absolute'}
                                            right={'2'}
                                            top={'2'}
                                        />
                                        <MenuList>
                                            <MenuItem icon={<FaRegBookmark />}>
                                            save
                                            </MenuItem>
                                            <MenuItem icon={<FaLink />}>
                                            copy link
                                            </MenuItem>
                                            {/* <MenuItem icon={<RiUserUnfollowFill />}>
                                            unfollow 
                                            </MenuItem> */}
                                            <MenuItem icon={<FaTrash />}>
                                                delete Post
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                    <CardHeader w='100%' >
                                        <Flex spacing='4'>
                                        <Flex flex='1' gap='4' w='100%' alignItems='center' flexWrap='wrap'>
                                            <Avatar src={item.userId.pic} size='md' cursor={'pointer'} onClick={()=> navigate(`profile/${item.userId.username}/${item.userId._id}`)}/>
                                            <Box>
                                                <Heading size='sm'><Text fontFamily={'serif'}>{item.userId.fullname}</Text></Heading>
                                                <Text fontSize={'xs'} color={'gray.500'}>@{item.userId.username}</Text>
                                                <Text fontSize={'xs'} color={'gray.500'}>{new Date(item.createdAt).toLocaleString()}</Text>
                                            </Box>
                                        </Flex>
                                        </Flex>
                                    </CardHeader>

                                        <CardBody px={0} pb={1} pt={1}>
                                            <Box px={3} pb={4}>
                                                {item.text != null && <Text fontSize={'sm'}>{item.text}</Text>}
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
                                        <Button display={'flex'} variant='ghost'>
                                        <BiChat className='text-2xl text-gray-500'/>
                                        <Text color={'gray.500'} pl={2}>{item.comments.length}</Text>
                                        </Button>
                                        <Button  display={'flex'} variant='ghost' >
                                        <BiShare className='text-2xl text-gray-500'/>
                                        <Text color={'gray.500'} pl={2}>{item.shares.length}</Text>
                                        </Button>
                                    </CardFooter>
                                    </Card>
                                })}
                            </div>}
                            </TabPanel>
                         </TabPanels>
                           
                         </Tabs>
                    </div>
                  </div>
                </div>}
            </div>
        </div>
    </div>
  )
}

export default UserProfile