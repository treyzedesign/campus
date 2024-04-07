import React, {useContext, useEffect} from 'react'
import Navbar from '../../components/nav/Navbar'
import context from '../../components/store/context'
import Logo from '../../components/Logo'
import { AbsoluteCenter, Box, Divider, Text ,  Modal, ModalOverlay, useDisclosure, Tooltip} from '@chakra-ui/react'
import { FaPlus, FaRegSmile, FaRegImage , FaPaperclip } from "react-icons/fa";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import PostModal from '../../components/PostModal'
import Feed from '../../components/Feed'
import Suggest from '../../components/Suggest'
import { NavLink, useNavigate } from 'react-router-dom'
const Home = () => {
  const ctx = useContext(context)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )
  const [overlay, setOverlay] = React.useState(<OverlayOne />)
  useEffect(()=>{
    
    ctx.get_user()
    ctx.get_users()
    // console.log(ctx.userData, ctx.allUsers);
  },[ctx.userData, ctx.allUsers])
  // console.log(ctx.userData);
  return (
    <div>
        <Box w='100' >
          {ctx.userData && ctx.logoLoader ?
            <AbsoluteCenter>
            <Logo/>
          </AbsoluteCenter>: 
          <div className=' lg:container mx:auto'  >
             <div className='flex justify-center w-full pt-5 gap-6'>
              <div className='h-3/4 w-2/12 hidden md:block bg-white pb-1 pt-5 rounded-lg shadow-md'  style={{border:'1px solid #dfdedb', minWidth:"200px"}}>
                   <div className='flex justify-center w-full '>
                    <div className='rounded-full border-lime-800 border-2'>
  
                      <img src={ctx.userData.pic} className='w-20 h-20 rounded-full border-zinc-800 border-2' style={{imageResolution:' 300dpi'}}/>
                    </div>
                   </div>
                   <div className='text-center'>
                      <NavLink to={`profile/${ctx.userData.username}/${ctx.userData._id}`} className='font-extrabold mt-5 cursor-pointer' > {ctx.userData.fullname}</NavLink> 
                      <div className='text-gray-500 text-sm'>@{ctx.userData.username}</div>  
                      <div className='text-gray-500 text-sm pt-1'>{ctx.userData.bio}</div>  
                    </div>
                    <Divider my={3}/>
                    <div className='px-5'>
                        <div className='font-extrabold  mt-5 flex justify-between'>
                          <Text fontSize={'smaller'} color={'gray.600'}>followers</Text>
                          <Text fontSize={'smaller'} color={'gray.600'}>{ctx.userData.followers.length}</Text>
                        </div>
                        <div className='font-extrabold pt-2 flex justify-between'>
                          <Text fontSize={'smaller'} color={'gray.600'}>following</Text>
                          <Text fontSize={'smaller'} color={'gray.600'}>{ctx.userData.following.length}</Text>
                        </div>
                        <div className='font-extrabold pt-2 flex justify-between'>
                          <Text fontSize={'smaller'} color={'gray.600'}>posts</Text>
                          <Text fontSize={'smaller'} color={'gray.600'}>{ctx.userData.followers.length}</Text>
                        </div>
                        <div className='font-extrabold pt-2 flex justify-between'>
                          <Text fontSize={'smaller'} color={'gray.600'}>likes</Text>
                          <Text fontSize={'smaller'} color={'gray.600'}>{ctx.userData.followers.length}</Text>
                        </div>
                    </div>
                    <Divider my={3}/>
                    <div className='px-5'>
                      <div className='font-extrabold  mt-5 flex justify-between'>
                            <Text fontSize={'smaller'} color={'gray.600'}>Groups</Text>
                            <Text fontSize={''} color={'gray.600'}><FaPlus/></Text>
                      </div>
                      <div className='font-extrabold  mt-5 flex justify-between'>
                            <Text fontSize={'smaller'} color={'gray.600'}>Chats</Text>
                            <Text fontSize={''} color={'gray.600'}><FaPlus/></Text>
                      </div>
                    </div>
                    <Divider mt={1}/>
                    <div className=' text-center py-2 text-sm text-gray-400 font-semibold'>
                        Explore
                    </div>
              </div>
              <div className=' w-5/12' style={{minWidth: "400px"}}>
                <div className='bg-white h-32 pt-5 ' style={{border:'1px solid #dfdedb'}}>
                    <div className='flex justify-around'>
                      <div className='rounded-full border-lime-800 border-2'>
                        <img src={ctx.userData.pic} className='w-10 h-10 rounded-full border-zinc-800 border-2'/>
                      </div>
                      <div className='w-10/12 px-6 cursor-pointer pt-2 bg-gray-200 rounded-full text-gray-600'onClick={() => {
                        setOverlay(<OverlayOne />)
                        onOpen()
                      }}> express yourself {ctx.userData.username}
                      </div>
                    </div>
                    <div>
                        <Box pt={5} display={'flex'} justifyContent={'space-around'}>
                          <Tooltip label='add emoji'><Text fontSize={'24px'} color={'blue.600'} cursor={'pointer'} onClick={()=> setEmoji(true)}><FaRegSmile /></Text></Tooltip>
                          <Tooltip label='add media'><Text fontSize={'24px'} color={'green.600'} cursor={'pointer'} onClick={()=> {}}><FaRegImage /></Text></Tooltip>
                          <Tooltip label="add document"><Text fontSize={'24px'} color={'brown'} cursor={'pointer'} onClick={()=> {}}><FaPaperclip /></Text></Tooltip>
                        </Box>
                    </div>
                </div>
                <div className='mt-4 w-full'>
                    <Feed/>
                </div>
              </div>
              <div className='h-3/4 w-3/12 bg-white pt-5 lg:block hidden rounded-lg shadow-md' style={{border:'1px solid #dfdedb'}}>
                <Suggest/>
              </div>
             </div>
          </div>
        }
        </Box>
        <Modal size={'xl'}  isOpen={isOpen} onClose={onClose}>
          {overlay}
          <PostModal/>
        </Modal>
    </div>
  )
}

export default Home