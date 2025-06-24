import { useEffect } from "react";
import { useState } from "react";
import React from "react";
import './Style.css'

const LocalTodo = () => {

    const [todos , setTodos] = useState(() => {

        const savedTodos = localStorage.getItem('todos')
        return savedTodos ? JSON.parse(savedTodos) : []

    })
    const [newTodo , setNewTodo] = useState("")

    useEffect(() => {
        localStorage.setItem('todos' , JSON.stringify(todos));
    } , [todos])

    const addTodo = () => {

        if(newTodo.trim())
        {
            setTodos([...todos , {
                id : Date.now(),
                text : newTodo,
                completed : false
            }])
            
        }
        setNewTodo("")
        console.log(todos);
    }

    const deleteTodo = (id) => {

        setTodos(todos.filter((todo) => {
            return todo.id !== id;
        }))
    }

    const toggleCompleted = () => {

        setTodos(todos.map((todo) => todo.id === id ? { ...todo , completed : !todo.completed} : todo ))
    }
    return(
        <div className="todo-app">
             <h1>Todo With LocalStorage</h1>
             <div className="add-todo">
               
                  <input type="text" 
                   placeholder="Enter Your Todo"
                   value={newTodo}
                   onChange={(e) => setNewTodo(e.target.value)}
                   onKeyPress={(e) => {
                    return e.key === 'Enter' && addTodo
                   }}
                  />
                
                  <button onClick={addTodo}>Add</button>

             </div>

             <ol className="todo-list">
                {
                    todos.map((todo) => (
                        <li 
                        key={todo.id} 
                        className={todo.completed ? 'complted' : "" }
                        >
                            <span onClick={() => toggleCompleted(todo.id)}>
                                {todo.text}
                             </span>

                            <button
                            onClick={() => deleteTodo(todo.id)}
                            >Delete</button>
                        </li>
                    ))
                }
             </ol>
        </div>
    )
}
export default LocalTodo;