import fetch from 'dva/fetch';

const BaseUrl = "https://api.fh.shoogoome.com";

const checkStatus = (response) => {
  if(response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}


/**
 * Requests a URL, returning a promise.
 *
 * @return {object}           An object containing either "data" or "err"
 * @param options
 */

export default async function request(options) {
  const Options = {
    method: options.method.toUpperCase(),
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    credentials: 'include',
    body: JSON.stringify(options.data),
  };
  const response = await fetch(BaseUrl + options.url, Options);
  console.log(response);
  checkStatus(response);
  const data = await response.json();
  console.log(data)
  const ret = {
    data,
  };

  return ret;
}
