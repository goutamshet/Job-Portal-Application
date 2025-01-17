import "./seeker_job_info_card.css";
import edit from "../../../../Assets/edit.png";
import remove from "../../../../Assets/trash-can.png";
import companyicon from "../../../../Assets/company.png";
import work from "../../../../Assets/work.png";
import jobDescription from "../../../../Assets/job-description.png";
import salary from "../../../../Assets/payroll.png";
import jobtype from "../../../../Assets/job-type.png";
import location from "../../../../Assets/location.png";
import phone from "../../../../Assets/phone.png";
import {useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import DateFormatter from "./DateFormatter";

const JobInfoCard = ({ item }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileData = await axios.get("http://localhost:5001/api/jobProvider", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request
          },
        });
        
        setData(profileData.data[0]); // Assume response.data is an array of profiles
        console.log(profileData.data)
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="info-card-container">
      <DateFormatter className={"job-post-date"} dateString={item.created_at} title={"Posted On"} />
      <div className="card-details-container">
        <table>
          <tr>
            <th className="heading">Company</th>
            <td className="data">{data.company_name}</td>
          </tr>
          <tr>
            <th className="heading">Job</th>
            <td className="data">{item.title}</td>
          </tr>
          <tr>
            <th className="heading">Description</th>
            <td className="data">{item.description}</td>
          </tr>
          <tr>
            <th className="heading">Salary</th>
            <td className="data">{item.salary_range}</td>
          </tr>
          <tr>
            <th className="heading">Location</th>
            <td className="data">{item.location}</td>
          </tr>
          <tr>
            <th className="heading">Phone </th>
            <td className="data">{data.phone}</td>
          </tr>
        </table>
        <div className="buttons-container">
          <div className="button">Apply</div>
        </div>
      </div>
    </div>
  );
};

export default JobInfoCard;
