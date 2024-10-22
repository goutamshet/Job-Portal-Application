import JobInfoCard from "./JobInfoCard/employer_job_info_card"
import './main.css'
import { useState , useEffect} from "react";
import axios from "axios";

const EmployerMainSection = () => {
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
    

      const handleDelete = async (jobId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this job?");
        if (!confirmDelete) return;
    
        try {
          // Send the delete request to the API
          await axios.delete(`http://localhost:5001/api/jobListings/${jobId}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in the request
            },
          });
    
          // Remove the deleted job from the state
          setData(data.filter((job) => job.id !== jobId));
          alert("Job deleted successfully.");
        } catch (error) {
          console.error("Error deleting the job:", error);
          alert("Failed to delete the job.");
        }
      };

      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error.message}</div>;

    return(
        <div className="main">
            {
                data.map((item) => (
                    <JobInfoCard key={item.id} item={item} onDelete={handleDelete}/>
                ))
            }
        </div>
    )
}

export default EmployerMainSection