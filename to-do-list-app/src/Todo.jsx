import React from 'react'
import {FaRegTrashAlt} from 'react-icons/fa'


const style = {
     li: `flex justify-between bg-slate-200 p-4 my-2 capitalize rounded-lg cursor-pointer`,
     liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize line-through text-gray-600 rounded-lg transition-all duration-200`,
     row: `flex`,
     text: `ml-2 cursor-pointer`,
     textComplete: `ml-2 cursor-pointer line-through`,
     button: `cursor-pointer flex items-center`,
     checkbox: 'rounded-lg border-gray-300',
}

const Todo = ({todo, toggleComplete, deleteTodo}) => {
  
  return (

    <li 
    onClick={()=>toggleComplete(todo)} 
    className={todo.completed ? style.liComplete : style.li} >
     <div className={style.row}>
          <input 
          className={style.checkbox} 
          onChange={()=>toggleComplete(todo)} 
          type="checkbox" 
          checked={todo.completed ? 'checked' : ''} />

          <p 
          onClick={()=>toggleComplete(todo)} 
          className={todo.complete ? style.textComplete : style.text}>
            {todo.text}
          </p>
     </div>
     
     <button 
     className='bg-red-200 p-1.5 rounded-md hover:bg-red-300 hover:scale-95 transition-all duration-300 transform' 
     onClick={()=> deleteTodo(todo.id)}>
      {<FaRegTrashAlt className='text-red-500'/>}
      </button>
    </li>
  )
}
 
export default Todo