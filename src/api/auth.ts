export const login = async (username: string, password: string) => {
  const res = await fetch('http://localhost:5000/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem('token', data.token);
    return data; // Return the user data (username, token, etc.)
  } else {
    throw new Error(data.message);
  }
};

export const getProfile = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch('http://localhost:5000/api/users/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error('Unauthorized');
  }

  return await res.json();
};
