import React, { useEffect, useState } from 'react';
import Input from './Input';

const Form = ({ route, onRouteChange, loadUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const clearData = () => {
    setEmail('');
    setPassword('');
    setName('');
  };

  useEffect(() => {
    clearData();
  }, [route]);

  const onSubmit = (e) => {
    e.preventDefault();

    const body =
      route === 'register'
        ? {
            email,
            password,
            name,
          }
        : { email, password };

    fetch(`https://smart-brain-server-fgrv.onrender.com/${route}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.id) {
          loadUser(response);
          onRouteChange('home');
        } else {
          alert(response);
          clearData();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
      <main className='pa4 black-80'>
        <form className='measure' onSubmit={(e) => onSubmit(e)}>
          <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
            <legend className='f4 fw6 ph0 mh0'>
              {route === 'register' ? 'Register' : 'Sign In'}
            </legend>
            {route === 'register' ? (
              <Input
                label='Name'
                htmlFor='name'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : null}

            <Input
              label='Email'
              htmlFor='email-address'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label='Password'
              htmlFor='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
              title='Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
            />
          </fieldset>
          <div className='mt3'>
            <input
              className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
              type='submit'
              value={route === 'register' ? 'Register' : 'Sign In'}
            />
          </div>
        </form>
      </main>
    </article>
  );
};

export default Form;
