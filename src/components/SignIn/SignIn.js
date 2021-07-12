import React, { useContext, useRef } from 'react';
import { RouteContext } from '../../contexts/RouteContext';

// Sources:
//   https://tachyons.io/components/forms/sign-in/index.html
//   http://tachyons.io/components/cards/product-card/index.html

const SignIn = ({ signInFormRef }) => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { routes, setRoute } = useContext(RouteContext);

  const onSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:4000/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
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
      .then((result) => {
        setRoute(routes.HOME);
      })
      .catch((err) => console.error(err.message));
  };

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form
          className="measure"
          onSubmit={(event) => onSubmit(event)}
          ref={signInFormRef}
        >
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
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
                autoComplete="current-password"
                ref={passwordRef}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib"
              type="submit"
              value="Submit"
            />
          </div>
          <div className="lh-copy mt3">
            <p
              onClick={() => setRoute(routes.REGISTER)}
              className="f5 link dim black db pointer"
            >
              Register
            </p>
          </div>
        </form>
      </main>
    </article>
  );
};

export default SignIn;
