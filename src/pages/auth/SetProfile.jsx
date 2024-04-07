import { AbsoluteCenter , Avatar, Button , Input, Heading,Text, Tooltip, Textarea, useToast} from '@chakra-ui/react'
import axios from 'axios'
import React , {useRef, useContext} from 'react'
import context from '../../components/store/context'
import { PulseLoader, ScaleLoader } from 'react-spinners'
import { FaRegSmile} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
const SetProfile = () => {
  const inputRef = useRef(null)
  const titleRef = useRef(null)

  const [File, setFile] = React.useState()
  const [fileUrl, setfileUrl] = React.useState(null)
  const ctx = useContext(context)
  const select_photo = ()=>{
    inputRef.current.click()
  }
  const handleChange = function(e) {
    e.preventDefault();
      setFile(e.target.files[0])

  };

  
  React.useEffect(()=>{
    if(File){
       const url = URL.createObjectURL(File)
       setfileUrl(url)
    }
 },[File])
  console.log(File);
  return (
    <div className='bg-gray-200' style={{ width: "100%"}} >
        <AbsoluteCenter width="50%" minH="60%" py={10} px={20} bgColor={'white'} boxShadow='lg' display={'flex'} justifyContent={'center'}>
            <div className='w-full'> 
                <div className=''>
                <div className='text-center'>
                    <Heading as={'h3'} pb={5}>finish up!</Heading>
                </div>
                <div className='flex justify-center'>
                   
                    <div className='rounded-full  border-lime-800 border-2'>
                        {fileUrl != null ? 
                            <img src={fileUrl} className='w-36 h-36 rounded-full border-zinc-800 border-2'/>                           
                        : 
                        <Avatar bg='teal.500' width={32} height={32}/>
                        }
                        
                    </div>
                </div>
               
                <div className='text-center py-2 pt-4'>
                    <Button size='xs' onClick={()=> select_photo()}>select photo</Button>    
                </div>
                <div>
                <Input
                // accept="image/*"
                type="file"
                style={{ display: "none" }}
                multiple
                ref={inputRef}
                onChange={handleChange}
                />
                
                </div>
                <div className='w-full pt-5' >
                <Input variant='flushed' value={ctx.value} onChange={ctx.handleInputChange} ref={titleRef} w="100%" placeholder='Add description ' />
                </div>
                <div className='flex justify-between pt-5'>
                    <Tooltip label='add emoji'><Text fontSize={'24px'} color={'gray.600'} cursor={'pointer'} onClick={()=> ctx.open_Emoji()}><FaRegSmile /></Text></Tooltip>            
                    <Button onClick={()=> ctx.setProfileInfo(titleRef, File)}>{ctx.spin ? <PulseLoader color="#2d2d2c" size={8} width={4}/> : <>finish</>}</Button>
                </div>
                </div>
                {ctx.Emoji && <>
                    <Button onClick={()=> {ctx.close_Emoji()}}><IoMdClose /></Button>
                    <Picker data={data}  onEmojiSelect={ctx.addEmoji} />
                </>}
            </div>
        </AbsoluteCenter>
    </div>
  )
}

export default SetProfile