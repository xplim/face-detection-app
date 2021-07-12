import React, { useContext } from 'react';
import { RouteContext } from '../../contexts/RouteContext';

// Sources:
//   https://tachyons.io/components/forms/sign-in/index.html
//   http://tachyons.io/components/cards/product-card/index.html

const Register = () => {
  const { routes, setRoute } = useContext(RouteContext);

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
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
              />
            </div>
          </fieldset>
          <div className="">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib"
              type="submit"
              value="Submit"
              onClick={() => setRoute(routes.HOME)}
            />
          </div>
        </form>
      </main>
    </article>
  );
};

export default Register;
