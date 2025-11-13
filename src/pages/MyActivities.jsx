import { useEffect, useState } from "react";
import axios from "axios";

const MyActivities = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const token = localStorage.getItem("firebaseToken");
      const res = await axios.get("/api/userChallenges", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setActivities(res.data);
    };
    fetchActivities();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Challenges</h1>
      <div className="space-y-4">
        {activities.map(a => (
          <div key={a._id} className="bg-white shadow rounded p-4">
            <h3 className="font-semibold">{a.challengeTitle}</h3>
            <p>Status: {a.status}</p>
            <p>Progress: {a.progress}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyActivities;
