import JobInfoCard from "./JobInfoCard/seeker_job_info_card"
import './seeker_main.css'
import { useState,useEffect } from "react";
import axios from "axios";

const SeekerMainSection = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('token')

    useEffect(() => {
        const fetchData = async () => {
          try {
            const list = await axios.get('http://localhost:5001/api/jobListings',
                {headers: {
                    Authorization: `Bearer ${token}`, // Include token in the request
                  },
                }
            ); // Your API endpoint
            setData(list.data); // Assuming the API returns an array of data
            setLoading(false);
          } catch (error) {
            setError(error);
            setLoading(false);
          }
        };
    
        fetchData();
      }, []); // Empty dependency array to run once on mount
    
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error.message}</div>;

      console.log(data)
    return(
        <div className="main">
            {
                data.map((item) => (
                    <JobInfoCard key={item.id} item={item}/>
                ))
            }
        </div>
    )
}

export default SeekerMainSection