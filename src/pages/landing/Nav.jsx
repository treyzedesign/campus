import React from 'react'
import main_logo from "../../assets/img/main_logo.png"
import { Box,Button } from '@chakra-ui/react'
import { FaPeopleGroup} from "react-icons/fa6";
import { MdArticle } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
const Nav = () => {
  const navigate = useNavigate()
  return (
    <div>
        <Box bgColor={"white"} height={"10vh"}>
            <div className='flex justify-around pt-2 px-20'>
                <div>
                    <img src={main_logo} alt="logo" srcset="" className='w-24'/>
                    
                </div>
                <div className='w-4/12  flex justify-between'>
                    <div className='text-center'>
                        <div className='flex justify-center'>
                            <FaPeopleGroup className='text-2xl'/>
                        </div>
                        <div className='text-sm font-bold '>people</div>
                    </div>
                    <div className='text-center'>
                        <div className='flex justify-center'>
                            <MdArticle className='text-2xl'/>
                        </div>
                        <div className='text-sm font-bold'>blogs</div>
                    </div>
                    <div className='text-center'>
                        <div className='text-sm font-bold pt-3'>about</div>
                    </div>
                    <div className='text-center'>
                        <div className='text-sm font-bold pt-3'>alerts</div>
                    </div>
                    <div className='text-center'>
                        <div className='text-sm font-bold pt-3'>profile</div>
                    </div>
                    <div className='text-center'>
                    <Button onClick={()=> navigate('/auth/join')} colorScheme='telegram'  variant='outline'>
                        Login
                    </Button>
                    </div>

                </div>

            </div>
        </Box>
    </div>
  )
}

export default Nav