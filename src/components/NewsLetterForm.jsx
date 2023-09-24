//code from: https://www.youtube.com/watch?v=vJtyp1YmOpc

import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

// STYLED COMPONENTS
const HeadingNewsletter = styled.h1`
  margin-bottom: 5rem;
`;
const DivForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 7rem;
`;
const Input = styled.input`
  margin-bottom: 1rem;
  width: 300px;
  height: 50px;
`;
const ButtonSubmit = styled.button`
  margin-top: 1rem;
  width: 300px;
  height: 50px;
`;

function NewsLetterForm() {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },

    // YUP VALIDERING
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string()
        .max(50, 'Must be 50 characters or less')
        .required('Required'),
      phone: Yup.number()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
    }),
    onSubmit: (values) => {
      alert('Hej ' + `${values.firstName}`);
      console.log(values, 'the values');
    },
  });
  console.log(formik.errors);
  console.log(formik.values);
  console.log(formik.touched);
  return (
    <>
      <DivForm>
        <HeadingNewsletter>Sign up for our news letter</HeadingNewsletter>
        {/* code FORMIK AND YUP from: https://www.youtube.com/watch?v=vJtyp1YmOpc */}
        <form onSubmit={formik.handleSubmit}>
          <div className="inputContainer">
            {/* UPPREPA ALLT FÖR VARJE NY INPUT MAN VILL GÖRA  */}
            <Input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="User Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
            />
            {/*  */}
            {formik.touched && formik.errors.firstName && (
              <p>{formik.errors.firstName}</p>
            )}
          </div>
          <div className="inputContainer">
            <Input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
            />
            {/*  */}
            {formik.touched && formik.errors.lastName && (
              <p>{formik.errors.lastName}</p>
            )}
          </div>
          <div className="inputContainer">
            <Input
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {/*  */}
            {formik.touched &&
              formik.errors.email & <p>{formik.errors.email}</p>}
          </div>
          <div className="inputContainer">
            <Input
              id="phone"
              name="phone"
              type="text"
              placeholder="Phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            {/*  */}
            {formik.touched && formik.errors.phone && (
              <p>{formik.errors.phone}</p>
            )}
          </div>
          <ButtonSubmit type="submit">Submit</ButtonSubmit>
        </form>
      </DivForm>
    </>
  );
}
export default NewsLetterForm;
