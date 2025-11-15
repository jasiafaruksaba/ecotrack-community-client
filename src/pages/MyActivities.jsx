import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import SkeletonLoader from '../components/SkeletonLoader';
import { toast } from 'react-toastify';

const API = import.meta.env.VITE_SERVER_BASE_URL || 'http://localhost:3000/api';

export default function MyActivities(){
  const { user } = useAuth();
  const [loading,setLoading] = useState(true);
  const [items,setItems] = useState([]);

  useEffect(()=>{
    if(!user) return;
    (async ()=> {
      try{
        setLoading(true);
        const token = await user.getIdToken();
        const res = await axios.get(`${API}/userChallenges/my`, { headers: { Authorization: `Bearer ${token}` }});
        setItems(res.data);
      }catch(e){ console.error(e); toast.error('Failed to load activities') }finally{ setLoading(false); }
    })();
  },[user]);

  if(!user) return <div>Please login</div>;
  if(loading) return <SkeletonLoader count={3}/>;

  return (
    <div>
      <h2>My Activities</h2>
      {items.length===0 ? <p>You haven't joined any challenges yet.</p> : (
        <div style={{display:'grid',gap:12}}>
          {items.map(it=>(
            <div key={it._id} className="card" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <h4 style={{margin:0}}>Challenge: {it.challengeId}</h4>
                <div style={{color:'var(--muted)'}}>Status: {it.status} • Progress: {it.progress}%</div>
              </div>
              <div>
                {/* update progress UI can be added here */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
