import React, { useState } from 'react';

function AllRights({ rights, categories, onSelect }) {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('');

  const filtered = rights.filter(r => {
    if (search && !r.name.includes(search) && !r.description.includes(search)) return false;
    if (activeCat && r.category !== activeCat) return false;
    return true;
  });

  return (
    <div className="container">
      <div className="card">
        <h2>{'\uD83D\uDCCB'} สิทธิทั้งหมดของคนไทย</h2>
        <input type="text" className="search-box" placeholder="ค้นหาสิทธิ..." value={search} onChange={e => setSearch(e.target.value)} />
        <div className="filter-tabs">
          <button className={activeCat === '' ? 'active' : ''} onClick={() => setActiveCat('')}>ทั้งหมด</button>
          {categories.map(c => (
            <button key={c} className={activeCat === c ? 'active' : ''} onClick={() => setActiveCat(activeCat === c ? '' : c)}>{c}</button>
          ))}
        </div>
        {filtered.length === 0 && <p style={{textAlign:'center',color:'#999',padding:30}}>ไม่พบสิทธิที่ค้นหา</p>}
        {filtered.map(r => (
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

export default AllRights;
