export const queryStringToObject = (url) =>
  [...new URLSearchParams(url.split("?")[1])].reduce((a, [k, v]) => ((a[k] = v), a), {});

export const objectToQueryString = (object) =>
  "?" +
  Object.keys(object)
    .map((key) => `${key}=${object[key].toString()}`)
    .join("&");
