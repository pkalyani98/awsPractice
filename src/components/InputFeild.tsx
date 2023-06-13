import React from 'react';
import './styles.css';

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
  setPriority: React.Dispatch<React.SetStateAction<number>>;
  priority: number;
}

const InputFeild = ({ todo, setTodo, handleAdd, priority, setPriority }: Props) => {
  return (
    <form action='' className='input' onSubmit={handleAdd}>
      <input
        type='input'
        placeholder='Enter a task'
        className='input__box'
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <input
        type='input'
        placeholder='Enter Priority'
        value={priority}
        onChange={(e) => setPriority(parseInt(e.target.value))}
        className='input__box'
      />
      <button className='input__submit' type='submit'>
        GO
      </button>
    </form>
  );
};

export default InputFeild;
