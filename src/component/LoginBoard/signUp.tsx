import React, { useCallback, useMemo } from "react";
import Grid from '@mui/material/Grid2';
import { Typography, Button } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { signUpV2 } from "@/auth/auth";
import { FieldProps } from "../FieldProps";
import { FieldConfig } from "../FieldProps/fieldConfig";
import { LoginOutlined } from "@mui/icons-material";

const validationSchema = Yup.object({
    username: Yup.string().required("User name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required("Confirm password is required"),
});

const SignUp = () => {
    const initialValues = useMemo(() => (
        { 
            username: "", 
            email: "", 
            password: "", 
            confirmPassword: "" 
        }
    ), []);

    const onSubmit = useCallback(async (values: any, { resetForm }: any) => {
        try {
            await signUpV2(values, (err: any, data: any) => {
                if (err) {
                    console.error('Registration error:', err);
                } else {
                    alert('Account created successfully!');
                    resetForm();
                }
            });
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    }, []);

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ isSubmitting }) => (
                <Form>
                    <Grid container spacing={2} mb={2}>
                        <Typography
                            component="h1"
                            variant="h4"
                            mb={4}
                            sx={{
                                width: '100%',
                                fontSize: 'clamp(2.2rem, 10vw, 2.3rem)',
                                textAlign: 'center',
                                color: '#ffffff',
                            }}
                        >
                            Sign Up
                        </Typography>
                        {Object.keys(initialValues).map((key) => (
                            <FieldProps key={key} Config={FieldConfig[key]}/>
                        ))}
                    </Grid>
                    <Grid container justifyContent="center">
                        <Button type="submit" disabled={isSubmitting} variant="outlined" endIcon={<LoginOutlined />}>
                            Sign Up
                        </Button>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
};

export default SignUp;
