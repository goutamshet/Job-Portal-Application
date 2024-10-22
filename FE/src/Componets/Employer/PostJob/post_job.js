import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./post_job.css";

const PostJob = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const userId = Number(localStorage.getItem("userId"));

  useEffect(() => {
    if (jobId) {
      // If editing an existing job, fetch job details
      fetchJobDetails();
    }
  }, [jobId]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);

      const jobResponse = await axios.get(
        `http://localhost:5001/api/jobListings/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const jobData = jobResponse.data;
      // Update form values with fetched job details
      formik.setValues({
        title: jobData.title || "",
        description: jobData.description || "",
        requirements: jobData.requirements || "",
        preferredSkills: jobData.preferredSkills || "",
        salary_range: jobData.salary_range || "",
        location: jobData.location || "",
        expires_at: jobData.expires_at || "",
        category_name: jobData.category ? jobData.category.name : "", // If category exists
      });
    } catch (error) {
      setError("Error loading job details.");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      requirements: "",
      preferredSkills: "",
      salary_range: "",
      location: "",
      expires_at: "",
      category_name: "", // Input for category name
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Job title is required"),
      description: Yup.string().required("Job description is required"),
      category_name: Yup.string().required("Category is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setError(null);

        // Check if the category exists
        let categoryId;
        const checkCategory = await axios.get(
          `http://localhost:5001/api/jobCategory/?category_name=${values.category_name}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(checkCategory.data); // Log the response to see the structure
        const existingCategory = checkCategory.data.find(
          (category) => category.name === values.category_name
        );

        if (existingCategory) {
          console.log("Category exists:", existingCategory.id);
          categoryId = existingCategory.id;
        } else {
          console.log(values.category_name);
          console.log(token);
          console.log("Category does not exist, creating a new one");

          const categoryResponse = await axios.post(
            "http://localhost:5001/api/jobCategory/create",
            {
              name: values.category_name,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          categoryId = categoryResponse.data.id;
          console.log("New category created with ID:", categoryId);
          console.log("New category created with ID:", values.category_name);
        }

        
        // Create the job listing with the found/created categoryId
        const jobResponse = await axios.post(
          jobId
            ? `http://localhost:5001/api/jobListings/${jobId}`
            : 'http://localhost:5001/api/jobListings/create',
          {
            providerId: userId,
            title: values.title,
            description: values.description,
            requirements: values.requirements,
            preferredSkills: values.preferredSkills,
            salary_range: values.salary_range,
            location: values.location,
            expires_at: values.expires_at,
            categoryId: categoryId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(jobResponse);

        if (jobResponse.status === 201) {
          console.log("Job created successfully");
          navigate("/jobProvider");
        }
      } catch (error) {
        console.error("Error creating job or category:", error.response.data);
        setError("Error creating job or category. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="post-job-form-container">
      <form onSubmit={formik.handleSubmit}>
        <div className="title-button-container">
          <h1 className="title">Post a Job</h1>
          <div className="buttons-container">
            <Link className="link" to="/jobProvider">
              <button type="button" className="cancel-button">
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="button-post-job"
              disabled={loading}
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="job-details">
          <div className="job-details-title">Job Details</div>

          {/* Job Title */}
          <div className="row">
            <label className="label" htmlFor="title">
              Job Title
            </label>
            <span> : </span>
            <input
              id="title"
              name="title"
              className="input job"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="error">{formik.errors.title}</div>
            ) : null}
          </div>

          {/* Job Description */}
          <div className="row">
            <label className="label" htmlFor="description">
              Job Description
            </label>
            <span> : </span>
            <textarea
              id="description"
              name="description"
              className="input job-description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="error">{formik.errors.description}</div>
            ) : null}
          </div>

          {/* Category */}
          <div className="row">
            <label className="label">Category</label>
            <span> : </span>
            <input
              className="input category"
              name="category_name"
              value={formik.values.category_name}
              onChange={formik.handleChange}
            />
            {formik.errors.category_name && (
              <div className="error">{formik.errors.category_name}</div>
            )}
          </div>

          {/* Requirements */}
          <div className="row">
            <label className="label" htmlFor="requirements">
              Requirements
            </label>
            <span> : </span>
            <input
              id="requirements"
              name="requirements"
              className="input requirements"
              value={formik.values.requirements}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.requirements && formik.errors.requirements ? (
              <div className="error">{formik.errors.requirements}</div>
            ) : null}
          </div>

          {/* Skills */}
          <div className="row">
            <label className="label" htmlFor="preferredSkills">
              Skills
            </label>
            <span> : </span>
            <input
              id="preferredSkills"
              name="preferredSkills"
              className="input skills"
              value={formik.values.preferredSkills}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.preferredSkills && formik.errors.preferredSkills ? (
              <div className="error">{formik.errors.preferredSkills}</div>
            ) : null}
          </div>

          {/* Salary */}
          <div className="row">
            <label className="label" htmlFor="salary_range">
              Salary
            </label>
            <span> : </span>
            <input
              id="salary_range"
              name="salary_range"
              className="input job-salary"
              value={formik.values.salary_range}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.salary_range && formik.errors.salary_range ? (
              <div className="error">{formik.errors.salary_range}</div>
            ) : null}
          </div>

          {/* Location */}
          <div className="row">
            <label className="label" htmlFor="location">
              Location
            </label>
            <span> : </span>
            <input
              id="location"
              name="location"
              className="input job-location"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.location && formik.errors.location ? (
              <div className="error">{formik.errors.location}</div>
            ) : null}
          </div>

          {/* Last Date */}
          <div className="row">
            <label className="label" htmlFor="expires_at">
              Last Date
            </label>
            <span> : </span>
            <input
              id="expires_at"
              name="expires_at"
              type="date"
              className="input last-date"
              value={formik.values.expires_at}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.expires_at && formik.errors.expires_at ? (
              <div className="error">{formik.errors.expires_at}</div>
            ) : null}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
