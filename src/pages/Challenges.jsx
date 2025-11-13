import { useEffect, useState } from "react";
import axios from "axios";
import ChallengeCard from "../components/challengeCard";

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const res = await axios.get("/api/challenges");
        setChallenges(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchChallenges();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">All Challenges</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {challenges.map(ch => <ChallengeCard key={ch._id} challenge={ch} />)}
      </div>
    </div>
  );
};

export default Challenges;
