import { useContext, useState } from 'react';
import SomeContext from './SomeContext';
import styled from 'styled-components';

//FORMIK & YUP for userName parts of code from: https://www.youtube.com/watch?v=vJtyp1YmOpc
import { useFormik } from 'formik';
import * as Yup from 'yup';

import '../css/StyleHomePage.css';

const UserContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 7rem;
`;
const InputUserContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  flex-direction: column;
`;
const InputText = styled.input`
  width: 300px;
  height: 40px;
  margin-bottom: 1rem;
  font-size: 20px;
`;
const TheButton = styled.button`
  width: 308px;
  height: 40px;
  font-size: 15px;
`;
const TheString = styled.p`
  font-size: 20px;
`;

function UserName() {
  const { theUserName, setTheUserName } = useContext(SomeContext);
  const [submited, setSubmited] = useState(false);
  const formik = useFormik({
    initialValues: {
      userName: '',
    },
    // YUP VALIDERING
    validationSchema: Yup.object({
      userName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    }),
    onSubmit: (values) => {
      alert('Hej ' + `${values.userName}`);
      console.log(values.userName, 'the values');
    },
  });
  console.log(formik.errors);
  console.log(formik.values);
  console.log(formik.touched);
  return (
    <>
      <UserContainer>
        {/* code formik from: https://www.youtube.com/watch?v=vJtyp1YmOpc */}
        <form onSubmit={formik.handleSubmit}>
          <InputUserContainer>
            {/* UPPREPA FÖR VARJE INPUT MAN VILL GÖRA TEX EMAIL ETC */}
            <InputText
              id="userName"
              name="userName"
              type="text"
              placeholder="User Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userName}
            />

            {/*  */}
            {formik.touched && formik.errors.userName && (
              <p>{formik.errors.userName}</p>
            )}
          </InputUserContainer>
          <TheButton
            type="submit"
            onClick={() => {
              setTheUserName(theUserName);
              setSubmited(true);
              console.log(formik.values.userName, 'testaaarrr');
            }}
          >
            Submit
          </TheButton>

          <InputUserContainer>
            {submited ? (
              <TheString>Welcome {formik.values.userName}</TheString>
            ) : (
              <TheString>Please enter your user name</TheString>
            )}
          </InputUserContainer>
        </form>
      </UserContainer>
    </>
  );
}

export default UserName;
// import { useContext } from 'react';
// import SomeContext from './SomeContext';
// import styled from 'styled-components';

// //FORMIK & YUP for userName parts of code from: https://www.youtube.com/watch?v=vJtyp1YmOpc
// import { useFormik } from 'formik';
// import * as Yup from 'yup';

// import '../css/StyleHomePage.css';

// const UserContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-top: 7rem;
// `;
// const InputUserContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-top: 1rem;
//   flex-direction: column;
// `;
// const InputText = styled.input`
//   width: 300px;
//   height: 40px;
//   margin-bottom: 1rem;
//   font-size: 20px;
// `;
// const TheButton = styled.button`
//   width: 308px;
//   height: 40px;
//   font-size: 15px;
// `;
// const TheHead = styled.h1`
//   font-size: 20px;
// `;

// function UserName() {
//   const { theUserName, setTheUserName } = useContext(SomeContext);
//   const formik = useFormik({
//     initialValues: {
//       userName: '',
//     },
//     // YUP VALIDERING
//     validationSchema: Yup.object({
//       userName: Yup.string()
//         .max(20, 'Must be 20 characters or less')
//         .required('Required'),
//     }),
//     onSubmit: (values) => {
//       alert('Hej ' + `${values.userName}`);
//       console.log(values.userName, 'the values');
//     },
//   });
//   console.log(formik.errors);
//   console.log(formik.values);
//   console.log(formik.touched);
//   return (
//     <>
//       <UserContainer>
//         {/* code formik from: https://www.youtube.com/watch?v=vJtyp1YmOpc */}
//         <form onSubmit={formik.handleSubmit}>
//           <InputUserContainer>
//             {/* UPPREPA FÖR VARJE INPUT MAN VILL GÖRA TEX EMAIL ETC */}
//             <InputText
//               id="userName"
//               name="userName"
//               type="text"
//               placeholder="User Name"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.userName}
//             />

//             {/*  */}
//             {formik.touched && formik.errors.userName && (
//               <p>{formik.errors.userName}</p>
//             )}
//           </InputUserContainer>
//           <TheButton
//             type="submit"
//             onClick={() => {
//               setTheUserName(theUserName);
//               console.log(theUserName, 'testaaarrr');
//             }}
//           >
//             Submit
//           </TheButton>

//           <TheHead>Welcome {formik.values.userName}</TheHead>
//         </form>
//       </UserContainer>
//     </>
//   );
// }

// export default UserName;
