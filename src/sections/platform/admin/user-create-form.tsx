import * as Yup from 'yup';
import { useMemo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { countries } from 'src/assets/data';
// import { USER_STATUS_OPTIONS } from 'src/_mock';

import Iconify from 'src/components/iconify';
// import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFSelect, RHFTextField, RHFAutocomplete, RHFUploadAvatar } from 'src/components/hook-form';

import { IUserItem } from 'src/types/user';
import { Stack, Typography } from '@mui/material';
import { useTranslate } from 'src/locales';
import { useTheme, IconButton } from '@mui/material';
import { varHover } from 'src/components/animate';
import { m } from 'framer-motion';

// ----------------------------------------------------------------------

type Props = {
    open: boolean;
    onClose: VoidFunction;
    currentUser?: IUserItem;
};
export const USER_STATUS_OPTIONS = [
    { value: 'active', label: 'Active' },
    // { value: 'pending', label: 'Pending' },
    { value: 'banned', label: 'Disable' },
    // { value: 'rejected', label: 'Rejected' },
];

export default function UserCreateForm({ currentUser, open, onClose }: Props) {
    // const { enqueueSnackbar } = useSnackbar();
    const t = useTranslate();
    const theme = useTheme();

    const NewUserSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required').email('Email must be a valid email address'),
        phoneNumber: Yup.string().required('Phone number is required'),
        address: Yup.string().required('Address is required'),
        country: Yup.string().required('Country is required'),
        company: Yup.string().required('Company is required'),
        state: Yup.string().required('State is required'),
        city: Yup.string().required('City is required'),
        role: Yup.string().required('Role is required'),
        avatarUrl: Yup.mixed<any>().nullable().required('Avatar is required'),
        // department: Yup.string().required('Role is required'),
    });

    const defaultValues = useMemo(
        () => ({
            name: currentUser?.name || '',
            email: currentUser?.email || '',
            phoneNumber: currentUser?.phoneNumber || '',
            address: currentUser?.address || '',
            country: currentUser?.country || '',
            state: currentUser?.state || '',
            city: currentUser?.city || '',
            zipCode: currentUser?.zipCode || '',
            status: currentUser?.status,
            company: currentUser?.company || '',
            role: currentUser?.role || '',
            department: "",
            avatarUrl: currentUser?.avatarUrl || null,
        }),
        [currentUser]
    );

    const methods = useForm({
        resolver: yupResolver(NewUserSchema),
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        setValue,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            reset();
            onClose();
            // enqueueSnackbar('Update success!');
            console.info('DATA', data);
        } catch (error) {
            console.error(error);
        }
    });

    const handleDrop = useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[0];

            const newFile = Object.assign(file, {
                preview: URL.createObjectURL(file),
            });

            if (file) {
                setValue('avatarUrl', newFile, { shouldValidate: true });
            }
        },
        [setValue]
    );

    return (
        <Dialog
            fullWidth
            maxWidth={false}
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: { maxWidth: 540 },
            }}
        >
            <FormProvider methods={methods} onSubmit={onSubmit}>
                {/* <DialogTitle>Quick Update</DialogTitle> */}
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    p={2.5}
                    pl={3}
                    sx={{ backgroundColor: "success.main" }}
                >
                    <Typography variant="body2" color="white">Add Admin</Typography>
                    {/* <IconButton
                        aria-label=""
                        onClick={() => { }}
                        component={m.button}
                        whileTap="tap"
                        whileHover="hover"
                        variants={varHover(1.05)}
                    >

                    </IconButton> */}
                    <Iconify
                        onClick={onClose}
                        icon="material-symbols:close-small-outline-rounded"
                        sx={{ width: 20, height: 20, color: theme.palette.text.white, cursor: "pointer" }}
                    />
                </Stack>

                <DialogContent
                    sx={{
                        py: 2
                    }}
                >
                    {/* <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
                        Account is waiting for confirmation
                    </Alert> */}
                    <Box sx={{ mb: 3 }}>
                        <RHFUploadAvatar
                            name="avatarUrl"
                            maxSize={3145728}
                            onDrop={handleDrop}
                        // sx={{
                        //     backgroundColor: theme.palette.background.light
                        // }}
                        // helperText={
                        //     <Typography
                        //         variant="caption"
                        //         sx={{
                        //             mt: 3,
                        //             mx: 'auto',
                        //             display: 'block',
                        //             textAlign: 'center',
                        //             color: 'text.disabled',
                        //         }}
                        //     >
                        //         Allowed *.jpeg, *.jpg, *.png, *.gif
                        //         <br /> max size of {fData(3145728)}
                        //     </Typography>
                        // }
                        />
                    </Box>
                    <Box
                        rowGap={3}
                        columnGap={2}
                        display="grid"
                        gridTemplateColumns={{
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                        }}
                    >
                        {/* <RHFSelect name="status" label="Status">
                            {USER_STATUS_OPTIONS.map((status) => (
                                <MenuItem key={status.value} value={status.value}>
                                    {status.label}
                                </MenuItem>
                            ))}
                        </RHFSelect> */}

                        {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }} /> */}
                        {/* <InputLabel htmlFor="floating-label">Floating Label</InputLabel> */}
                        <RHFTextField name="name" label="Full Name" />
                        <RHFTextField name="name" label="Nick Name" />
                        <RHFTextField name="email" label="Account" />
                        <RHFSelect name="status" label="Status">
                            {USER_STATUS_OPTIONS.map((status) => (
                                <MenuItem key={status.value} value={status.value}>
                                    {status.label}
                                </MenuItem>
                            ))}
                        </RHFSelect>
                        <RHFTextField name="deparment" label="Department" />
                        <RHFTextField name="phoneNumber" label="Position" />
                        <RHFTextField name="phoneNumber" label="Mobile Phone" />
                        <RHFTextField name="email" label="Email" />
                        <RHFTextField type="password" name="password" label="Password" />
                        <RHFTextField type="password" name="confirm" label="Confirm Password" />
                        {/* 
                        <RHFAutocomplete
                            name="country"
                            label="Country"
                            options={countries.map((country) => country.label)}
                            getOptionLabel={(option) => option}
                            renderOption={(props, option) => {
                                const { code, label, phone } = countries.filter(
                                    (country) => country.label === option
                                )[0];

                                if (!label) {
                                    return null;
                                }

                                return (
                                    <li {...props} key={label}>
                                        <Iconify
                                            key={label}
                                            icon={`circle-flags:${code.toLowerCase()}`}
                                            width={28}
                                            sx={{ mr: 1 }}
                                        />
                                        {label} ({code}) +{phone}
                                    </li>
                                );
                            }}
                        /> */}
                        {/* 
                        <RHFTextField name="state" label="State/Region" />
                        <RHFTextField name="city" label="City" />
                        <RHFTextField name="address" label="Address" />
                        <RHFTextField name="zipCode" label="Zip/Code" />
                        <RHFTextField name="company" label="Company" />
                        <RHFTextField name="role" label="Role" /> */}
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>

                    {/* <LoadingButton type="submit" variant="contained" color="success" loading={isSubmitting}> */}
                    <LoadingButton variant="contained" color="success" loading={isSubmitting}>
                        Create
                    </LoadingButton>
                </DialogActions>
            </FormProvider>
        </Dialog>
    );
}
