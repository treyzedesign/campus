import { Box, ScaleFade ,FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText, Input, Text, Link, Stack, Button, Divider, AbsoluteCenter, useToast} from '@chakra-ui/react'
import React from 'react'
import main_logo from "../../assets/img/main_logo.png"
import { useNavigate } from 'react-router-dom'
import {useState, useRef} from 'react'
import { PulseLoader} from 'react-spinners'
import { FaRegEye , FaRegEyeSlash} from "react-icons/fa";
import axios from 'axios'
import Cookies from 'js-cookie'
const Auth = () => {
    const toast = useToast()
    const [spin, setSpin] = useState(false)
    const [show, setShow] = useState(true)
    const [pwType, setPwtype] = useState("password")
  const navigate = useNavigate()
  const userRef = useRef(null)
  const passRef = useRef(null)
//   console.log(passRef.current.type);

  const google_auth = async()=>{
    window.open('http://localhost:4400/api/auth/google/callback', "_self")
  }

  const login = async()=>{
    const user = userRef.current.value
    const password = passRef.current.value
    const data = {
        user: user,
        password : password
    }
    if(user.length > 0 || password.length > 0){
        setSpin(true)
        await axios.post('http://localhost:4400/api/login', data).then((feedback)=>{
           console.log(feedback);
           if(feedback.status == 200){
            console.log(feedback.data.user.bio);
            Cookies.set('accesstoken', feedback.data.token, {expires: 7})
            if(feedback.data.user.bio == 'comrade'){
                navigate('/auth/set-profile')
            }else{
               navigate('/Home')
            }
           }
        }).catch((err)=>{
            setSpin(false)
            console.log(err);
                toast({
                    title: err.response.data.msg,
                    isClosable: true,
                    position: 'top',
                    variant: "left-accent",
                    status: "error"

                  })
        })
    }else{
        toast({
            title: `please input all required fields`,
            isClosable: true,
            position: 'top',
            variant: "left-accent"
          })
    }
  }
const show_password = ()=>{
        setPwtype('text')
        setShow(false)
  }
  const hide_password = ()=>{
    setPwtype('password')
    setShow(true)
  }
  return (
    <Box>
        <div className='flex w-full bg-gray-200'>
            <div className='w-5/12 '>
                <img src={main_logo} alt='sso' className='w-24 m-3 shadow-lg' />
                
                <div className={'w-7/12 m-0 m-auto h-5/6  bg-white rounded-md drop-shadow-xl px-2'}>
                        <div className='text-4xl font-semibold pt-3 text-center px-5'> Sign in</div>
                        <div className='text-sm pt-2 text-center px-5'>Welcome back again Comrade</div>
                        <FormControl pt={6} px={5}>
                            <Stack spacing={1}>
                            <Box>
                                <FormLabel fontSize={'smaller'}>Email/Username</FormLabel>
                                <Input ref={userRef} placeholder='enter email or username' size='sm'/>
                            </Box>
                            <Box position={'relative'}>
                                <FormLabel fontSize={'sm'}>password</FormLabel>
                                <div className='absolute text-xl w-11/12 w-full flex justify-end text-center mt-1 mr-8'>
                                    {show ? <FaRegEye className='absolute text-gray-600 cursor-pointer z-10' onClick={()=> show_password()}/> : <FaRegEyeSlash className='absolute text-gray-600 cursor-pointer z-10' onClick={()=> hide_password()}/>}
                                </div>
                                <Input type={pwType} ref={passRef} placeholder='enter password' size='sm'/>
                            </Box>
                            <Link color={'green.500'} fontSize={'xs'}>forgot password?</Link>
                            <Button mt={1} onClick={()=> login()} colorScheme='whatsapp'>{spin ? <PulseLoader color="#fefffe" size={8} width={4}/> : <>submit</> }</Button>
                            </Stack>
                        </FormControl>
                        <Box position='relative' px='3' py='3'>
                        <Divider />
                        <AbsoluteCenter bg='white' color={'gray.400'} px='4'>
                            or
                        </AbsoluteCenter>
                        </Box> 
                        <Box px='5' py={'4'}>
                        <Button onClick={()=> google_auth()} w={'100%'} colorScheme='teal' variant='outline'>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"  height="50" className='w-1/12 mx-3' viewBox="0 0 48 48">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        </svg> continue with Google
                        </Button>
                        <Box textAlign={'center'} pt='10'>
                            <Text fontSize={'xs'}>Don't have an account?  <Link color={'green.500'} onClick={()=> navigate('/auth/join')}>create one</Link></Text>
                        </Box>
                        <Box textAlign={'center'} pt='3'>
                        <Link color={'green.700'} fontSize={'sm'} onClick={()=> navigate('/auth/join')}>Back</Link>
                        </Box>
                        </Box>
                  
                </div>
            </div>
            <div className='w-7/12 h-screen login-image'>
               <img src={login} alt="" srcset="" className='h-full' />
            </div>
        </div>
        <div className='w-full'></div>
    </Box>
  )
}

export default Auth