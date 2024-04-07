import React, { useRef, useState } from 'react'

const LastTest = () => {
    const [inputType, setInputType] = useState(null)

    const [type, setType] = useState("")
    const [textn, setTextn] = useState("")
    const [emailn, setemailn] = useState("")
    const [checkn, setCheckn] = useState("")
    const [textv, setTextV] = useState("")
    const [emailv, setemailV] = useState("")
    const [checkv, setCheckV] = useState("")
    const textref = useRef(null)
    const emailref = useRef(null)
    const checkref= useRef(null)
    const textV = useRef(null)
    const emailV = useRef(null)
    const checkV = useRef(null)
    const handlechange= (con , n)=>{
        if(textV.current.value == '' && emailV.current.value == "" && checkV.current.checked == false){
            window.alert('enter fields')

        }else{
            console.log(checkV);
            setTextV(textV.current.value)
            setemailV(emailV.current.value)
            setCheckV( checkV.current.checked)
            setTextn(Number(textref.current.value))
            setemailn(Number(emailref.current.value))
            setCheckn(Number(checkref.current.value))
           setType(con)
           setInputType(n)
        }
        
    }
  return (
    <div>
        <form method="post">
            <label htmlFor=""> text</label><br />
            <input type="text" ref={textV} placeholder='text' className='mr-5' /><input type="number" onChange={()=>handlechange('text', 0)} ref={textref} placeholder='enter number'/><br />
            <label htmlFor="">email</label><br />
            <input type="email" ref={emailV}  placeholder='email' className='mr-5'/><input type="number" onChange={()=>handlechange('email', 1)} ref={emailref} placeholder='enter number'/><br />
            <label htmlFor="">checkbox</label><br />
            <input type="checkbox"  ref={checkV} placeholder='checkbox' className='ml-10 mr-24'/><input type="number" ref={checkref} onChange={()=>handlechange('checkbox',2)} placeholder='enter number'/><br />
        </form>

        <div className='mt-10'> 
        <h1>components</h1>
        {/* {inputType == null ? inputType == 0 } */}
          
          {Array(textn || emailn || checkn).fill(<>
           <input className='m-3' value={inputType==0 ? textv : inputType == 1 ? emailv : 'no data' } checked={checkv} type={type} placeholder={type}/>
          </>)}
        </div>
    </div>
  )
}

export default LastTest