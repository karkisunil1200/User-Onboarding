import React from 'react';
import {withFormik, Field, Form} from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

function FormikForm({values, errors, touched, isSubmitting}) {
  console.log(isSubmitting);
  return (
    <Form>
      <div className='form-group'>
        <label>Name</label>
        <Field type='text' name='name' className='form-control' autoComplete='off' />
        <small className='form-text text-danger'>{touched.name && errors.name}</small>
      </div>
      <div className='form-group'>
        <label>Email address</label>
        <Field
          type='email'
          className='form-control'
          name='email'
          id='exampleInputEmail1'
          autoComplete='off'
        />
        <small className='form-text text-danger'>{touched.email && errors.email}</small>
      </div>
      <div className='form-group'>
        <label>Password</label>
        <Field
          type='password'
          className='form-control'
          id='exampleInputPassword1'
          autoComplete='off'
          name='password'
        />
        <small className='form-text text-danger'>{touched.password && errors.password}</small>
      </div>
      <div className='form-group form-check'>
        <Field type='checkbox' className='form-check-input' id='exampleCheck1' />
        <label className='form-check-label'>Check me out</label>
      </div>
      <button type='submit' className='btn btn-success btn-block'>
        Submit
      </button>
    </Form>
  );
}

export default withFormik({
  mapPropsToValue: () => {
    return {
      name: '',
      password: '',
      email: '',
      checkbox: ''
    };
  },

  handleSubmit: (values, formikBag) => {
    formikBag.resetForm();
    console.log('FORM SUCCESSFULLY SUBMITTED');
    const url = 'https://reqres.in/api/users';
    formikBag.setSubmitting(true);

    axios
      .post(url, values)
      .then(res => {
        console.log(res.data);
        window.alert('form submitted... ' + res.data.name);
        formikBag.setSubmitting(false);
      })
      .catch(err => {
        console.log(err);
      });
  },

  validationSchema: Yup.object().shape({
    name: Yup.string()
      .min(5, 'Name should be atleast 5 character long')
      .max(10, 'Name should be less then 10 character')
      .required('First Name is required'),
    password: Yup.string()
      .min(8)
      .max(15)
      .required('Password is required'),
    email: Yup.string()
      .min(5)
      .max(20)
      .required('Email is required')
  })
})(FormikForm);
