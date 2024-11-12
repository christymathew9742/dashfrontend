import { SxProps } from '@mui/system';

export const customInputStyles:SxProps = {
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
        borderColor: '#ffffff',
        },
        '&:hover fieldset': {
        borderColor: '#ffffff',
        },
        '&.Mui-focused fieldset': {
        borderColor: '#ffffff',
        },
    },
    '& .MuiInputLabel-root': {
        color: '#ffffff',
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#ffffff', 
    },
    '& .MuiOutlinedInput-input': {
        color: '#ffffff', 
    },
};
