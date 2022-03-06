import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router';
import { ReactSession } from 'react-client-session';

export default function Login() {
  const [state, setState] = useState({});
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [datas, setDatas] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/profiles")
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

  //Check if inserted identifiants correspond to any user in db
  const checkUser = (datas, pseu, pass) => {
    const user = datas.users.find(user => user.pseudo === pseu && user.password === pass);
      if (user) {
        ReactSession.set("username", pseu);
        window.location.href="/";
      } else {
        errorMessage();
      }
  };

  // Check user on submit
  const handleSubmit = () => {
    checkUser(datas, pseudo, password);
  }

  return(<>
    <h1>Login</h1>
    <Formik
       initialValues={{ pseudo: '', password: '' }}
       validate={values => {
         const errors = {};
         if (!values.pseudo) {
           errors.pseudo = 'Required';
         }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        handleSubmit();
       }}
     >
    
    {({ isSubmitting }) => (
         <Form>
           <Field type="text" name="pseudo" onInput={(event) => setPseudo(event.target.value)}/>
           <ErrorMessage name="pseudo" component="div" />
           <Field type="password" name="password" onInput={(event) => setPassword(event.target.value)}/>
           <ErrorMessage name="password" component="div" />
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </Form>
       )}
    </Formik>
  </>)
}
