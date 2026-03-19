import React from 'react';

function RightModal({ right, onClose }) {
  if (!right) return null;
  const r = right;

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>{'\u2715'}</button>
        <h2>{r.icon} {r.name}</h2>
        <div className="detail-row"><strong>รายละเอียด:</strong> {r.description}</div>
        <div className="detail-row"><strong>หมวดหมู่:</strong> {r.category}</div>
        <div className="detail-row"><strong>ช่วงอายุ:</strong> {r.ageMin === 0 && r.ageMax === 999 ? 'ทุกช่วงอายุ' : r.ageMin + ' - ' + (r.ageMax === 999 ? 'ขึ้นไป' : r.ageMax + ' ปี')}</div>
        <div className="detail-row"><strong>วิธีรับสิทธิ:</strong> {r.howTo}</div>
        <div className="detail-row"><strong>เอกสารที่ต้องใช้:</strong> {r.documents}</div>
        <div className="contact-box">
          <p><strong>{'\uD83D\uDCDE'} ช่องทางติดต่อ:</strong></p>
          <p style={{marginTop:8}}>{r.contact}</p>
          <p style={{marginTop:5}}><a href={'tel:' + r.phone}>{'\uD83D\uDCF1'} โทร: {r.phone}</a></p>
          <p style={{marginTop:5}}><strong>{'\uD83D\uDCCD'} สถานที่:</strong> {r.location}</p>
        </div>
      </div>
    </div>
  );
}

export default RightModal;
