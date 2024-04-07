import React, { useContext, useRef } from 'react'
import { AbsoluteCenter, Box, Divider, Text ,  Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Select, useDisclosure, Input, Textarea, Button, Tooltip} from '@chakra-ui/react'
  import { FaPlus, FaRegSmile, FaRegImage , FaPaperclip } from "react-icons/fa";
  import { Carousel } from 'flowbite-react';
  import data from '@emoji-mart/data'
  import Picker from '@emoji-mart/react'
import { PulseLoader, ScaleLoader } from 'react-spinners'
import context from './store/context';
const PostModal = ({}) => {
  const ctx = useContext(context)
  const inputRef = useRef(null)

  const [File, setFile] = React.useState()
  const [fileUrl, setfileUrl] = React.useState([])
  const select_photo = ()=>{
    inputRef.current.click()
  }
  const handleChange = function(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // handleFiles(e.target.files);
      setFile(e.target.files)
    }

  };

  
  React.useEffect(()=>{
    if(File){
        const newfile = Array(...File).map((item)=>{
            // console.log(item.name.split('.')[1]);
            return URL.createObjectURL(item)
          })
          console.log(newfile)
          setfileUrl(newfile)
    }
 },[File])
  return (
    <div>
        <ModalContent minHeight={500}  bgColor={'white'}>
          <ModalHeader>
            <Text>Compose</Text>
            <Select variant='unstyled' placeholder='Anyone' w={100} >
              <option value='option1' >followers</option>
              <option value='option2' >only me</option>
            </Select>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Textarea onKeyDown={ctx.nextLine} value={ctx.value} onChange={ctx.handleInputChange} placeholder='Here is a sample placeholder'/>
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
              <Box pt={5} display={'flex'} justifyContent={'space-around'}>
              <Tooltip label='add emoji'><Text fontSize={'24px'} color={'blue.600'} cursor={'pointer'} onClick={()=> ctx.open_Emoji()}><FaRegSmile /></Text></Tooltip>
              <Tooltip label='add media'><Text fontSize={'24px'} color={'green.600'} cursor={'pointer'} onClick={()=> {select_photo()}}><FaRegImage /></Text></Tooltip>
              <Tooltip label="add document"><Text fontSize={'24px'} color={'brown'} cursor={'pointer'} onClick={()=> {}}><FaPaperclip /></Text></Tooltip>
              </Box>
              <Box pt={5} width={'100%'}>
                <Button width={'100%'} colorScheme='telegram' onClick={()=>{ctx.Make_post(ctx.value, File)}}>{ctx.spin ? <PulseLoader color="#fcfcfc" size={8} width={4}/> : <>Post</>}</Button>
              </Box>
            </Box>
            <Box>
                <div className='mt-4'>
                    {fileUrl.length > 0 && 
                        <Carousel slide={false} className='h-screen relative z-10'>
                        {fileUrl.map(item=>{
                            return <img src={item}/>
                        })}
                        </Carousel>
                    }
                    
                </div>
            </Box>
          </ModalBody>

          {ctx.Emoji && <>
             <Button onClick={()=> {ctx.close_Emoji()}}>close</Button>
            <Picker data={data}  onEmojiSelect={ctx.addEmoji} />
          </>}
        </ModalContent>
    </div>
  )
}

export default PostModal