import React, { useState } from 'react';

function Profile({ onSave }) {
  const [form, setForm] = useState({ age:'', gender:'', work:'', income:'', isDisabled:false, isPregnant:false, isVeteran:false, hasChildren:false, isLowIncome:false, isElderly:false });

  const update = (k, v) => setForm({ ...form, [k]: v });

  return (
    <div className="container">
      <div className="card">
        <h2>{'\uD83D\uDC64'} ข้อมูลของฉัน</h2>
        <p style={{color:'#666',marginBottom:20}}>กรอกข้อมูลเพื่อให้ระบบแนะนำสิทธิที่เหมาะกับคุณ</p>

        <div className="form-group">
          <label>{'\uD83D\uDCC5'} อายุ (ปี)</label>
          <input type="number" placeholder="เช่น 25" min="0" max="120" value={form.age} onChange={e => update('age', e.target.value)} />
        </div>

        <div className="form-group">
          <label>{'\u26A7'} เพศ</label>
          <select value={form.gender} onChange={e => update('gender', e.target.value)}>
            <option value="">-- เลือก --</option>
            <option value="male">ชาย</option>
            <option value="female">หญิง</option>
          </select>
        </div>

        <div className="form-group">
          <label>{'\uD83D\uDCBC'} สถานะการทำงาน</label>
          <select value={form.work} onChange={e => update('work', e.target.value)}>
            <option value="">-- เลือก --</option>
            <option value="employee">พนักงานบริษัท/ลูกจ้าง</option>
            <option value="government">ข้าราชการ</option>
            <option value="freelance">อาชีพอิสระ/ฟรีแลนซ์</option>
            <option value="farmer">เกษตรกร</option>
            <option value="student">นักเรียน/นักศึกษา</option>
            <option value="unemployed">ว่างงาน</option>
            <option value="retired">เกษียณ</option>
          </select>
        </div>

        <div className="form-group">
          <label>{'\uD83D\uDCB0'} รายได้ต่อเดือน</label>
          <select value={form.income} onChange={e => update('income', e.target.value)}>
            <option value="">-- เลือก --</option>
            <option value="none">ไม่มีรายได้</option>
            <option value="low">ต่ำกว่า 15,000 บาท</option>
            <option value="medium">15,000 - 30,000 บาท</option>
            <option value="high">มากกว่า 30,000 บาท</option>
          </select>
        </div>

        <div className="form-group">
          <label>สถานะเพิ่มเติม (เลือกได้หลายข้อ)</label>
          <div className="cb-group">
            <label><input type="checkbox" checked={form.isDisabled} onChange={e => update('isDisabled', e.target.checked)} /> {'\u267F'} ผู้พิการ</label>
            <label><input type="checkbox" checked={form.isPregnant} onChange={e => update('isPregnant', e.target.checked)} /> {'\uD83E\uDD30'} ตั้งครรภ์</label>
            <label><input type="checkbox" checked={form.isVeteran} onChange={e => update('isVeteran', e.target.checked)} /> {'\uD83C\uDF96\uFE0F'} ทหารผ่านศึก</label>
            <label><input type="checkbox" checked={form.hasChildren} onChange={e => update('hasChildren', e.target.checked)} /> {'\uD83D\uDC76'} มีบุตร 0-6 ปี</label>
            <label><input type="checkbox" checked={form.isLowIncome} onChange={e => update('isLowIncome', e.target.checked)} /> {'\uD83D\uDCB3'} บัตรสวัสดิการแห่งรัฐ</label>
            <label><input type="checkbox" checked={form.isElderly} onChange={e => update('isElderly', e.target.checked)} /> {'\uD83D\uDC74'} ดูแลผู้สูงอายุ</label>
          </div>
        </div>

        <button className="btn-primary" onClick={() => onSave(form)}>{'\u2705'} บันทึกและดูสิทธิของฉัน</button>
      </div>
    </div>
  );
}

export default Profile;
