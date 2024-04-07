import { Avatar, Button, Text, Divider } from '@chakra-ui/react'
import React, { useContext } from 'react'
import context from './store/context'

const Suggest = () => {
  const ctx = useContext(context)
  // console.log(ctx.userData);
  return (
    <div className='w-full'>
        <div className=''>
          <Text fontSize={'xl'} fontWeight={'bold'} px={'2'}>People</Text>
        </div>
        <div>
           {ctx.allUsers.map((item,i) =>{
                return  <>
                <Divider/>
                {!ctx.userData.following.includes(item._id) &&
                <div key={i} className='flex justify-between px-2 py-2' style={{height:'10vh'}}>
                <div className='flex'>
                  <Avatar size={'md'} src={item.pic }/>
                <div className='ps-2'>
                  <div className='text-sm font-bold'>{item.fullname}</div>
                  <div className='text-xs text-gray-500'>@{item.username}</div>
                </div>
                </div>
                
                <div>
                  {ctx.userData.following.includes(item._id)? 
                  <Button colorScheme='telegram' variant={'outline'} size={'sm'} onClick={()=> ctx.unfollowUser(item._id)}>unfollow</Button>
                  :
                  <Button colorScheme='telegram' variant={'outline'} size={'sm'} onClick={()=> ctx.followUser(item._id)}>follow</Button>
                }
                </div>
              </div>}</>
           })}
        </div>
    </div>
  )
}

export default Suggest