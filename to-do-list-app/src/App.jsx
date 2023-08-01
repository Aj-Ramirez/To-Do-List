import React, {useEffect, useState} from 'react'
import {AiOutlinePlus} from 'react-icons/ai'
import Todo from './Todo';
import {db} from './firebase'
import {query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc} from 'firebase/firestore'

const style = {
  bg: 'h-screen w-screen p-20 bg-gradient-to-r from-cyan-100 to-sky-500',
  container: 'bg-slate-100 max-w-[500px] w-full m-auto rounded-xl shadow-xl p-8 backdrop-blur-sm bg-opacity-95',
  heading: `text-3xl font-bold text-center text-gray-800 p-2 bg-gradient-to-r from-cyan-100 to-sky-500 bg-clip-text text-transparent`,
  form: `flex justify-between`,
  input: `border p-2 px-5 w-full text-xl rounded-lg`,
  button: `border p-4 ml-2 bg-green-500 text-slate-100 rounded-lg hover:bg-green-600 hover:scale-95 transition-all duration-200 transform`,
  count: `text-center p-2 text-gray-500 font-semibold`,

  containerBtn:'flex justify-end',
  checkAllBtn:'bg-blue-500 p-2 rounded-md font-semibold text-white hover:bg-blue-600 hover:scale-95 transition-all duration-100 transform',
  deleteAllBtn:'bg-red-500 p-2 rounded-md mx-1 font-semibold text-white hover:bg-red-600 hover:scale-95 transition-all duration-100 transform',
}

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const completedTodos = todos.filter(todo => todo.completed).length;
  const remainingTodos = todos.length - completedTodos;

  
  //Create todo-list
    const createTodo = async(e)=>{
      e.preventDefault(e);

      if(input === ''){
        alert('Please add list')
        return
      }
        await addDoc(collection(db,'todos'),{
          text: input,
          completed: false,
        })
        setInput('')
    };

  //Read todo-list
  useEffect(()=>{
    const q = query(collection(db, 'todos'))
    const unsubscribe = onSnapshot(q, (querySnapshot) =>{
      let todosArr = []
      querySnapshot.forEach((doc)=>{
        todosArr.push({...doc.data(), id: doc.id})
      });
      setTodos(todosArr)
    })
    return () => unsubscribe()
  },[])

  //Update todo-list
    const toggleComplete = async(todo)=>{
      await updateDoc(doc(db,'todos', todo.id),{
        completed: !todo.completed
      })
    }

  //Delete todo-list
    const deleteTodo = async (id) =>{
      await deleteDoc(doc(db, 'todos',  id))
    } 

  //Check all todos
    const checkAllTodos = async () => {
      try {
        const updatedTodos = todos.map((todo) => ({
          ...todo,
          completed: true,
        }));

        await Promise.all(
          updatedTodos.map((updatedTodo) =>
            updateDoc(doc(db, 'todos', updatedTodo.id), updatedTodo)
          )
        );
      } catch (error) {
        console.log('Error updating todos:', error);
      }
    };

  //Delete all todos
    const deleteAllTodos = async () => {
      try {
        await Promise.all(
          todos.map((todo) => deleteDoc(doc(db, 'todos', todo.id)))
        );
      } catch (error) {
        console.log('Error deleting todos:', error);
      }
    };


  return (
    <>
      <div className={style.bg}>
        <div className={style.container}>
          <h3 className={style.heading}>To-Do List App</h3>

          <br></br>

            <form onSubmit={createTodo}className={style.form}>
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}  
                className={style.input} 
                type="text" 
                placeholder ='Add List'
              />

              <button 
                className={style.button}>
                <AiOutlinePlus size={25} />
              </button>
            </form>
            
            <br></br>

            {todos.length < 1 ? null : (
                <div className={style.containerBtn}>
                  <button   
                    onClick={checkAllTodos} 
                    className={style.checkAllBtn}>
                      All Done
                  </button>

                  <button 
                    onClick={deleteAllTodos} 
                    className={style.deleteAllBtn}>
                      Clear
                  </button>
                </div>
              )
            }
            
            
            <ul>
              {todos.map((todo, index)=> (
                    <Todo 
                    key={index} 
                    todo={todo} 
                    toggleComplete={toggleComplete} 
                    deleteTodo={deleteTodo}
                    checkAllTodos={checkAllTodos}
                    />
                  )
                )
              }
            </ul> 

              <br></br>

                {todos.length < 1 ? null : (
                    <p className={style.count}>
                      {`Completed: ${completedTodos} / Remaining: ${remainingTodos}`}
                    </p>
                  )
                }

          </div>  
      </div>
    </>
  );
}

export default App;