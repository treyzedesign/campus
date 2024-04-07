import React, { useContext, useEffect } from 'react'
import context from '../../components/store/context'
import { useParams } from 'react-router-dom'
import PostCard from '../../components/PostCard'
import { useDisclosure,Modal, Divider, AbsoluteCenter} from '@chakra-ui/react'
import CommentModal from '../../components/CommentModal'
import { FadeLoader } from 'react-spinners'

const Posts = () => {
  const {id} = useParams()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const ctx = useContext(context)
  useEffect(()=>{
    ctx.get_a_post(id)
  })
  return (
    <div className='container-lg w-5/12 mx-auto'>
       <Modal isOpen={isOpen} onClose={onClose} size={'md'} isCentered>
            <CommentModal post={ctx.feedPosts}/>
            </Modal>
        <div className='pt-5'>
            <div className='bg-white relative h-full rounded-lg shadow-md'>
              {!ctx.post ? <> <AbsoluteCenter><FadeLoader/></AbsoluteCenter></> : <>{ctx.post.map((item,i)=>{
               return <>
               <PostCard key={i} item={item} Open={onOpen}/> 
               <Divider/>
               <div>
                bbxb
               </div>
               </>
              })}</>}
             
            </div>
        </div>    
    </div>
  )
}

export default Posts