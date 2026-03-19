import React from 'react';

function Home({ rights, myRights, categories, setPage, onSelect }) {
  const [search, setSearch] = React.useState('');
  const filtered = search ? rights.filter(r => r.name.includes(search) || r.description.includes(search)) : [];

  return (
    <div>
      <div className="hero-banner">
        <h1>{'\uD83D\uDEE1\uFE0F'} สิทธิคนไทย</h1>
        <p>รู้สิทธิ์ รู้ใช้ รู้รักษา — ค้นหาสิทธิที่คุณควรได้รับ</p>
      </div>
      <div className="container">
        <div className="stats-row">
          <div className="stat-card"><div className="num">{rights.length}</div><div className="lbl">สิทธิทั้งหมด</div></div>
          <div className="stat-card"><div className="num">{myRights.length}</div><div className="lbl">สิทธิของคุณ</div></div>
          <div className="stat-card"><div className="num">{categories.length}</div><div className="lbl">หมวดหมู่</div></div>
        </div>
        <div className="card">
          <h2>{'\uD83D\uDE80'} เริ่มต้นใช้งาน</h2>
          <p style={{color:'#666',marginBottom:15}}>กรอกข้อมูลของคุณเพื่อค้นหาสิทธิที่เกี่ยวข้อง</p>
          <button className="btn-primary" onClick={() => setPage('profile')}>{'\uD83D\uDC64'} กรอกข้อมูลของฉัน</button>
        </div>
        <div className="card">
          <h2>{'\uD83D\uDD0D'} ค้นหาสิทธิ</h2>
          <input type="text" className="search-box" placeholder="พิมพ์ค้นหาสิทธิ เช่น บัตรทอง, เบี้ยผู้สูงอายุ..." value={search} onChange={e => setSearch(e.target.value)} />
          {filtered.map(r => (
            <div key={r.id} className="right-item" onClick={() => onSelect(r)}>
              <h3>{r.icon} {r.name}</h3>
              <p>{r.description}</p>
              <span className="right-tag">{r.category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
