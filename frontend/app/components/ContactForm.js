'use client';

import { useState } from 'react';

const BOT_TOKEN = '8656007868:AAFeEEn8g-aUCt1-ofI-8W-cHcYFPqjWNss';
const CHAT_ID = '291987010';

async function sendToTelegram(name, phone, message) {
  const text = `🏗 Нова заявка з сайту PRORAB\n\n👤 Ім'я: ${name}\n📞 Телефон: ${phone}\n💬 Повідомлення: ${message}`;
  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' }),
  });
  if (!res.ok) throw new Error('Failed');
}

export default function ContactForm({ t, titleSize = 'clamp(24px, 3vw, 36px)', inputSize = '11px', inputPadding = '8px 0', gap = '12px' }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setStatus(null);
    try {
      await sendToTelegram(name, phone, message);
      setName(''); setPhone(''); setMessage('');
      setStatus('success');
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { placeholder: t.contacts.namePlaceholder, type: 'text', value: name, set: setName },
    { placeholder: t.contacts.phonePlaceholder, type: 'tel', value: phone, set: setPhone },
    { placeholder: t.contacts.messagePlaceholder, type: 'text', value: message, set: setMessage },
  ];

  return (
    <>
      <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: titleSize, fontWeight: 600, color: '#CFC7BD', letterSpacing: '0.05em', textTransform: 'uppercase', margin: '0 0 20px', textAlign: 'center' }}>
        {t.contacts.formTitle}
      </h2>

      {fields.map(f => (
        <div key={f.placeholder} style={{ borderBottom: '1px solid rgba(207,199,189,0.2)', marginBottom: gap }}>
          <input
            type={f.type}
            placeholder={f.placeholder}
            value={f.value}
            onChange={e => f.set(e.target.value)}
            disabled={loading}
            style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', fontFamily: 'Montserrat, sans-serif', fontSize: inputSize, color: '#CFC7BD', padding: inputPadding, letterSpacing: '0.05em' }}
          />
        </div>
      ))}

      {status === 'success' && (
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', color: '#28C840', textAlign: 'center', margin: '8px 0 0' }}>
          {t.telegramChat.reply}
        </p>
      )}
      {status === 'error' && (
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', color: '#FF5F57', textAlign: 'center', margin: '8px 0 0' }}>
          {t.telegramChat.error}
        </p>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: gap }}>
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{ background: 'transparent', border: '1px solid rgba(245,243,239,0.4)', color: '#F5F3EF', fontFamily: 'Montserrat, sans-serif', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '0.75rem 2rem', cursor: loading ? 'not-allowed' : 'pointer', transition: 'border-color 0.25s, color 0.25s', opacity: loading ? 0.6 : 1 }}
        >
          {loading ? 'Sending...' : t.contacts.sendButton}
        </button>
      </div>
    </>
  );
}
