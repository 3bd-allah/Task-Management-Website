import React from "react";
import { FaAngellist } from "react-icons/fa";
import { Link, Form, useActionData, useNavigation } from 'react-router-dom';

const RegisterForm = () => {

  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  console.log(data);

  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: 25 }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                      <p className="text-center h6 mb-5 mx-1 mx-md-4 mt-4">
                        To make your time productive <FaAngellist />
                      </p>
                    </p>

                    <Form method="post" className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div
                          data-mdb-input-init
                          className="form-outline flex-fill mb-0"
                        >
                          {/* User Name */}
                          <label
                            className="form-label"
                            htmlFor="name"
                          >
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div
                          data-mdb-input-init
                          className="form-outline flex-fill mb-0"
                        >
                          {/* Email */}
                          <label
                            className="form-label"
                            htmlFor="email"
                          >
                            Your Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            required
                            name="email"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div
                          data-mdb-input-init
                          className="form-outline flex-fill mb-0"
                        >
                          {/* Password */}
                          <label
                            className="form-label"
                            htmlFor="password"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div
                          data-mdb-input-init
                          className="form-outline flex-fill mb-0"
                        >
                          {/* Confirm Password */}
                          <label
                            className="form-label"
                            htmlFor="confirmPassword"
                          >
                            Repeat your password
                          </label>
                          <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            required
                            className="form-control"
                          />
                        </div>
                      </div>

                      {/*Validation errors  */}

                      {data && data.message && <p className="text-danger">{data.message}</p>}
                      {data && data.detail &&
                        <ul>
                          {data.detail.split(" | ").map( err => <li key={err} className="text-danger">{err}</li> )}
                        </ul>
                      }

                      {
                        data && data.errors &&
                        <ul>
                          {Object.values(data.errors).map(err => <li key={err} className="text-danger">{err}</li>)}
                        </ul>
                      }

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-primary btn-lg"
                        >
                          {isSubmitting? 
                          'Submitting...' : 'Register'}
                        </button>
                        <br/>
                      </div>
                        <div className="text-center">
                          <p>
                            Already a user? <Link to="/login">login</Link>
                          </p>
                        </div>
                    </Form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
