import axios from 'axios';
import { useState } from 'react';
import { Navigate, redirect } from 'react-router-dom';
import './registerPage.css';

const RegisterPage = () => {
  const [userName, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [passConfirm, setConfirmedPass] = useState('');

  const fixUsername = (e) => {
    setUsername(e.target.value);
  };
  const fixPassword = (e) => {
    setPass(e.target.value);
  };
  const fixConfirmedPassword = (e) => {
    setConfirmedPass(e.target.value);
  };

  const createUser = async (e) => {
    e.preventDefault();

    if (!userName || !pass || !passConfirm) {
      alert('Все поля обязательны для заполнения');
      return;
    }

    if (pass !== passConfirm) {
        alert('Пароли не совпадают');
        return
    }
    

    const newUserData = {
      username: userName,
      password: pass,
    };
    try {
      const response = await axios.post(
        'http://localhost:5555/register',
        newUserData
      );
      if (response.data) {
        alert('Вы успешно зарегистрировались')
        window.location.href = '/login'
      }
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div className="register">
      <h1>Регистрация</h1>
      <form className="register__form" onSubmit={createUser}>
        <input type="text" placeholder="usermane" onChange={fixUsername} />
        <input type="password" placeholder="password" onChange={fixPassword} />
        <input
          type="password"
          placeholder="confirm password"
          onChange={fixConfirmedPassword}
        />
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default RegisterPage;
