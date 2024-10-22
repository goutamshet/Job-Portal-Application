import React, { useEffect, useState } from 'react';
import './employer-profile.css';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const EmployerProfile = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [profileExists, setProfileExists] = useState(false); // Track if the profile exists
  const [profileId, setProfileId] = useState(null);
  // Fetch the profile when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = Number(localStorage.getItem('userId'));

        const response = await axios.get(`http://localhost:5001/api/jobProvider/`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        if (response.data && response.data.length > 0) {
          const profileData = response.data.find(profile => profile.userId === userId);
          setProfileId(profileData.id)
          setProfileExists(true); // Set that profile exists

          const formattedProfileData = {
            company_name: profileData.company_name || '',
            company_description: profileData.company_description || '',
            website: profileData.website || '',
            email: profileData.email || '',
            location: profileData.location || '',
            phone: profileData.phone || '',
          };
          formik.setValues(formattedProfileData); // Populate form with profile data
         
        }
      } catch (error) {
        console.error('Failed to fetch profile', error.response);
        setProfileExists(false); // No profile found
      }
    };

    fetchProfile();
  }, []);

  const formik = useFormik({
    initialValues: {
      company_name: '',
      company_description: '',
      website: '',
      email: '',
      location: '',
      phone: '',
    },
    validationSchema: Yup.object({
      company_name: Yup.string().required('Company is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      phone: Yup.string().required('Phone number is required'),
    }),
    onSubmit: async (values) => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      try {
        if (profileExists) {
          // Update existing profile
          const response = await axios.put(`http://localhost:5001/api/jobProvider/${profileId}`, values, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 201) {
            console.log('Profile updated');
            navigate('/jobProvider');
          }
        } else {
          // Create new profile
          const response = await axios.post('http://localhost:5001/api/jobProvider/create', values, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
            console.log('Profile created');
            navigate('/jobProvider');
          }
        }
      } catch (error) {
        setErrorMessage('Failed to save profile');
      }
    },
  });

  const handleCancel = () => {
    navigate("/jobProvider");
  };

  return (
    <div className="profile-container">
      <form className="card" onSubmit={formik.handleSubmit}>
        <h1 className="profile-title">Profile</h1>
        <div className="profile-input-container">
          <input
            type="text"
            name="company_name"
            placeholder="Company"
            className="profile-input"
            value={formik.values.company_name}
            onChange={formik.handleChange}
            autoComplete="off"
          />
          <input
            type="text"
            name="company_description"
            placeholder="Description"
            className="profile-input"
            value={formik.values.company_description}
            onChange={formik.handleChange}
            autoComplete="off"
          />
          <input
            type="text"
            name="website"
            placeholder="Website"
            className="profile-input"
            value={formik.values.website}
            onChange={formik.handleChange}
            autoComplete="off"
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="profile-input"
            value={formik.values.email}
            onChange={formik.handleChange}
            autoComplete="off"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="profile-input"
            value={formik.values.location}
            onChange={formik.handleChange}
            autoComplete="off"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="profile-input"
            value={formik.values.phone}
            onChange={formik.handleChange}
            autoComplete="off"
          />
        </div>

        <div className="profile-button-container">
          <button className="profile-button" onClick={handleCancel}>Cancel</button>
          <button type="submit" className="profile-button">{profileExists ? 'Update' : 'Save'}</button>
        </div>
        {errorMessage && <div className="error">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default EmployerProfile;
