import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './loginpage.css'

const LoginPage = () => {
  const [userName, setUsername] = useState('')
  const [userPassword, setPassword] = useState('')

  function addUserName (e) {
    setUsername(e.target.value)
  }
  function addUserPassword (e) {
    setPassword(e.target.value)
  }

  const loginUser = async (e) => {
    e.preventDefault()
    if(!userName || !userPassword) {
      alert('Вы не ввели логин или пароль');
      return;
    }

    const userData = {
      username: userName,
      password: userPassword
    }

    const response = await axios.post('http://localhost:5555/login', userData)
    if(response.data) {
      alert(`Приветствуем Вас, ${response.data.user.username}`);
      window.location.href = '/profile'
    } else {
      
    }
  }
 
  
  return (
    <div className='login'>
        <h1>Войти</h1>
        <form className="login__form" onSubmit={loginUser}>
            <input type="text" placeholder='usermane' onChange={addUserName}/>
            <input type="password" placeholder='password' onChange={addUserPassword}/>
            <button type='submit'>Войти</button>
            <div className='register-link'>Не зарегистрированы? <Link to='/register'>Регистрация</Link></div>
        </form>
    </div>
  );
};

export default LoginPage;
