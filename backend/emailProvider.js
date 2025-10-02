const escapeHtml = (s = '') => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export async function sendContactEmail({ name, email, message }) {
  const provider = process.env.EMAIL_PROVIDER || 'resend';
  if (provider !== 'resend') {
    console.warn(`[email] Unsupported provider "${provider}" – defaulting to Resend.`);
  }
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.FROM_EMAIL;
  const target = process.env.TARGET_EMAIL;
  if (!apiKey) throw new Error('RESEND_API_KEY missing');
  if (!fromEmail) throw new Error('FROM_EMAIL missing');
  if (!target) throw new Error('TARGET_EMAIL missing');

  const text = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
  const html = `<h3>New Portfolio Message</h3>
<p><strong>Name:</strong> ${escapeHtml(name)}</p>
<p><strong>Email:</strong> ${escapeHtml(email)}</p>
<p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g,'<br/>')}</p>`;

  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [target],
      reply_to: email,
      subject: `New portfolio contact from ${name}`,
      text,
      html
    })
  });
  if (!resp.ok) {
    const body = await resp.text();
    throw new Error(`Resend error ${resp.status}: ${body.slice(0,250)}`);
  }
  const data = await resp.json();
  return { provider: 'resend', id: data.id, queued: true };
}
