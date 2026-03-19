import React from 'react';

const ageGroups = [
  { label: 'แรกเกิด (0 ปี)', min: 0, max: 0 },
  { label: 'เด็กเล็ก (1-5 ปี)', min: 1, max: 5 },
  { label: 'วัยเรียน (6-18 ปี)', min: 6, max: 18 },
  { label: 'วัยทำงาน (19-59 ปี)', min: 19, max: 59 },
  { label: 'ผู้สูงอายุ (60+ ปี)', min: 60, max: 999 }
];

function Timeline({ rights, profile, onSelect }) {
  const userConds = [];
  if (profile) {
    if (profile.work) userConds.push(profile.work);
    if (profile.isDisabled) userConds.push('disabled');
    if (profile.isPregnant) userConds.push('pregnant');
    if (profile.isVeteran) userConds.push('veteran');
    if (profile.hasChildren) userConds.push('hasChildren');
    if (profile.isLowIncome) userConds.push('lowIncome');
    if (profile.gender) userConds.push(profile.gender);
  }

  const filterForGroup = (group) => {
    return rights.filter(r => {
      if (r.ageMin > group.max || r.ageMax < group.min) return false;
      if (r.conditions.length > 0 && profile) {
        const match = r.conditions.some(c => userConds.includes(c));
        if (!match) return false;
      }
      if (r.conditions.length > 0 && !profile) return false;
      return true;
    });
  };

  return (
    <div className="container">
      <div className="card">
        <h2>{'\uD83D\uDCC5'} สิทธิตามช่วงอายุ</h2>
        <p style={{color:'#666',marginBottom:20}}>สิทธิตั้งแต่เกิดจนสูงวัย {profile ? '(กรองตามข้อมูลของคุณ)' : '(กรอกข้อมูลเพื่อกรองเพิ่มเติม)'}</p>
        <div className="timeline">
          {ageGroups.map((g, i) => {
            const items = filterForGroup(g);
            if (items.length === 0) return null;
            return (
              <div key={i} className="timeline-item">
                <div className="timeline-age">{g.label}</div>
                {items.map(r => (
                  <div key={r.id} className="right-item" onClick={() => onSelect(r)} style={{marginLeft:0}}>
                    <h3>{r.icon} {r.name}</h3>
                    <p>{r.description}</p>
                    <span className="right-tag">{r.category}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Timeline;
