import axios from "axios";
import { useEffect, useState } from "react";
import Add from '../../assets/plus.svg'
import Delete from '../../assets/delete.svg'
import Board from '../../assets/board.svg'
import Spinner from "../Spinner/Spinner";
import './todo.css'

export const Todo = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!text) {
      alert('Строка не может быть пустой');
      return;
    }
    const newData = {
      title: text,
    };

    try {
      setIsLoading(true);
      const response = await axios.post({
        url: 'http://localhost:5555/create-task',
        headers: {
          'Authorization': '',
        },
        newData
      }
        
      );

      if (response.data) {
        setIsLoading(false);
        setTodos([...todos, response.data.newTask]);
        setText('');
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getTasks = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:5555/tasks');
        if (response.data) {
          setIsLoading(false);
          setTodos(response.data.tasks);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTasks();
  }, []);

  const updateTask = async (id, isComplete) => {
    try {
      setIsLoading(true);
      const response = await axios.patch(`http://localhost:5555/tasks/${id}`, {
        isComplete: !isComplete,
      });
      console.log(response);
      if (response.data) {
        setIsLoading(false);
        const newData = todos.map((task) => {
          if (task._id === id) {
            return { ...task, isComplete: !isComplete };
          }
          return task;
        });
        setTodos(newData);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const deleteTask = async (id) => {
    try {
      setIsLoading(true);
      const response = await axios.delete(`http://localhost:5555/tasks/${id}`);
      if (response.data) {
        const newData = todos.filter((task) => task._id !== id);
        setTodos(newData);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAllTasks = async () => {
    try {
      setIsLoading(true);
      const response = await axios.delete('http://localhost:5555/tasks');
      if (response.data) {
        setTodos([]);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      <div className="container">
        <div className="todo">
          <form className="todo-form" action="POST" onSubmit={addTask}>
            <input
              type="text"
              value={text}
              placeholder="Добавить новую задачу"
              onChange={handleChange}
            />
            <button type="submit">
              Создать
              <img src={Add} alt="" />
            </button>
          </form>
          <div className="todo__filter">
            <div className="todo-filter__item">
              Cозданные задачи<span>{todos.length}</span>
            </div>
            <div className="todo-filter__item">
              Завершенные{' '}
              <span>{todos?.filter((task) => task.isComplete).length}</span>
            </div>
          </div>

          {todos.length > 0 ? (
            <ul className="todo__list">
                {isLoading && <Spinner />}
              {todos.map((task) => (
                <li className="todo__item">
                  <div
                    className="checkbox"
                    onClick={() => updateTask(task._id, task.isComplete)}
                  >
                    <span className={task.isComplete ? 'active' : ''}></span>
                  </div>
                  <p className={task.isComplete ? 'active' : ''}>
                    {task.title}
                  </p>
                  <img
                    src={Delete}
                    alt=""
                    onClick={() => deleteTask(task._id)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty">
              <img src={Board} alt="" />
              <p>
                У вас еще нет зарегистрированных задач <br /> Создавайте задачи
                и организуйте свои дела
              </p>
            </div>
          )}
        </div>
        <button className="deleteAllBtn" onClick={deleteAllTasks}>
          Удалить все задачи
        </button>
      </div>
    </div>
  );
}