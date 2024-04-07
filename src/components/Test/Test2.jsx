import React ,{useEffect, useRef, useState}from 'react'

const Test2 = () => {
    const textref = useRef(null)
    const emailref = useRef(null)
    const [todoList, setTodoList] = useState([]);

    const handleClick = ()=>{
        const id = todoList.length + 1;
        setTodoList((prev) => [
          ...prev,
          {
            id: id,
            task: textref.current.value,
            desc : emailref.current.value,
            complete: false,
          },
        ]);
    }
    const complete = (id) => {
        let list = todoList.map((task) => {
          let item = {};
          if (task.id == id) {
            return  item = { ...task, complete: !task.complete };
          } else {item = { ...task };
            return item;}
            })
            setTodoList(list)
      };
    const handlefilter = ()=>{
        const list = todoList.filter(item=>{
                return item.complete === true 
        })
        setTodoList(list)
    }
  return (
    <div>
        <div>
            <h2>add task</h2>
            <input ref={textref} type="text" placeholder='name' /><br />
            <input ref={emailref} type="email" placeholder='email' /><br />
            <button className='bg-gray-600 text-white' onClick={()=>handleClick()}>store</button>
            <button className='bg-gray-600 text-white ml-6' onClick={()=>handlefilter()}>show completed</button>


        </div>
        <h2>task</h2>
        <table className='w-full text-center'>
                <thead className='w-full'>
                    <tr>
                        <th>sn</th>
                        <th>tile</th>
                        <th>desc</th>
                    </tr>
                </thead>
                <tbody>
                {todoList.map((item,i)=>{
                return <tr key={i}>
                    <td>{item.id}</td>
                    <td>{item.task}</td>
                    <td>{item.desc}</td>
                   
                    <td><button className='bg-gray-600 text-white' onClick={()=>{complete(item.id)}}>{ item.complete? 'complete' : "uncomplete"}</button></td>
                </tr>
               })}
                </tbody>
               
             </table>
    </div>
  )
}

export default Test2