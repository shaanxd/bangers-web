export const POST = (endpoint, requestBody = {}, authorization = null) => {
  const url = createRequestUrl(endpoint);
  const body = createRequestBody(requestBody);
  const headers = createRequestHeader(authorization);

  return APIPOST(url, body, headers);
};

export const GET = (endpoint, authorization = null) => {
  const url = createRequestUrl(endpoint);
  const headers = createRequestHeader(authorization);

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers
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

export const FDPOST = (endpoint, requestBody = {}, authorization = null) => {
  const url = createRequestUrl(endpoint);
  const body = createFormDataBody(requestBody);
  const headers = createFormDataHeader(authorization);

  return APIPOST(url, body, headers);
};

const APIPOST = (url, body, headers) => {
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

const createFormDataBody = obj => {
  let data = new FormData();
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      data.append(key, obj[key]);
    }
  }
  return data;
};

const createFormDataHeader = authorization => {
  return authorization
    ? {
        Authorization: `Bearer ${authorization}`
      }
    : {};
};
