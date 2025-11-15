import React from 'react';
export default function SkeletonLoader({count=3}){
  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:12}}>
      {Array.from({length:count}).map((_,i)=>(
        <div key={i} className="card skel-block" style={{padding:12}}>
          <div style={{height:140,background:'#eee',borderRadius:8,marginBottom:8}}></div>
          <div style={{height:16}} className="skeleton" />
          <div style={{height:12,marginTop:8}} className="skeleton" />
          <div style={{height:12,marginTop:8,width:'50%'}} className="skeleton" />
        </div>
      ))}
    </div>
  );
}
