import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const LoginPage = () => {
  const [currentState, setCurrentState] = useState("Signup")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setisDataSubmitted] = useState(false)

const {login} = useContext(AuthContext)

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (currentState === "Signup" && !isDataSubmitted) {
      setisDataSubmitted(true)
      return;
    }
    login(currentState === "Signup" ? 'signup': 'login',{fullName,email,password,bio})
  }
  return (
    <div
      className='flex min-h-screen bg-cover bg-center items-center
    justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl' >
      {/* left  */}

      <img src={assets.logo_big} alt=""
        className='w-[min(30vw,250px)]' />

      {/* right  */}

      <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white
      border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg' action="">
        <h2 className='flex justify-between items-center text-2xl font-medium'>

          {currentState}
          {isDataSubmitted && <img onClick={() => setisDataSubmitted(false)} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' />}
        </h2>
        {currentState === "Signup" && !isDataSubmitted
          && (
            <input onChange={(e) => setFullName(e.target.value)} value={fullName}
              type="text" className='p-2 border border-gray-500 rounded-md focus:outline-none' required placeholder='Full Name' />
          )}
        {!isDataSubmitted && (
          <>
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email"
              placeholder='Email Address' required
              className='p-2 border border-gray-500 rounded-md
            focus:outline-none focus:ring-2 focus:ring-indigo-500 '/>

            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password"
              placeholder='Password ' required
              className='p-2 border border-gray-500 rounded-md
            focus:outline-none focus:ring-2 focus:ring-indigo-500 '/>

          </>
        )}

        {
          currentState === "Signup" && isDataSubmitted && (
            <textarea onChange={(e) => setBio(e.target.value)} value={bio} rows={4} className='p-2 border border-gray-500 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-indigo-500'
              placeholder='Provide a short bio... '>

            </textarea>
          )
        }

        <button className=' bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none
        py-3  rounded-full cursor-pointer'>
          {currentState === "Signup" ? "Create Account" : "Login now"}
        </button>

        <div className='flex items-center gap-2 text-sm text-gray-500'>
          <input type="checkbox" required />
          <p>Agree to the terms of use & privacy policy </p>
          {/* <p className=' rounded-xl p-1 bg-gradient-to-r from-red-500 to-red-700 text-black '>Just do it</p> */}

        </div>

        <div className='flex flex-col gap-2'>
          {currentState === "Signup" ? (
            <p className='text-sm text-gray-600'>Already have an account? <span
              onClick={() => { setCurrentState("Login"); setisDataSubmitted(false) }} className='font-medium text-violet-500 cursor-pointer'>Login here</span></p>
          ) : (
            <p className='text-sm text-gray-600'>Create an account <span
              onClick={() => setCurrentState("Signup")} className='font-medium text-violet-500 cursor-pointer'>Click here</span></p>
          )}
        </div>

      </form>
    </div>
  )
}

export default LoginPage