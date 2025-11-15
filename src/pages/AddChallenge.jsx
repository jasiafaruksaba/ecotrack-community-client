import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

const API = import.meta.env.VITE_SERVER_BASE_URL || 'http://localhost:3000/api';

export default function AddChallenge(){
  const { user } = useAuth();
  const nav = useNavigate();
  const [loading,setLoading] = useState(false);
  const [form,setForm] = useState({title:'',category:'Green Living',description:'',duration:7,target:'',startDate:'',endDate:'',imageUrl:''});

  const submit = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);
      const payload = {...form, createdBy: user?.email || 'anonymous'};
      const token = user && await user.getIdToken();
      await axios.post(`${API}/challenges`, payload, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
      toast.success('Challenge added');
      nav('/challenges');
    }catch(err){ console.error(err); toast.error('Failed to add') }finally{ setLoading(false); }
  };

  return (
    <form className="form" onSubmit={submit}>
      <h3>Add Challenge</h3>
      <label>Title</label>
      <input className="input" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required />
      <label>Category</label>
      <select className="input" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
        <option>Waste Reduction</option>
        <option>Energy Conservation</option>
        <option>Water Conservation</option>
        <option>Sustainable Transport</option>
        <option>Green Living</option>
      </select>
      <label>Description</label>
      <textarea className="input" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} required />
      <label>Duration (days)</label>
      <input type="number" min="1" className="input" value={form.duration} onChange={e=>setForm({...form,duration:e.target.value})}/>
      <label>Start Date</label>
      <input type="date" className="input" value={form.startDate} onChange={e=>setForm({...form,startDate:e.target.value})}/>
      <label>End Date</label>
      <input type="date" className="input" value={form.endDate} onChange={e=>setForm({...form,endDate:e.target.value})}/>
      <label>Image URL</label>
      <input className="input" value={form.imageUrl} onChange={e=>setForm({...form,imageUrl:e.target.value})}/>
      <div style={{display:'flex',gap:8}}>
        <button className="cta" type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Challenge'}</button>
      </div>
    </form>
  );
}
