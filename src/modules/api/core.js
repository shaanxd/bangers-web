export const POST = async (endpoint, requestBody, authorization) => {
  const url = `${process.env.REACT_APP_BASE_URL}${endpoint}`;
  const body = JSON.stringify(requestBody);
  const headers = authorization
    ? {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authorization}`
      }
    : {
        'Content-Type': 'application/json'
      };
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body
  });

  const data = await response.json();

  if (response.status >= 400) {
    throw new Error(data.message);
  }
  return data;
};
