import * as yup from 'yup'

export const RegisterSchema = yup.object(
    {
        password: yup.string().min(8).matches(
            // eslint-disable-next-line
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character").required('PASSWORD IS REQUIRED'),
        email: yup.string().email("EMAIL MUST BE VALID").required("EMAIL IS REQUIRED"),
        name: yup.string().required('NAME IS REQUIRED'),
        

    }
)

export const SignInSchema = yup.object(
    {
        email: yup.string().email("EMAIL MUST BE VALID").required("EMAIL IS REQUIRED"),
        password: yup.string().min(8).matches(
            // eslint-disable-next-line
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character").required('PASSWORD IS REQUIRED')
    }
)