const AUTH_API_BASE_URL = process.env.REACT_APP_AUTH_SERVICE_URL;
const TASKS_API_BASE_URL = process.env.REACT_APP_TASKS_SERVICE_URL;

export async function login(username, password) {
  const response = await fetch(`${AUTH_API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  // Return the entire response for better error handling
  return response;
}

export async function signUp(email, password) {
  const response = await fetch(`${AUTH_API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: email, password }),
  });

  return response;
}

export async function fetchTasks(token) {
  const response = await fetch(`${TASKS_API_BASE_URL}/tasks`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Failed to fetch tasks');
  }
}
