import React from 'react'
import { FaAngellist } from "react-icons/fa";
import { Link, Form, useActionData, useNavigation } from 'react-router-dom';
const LoginForm = () => {
  
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting' ;
  return (
    <>
      <section style={{ backgroundColor: "#eee" }} className='p-5'>
        <p className="text-center h1 fw-bold mb- mx-1 mx-md-4 mt-4 p-2">
          Sign in to your account
          <p className="text-center h6 mb- mx-1 mx-md-4 mt-4">
            To add tour tasks <FaAngellist />
          </p>
        </p>
        <Form method='POST' className='shadow p-5 m-5 bg-body-tertiary card w-25 m-auto border rounded ' >
        

          {/* <!-- Email input --> */}
          <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label" htmlFor="email">Email address</label>
            <input type="email" id="email" name='email' className="form-control" required />
          </div>

          {/* <!-- Password input --> */}
          <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label" htmlFor="password">Password</label>
            <input type="password" id="password" name='password' className="form-control" required />
          </div>
          
          {/* Errors validation*/}
          {
            data && data.message && <p className='text-danger'>{data.message}</p>
          }

          {/* <!-- Submit button --> */}
          <button  type="submit" data-mdb-button-init data-mdb-ripple-init disabled={isSubmitting} className="btn btn-primary btn-block mb-4">
            {isSubmitting?(
              <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            ) : 'Sign in'}
          </button>

          {/* <!-- Register buttons --> */}
          <div className="text-center">
            <p>Not a member? <Link to='/register'>Register</Link></p>
          </div>
    </Form>
      </section>
    </>
  )
}

export default LoginForm