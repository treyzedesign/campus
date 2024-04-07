import axios from "axios";
import Cookies from "js-cookie";
import React ,{useState, useEffect, useLayoutEffect} from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const context = React.createContext({
    userPosts: [],
    User: []
})


export const ContextProvider = (props)=>{
     const cookie = Cookies.get('accesstoken')
     const [logoLoader, setLogoLoader] = useState(true)
    const [button, setButton] = useState(true)
    const [spin, setSpin] = useState(false)
    let [value, setValue] = React.useState('')
    const [Emoji, setEmoji] = React.useState(false)
    const [Liked, setLiked] = React.useState(false);
    
     const [userData, setUserData] = useState([])
     const [allPosts, setAllPosts] = useState([]); 
     const [allUsers, setAllUsers] = useState([]); 
     const [User, setUser] = useState([]); 
     const [userPosts, setUserPosts] = useState([]);
     const [post, setPost] = useState([])
     const [feedPosts, setFeedPosts] = useState([])

     const toast = useToast()
     const navigate = useNavigate()
    //  console.log(cookie);
     const instance = axios.create({
        baseURL: "http://localhost:4400/api",
        headers: {
            Authorization: "bearer " + cookie
        },
     })
     
     // get user info
     const get_user = async()=>{
            await instance.get('/get_login_user').then((feedback)=>{
                // setTimeout(()=>{
                    setLogoLoader(false)
                    setUserData(feedback.data.result)
                    // console.log(feedback.data.result);
                // },1400)
                
                
            }).catch((err)=>{
                console.log(err.stack);
                setLogoLoader(true)
            })
       
     }
    //  console.log(userData);
     // set's user profile and desc after login
     const setProfileInfo = async(inputRef, File)=>{
        const desc = inputRef.current.value
        if(desc.length == 0){
          toast({
              title: `please add your description`,
              isClosable: true,
              position: 'top',
              variant: "left-accent"
            })
        }else if (!File){
          toast({
              title: `choose a profile photo`,
              isClosable: true,
              position: 'top',
              variant: "left-accent"
            })
        }else{
          setSpin(true)
          const data ={
              pic : File,
              bio : desc
          }
          await instance.patch('/edit_user', data,{
            headers:{
                "Content-Type": "multipart/form-data"
            }
          }).then((feedback)=>{
            console.log(feedback);
            if(feedback.status == 200){
                setSpin(false)
                navigate('/Home')
            }
          })
        // console.log(data);
        }
    }
    //-------------------------------------------------------------------------

    // post methods
    const Make_post = async(text, File)=>{
        setSpin(true)
        const data = {
            text: String(text),
            pic: File
        }

        await instance.post("/create-post", data, {
            headers:{
                "Content-Type": "multipart/form-data"
            }
        }).then((feedback)=>{
            console.log(feedback);
            if(feedback.status == 201){
                setSpin(false)
                toast({
                    title: `your post has been created`,
                    isClosable: true,
                    position: 'top',
                    variant: "left-accent",
                    status:'success'
                  })
            }
        }).catch((err)=>{
            setSpin(false)
            console.log(err);
            toast({
                title: `error occurred`,
                isClosable: true,
                position: 'top',
                variant: "left-accent",
                status:'error'
            })

        })
    }
    const fetchUser = async(id)=>{
        setSpin(true)
        await instance.get(`get_user/${id}`).then((f)=>{
        //   console.log(f);
          setUser(f.data.data)
          setSpin(false)
        }).catch(err=>{
          console.log(err);
        })
    }
    const getPosts = async()=>{
        await instance.get('/getPosts?date=desc').then((feedback)=>{
            // console.log(feedback.data.data);
            setAllPosts(feedback.data.data)

        })
    }
    const get_user_posts = async(id)=>{
        await instance.get(`/get_user_posts/${id}`).then((feedback)=>{
            setUserPosts(feedback.data.data)
        })
    }
    const get_users = async()=>{
        await instance.get('get_all_users').then((feedback)=>{
            // console.log(feedback.data.data);
            setTimeout(()=>{
                setAllUsers(feedback.data.data);
            },1400)
        })
    }
    const get_a_post = async(id)=>{
        await instance.get(`/get_a_post/${id}`).then((feedback)=>{
            console.log(feedback.data.data[0]);
            setPost(feedback.data.data)
        }).catch((err)=> console.log(err))
    }
    const likePost = async(id)=>{
        await instance.put(`/like/${id}`).then((feedback)=>{
            if(feedback.status == 201){
                setLiked(true)
                console.log(true);
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    const unLikePost = async(id)=>{
        await instance.put(`/unlike/${id}`).then((feedback)=>{
            
        }).catch((err)=>{
            console.log(err);
        })
    }
    const followUser = async(id)=>{
        await instance.put('/follow',{follow_id:id}).then(()=>{
            toast({
                title: 'you followed user',
                isClosable: true,
                position: 'top',
                variant: "left-accent",
                status: 'success'
              })
        }).catch((err)=>{
            console.log(err);
        })
    }
    const unfollowUser = async(id)=>{
        await instance.put('/unfollow',{unfollow_id:id}).then((f)=>{
            console.log(f);
            toast({
                title: 'you unfollowed user',
                isClosable: true,
                position: 'top',
                variant: "left-accent"
              })
        }).catch((err)=>{
            console.log(err);
        })
    }

    const deletePost = async (id)=>{
      console.log(id);
      await instance.delete(`/delete_post/${id}`).then((f)=>{
        console.log(f);
        toast({
            title: 'you deleted post',
            isClosable: true,
            position: 'top',
            variant: "left-accent"
          })
      }).catch((err)=>{
        console.log(err);
    })
    }
    const postComment = async (input,id)=>{
        const text = input.current.value
          setSpin(true)
          const data ={
               text: text
          }
          await instance.put(`/comment/${id}`, data).then((feedback)=>{
            console.log(feedback);
            if(feedback.status == 200){
                setSpin(false)
                toast({
                    title: 'you replied to post',
                    isClosable: true,
                    position: 'top',
                    variant: "left-accent"
                  })
            }
          }).catch((err)=>{
            console.log(err);
          })
        // console.log(data);
        
    }

    // ----------------------------------------------------------
    
    const logOut = async ()=>{
        Cookies.remove('accesstoken')
        navigate('/auth/login')
    }
    
    // const nextLine = (e)=>{
    //     if(e.key == 'Enter'){
    //         setValue(value + "\\n")
            
    //     }
    // }
    // this is used for the emoji picker
    let handleInputChange = (e) => {
    let inputValue = e.target.value
    setValue(inputValue)
    if(inputValue.length > 0){
        setButton(false)
    }else{
        setButton(true)
    }
    }
    const addEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setValue(value + emoji);
        setButton(false)
    };
    const close_Emoji = ()=>{
        setEmoji(false)
    }
    const open_Emoji = ()=>{
    setEmoji(true)
    }
    const store_feed_posts = (item)=>{
        setFeedPosts(item)
    }
     // ------------------------------------------------------
    return <context.Provider value={{
        get_user: get_user,
        logoLoader: logoLoader,
        userData: userData,
        button:button,
        setProfileInfo: setProfileInfo,
        spin:spin,
        value: value, 
        Emoji : Emoji,Liked:Liked, 
        handleInputChange: handleInputChange,
        addEmoji: addEmoji,
        close_Emoji: close_Emoji,
        open_Emoji: open_Emoji, 
        Make_post: Make_post,
        getPosts: getPosts,
        allPosts: allPosts,
        likePost: likePost, unLikePost:unLikePost,
        logOut: logOut,
        get_users: get_users,
        allUsers: allUsers,
        followUser:followUser,
        unfollowUser:unfollowUser,
        fetchUser: fetchUser,
        get_user_posts: get_user_posts,
        User:User, userPosts:userPosts,
        deletePost: deletePost,
        postComment: postComment,
        store_feed_posts:store_feed_posts,
        feedPosts: feedPosts,
        get_a_post : get_a_post,
        post:post
    }}>
        {props.children}
    </context.Provider>

}


export default context