import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const router = useNavigate();

  const Login = () => {
    if (username === '' || password === '') {
      setError('Enter your username and password');
    } else if (username === 'tamnu' && password === '456789@X') {
      router('/employee');
    } else {
      setError('Wrong username or password ><');
    }
  };
  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card text-white"
              style={{ borderRadius: '1rem', backgroundColor: '#3b3939' }}
            >
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your username and password!
                  </p>

                  <div
                    data-mdb-input-init
                    className="form-outline form-white mb-4"
                  >
                    <input
                      type="text"
                      id="typeEmailX"
                      className="form-control form-control-lg"
                      placeholder="username"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setUsername(event.target.value);
                      }}
                    />
                  </div>

                  <div
                    data-mdb-input-init
                    className="form-outline form-white mb-4"
                  >
                    <input
                      type="password"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                      placeholder="password"
                      security="true"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setPassword(event.target.value);
                      }}
                    />
                  </div>

                  <button
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-outline-light btn-lg px-5"
                    type="submit"
                    onClick={Login}
                  >
                    Login
                  </button>
                  {error && (
                    <p
                      style={{
                        color: 'red',
                        fontSize: '18px',
                        marginTop: '10px',
                      }}
                    >
                      {error}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
