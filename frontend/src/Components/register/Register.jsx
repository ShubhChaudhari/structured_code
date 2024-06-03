import React from 'react';
import { useState } from 'react';
import { Box, Button, Grid, Input, Paper, TextField, Typography } from '@mui/material';
import { signup } from '../../services/services';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Register = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      profileImage: null,
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required').min(5, 'User must be at least 5 characters'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(5, 'Password must be at least 5 characters').required('Password is required'),
      profileImage: Yup.mixed().required('Profile image is required'),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('username', values.username);
      formData.append('email', values.email);
      formData.append('password', values.password);
      formData.append('file', values.profileImage);

      signup(formData)
        .then((response) => {
          console.log('Signup successful:', response);
          // navigate('/dashboard'); // Uncomment and use your navigation logic here
        })
        .catch((error) => {
          console.error('Signup failed:', error);
        });
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue('profileImage', file);
    }
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} sx={{ padding: 3, width: '100%', maxWidth: 400 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Register
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Username"
              name="username"
              variant="standard"
              fullWidth
              margin="normal"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              label="Email"
              name="email"
              variant="standard"
              type="email"
              fullWidth
              margin="normal"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
             <TextField
              label="Password"
              name="password"
              variant="standard"
              type="password"
              fullWidth
              margin="normal"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Input
              type="file"
              name="profileImage"
              fullWidth
              margin="normal"
              onChange={handleFileChange}
              onBlur={formik.handleBlur}
              error={formik.touched.profileImage && Boolean(formik.errors.profileImage)}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              Register
            </Button>
          </form>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account?{' '}
            <Link to="/login" color="primary">
              Login
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Register;
