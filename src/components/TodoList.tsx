import React from 'react';
import Todo from '../model';
import SingleTodo from './SingleTodo';
import './styles.css';

interface Props {
  todos1: Todo[];
  setTodos1: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos2: Todo[];
  setTodos2: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos3: Todo[];
  setTodos3: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList = ({ todos1, setTodos1, todos2, setTodos2, todos3, setTodos3 }: Props) => {
  return (
    <div className='todos'>
      <div className='priority__1'>
        {todos1
          .filter((todo) => !todo.isDone)
          .map((todo) => (
            <SingleTodo todo={todo} key={todo.id} todos={todos1} setTodos={setTodos1} />
          ))}
        {todos1
          .filter((todo) => todo.isDone)
          .map((todo) => (
            <SingleTodo todo={todo} key={todo.id} todos={todos1} setTodos={setTodos1} />
          ))}
      </div>
      <div className='priority__2'>
        {todos2
          .filter((todo) => !todo.isDone)
          .map((todo) => (
            <SingleTodo todo={todo} key={todo.id} todos={todos2} setTodos={setTodos2} />
          ))}
        {todos2
          .filter((todo) => todo.isDone)
          .map((todo) => (
            <SingleTodo todo={todo} key={todo.id} todos={todos2} setTodos={setTodos2} />
          ))}
      </div>
      <div className='priority__3'>
        {todos3
          .filter((todo) => !todo.isDone)
          .map((todo) => (
            <SingleTodo todo={todo} key={todo.id} todos={todos3} setTodos={setTodos3} />
          ))}
        {todos3
          .filter((todo) => todo.isDone)
          .map((todo) => (
            <SingleTodo todo={todo} key={todo.id} todos={todos3} setTodos={setTodos3} />
          ))}
      </div>
    </div>
  );
};

export default TodoList;
