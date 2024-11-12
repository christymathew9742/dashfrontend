"use client";

import React, { useCallback, useMemo, useState } from "react";
import Grid from '@mui/material/Grid2';
import { FieldProps } from "@/component/FieldProps";
import { LoginOutlined } from "@mui/icons-material";
import { FieldConfig } from "@/component/FieldProps/fieldConfig";
import { Typography,Button } from "@mui/material";
import { parseCookies} from "nookies";
import { useRouter, usePathname } from 'next/navigation';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { loginV2 } from "@/auth/auth";

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

const Login = () => {
    const router = useRouter();
    const { accessToken } = parseCookies();
    const initialValues = useMemo(() => (
        {
            email:"",
            password:"",
        }
    ), []);

    const onSubmit = useCallback(async (values:any, { resetForm }:any) => {
        await loginV2(values, (data:any, err:any) => {
            if(data) {
                console.error(data)
            }else {
                router.push('/dashboard')
            }
        });
        try {
            resetForm();
        } catch (error) {
            console.error("Error submitting form:", error);
        }

    }, []);

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ isSubmitting }) => (
                <Form>
                    <Grid container spacing={2} mb={2} className="w-full">
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
                            Sign in
                        </Typography>
                        {Object.keys(initialValues).map((key) => (
                            <FieldProps key={key} Config={FieldConfig[key]}/>
                        ))}
                    </Grid>
                    <Grid container justifyContent="center">
                        <Button type="submit" disabled={isSubmitting} variant="outlined" endIcon={<LoginOutlined />}>Sign In</Button>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}

export default Login;
