import { type } from '@testing-library/user-event/dist/type'
import { useEffect, useState } from 'react'
import logo from './images/logo.png'

const getLocalStorage = () => {
  let storedusers = localStorage.getItem('user')

  if (storedusers) {
    return JSON.parse(localStorage.getItem('user'))
  } else {
    return []
  }
}
const getLocalStorage1 = () => {
  let storedpage = localStorage.getItem('page')

  if (storedpage) {
    return JSON.parse(localStorage.getItem('page'))
  } else {
    return []
  }
}
const getLocalStorage2 = () => {
  let storedpage = localStorage.getItem('displaytext')

  if (storedpage) {
    return JSON.parse(localStorage.getItem('displaytext'))
  } else {
    return []
  }
}
const getLocalStorage3 = () => {
  let storedpage = localStorage.getItem('displayusername')

  if (storedpage) {
    return JSON.parse(localStorage.getItem('displayusername'))
  } else {
    return []
  }
}
function App() {
  const [form, setForm] = useState(1)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password1, setPassword1] = useState('')
  const [errorusername, setErrorusername] = useState('')
  const [erroremail, setErroremail] = useState('')
  const [errorpassword, setErrorpassword] = useState('')
  const [errorpassword1, setErrorpassword1] = useState('')
  const [users, setUsers] = useState(getLocalStorage())
  const [page, setPage] = useState(getLocalStorage1())
  const [loginemail, setLoginemail] = useState('')
  const [loginpassword, setLoginpassword] = useState('')
  const [erroremaillogin, setErroremaillogin] = useState('')
  const [errorpasswordlogin, setErrorpasswordlogin] = useState('')
  const [displayusername, setDisplayusername] = useState(getLocalStorage3())
  const [displaytext, setDisplaytext] = useState(getLocalStorage2())
  const [showpassword, setShowpassword] = useState(false)
  const [showpassword1, setShowpassword1] = useState(false)
  const [show, setShow] = useState(0)

  // handling login
  const handlesignup = (e) => {
    e.preventDefault()
    if (
      username === '' ||
      email === '' ||
      password === '' ||
      password !== password1 ||
      !email.includes('@ ' && '.')
    ) {
      if (username === '') {
        setErrorusername('please enter a valid username')
        setTimeout(setErrorusername, 5000)
      }
      if (email === '') {
        setErroremail('please enter a valid email')
        setTimeout(setErroremail, 5000)
      }
      if (!email.includes('@' && '.')) {
        setErroremail('please enter a valid email')
        setTimeout(setErroremail, 5000)
      }
      if (password.length < 8) {
        setErrorpassword('password length must be more than 8')
        setTimeout(setErrorpassword, 5000)
      }
      if (password !== password1) {
        setErrorpassword1('please input the exact password')
        setTimeout(setErrorpassword1, 5000)
      }
    } else {
      let authuser = users.filter((item) => {
        return item.contact.includes(email)
      })
      let authuser1 = users.filter((item) => {
        return item.person.includes(username)
      })
      if (authuser.length > 0) {
        authuser.map((item) => {
          if (item.contact === email) {
            setErroremail('email already exists, please choose another')
            setTimeout(setErroremail, 5000)
          }
        })
      } else if (authuser.length >= 0) {
        authuser1.map((item) => {
          if (item.person === username) {
            setErrorusername('username already exist, please choose another')
            setTimeout(setErrorusername, 5000)
          }
        })
      }
      if (authuser1.length <= 0) {
        const newuser = {
          id: new Date().getTime().toString(),
          person: username,
          contact: email,
          secret: password,
        }
        setUsers([...users, newuser])
        setEmail('')
        setPassword('')
        setPassword1('')
        setUsername('')
        setDisplayusername(newuser.person)
        setDisplaytext('Thanks for signing up')
        setPage(2)
      }
    }
  }
  console.log(users)
  // handling Login
  const handlelogin = (e) => {
    e.preventDefault()
    // if true
    if (!loginemail || !loginpassword) {
      if (loginemail === '') {
        setErroremaillogin('please enter an email')
        setTimeout(setErroremaillogin, 5000)
      } else {
        setErrorpasswordlogin('please input your password')
        setTimeout(setErrorpasswordlogin, 5000)
      }
    } else {
      let authuser = users.filter((item) => {
        return item.contact.includes(loginemail)
      })
      if (authuser.length > 0) {
        authuser.map((item) => {
          if (item.secret === loginpassword) {
            setPage(2)
            setLoginemail('')
            setLoginpassword('')
            setDisplayusername(item.person)
            setDisplaytext('Welcome back !')
          } else {
            setErrorpasswordlogin('please provide the right password')
            setTimeout(setErrorpasswordlogin, 5000)
          }
        })
      } else {
        setErroremaillogin('please enter a registered email')
        setTimeout(setErroremaillogin, 5000)
      }
    }
  }

  // log out
  const handlelogout = () => {
    setPage(1)
    setForm(2)
    setEmail('')
    setPassword('')
    setPassword1('')
    setUsername('')
    setLoginemail('')
    setLoginpassword('')
  }
  // handling delete
  const handledelete = () => {
    let newusers = users.filter((item) => {
      return item.person !== displayusername
    })
    setUsers(newusers)
    setPage(1)
    setForm(2)
    setDisplayusername('')
  }
  // updatung local storage
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(users))
  }, [users])
  useEffect(() => {
    localStorage.setItem('page', JSON.stringify(page))
  }, [page])
  useEffect(() => {
    localStorage.setItem('displaytext', JSON.stringify(displaytext))
  }, [displaytext])
  useEffect(() => {
    localStorage.setItem('displayusername', JSON.stringify(displayusername))
  }, [displayusername])
  useEffect(() => {
    if (page === []) {
      setPage(1)
    }
  }, [page])
  console.log(username)
  console.log(page)
  console.log(show)
  return (
    <>
      {page === 1 ? (
        // login/sign up
        <div className='min-h-screen flex justify-center items-center backedground font-sans  '>
          {/* form */}
          <div className='bg-white rounded-sm shadow-sm shadow-white px-6 py-8 flex flex-col justify-center items-center space-y-8 xl:space-y-6 w-8/12 sm:w-8/12 md:w-6/12 xl:w-5/12 my-4 '>
            {/* welcocome message */}
            <div className='flex flex-col justify-center items-center space-y-2'>
              {/* logo */}
              <div>
                <img src={logo} alt='' />
              </div>
              {/* welcome text */}
              {/* <h1 className='text-xs max-w-xs'>
              Welcome to Digital Boost platform
            </h1> */}
            </div>
            {/* header */}
            <div className='flex justify-center items-start gap-14 w-full '>
              {/* sign up */}
              <div onClick={() => setForm(1)} className='cursor-pointer'>
                <h1 className='font-bold text-lg'>Sign Up</h1>
                {form === 1 ? (
                  <div className='border mt-1 border-b-1 border-softRed '></div>
                ) : (
                  ''
                )}
              </div>
              {/* login */}
              <div onClick={() => setForm(2)} className='cursor-pointer'>
                <h1 className='font-bold text-lg'>Login</h1>
                {form === 2 ? (
                  <div className='border mt-1 border-b-1 border-softRed '></div>
                ) : (
                  ''
                )}
              </div>
            </div>
            {/* form details */}
            {form === 1 ? (
              //sign up form
              <form className=' w-full' onSubmit={handlesignup}>
                <div className='space-y-3 md:space-y-4 max-w-xs mx-auto'>
                  {/* user name */}
                  <div className='flex flex-col gap-2'>
                    <label htmlFor='username' className='text-sm'>
                      Username
                    </label>
                    <input
                      type='text'
                      placeholder='Input your username'
                      className={`border-blue ${
                        errorusername ? 'border-red-500 border-2' : ''
                      } border px-2 py-1 outline-veryLightGray text-xs`}
                      value={username}
                      onChange={(e) =>
                        setUsername(e.target.value.toLowerCase())
                      }
                    />
                    <p className='text-xs text-red-500'>{errorusername}</p>
                  </div>
                  {/* Email name */}
                  <div className='flex flex-col gap-2'>
                    <label htmlFor='email' className='text-sm'>
                      Email Address
                    </label>
                    <input
                      type='email'
                      placeholder='Input your Email address '
                      autoComplete='email'
                      className={`border-blue ${
                        erroremail ? 'border-red-500 border-2' : ''
                      } border px-2 py-1 outline-veryLightGray text-xs`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    />
                    <p className='text-xs text-red-500'>{erroremail}</p>
                  </div>
                  {/* password */}
                  <div className='flex flex-col gap-2'>
                    <div className='flex justify-between items-center'>
                      <label htmlFor='email' className='text-sm'>
                        Password
                      </label>
                      <div className='flex justify-center items-center gap-1'>
                        <input
                          type='checkbox'
                          className=''
                          onClick={() => setShowpassword(!showpassword)}
                        />
                        <h1 className='text-xs'>show password</h1>
                      </div>
                    </div>

                    <input
                      type={showpassword ? 'text' : 'password'}
                      placeholder='Input your password '
                      className={`border-blue ${
                        errorpassword ? 'border-red-500 border-2' : ''
                      } border px-2 py-1 outline-veryLightGray text-xs`}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className='text-xs text-red-500'>{errorpassword}</p>
                  </div>
                  {/* confirm  password */}
                  <div className='flex flex-col gap-2'>
                    <label htmlFor='email' className='text-sm'>
                      Confirm Password
                    </label>
                    <input
                      type={showpassword ? 'text' : 'password'}
                      placeholder='Confirm your password '
                      className={`border-blue ${
                        errorpassword1 ? 'border-red-500 border-2' : ''
                      } border px-2 py-1 outline-veryLightGray text-xs`}
                      value={password1}
                      onChange={(e) => setPassword1(e.target.value)}
                    />
                    <p className='text-xs text-red-500'>{errorpassword1}</p>
                  </div>
                  {/* submit */}
                  <button
                    type='submit'
                    className='bg-softRed text-white text-sm px-4 rounded-md shadow py-2 flex justify-center items-center mx-auto '
                  >
                    Sign up
                  </button>
                </div>
              </form>
            ) : (
              // login
              <form className=' w-full' onSubmit={handlelogin}>
                <div className='space-y-6 max-w-xs mx-auto'>
                  {/* Email name */}
                  <div className='flex flex-col gap-2'>
                    <label htmlFor='email' className='text-sm'>
                      Email Address
                    </label>
                    <input
                      type='email'
                      placeholder='Input your Email address '
                      className={`border-blue ${
                        erroremaillogin ? 'border-red-500 border-2' : ''
                      } border px-2 py-1 outline-veryLightGray text-xs`}
                      value={loginemail}
                      onChange={(e) =>
                        setLoginemail(e.target.value.toLowerCase())
                      }
                    />
                    <p className='text-xs text-red-500'>{erroremaillogin}</p>
                  </div>
                  {/* password */}
                  <div className='flex flex-col gap-2'>
                    <div className='flex justify-between items-center'>
                      <label htmlFor='email' className='text-sm'>
                        Password
                      </label>
                      <div className='flex justify-center items-center gap-1'>
                        <input
                          type='checkbox'
                          className=''
                          onClick={() => setShowpassword1(!showpassword1)}
                        />
                        <h1 className='text-xs'>show password</h1>
                      </div>
                    </div>
                    <input
                      type={showpassword1 ? 'text' : 'password'}
                      placeholder='Input your password '
                      className={`border-blue ${
                        errorpasswordlogin ? 'border-red-500 border-2' : ''
                      } border px-2 py-1 outline-veryLightGray text-xs`}
                      value={loginpassword}
                      onChange={(e) => setLoginpassword(e.target.value)}
                    />
                    <p className='text-xs text-red-500'>{errorpasswordlogin}</p>
                  </div>
                  {/* submit */}
                  <button
                    type='submit'
                    className='bg-softRed text-white text-sm px-4 rounded-md shadow py-2 flex justify-center items-center mx-auto '
                  >
                    Login
                  </button>
                </div>
              </form>
            )}

            {/* footer */}
            <div>
              {form === 1 ? (
                <h1 className='text-xs'>
                  Already have an account ?{' '}
                  <span
                    className='underline cursor-pointer'
                    onClick={() => setForm(2)}
                  >
                    Login
                  </span>
                </h1>
              ) : (
                <h1 className='text-xs'>
                  Don't have an account ?
                  <span
                    className='underline cursor-pointer'
                    onClick={() => setForm(1)}
                  >
                    {' '}
                    Sign Up
                  </span>
                </h1>
              )}
            </div>
          </div>
        </div>
      ) : page === 2 ? (
        // home page
        <div className='min-h-screen flex justify-center items-center  font-sans px-6  '>
          {/* content */}
          <div className='bg-veryLightGray text-white px-4 md:px-6 xl:px-8 py-6 rounded-md shadow-md space-y-6 text-center max-w-xs md:max-w-md xl:max-w-lg md:space-y-6 xl:space-y-6'>
            <div className='space-y-1'>
              <p>{displaytext}</p>
              <h1 className='font-bold text-lg md:text-xl xl:text-2xl'>
                {displayusername}
              </h1>
            </div>
            <p className='text-xs tracking-widest md:text-sm '>
              This application was built to understand the fundermentals of
              Login/Signup Authentications in javascripts. i made special effort
              to ensure that all your registered accounts are stored in your
              systems local storage, and upon clicking of the delete button the
              account shall be deleted. Upmost care was taken during the
              development of the sign up page to ensure that a registered or
              taken email and username are flagged so you know whats taken and
              whats not. It is also worthy to note that data persistance was
              added so no matter the page you are on, on refresh you do not
              loose your data. Awesome right! Immpressed by what you see? feel
              free to drop a positive comment. Not in the mood ?
              <strong> then log out!</strong>
            </p>
            <div className='flex justify-center items-center space-x-4'>
              <button
                className='bg-white text-veryLightGray font-bold px-3 md:px-6 py-1 rounded-sm cursor-pointer'
                onClick={() => handlelogout()}
              >
                Log Out
              </button>
              <button
                className='bg-softRed text-veryLightGray font-bold px-3 md:px-6 py-1 rounded-sm cursor-pointer'
                onClick={() => handledelete()}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      {/* on load */}
      <div
        className={`${
          page == ''
            ? ' min-h-screen flex justify-center items-center backedground font-sans'
            : 'hidden'
        } `}
      >
        {/* form */}
        <div className='bg-white rounded-sm shadow-sm shadow-white px-6 py-8 flex flex-col justify-center items-center space-y-8 xl:space-y-6 w-8/12 sm:w-8/12 md:w-6/12 xl:w-5/12 my-4 '>
          {/* welcocome message */}
          <div className='flex flex-col justify-center items-center space-y-2'>
            {/* logo */}
            <div>
              <img src={logo} alt='' />
            </div>
            {/* welcome text */}
            {/* <h1 className='text-xs max-w-xs'>
              Welcome to Digital Boost platform
            </h1> */}
          </div>
          {/* header */}
          <div className='flex justify-center items-start gap-14 w-full '>
            {/* sign up */}
            <div onClick={() => setForm(1)} className='cursor-pointer'>
              <h1 className='font-bold text-lg'>Sign Up</h1>
              {form === 1 ? (
                <div className='border mt-1 border-b-1 border-softRed '></div>
              ) : (
                ''
              )}
            </div>
            {/* login */}
            <div onClick={() => setForm(2)} className='cursor-pointer'>
              <h1 className='font-bold text-lg'>Login</h1>
              {form === 2 ? (
                <div className='border mt-1 border-b-1 border-softRed '></div>
              ) : (
                ''
              )}
            </div>
          </div>
          {/* form details */}
          {form === 1 ? (
            //sign up form
            <form className=' w-full' onSubmit={handlesignup}>
              <div className='space-y-3 md:space-y-4 max-w-xs mx-auto'>
                {/* user name */}
                <div className='flex flex-col gap-2'>
                  <label htmlFor='username' className='text-sm'>
                    Username
                  </label>
                  <input
                    type='text'
                    placeholder='Input your username'
                    className={`border-blue ${
                      errorusername ? 'border-red-500 border-2' : ''
                    } border px-2 py-1 outline-veryLightGray text-xs`}
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase())}
                  />
                  <p className='text-xs text-red-500'>{errorusername}</p>
                </div>
                {/* Email name */}
                <div className='flex flex-col gap-2'>
                  <label htmlFor='email' className='text-sm'>
                    Email Address
                  </label>
                  <input
                    type='email'
                    placeholder='Input your Email address '
                    autoComplete='email'
                    className={`border-blue ${
                      erroremail ? 'border-red-500 border-2' : ''
                    } border px-2 py-1 outline-veryLightGray text-xs`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  />
                  <p className='text-xs text-red-500'>{erroremail}</p>
                </div>
                {/* password */}
                <div className='flex flex-col gap-2'>
                  <div className='flex justify-between items-center'>
                    <label htmlFor='email' className='text-sm'>
                      Password
                    </label>
                    <div className='flex justify-center items-center gap-1'>
                      <input
                        type='checkbox'
                        className=''
                        onClick={() => setShowpassword(!showpassword)}
                      />
                      <h1 className='text-xs'>show password</h1>
                    </div>
                  </div>

                  <input
                    type={showpassword ? 'text' : 'password'}
                    placeholder='Input your password '
                    className={`border-blue ${
                      errorpassword ? 'border-red-500 border-2' : ''
                    } border px-2 py-1 outline-veryLightGray text-xs`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <p className='text-xs text-red-500'>{errorpassword}</p>
                </div>
                {/* confirm  password */}
                <div className='flex flex-col gap-2'>
                  <label htmlFor='email' className='text-sm'>
                    Confirm Password
                  </label>
                  <input
                    type={showpassword ? 'text' : 'password'}
                    placeholder='Confirm your password '
                    className={`border-blue ${
                      errorpassword1 ? 'border-red-500 border-2' : ''
                    } border px-2 py-1 outline-veryLightGray text-xs`}
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                  />
                  <p className='text-xs text-red-500'>{errorpassword1}</p>
                </div>
                {/* submit */}
                <button
                  type='submit'
                  className='bg-softRed text-white text-sm px-4 rounded-md shadow py-2 flex justify-center items-center mx-auto '
                >
                  Sign up
                </button>
              </div>
            </form>
          ) : (
            // login
            <form className=' w-full' onSubmit={handlelogin}>
              <div className='space-y-6 max-w-xs mx-auto'>
                {/* Email name */}
                <div className='flex flex-col gap-2'>
                  <label htmlFor='email' className='text-sm'>
                    Email Address
                  </label>
                  <input
                    type='email'
                    placeholder='Input your Email address '
                    className={`border-blue ${
                      erroremaillogin ? 'border-red-500 border-2' : ''
                    } border px-2 py-1 outline-veryLightGray text-xs`}
                    value={loginemail}
                    onChange={(e) =>
                      setLoginemail(e.target.value.toLowerCase())
                    }
                  />
                  <p className='text-xs text-red-500'>{erroremaillogin}</p>
                </div>
                {/* password */}
                <div className='flex flex-col gap-2'>
                  <div className='flex justify-between items-center'>
                    <label htmlFor='email' className='text-sm'>
                      Password
                    </label>
                    <div className='flex justify-center items-center gap-1'>
                      <input
                        type='checkbox'
                        className=''
                        onClick={() => setShowpassword1(!showpassword1)}
                      />
                      <h1 className='text-xs'>show password</h1>
                    </div>
                  </div>
                  <input
                    type={showpassword1 ? 'text' : 'password'}
                    placeholder='Input your password '
                    className={`border-blue ${
                      errorpasswordlogin ? 'border-red-500 border-2' : ''
                    } border px-2 py-1 outline-veryLightGray text-xs`}
                    value={loginpassword}
                    onChange={(e) => setLoginpassword(e.target.value)}
                  />
                  <p className='text-xs text-red-500'>{errorpasswordlogin}</p>
                </div>
                {/* submit */}
                <button
                  type='submit'
                  className='bg-softRed text-white text-sm px-4 rounded-md shadow py-2 flex justify-center items-center mx-auto '
                >
                  Login
                </button>
              </div>
            </form>
          )}

          {/* footer */}
          <div>
            {form === 1 ? (
              <h1 className='text-xs'>
                Already have an account ?{' '}
                <span
                  className='underline cursor-pointer'
                  onClick={() => setForm(2)}
                >
                  Login
                </span>
              </h1>
            ) : (
              <h1 className='text-xs'>
                Don't have an account ?
                <span
                  className='underline cursor-pointer'
                  onClick={() => setForm(1)}
                >
                  {' '}
                  Sign Up
                </span>
              </h1>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
