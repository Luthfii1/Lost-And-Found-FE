import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../assets/bg-ui.png';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import Notification from '../components/Notifications/Notification';

const Register = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birth_date, setbirth_date] = useState('');
  const [jurusan_kuliah, setjurusan_kuliah] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('');
  const [isEmailAvailable, setIsEmailAvailable] = useState(true);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const options = [
    'ARSITEKTUR',
    'ARSI. INTERIOR',
    'TEKNIK BIOMEDIS',
    'TEKNIK BIOPROSES',
    'TEKNIK ELEKTRO',
    'TEKNIK INDUSTRI',
    'TEKNIK KIMIA',
    'TEKNIK KOMPUTER',
    'TEKNIK LINGKUNGAN',
    'TEKNIK MESIN',
    'TEKNIK METALURGI DAN MATERIAL',
    'TEKNIK PERKAPALAN',
    'TEKNIK SIPIL'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Email validation regex pattern
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Validate the email address using the regex pattern
      if (!emailPattern.test(email)) {
        setIsEmailValid(false);
        return;
      }

      const body = { email, username, password, name, birth_date, jurusan_kuliah };

      const response = await fetch('https://lost-and-found-be.vercel.app/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        setShowNotification(true);
        setNotificationMessage('Registration successful!');
        setNotificationType('success');
        setEmail('');
        setUsername('');
        setPassword('');
        setName('');
        setbirth_date('');
        setjurusan_kuliah('');
        setIsEmailAvailable(true);
        setIsUsernameAvailable(true);

        setTimeout(() => {
          navigate('/login');
        }, 2500);
      } else {
        setShowNotification(true);
        setNotificationMessage(data.error);
        setNotificationType('error');
        if (data.error === 'Email already exists') {
          setIsEmailAvailable(false);
        }
        if (data.error === 'Username already exists') {
          setIsUsernameAvailable(false);
        }
        if (data.error === 'Email and username already exists') {
          setIsEmailAvailable(false);
          setIsUsernameAvailable(false);
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  

  return (
    <div>
      <img className='fixed top-0 left-0 w-full h-screen object-cover -z-30' src={background} alt='background' />

      <div className='flex flex-col justify-start items-start pl-6 pt-6'>
        <h1 className='text-3xl md:text-5xl justify-start text-center font-bold text-black mb-1'>
          Let's get to know you!
        </h1>
        <h2 className='text-md font-medium mb-5 text-black'>complete your profile!</h2>
      </div>

      <div className='flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center bg-white rounded-xl shadow-xl pt-10 px-10 pb-2'>
          <h1 className='text-4xl font-bold mb-5 text-black'>Register</h1>
          <form className='flex flex-col justify-center items-center' onSubmit={handleSubmit}>
            <input
              className={`p-2 mb-5 rounded-md border-b w-11/12 sm:w-80 border-b-black text-black ${
                isEmailAvailable ? 'border-green-500' : 'border-red-500 bg-red-300'
              }`}
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsEmailValid(true); // Reset the email validation state
              }}
            />
            {!isEmailValid && <p className='text-red-500 text-sm'>Please enter a valid email address.</p>}
            <input
              className={`p-2 mb-5 rounded-md border-b w-11/12 sm:w-80 border-b-black text-black ${
                isUsernameAvailable ? 'border-green-500' : 'border-red-500 bg-red-300'
              }`}
              type='text'
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className='relative w-11/12 ml-2'>
              <input
                className='p-2 mb-5 rounded-md border-b  sm:w-80 border-b-black text-black'
                type={passwordVisible ? 'text' : 'password'}
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className='absolute right-3 top-3  text-black'>
                {passwordVisible ? (
                  <AiFillEyeInvisible size={20} onClick={togglePasswordVisibility} />
                ) : (
                  <AiFillEye size={20} onClick={togglePasswordVisibility} />
                )}
              </span>
            </div>
            <input
              className='p-2 mb-5 rounded-md border-b sm:w-80 w-11/12 border-b-black text-black'
              type='text'
              placeholder='Full Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className='p-2 mb-5 sm:w-80 rounded-md border-b w-11/12 border-b-black text-black'
              type='date'
              placeholder='Date of Birth'
              value={birth_date}
              onChange={(e) => setbirth_date(e.target.value)}
            />
            <select
              className='p-2 mb-5 rounded-md border-b text-xs w-11/12 sm:text-base border-b-black text-black'
              value={jurusan_kuliah}
              onChange={(e) => setjurusan_kuliah(e.target.value)}
            >
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button className='p-2 mb-2 rounded-md bg-yellow text-black font-semibold hover:bg-black hover:text-white'>
              Register
            </button>
          </form>
          <div className='flex justify-center items-center'>
            <button
              className='p-2 rounded-md bg-yellow text-black font-semibold hover:bg-black hover:text-white'
              onClick={() => navigate('/login')}
            >
              Back to Login
            </button>
          </div>
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

export default Register;
