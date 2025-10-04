const refreshToken = async () => {
  const currentRefreshToken = localStorage.getItem('refreshToken');
  if (!currentRefreshToken) {
    throw new Error('No refresh token available');
  }

  const response = await fetch('https://binit-1fpv.onrender.com/auth/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh_token: currentRefreshToken }),
  });

  if (!response.ok) {
    // If refresh fails, logout
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login'; // Force redirect
    throw new Error('Failed to refresh token');
  }

  const data = await response.json();
  localStorage.setItem('accessToken', data.access_token);
  return data.access_token;
};

const apiFetch = async (url, options = {}) => {
  let accessToken = localStorage.getItem('accessToken');

  // If no token, and we are not trying to log in, don't make the call
  if (!accessToken && !url.includes('/auth/')) {
      // Or redirect to login, depending on desired behavior
      window.location.href = '/login';
      return Promise.reject(new Error('Not authenticated'));
  }

  const headers = {
    ...options.headers,
  };

  // Only add auth header if it's not a login/register request
  if (accessToken && !url.includes('/auth/')) {
      headers['Authorization'] = `Bearer ${accessToken}`;
  }

  let response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    try {
      const newAccessToken = await refreshToken();
      const newHeaders = {
        ...options.headers,
        'Authorization': `Bearer ${newAccessToken}`,
      };
      // Retry the original request with the new token
      response = await fetch(url, { ...options, headers: newHeaders });
    } catch (error) {
      // Refreshing failed, the error is already handled inside refreshToken (logout)
      return Promise.reject(error);
    }
  }

  return response;
};

export default apiFetch;
