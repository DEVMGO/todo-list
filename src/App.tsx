import { useState } from 'react'
import { TodoList } from './components/list'
import './index.css'

export interface TodoType {
  id: string
  text: string
  done: boolean
}

function App() {
  const [todoList, setTodoList] = useState<TodoType[]>([]);

  function generateUniqueId() {
    return 'id-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
  }

  const [newTodo, setNewTodo] = useState({
    id: '',
    text: '',
    done: false
  })

  const addNewTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTodo.text) {
      setTodoList([...todoList, newTodo]);
      setNewTodo({
        id: '',
        text: '',
        done: false
      })
    }
  }

  return (
    <>
      <div className='w-full !h-screen min-h-screen bg-[#cfdcea] flex items-center justify-center flex-col gap-3 p-12'>
        <div className='w-full bg-white md:max-w-2xl flex items-center justify-between flex-col rounded-lg overflow-hidden'>
          <div className='w-full flex items-center justify-start flex-col'>
            <div className='w-full h-20 bg-[#435fa3] flex items-center justify-center border-b-4 border-[#2ebaef]'>
              <h2 className='text-2xl text-white font-bold'>Todo List</h2>
            </div>
            <TodoList todoList={todoList} setTodoList={setTodoList} />
          </div>

          <form onSubmit={(e) => addNewTodo(e)} className='w-full flex items-center justify-center flex-col border-t-4 border-[#2ebaef] p-4 gap-2'>
            <input
              type='text'
              placeholder='write a new task'
              value={newTodo.text}
              onChange={(e) => setNewTodo({
                ...newTodo,
                text: e.target.value,
                id: generateUniqueId(),
              })}
              className='w-full h-12 bg-gray-100 text-base text-gray-800 font-medium p-2 border border-gray-300 rounded-lg'
            />
            <button type='submit' className='w-full h-12 text-base text-white bg-[#2ebaef] rounded-lg px-7'>
              Add Todo
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
