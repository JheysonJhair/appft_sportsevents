
export default function ResetPassword() {
  return (
    <div className="authentication-reset-password d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
          <div className="col mx-auto">
            <div className="card">
              <div className="card-body">
                <div className="p-4">
                  <div className="mb-4 text-center">
                    <img src="assets/images/logo-icon.png" width={60} />
                  </div>
                  <div className="text-start mb-4">
                    <h5>Genrate New Password</h5>
                    <p className="mb-0">
                      We received your reset password request. Please enter your
                      new password!
                    </p>
                  </div>
                  <div className="mb-3 mt-4">
                    <label className="form-label">New Password</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Confirm password"
                    />
                  </div>
                  <div className="d-grid gap-2">
                    <button type="button" className="btn btn-primary">
                      Change Password
                    </button>{" "}
                    <a
                      href="authentication-login.html"
                      className="btn btn-light"
                    >
                      <i className="bx bx-arrow-back mr-1" />
                      Back to Login
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
