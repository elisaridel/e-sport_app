import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState, useEffect } from 'react';
import { ReactSession } from 'react-client-session';
import {
  Link,
} from "react-router-dom";

export default function Login() {
  const [state, setState] = useState({});
  const [datas, setDatas] = useState("");

  useEffect(() => {
    const options = {
      methode: 'GET', 
      headers: {
        Accept: 'application/json',
      }
    };

    fetch("http://localhost:4000/profiles", options)
      .then((resp) => resp.json())
      .then((data) => {
        setDatas({
          users: data
        });
      });
      
    return () => {
      setState({});
    }
  }, []);

  const errorMessage = () => {
    return (
      <div>{window.alert("Vos identifiants sont incorrects.")}</div>
    );
  }

  return(<>
    <h1>Connexion</h1>
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
        setSubmitting(false);
        const user = datas.users.find(user => user.pseudo === values.pseudo && user.password === values.password);
        if (user) {
          ReactSession.set("userId", user.id);
          window.location.href="/";
        } else {
          errorMessage();
        }
      }}
     >
    
    {({ isSubmitting }) => (
         <Form className="form">
           <Field className="input-field" type="text" name="pseudo"/>
           <ErrorMessage className="error-message" name="pseudo" component="div" />
           <Field className="input-field" type="password" name="password"/>
           <ErrorMessage className="error-message" name="password" component="div" />
           <button className="submit-button" type="submit" disabled={isSubmitting}>
             Se connecter
           </button>
         </Form>
       )}
    </Formik>
    <div>Pas encore de compte ? <Link to='/register'>Inscrivez-vous ici</Link></div>
  </>)
}
