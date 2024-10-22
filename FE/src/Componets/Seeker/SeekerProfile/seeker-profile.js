import { useEffect, useState } from "react";
import "./seeker-profile.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const SeekerProfile = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [profileExists, setProfileExists] = useState(false); // Track if the profile exists
  const [profileId, setProfileId] = useState(null);

  const token = localStorage.getItem("token");
  const userId = Number(localStorage.getItem("userId"));

  //Fetch the profile when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/jobSeeker/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response)
        if (response.data && response.data.length > 0) {
          // Get the first object from the array
          const profileData = response.data.find(
            (profile) => profile.userId === userId
          );
  
          setProfileId(profileData.id);
          setProfileExists(true); // Set that profile exists

          const formattedProfileData = {
            first_name: profileData.first_name || "",
            last_name: profileData.last_name || "",
            phone_number: profileData.phone_number || "",
            resume_url: profileData.resume_url || "",
            skills: profileData.skills || "",
            experience: profileData.experience || "",
            education: profileData.education || "",
            location: profileData.location || "",
            preferredJobTypes: profileData.preferredJobTypes || "",
          };
          formik.setValues(formattedProfileData); // Populate form with profile data
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
        setProfileExists(false); // No profile found
      }
    };

    fetchProfile();
  }, []);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
      resume_url: "",
      skills: "",
      experience: "",
      education: "",
      location: "",
      preferredJobTypes: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("First Name is required"),
      last_name: Yup.string().required("Last Name is required"),
      phone_number: Yup.string().required("Phone Number is required"),
      experience: Yup.string().required("Experience is required"),
    }),
    onSubmit: async (values) => {
      try {
        if (profileExists) {
          // Update existing profile
          const response = await axios.put(
            `http://localhost:5001/api/jobSeeker/${profileId}`,
            values,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 201) {
            console.log("Profile updated");
            navigate("/jobSeeker");
          }
        } else {
          // Create new profile
          const response = await axios.post(
            "http://localhost:5001/api/jobSeeker/create",
            values,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 200) {
            console.log("Profile created");
            navigate("/jobSeeker");
          }
        }
      } catch (error) {
        setErrorMessage("Failed to save profile");
      }
    },
  });

  const handleCancel = () => {
    navigate("/jobSeeker");
  };

  return (
    <div className="profile-container">
      <form className="card" onSubmit={formik.handleSubmit}>
        <h1 className="profile-title">Profile</h1>
        <div className="profile-input-container">
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            className="profile-input"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            autoComplete="off"
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            className="profile-input"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            autoComplete="off"
          />
          <input
            type="text"
            name="phone_number"
            placeholder="Phone"
            className="profile-input"
            value={formik.values.phone_number}
            onChange={formik.handleChange}
            autoComplete="off"
          />
          <input
            type="text"
            name="resume_url"
            placeholder="URL"
            className="profile-input"
            value={formik.values.resume_url}
            onChange={formik.handleChange}
            autoComplete="off"
          />
          <input
            type="text"
            name="skills"
            placeholder="Skills"
            className="profile-input"
            value={formik.values.skills}
            onChange={formik.handleChange}
            autoComplete="off"
          />
          <input
            type="text"
            name="experience"
            placeholder="Experience"
            className="profile-input"
            value={formik.values.experience}
            onChange={formik.handleChange}
            autoComplete="off"
          />
          <input
            type="text"
            name="education"
            placeholder="Education"
            className="profile-input"
            value={formik.values.education}
            onChange={formik.handleChange}
            autoComplete="off"
          />
          <input
            type="text"
            name="preferredJobTypes"
            placeholder="Preferred Job"
            className="profile-input"
            value={formik.values.preferredJobTypes}
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
        </div>

        <div className="profile-button-container">
          <button className="profile-button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="profile-button">
            {profileExists ? "Update" : "Save"}
          </button>
        </div>
        {errorMessage && <div className="error">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default SeekerProfile;
