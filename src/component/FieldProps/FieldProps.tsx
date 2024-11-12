"use client";

import React, { useState } from "react";
import {
    Divider,
    useMediaQuery,
    Collapse,
    Link,
    LinkProps,
    TextField,
    IconButton,
    InputAdornment,
    Button,
    Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Grid from '@mui/material/Grid2';
import { Field } from "formik";
import { DateRange } from "@mui/icons-material";

const gridItemProps = {
    xs: 12,
    sm: 6,
};
const FieldProps = ({Config}:any) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
    const { name, label, type, size,style}  = Config// 

    const renderField = (fieldProps: any) => {
        switch (type) {
            case 'text':
            case 'email':
            case 'number':
                return (
                    <TextField
                        {...fieldProps}
                        variant="outlined"
                        fullWidth
                        sx={style}
                    />
                );
            case 'password':
                return (
                    <TextField
                        {...fieldProps}
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        sx={style}
                        InputProps={{
                            ...fieldProps.InputProps,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                        sx={{
                                            background:'#ffffff',
                                            padding:'0px',
                                            marginRight:'2px',
                                            '&:hover': {
                                                background:'#ffffff',
                                                padding:'0px'
                                            },
                                        }}
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                );
            case 'textarea':
                return (
                    <TextField
                        {...fieldProps}
                        multiline
                        rows={4} 
                        fullWidth
                        variant="outlined"
                        sx={style}
                    />
                );
            default:
                return null;
        }
    };
    return (
        type ? (
            <Grid {...gridItemProps} size={size}>
                <Field name={name}>
                    {({ field, meta}:any):any => {
                        const error = meta.touched && Boolean(meta.error);
                        const helperText = meta.touched ? meta.error : '';
                        return (
                            <>
                                {renderField({
                                    ...field,
                                    error,
                                    helperText,
                                    label,
                                    type,
                                })}
                            </>
                        );
                    }}
                </Field>
            </Grid>
        ) : null 
    );
}

export default FieldProps;