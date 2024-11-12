"use client";

import React, { useCallback, useMemo,useState ,useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from "@/redux/store";
import { getAboutSelector } from "@/redux/reducers/about/selectors";
import { fetchAboutRequest } from "@/redux/reducers/about/actions";
import { FieldConfig } from "@/component/FieldProps/fieldConfig";
import {
    Divider,
    useMediaQuery,
    Collapse,
    Link,
    LinkProps,
    TextField,
    Button,
    Box,
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FieldWrapper } from "@/component/FieldWrapper";
import { FieldProps } from "@/component/FieldProps";

const gridItemProps = {
    item: true,
    xs: 12,
    sm: 6,
    size:6,
};
const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    // age: Yup.number().required("Age is required").positive("Age must be positive").integer("Age must be an integer"),
    // address: Yup.string().required("Address is required"),
});

const Order = () =>  {
    const dispatch = useDispatch<AppDispatch>();
    const storeData: any = useSelector(getAboutSelector);
    console.log(storeData,'dataaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    const initialValues = useMemo(() => (
        {
            name: "",
            email: "", 
            // age: "", 
            // address: "" 
        }
    ), []);
    const onSubmit = useCallback(
        async (values:any, { resetForm }:any) => {
            console.log(values,'valllllllllllllllll')
            try {
                await dispatch(fetchAboutRequest('christy'));
                resetForm();
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        }, []
    );

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ getFieldProps, errors,touched,isSubmitting,setFieldValue, values, handleChange, handleBlur}:any) => {
                return (
                    <Form>
                        <Grid container spacing={10}>
                            <FieldWrapper container spacing={2} size={8} height='auto'>
                                <FieldProps 
                                    Config={FieldConfig['name']}
                                />
                                <FieldProps 
                                    Config={FieldConfig['email']}
                                />
                            </FieldWrapper>
                            <FieldWrapper  size={4} height={'75px!important'}>
                                <Grid size={12}>
                                    <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
                                        Submit
                                    </Button>
                                </Grid>
                            </FieldWrapper>
                        </Grid>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default Order

