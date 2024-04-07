import { Avatar, Divider, Skeleton } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import Skeletons from './Skeletons'
import context from './store/context'
import { useDisclosure,Modal} from '@chakra-ui/react'
import { BiLike, BiChat, BiShare } from 'react-icons/bi'
import { FaRegThumbsUp , FaThumbsUp, FaEllipsisVertical} from "react-icons/fa6";
import { FaRegBookmark , FaLink, FaTrash} from "react-icons/fa";
import { RiUserUnfollowFill } from "react-icons/ri";
import { Carousel } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import CommentModal from './CommentModal'
import PostCard from './PostCard'

const Feed = () => {
    const ctx = useContext(context)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [post, setPost] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        ctx.getPosts()
    },[])
    // ctx.allPosts
    
  return (
    <div className='w-12/12 ' style={{minHeight:"30vh"}}>
          <Modal isOpen={isOpen} onClose={onClose} size={'md'} isCentered>
            <CommentModal post={ctx.feedPosts}/>
            </Modal>
        {ctx.allPosts.length == 0 ? <>{Array(10).fill(<Skeletons />)} </>: <div>
            {ctx.allPosts.map((item, i)=>{
                return <PostCard key={i} item={item} Open={onOpen}/>
            })}
        </div>}
        
    </div>
  )
}

export default Feed