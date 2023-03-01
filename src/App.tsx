import './App.css';
import React, { useState } from 'react';
import InputFeild from './components/InputFeild.tsx';
import Todo from './model';
import TodoList from './components/TodoList.tsx';

const App:React.FC = ()=> {

  const [priority, setPriority] = useState<number>(1);
  const [todo, setTodo] = useState<string>("")
 

  const [todos1, setTodos1] = useState<Todo[]>([])

  const [todos2, setTodos2] = useState<Todo[]>([])

  const [todos3, setTodos3] = useState<Todo[]>([])

  
  const handleAdd = (e:React.FormEvent)=>{
    e.preventDefault()
    if(todo){

      if(!priority || priority==1){
        setTodos1([...todos1,{id: Date.now(), todo, isDone:false, imp:priority}])
        setTodo("")
      }
      else if(priority === 2){
        setTodos2([...todos2,{id: Date.now(), todo, isDone:false, imp:priority}])
        setTodo("")
      }
      else if(priority === 3){
        setTodos3([...todos3,{id: Date.now(), todo, isDone:false, imp:priority}])
        setTodo("")
      }

      
    }
  }
  console.log(todo);
  return (
    <div className="App">
      <span className='heading'>Taskify</span>
      <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd}  priority={priority} setPriority={setPriority}/>
      <TodoList todos1={todos1} setTodos1={setTodos1} todos2={todos2} setTodos2={setTodos2} todos3={todos3} setTodos3={setTodos3}/>
    </div>
  );
}

export default App;