import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import NoteAlert from '../context/notes/NoteAlert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons'

function Signin(props) {
    const context = useContext(NoteAlert)
    const {alertTime} = context

    const [newAcc, setNewAcc] = useState({name: "", email: "", password: "", cpassword:""})

    const navigate = useNavigate()

    const onChange = (e) => {
        setNewAcc({...newAcc, [e.target.name]: e.target.value})
    }

    const [showPassword, setShowPassword] = useState("password")
    const showPasswordNow = () => {
      setShowPassword("text")
    }

    const hidePasswordNow = () => {
      setShowPassword("password")
    }

    const [showPassword2, setShowPassword2] = useState("password")
    const showPasswordNow2 = () => {
      setShowPassword2("text")
    }

    const hidePasswordNow2 = () => {
      setShowPassword2("password")
    }

    const handleClick = async (e) => {
        e.preventDefault()
        props.setProgress(20)
        if (newAcc.password === newAcc.cpassword) {
            const response = await fetch(process.env.REACT_APP_URL + process.env.REACT_APP_SIGNIN_URL, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({name: newAcc.name, email: newAcc.email, password: newAcc.password }),
              });
              const json = await response.json()
              console.log(json)
              props.setProgress(70)
              if (json.success) {
                localStorage.setItem("token", json.authtoken)
                alertTime(true, "Success", "Account Created Successfully", "bg-green-200")
                navigate('/')
                props.setProgress(100)
              }
              else {
                alertTime(true, "Fail", "Fill The Form Properly or Try Another Email", "bg-red-300")
                props.setProgress(100)
              }
        }
        else {
            alertTime(true, "Fail", "Your Password And Confirm Password Didn't Match", "bg-red-300")
            props.setProgress(100)
        }
    }

  return (
    <div>
        <form onSubmit={handleClick}>
            <div className='w-full flex items-center justify-center'>
                <div className='bg-white drop-shadow-2xl rounded-xl w-[90%] sm:w-[60%] 2xl:w-[27%] max-w-[500px] flex flex-col justify-center gap-y-3 px-7 py-12 mt-5'>
                    <h1 className='font-bold text-3xl'>Register Now</h1>
                    <p className='font-medium text-slate-700 -mt-2 mb-3'>Access Your Notes, Anytime, Anywhere</p>
                    <div className='info w-full relative mb-3'>
                        <input id='name' className='w-full rounded-lg h-14 border-[1.5px] border-slate-500 px-3' name='name' value={newAcc.name} type="text" onChange={onChange} required placeholder=''/>
                        <label htmlFor="name" className='pointer-events-none absolute top-[50%] translate-y-[-50%]  left-3'>Full Name</label>
                        <FontAwesomeIcon icon={faUser} className='pointer-events-none absolute top-[50%] translate-y-[-50%] right-4' />
                    </div>
                    <div className='info w-full relative mb-3'>
                        <input id='email' className='w-full rounded-lg h-14 border-[1.5px] border-slate-500 px-3' name='email' value={newAcc.email} type="text" onChange={onChange} required placeholder=''/>
                        <label htmlFor="email" className='pointer-events-none absolute top-[50%] translate-y-[-50%]  left-3'>Email</label>
                        <FontAwesomeIcon icon={faEnvelope} className='pointer-events-none absolute top-[50%] translate-y-[-50%] right-4' />
                    </div>
                    <div className='info w-full relative'>
                        <input  className='w-full rounded-lg h-14 border-[1.5px] border-slate-500 px-3' name='password' value={newAcc.password} type={showPassword} onChange={onChange} required placeholder=''/>
                        <label htmlFor="password" className='pointer-events-none absolute top-[50%] translate-y-[-50%] left-3'>Password</label>
                        {showPassword==="password" ? <FontAwesomeIcon icon={faEyeSlash} className='cursor-pointer absolute top-[50%] translate-y-[-50%] right-4' onClick={showPasswordNow} />:
                        <FontAwesomeIcon icon={faEye} className='cursor-pointer absolute top-[50%] translate-y-[-50%] right-4' onClick={hidePasswordNow} />}
                    </div>
                    <div className='info w-full relative'>
                        <input  className='w-full rounded-lg h-14 border-[1.5px] border-slate-500 px-3' name='cpassword' value={newAcc.cpassword} type={showPassword2} onChange={onChange} required placeholder=''/>
                        <label htmlFor="password" className='pointer-events-none absolute top-[50%] translate-y-[-50%] left-3'>Confirm Password</label>
                        {showPassword2==="password" ? <FontAwesomeIcon icon={faEyeSlash} className='cursor-pointer absolute top-[50%] translate-y-[-50%] right-4' onClick={showPasswordNow2} />:
                        <FontAwesomeIcon icon={faEye} className='cursor-pointer absolute top-[50%] translate-y-[-50%] right-4' onClick={hidePasswordNow2} />}
                    </div>
                    <div className='w-full mt-2'>
                        <button type='submit' className='w-full rounded-full bg-blue-700 text-white font-medium text-xl py-3'>Create a new account</button>
                        <p className='text-center mt-3'>Already have a account <Link to="/login" className='font-bold'>Login</Link></p>
                    </div>
                </div>
            </div>
        </form>
    </div>
  )
}

export default Signin