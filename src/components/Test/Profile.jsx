import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import {
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,Avatar,Link,Input, Flex,Tooltip,Text,Box, Button,Modal, useDisclosure
  } from '@chakra-ui/react'
const Profile = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

  const textref = useRef(null)
  const emailref = useRef(null)
  const phoneref = useRef(null)
  const etextref = useRef(null)
  const eemailref = useRef(null)
  const ephoneref = useRef(null)
  const [users , setUsers ] = useState([])
  const [userId , setUserId ] = useState('')

  const handleClick= async()=>{
    if(textref.current.value == "" || emailref.current.value == "" || phoneref.current.value == ""){
      window.alert('fill the required input fields')
    }
    const obj = {
        name: textref.current.value ,
        email : emailref.current.value ,
        phone: phoneref.current.value
    }
    
    await axios.post('http://localhost:4400/api/add_new_user', obj).then((f)=>{
        console.log(f);
    }).catch((err)=>{
        console.log(err);
    })
  }
  const get_users = async()=>{
    await axios.get('http://localhost:4400/api/getusers').then((f)=>{
        console.log(f.data.data);
        setUsers(f.data.data)
    }).catch((err)=>{
        console.log(err);
    })
  }
  const edit = async()=>{
    if(etextref.current.value == "" && eemailref.current.value == "" && ephoneref.current.value == ""){
        window.alert('fill the required input fields')
      }
      const obj = {
        name: etextref.current.value ,
        email : eemailref.current.value ,
        phone: ephoneref.current.value
    }
    await axios.patch(`http://localhost:4400/api/edit_epay_user/${userId}`, obj).then((f)=>{
        console.log(f)
    }).catch((err)=>{
        console.log(err);
    })
  }
  useEffect(()=>{
    get_users()
})

  return (
    <div>
          <Modal isOpen={isOpen} onClose={onClose} size={'md'} isCentered>
          <ModalOverlay />
                <ModalContent>
                <ModalHeader>edit user</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <input ref={etextref} type="text" placeholder='name' /><br />
                    <input ref={eemailref} type="email" placeholder='email' /><br />
                    <input ref={ephoneref} type="text" placeholder='number' /><br />
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={()=> edit()}>
                    submit
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        <div>
            <h2>add new user</h2>
                <input ref={textref} type="text" placeholder='name' /><br />
                <input ref={emailref} type="email" placeholder='email' /><br />
                <input ref={phoneref} type="text" placeholder='number' /><br />
                <button className='bg-gray-600' onClick={()=>handleClick()}>store</button>
            
        </div>
        <div className='mt-8'>
            <h1>Users</h1>
             <table className='w-full text-center'>
                <thead className='w-full'>
                    <tr>
                        <th>S/N</th>
                        <th>name</th>
                        <th>email</th>
                        <th>phone</th>

                    </tr>
                </thead>
                <tbody>
                {users.map((item,i)=>{
                return <tr>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td><button className='bg-gray-600' onClick={()=>{setUserId(item._id) ;onOpen()}}>edit</button></td>
                </tr>
               })}
                </tbody>
               
             </table>
        </div>
    </div>

  )
}

export default Profile