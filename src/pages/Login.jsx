import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import React from 'react';
import background from '../assets/bg-ui.png';
import Notification from '../components/Notifications/Notification';

const Login = ({ setAuth }) => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [input, setInput] = useState({
    username: '',
    password: '',
  });

  const { username, password } = input;

  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { username, password };
      
      const response = await fetch('https://lost-and-found-be.vercel.app/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setAuth(true);
        // Send the id of the user to the homepage
        localStorage.setItem('user_id', data.user_id);
        setShowNotification(true);
        setNotificationMessage('Login successful!');
        setNotificationType('success');
        navigate('/homepage');
      }

      if (response.status === 401) {
        setAuth(false);
        setShowNotification(true);
        setNotificationMessage('Invalid credentials!');
        setNotificationType('error');
        setInput({ username: '', password: '' });
      }

      if (response.status === 500) {
        setAuth(false);
        setShowNotification(true);
        setNotificationMessage('Server error!');
        setNotificationType('error');
        setInput({ username: '', password: '' });
      }

      console.log(data);

    } catch (err) {
      console.error(err.message);  
    }
  };

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('');
  
  

  return (
    <div>
      {/* Add background image for login page, set in background of login form */}
      <img className='fixed top-0 left-0 w-full h-screen object-cover -z-30' src={background} alt='background' />

      {/* Add messages "Welcome to Lost and Found" in Title and subtitle of "find your lost item!*/}
      <div className='flex flex-col justify-center items-center pt-[1rem]'>
        <h1 className='text-3xl md:text-5xl justify-center text-center font-bold text-black mb-1'>Welcome to <br></br>Lost and Found</h1>
        <h2 className='text-md font-medium mb-5 text-black'>Find your lost item!</h2>
        <h2 className='text-lg font-medium font-medium mb-5 text-black'>karena terjadinya perubahan database, tolong register ulang ya guys ^_^!</h2>
      </div>

      {/* Add login form */}
      <div className='flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center bg-white rounded-xl shadow-xl px-10 py-5'>
          <h1 className='text-4xl font-bold mb-5 text-black'>Login</h1>
          <form 
            className='flex flex-col justify-center items-center'
            onSubmit={onSubmitForm}
            >
            <input 
              className='p-2 mb-5 rounded-md border-b border-b-black text-black' 
              type='text' 
              placeholder='Username'
              value={username}
              name='username'
              onChange={(e) => onChange(e)}
            />
            {/* When icon eyes clicked, could see the password */}
            <div className='relative'>
              <input 
                className='p-2 mb-5 rounded-md border-b border-b-black text-black' 
                type={passwordVisible ? 'text' : 'password'} 
                placeholder='Password' 
                value={password}
                name='password'
                onChange={(e) => onChange(e)}
              />
              <span className='absolute right-3 top-3 text-black'>
                {passwordVisible ? (
                  <AiFillEyeInvisible size={20} onClick={togglePasswordVisibility} />
                ) : (
                  <AiFillEye size={20} onClick={togglePasswordVisibility} />
                )}
              </span>
            </div>
            <button 
              className='p-2 rounded-xl hover:bg-black hover:text-white bg-yellow text-black' 
              type='submit'
            >Login</button>
          </form>

          <div className='flex justify-center items-center mt-5'>
            <p className='mr-2 text-black'>Forget Password?</p>
            <a className='text-blue-500 underline' href='/'>Click Here</a>
          </div>
          <div className='flex justify-center items-center'>
            <p className='mr-2 text-black'>Don't have an account?</p>
            <a className='text-blue-500 underline hover:cursor-pointer' onClick={() => navigate('/register')}>Register</a>
          </div>
        </div>
      </div>

      {/* Divider and give option of continue with google or SSO */}
      <div className='flex justify-center items-center mt-5'>
        <div className='flex justify-center items-center'>
          <div className='w-1/3 h-1 bg-black'></div>
          <p className='mx-2 text-black'>or</p>
          <div className='w-1/3 h-1 divide-y bg-black'></div>
        </div>
      </div>
      {/* Button google and SSO as a column */}
      <div className='flex justify-center items-center mt-5'>
        <div className='flex flex-col justify-center items-center'>
          <button className='px-10 w-15 rounded-xl hover:bg-black hover:text-white bg-yellow text-black mb-4'>Continue with Google</button>
          <button className='px-10 w-15 rounded-xl hover:bg-black hover:text-white bg-yellow text-black'>Continue with SSO</button>
        </div>
      </div>
      {showNotification && (
        <Notification
          message={notificationMessage}
          type={notificationType}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default Login;
