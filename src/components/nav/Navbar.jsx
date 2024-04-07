import { Box } from '@chakra-ui/react'
import React , {useContext} from 'react'
import main_logo from "../../assets/img/main_logo.png"
import { BiSearch, BiMessage} from "react-icons/bi"
import { AiFillHome,AiFillMessage } from "react-icons/ai"
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from 'react-icons/hi';
import { FaBell } from "react-icons/fa";
import { FaPeopleGroup} from "react-icons/fa6";
import { Avatar } from '@chakra-ui/react'
import { Dropdown } from 'flowbite-react';
import context from '../store/context'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
    const ctx = useContext(context)
    const navigate = useNavigate()
  return (
    <div className='w-full'>
        <Box bgColor={"white"} height={"10vh"} borderBottom={'2px solid black'} boxShadow={'base'}>
            <div className='flex justify-evenly pt-2 ' style={{paddingLeft:'1rem', paddingRight: "1rem"}}>
                <div onClick={()=> navigate("/home")}>
                    <img src={main_logo} alt="logo" className='w-24'/>
                    
                </div>
                <div className='w-4/12 pt-2'>
                    <BiSearch className='absolute text-2xl mt-1 mx-2'/>
                    <input type="text" className='w-full h-8 bg-gray-200 pl-12 pb-1 rounded-sm' placeholder='search'/>
                </div>
                <div className='w-4/12 hidden md:flex justify-between '>
                    <div className='text-center'>
                        <div className='flex justify-center'>
                        <AiFillHome className='text-2xl'/>
                        </div>
                        <div className='text-sm'>Home</div>
                    </div>
                    <div className='text-center'>
                    <div className='flex justify-center' onClick={()=> navigate('people')}>
                        <FaPeopleGroup className='text-2xl'/>
                        </div>
                        <div className='text-sm'>people</div>
                    </div>
                    <div className='text-center'>
                    <div className='flex justify-center'>
                        <AiFillMessage className='text-2xl'/>
                        </div>
                        <div className='text-sm'>message</div>
                    </div>
                    <div className='text-center'>
                    <div className='flex justify-center'>
                        <FaBell className='text-2xl'/>
                        </div>
                        <div className='text-sm'>alerts</div>
                    </div>
                    <div className='text-center'>
                        <div className='flex justify-center'>
                        <Avatar size={'xs'} src={ctx.userData.pic } />
                        </div>
                        <div className='text-sm'>
                        <Dropdown label="profile" inline>
                        <Dropdown.Header className='text-left font-bold'>
                            <span className="block text-sm"></span>{ctx.userData.fullname}
                            <span className="block truncate text-sm text-gray-500 font-medium">{ctx.userData.email}</span>
                        </Dropdown.Header>
                        <Dropdown.Item className=' font-bold' icon={HiViewGrid}>profile</Dropdown.Item>
                        <Dropdown.Item className=' font-bold' icon={HiCog}>Settings</Dropdown.Item>
                        <Dropdown.Item className=' font-bold' icon={HiCurrencyDollar}>Earnings</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item className='font-bold' icon={HiLogout} onClick={()=> ctx.logOut()}>Sign out</Dropdown.Item>
                        </Dropdown>
                        </div>
                    </div>

                </div>

            </div>
        </Box>

    </div>
  )
}

export default Navbar