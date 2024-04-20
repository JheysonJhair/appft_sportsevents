
export function Register() {
  return (
    <div className="d-flex align-items-center justify-content-center my-5">
      <div className="container-fluid">
        <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
          <div className="col mx-auto">
            <div className="card mb-0">
              <div className="card-body">
                <div className="p-4">
                  <div className="mb-3 text-center">
                    <img src="assets/images/logo-icon.png" width={60} />
                  </div>
                  <div className="text-center mb-4">
                    <h5>Rocker Admisssn</h5>
                    <p className="mb-0">
                      Please fill the below details to create your account
                    </p>
                  </div>
                  <div className="form-body">
                    <form className="row g-3">
                      <div className="col-12">
                        <label htmlFor="inputUsername" className="form-label">
                          Username
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="inputUsername"
                          placeholder="Jhon"
                        />
                      </div>
                      <div className="col-12">
                        <label
                          htmlFor="inputEmailAddress"
                          className="form-label"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="inputEmailAddress"
                          placeholder="example@user.com"
                        />
                      </div>
                      <div className="col-12">
                        <label
                          htmlFor="inputChoosePassword"
                          className="form-label"
                        >
                          Password
                        </label>
                        <div className="input-group" id="show_hide_password">
                          <input
                            type="password"
                            className="form-control border-end-0"
                            id="inputChoosePassword"
                            defaultValue={12345678}
                            placeholder="Enter Password"
                          />{" "}
                          <a
                            href="#"
                            className="input-group-text bg-transparent"
                          >
                            <i className="bx bx-hide" />
                          </a>
                        </div>
                      </div>
                      <div className="col-12">
                        <label
                          htmlFor="inputSelectCountry"
                          className="form-label"
                        >
                          Country
                        </label>
                        <select
                          className="form-select"
                          id="inputSelectCountry"
                          aria-label="Default select example"
                        >
                          <option selected>India</option>
                          <option value={1}>United Kingdom</option>
                          <option value={2}>America</option>
                          <option value={3}>Dubai</option>
                        </select>
                      </div>
                      <div className="col-12">
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckChecked"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexSwitchCheckChecked"
                          >
                            I read and agree to Terms &amp; Conditions
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-grid">
                          <button type="submit" className="btn btn-primary">
                            Sign up
                          </button>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="text-center ">
                          <p className="mb-0">
                            Already have an account?{" "}
                            <a href="authentication-signin.html">
                              Sign in here
                            </a>
                          </p>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="login-separater text-center mb-5">
                    {" "}
                    <span>OR SIGN UP WITH EMAIL</span>
                    <hr />
                  </div>
                  <div className="list-inline contacts-social text-center">
                    <a
                      href="#"
                      className="list-inline-item bg-facebook text-white border-0 rounded-3"
                    >
                      <i className="bx bxl-facebook" />
                    </a>
                    <a
                      href="#"
                      className="list-inline-item bg-twitter text-white border-0 rounded-3"
                    >
                      <i className="bx bxl-twitter" />
                    </a>
                    <a
                      href="#"
                      className="list-inline-item bg-google text-white border-0 rounded-3"
                    >
                      <i className="bx bxl-google" />
                    </a>
                    <a
                      href="#"
                      className="list-inline-item bg-linkedin text-white border-0 rounded-3"
                    >
                      <i className="bx bxl-linkedin" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*end row*/}
      </div>
    </div>
  );
}
