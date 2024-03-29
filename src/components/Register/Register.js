import React, { useContext, useRef, useState } from 'react';
import { Alert } from '@material-ui/lab';
import { RouteContext } from '../../contexts/RouteContext';

// Sources:
//   https://tachyons.io/components/forms/sign-in/index.html
//   http://tachyons.io/components/cards/product-card/index.html

const Register = ({ setUser, registerFormRef, setErrorMessage }) => {
  const [status, setStatus] = useState();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const { routes, setRoute } = useContext(RouteContext);

  const onSubmit = (event) => {
    event.preventDefault();

    if (!status) {
      setStatus('Registering...');
      setErrorMessage();

      fetch(`${process.env.REACT_APP_API_URL}/register`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }

          throw new Error(`${response.status}: ${response.statusText}`);
        })
        .then((user) => {
          if (user) {
            setUser(user);
            setRoute(routes.HOME);
          }
        })
        .catch((err) => {
          console.error(err.message);
          setErrorMessage('Unable to register.');
        })
        .finally(() => {
          setStatus();
        });
    }
  };

  return (
    <>
      <Alert icon={false} severity="warning">
        <div className="line-break">
          This playground app is <strong>not</strong> fully secure.
          <br />
          Please use mock credentials for registration.
        </div>
      </Alert>
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <form
            className="measure"
            onSubmit={(event) => onSubmit(event)}
            ref={registerFormRef}
          >
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0" style={{ width: '100%' }}>
                Register
              </legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f5" htmlFor="name">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  ref={nameRef}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f5" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  autoComplete="email"
                  ref={emailRef}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f5" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="new-password"
                  ref={passwordRef}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className={`b ph3 pv2 input-reset ba b--black bg-transparent f5 dib ${
                  status ? '' : 'grow pointer'
                }`}
                type="submit"
                value={status ?? 'Submit'}
                disabled={status?.length}
              />
            </div>
          </form>
        </main>
      </article>
    </>
  );
};

export default Register;
