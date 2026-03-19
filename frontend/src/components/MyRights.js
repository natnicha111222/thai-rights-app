import React from 'react';

function MyRights({ rights, profile, onSelect, setPage }) {
  if (!profile) {
    return (
      <div className="container">
        <div className="card">
          <h2>{'\u2B50'} สิทธิของฉัน</h2>
          <p style={{color:'#666',marginBottom:15}}>กรุณากรอกข้อมูลของคุณก่อน</p>
          <button className="btn-primary" onClick={() => setPage('profile')}>กรอกข้อมูล</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h2>{'\u2B50'} สิทธิที่คุณได้รับ ({rights.length} สิทธิ)</h2>
        <p style={{color:'#666',marginBottom:15}}>จากข้อมูลของคุณ: อายุ {profile.age || '-'} ปี</p>
        {rights.length === 0 && <p style={{textAlign:'center',color:'#999',padding:30}}>ไม่พบสิทธิที่ตรงกับข้อมูลของคุณ</p>}
        {rights.map(r => (
          <div key={r.id} className="right-item" onClick={() => onSelect(r)}>
            <h3>{r.icon} {r.name}</h3>
            <p>{r.description}</p>
            <span className="right-tag">{r.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyRights;
