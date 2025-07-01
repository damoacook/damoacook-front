export async function sendInquiry(formData) {
  const res = await fetch('/api/inquiries/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  if (!res.ok) throw new Error('전송 실패');
  return res.json();
}