import React, { useState, useRef, useEffect } from 'react';

const API = 'http://localhost:5000/api';

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    { from: 'bot', text: 'สวัสดีครับ! ผม <b>น้องสิทธิ์</b> \uD83D\uDC18 ผู้ช่วยด้านสิทธิคนไทย ถามผมได้เลยครับ!' }
  ]);
  const [input, setInput] = useState('');
  const msgsEnd = useRef(null);

  useEffect(() => { msgsEnd.current && msgsEnd.current.scrollIntoView({ behavior: 'smooth' }); }, [msgs]);

  const send = (text) => {
    const q = text || input;
    if (!q.trim()) return;
    setMsgs(prev => [...prev, { from: 'user', text: q }]);
    setInput('');
    fetch(API + '/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: q })
    })
      .then(r => r.json())
      .then(d => setMsgs(prev => [...prev, { from: 'bot', text: d.reply }]))
      .catch(() => setMsgs(prev => [...prev, { from: 'bot', text: 'ขออภัยครับ เกิดข้อผิดพลาด ลองใหม่อีกครั้งนะครับ' }]));
  };

  const suggestions = ['บัตรทองคืออะไร', 'เบี้ยผู้สูงอายุได้เท่าไหร่', 'ประกันสังคมมีสิทธิอะไร', 'เงินอุดหนุนเด็ก'];

  return (
    <>
      <button className="mascot-btn" onClick={() => setOpen(!open)} title="คุยกับน้องสิทธิ์">{'\uD83D\uDC18'}</button>
      {open && (
        <div className="chat-window">
          <div className="chat-header">{'\uD83D\uDC18'} น้องสิทธิ์ — ผู้ช่วยด้านสิทธิคนไทย</div>
          <div className="chat-messages">
            {msgs.map((m, i) => (
              <div key={i} className={'chat-msg ' + m.from}>
                {m.from === 'bot' && <div className="avatar">{'\uD83D\uDC18'}</div>}
                <div className="bubble" dangerouslySetInnerHTML={{ __html: m.text }} />
                {m.from === 'user' && <div className="avatar">{'\uD83D\uDE4B'}</div>}
              </div>
            ))}
            <div ref={msgsEnd} />
          </div>
          <div className="quick-suggest">
            {suggestions.map((s, i) => (
              <button key={i} onClick={() => send(s)}>{s}</button>
            ))}
          </div>
          <div className="chat-input-area">
            <input value={input} onChange={e => setInput(e.target.value)} placeholder="พิมพ์ถามน้องสิทธิ์..." onKeyDown={e => e.key === 'Enter' && send()} />
            <button onClick={() => send()}>{'\u27A4'}</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
