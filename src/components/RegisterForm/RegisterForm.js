import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState, useEffect } from 'react';
import { ReactSession } from 'react-client-session';

export default function Login() {
  const [state, setState] = useState({});
  const [datas, setDatas] = useState([]);

  const insertUser = (values) => {
    fetch('http://localhost:4000/profiles', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({pseudo: values.pseudo, password: values.password, coins: 100, bet_match: []})
    })
    .then(response => {       
      if (response.ok) {
          window.location.href="/login";
        } else {
            throw new Error('Something went wrong ...');
        }
    })
    .then(datas)
    .catch(error => setDatas({ error }));
  }

  return(<>
    <h1>Inscription</h1>
    <Formik
      initialValues={{ pseudo: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.pseudo) {
          errors.pseudo = 'Le pseudo est requis.';
        }
        if (!values.password) {
          errors.password = 'Le mot de passe est requis.';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        insertUser(values);
        setSubmitting(false);
      }}
     >
    {({ isSubmitting }) => (
         <Form className="form">
           <Field className="input-field" type="text" name="pseudo"/>
           <ErrorMessage className="error-message" name="pseudo" component="div"/>
           <Field className="input-field" type="password" name="password"/>
           <ErrorMessage className="error-message" name="password" component="div"/>
           <button className="submit-button" type="submit" disabled={isSubmitting}>
             S'inscrire !
           </button>
         </Form>
       )}
    </Formik>
  </>)
}
