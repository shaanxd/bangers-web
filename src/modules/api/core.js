export const POST = (endpoint, requestBody, authorization = null) => {
  const url = createRequestUrl(endpoint);
  const body = createRequestBody(requestBody);
  const headers = createRequestHeader(authorization);

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body
      });
      const data = await response.json();
      if (response.status >= 400) {
        reject(new Error(data.message));
      }
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
};

const createRequestUrl = endpoint => {
  return `${process.env.REACT_APP_BASE_URL}${endpoint}`;
};

const createRequestBody = requestBody => {
  return JSON.stringify(requestBody);
};

const createRequestHeader = authorization => {
  return authorization
    ? {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authorization}`
      }
    : {
        'Content-Type': 'application/json'
      };
};
