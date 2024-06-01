'use client';

import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';

import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Box, Button, Container, TextField, Typography } from '@mui/material';

const CustomButton = styled(Button)({
  backgroundColor: '#FF7ED4',
  height: 28,
  '&:hover': {
    backgroundColor: '#FF3EA5',
  },
});

const CustomBox: React.FC<{ value: string }> = ({ value }) => (
  <Box
    component="div"
    sx={{
      borderBottom: '1px solid gray',
      p: '8px 14px',
      borderRadius: '5px',
    }}
    height="22px"
  >
    <Typography variant="body1">{value}</Typography>
  </Box>
);

const CustomTextField: React.FC<{
  value: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}> = ({ value, name, onChange }) => (
  <TextField size="small" fullWidth defaultValue={value} name={name} onChange={onChange} />
);

type ProfileData = {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  email: string;
  postCode: string;
};

const Profile: React.FC = () => {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    email: '',
    postCode: '',
  });

  const getProfile = (customerId: number) => {
    // GET request 1:
    // Parameter: customer's id
    // Response: A ProfileData object in json
    // This request is to get customer's informtion, and data should be store with setProfile()
  };

  const postProfile = (event: FormEvent) => {
    event.preventDefault();
    // POST request 2:
    // Parameter: A ProfileData object and customer's id in json
    // Response: nothing data, but an alert for user
    // This request is to submit customer's information, you could get data with 'profile'
  };

  const handleUpdate = () => {
    setEditMode(!editMode);
  };

  const handleSave = (event: FormEvent) => {
    setEditMode(!editMode);
    postProfile(event);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  useEffect(() => {
    // getProfile();
  }, []);

  return (
    <>
      <Typography variant="h2" sx={{ mb: 2 }} textAlign="center">
        Account details
      </Typography>
      <Container
        maxWidth="sm"
        component={editMode ? 'form' : 'div'}
        onSubmit={handleSave}
        sx={{
          boxShadow:
            'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
          borderRadius: 5,
          fontSize: 20,
          padding: 4,
          mt: 3,
        }}
      >
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">First name:</Typography>
            {editMode ? (
              <CustomTextField
                value={profile.firstName}
                name="firstName"
                onChange={handleInputChange}
              />
            ) : (
              <CustomBox value={profile.firstName} />
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Last name:</Typography>
            {editMode ? (
              <CustomTextField
                value={profile.lastName}
                name="lastName"
                onChange={handleInputChange}
              />
            ) : (
              <CustomBox value={profile.lastName} />
            )}
          </Grid>
        </Grid>

        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">E-mail:</Typography>
            {editMode ? (
              <CustomTextField value={profile.email} name="email" onChange={handleInputChange} />
            ) : (
              <CustomBox value={profile.email} />
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Phone number:</Typography>
            {editMode ? (
              <CustomTextField value={profile.phone} name="phone" onChange={handleInputChange} />
            ) : (
              <CustomBox value={profile.phone} />
            )}
          </Grid>
        </Grid>

        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Address:</Typography>
            {editMode ? (
              <CustomTextField
                value={profile.address}
                name="address"
                onChange={handleInputChange}
              />
            ) : (
              <CustomBox value={profile.address} />
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Post code:</Typography>
            {editMode ? (
              <CustomTextField
                value={profile.postCode}
                name="postCode"
                onChange={handleInputChange}
              />
            ) : (
              <CustomBox value={profile.postCode} />
            )}
          </Grid>
        </Grid>

        <Box component="div" display="flex" justifyContent="end">
          {editMode ? (
            <CustomButton variant="contained" type="submit">
              Save
            </CustomButton>
          ) : (
            <CustomButton variant="contained" onClick={handleUpdate}>
              Edit
            </CustomButton>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Profile;
