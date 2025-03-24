export const getUserAccessToken = async (credentials?: {
  username: string;
  password: string;
}) => {
  const { username, password } = credentials ?? {
    username: 'marco-polo-silk',
    password: 'strong$$-10-Pass',
  };

  const apiUrl = process.env.API_URL || 'http://localhost:3000';

  const response = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  return data.accessToken;
};
