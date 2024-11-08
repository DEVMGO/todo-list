import { FC } from 'react'
import { TodoCard } from './todo-card'
import { TodoType } from '../App'

interface Props {
    todoList: TodoType[]
    setTodoList: (val: TodoType[]) => void
}

export const TodoList: FC<Props> = ({ todoList, setTodoList }) => {
    return (
        <div className='w-full min-h-96 max-h-96 flex items-start justify-start flex-col overflow-auto px-4'>
            {
                todoList.map((item, index) => (
                    <TodoCard
                        key={`${index}_${item.id}`}
                        index={index}
                        id={item.id}
                        text={item.text}
                        done={item.done}
                        todoList={todoList}
                        setTodoList={setTodoList}
                    />
                )
                )
            }
        </div>
    )
}
