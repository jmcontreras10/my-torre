const fetch = require("node-fetch");

const urls = [
  "https://torre.bio/api/bios",
  "https://torre.co/api/opportunities/VWYbmNwN",
  "https://search.torre.co/opportunities/_search",
  "https://search.torre.co/people/_search",
];

const headers = [
  {
    "Content-Type": "application/json",
  },
];

const methods = ["GET", "POST"];

const getQueries = (queriesArray) => {
  if (queriesArray)
    return queriesArray.reduce(
      (acumulator, current) => `${acumulator}&${current.name}=${current.value}`
    );
  return "";
};

const requestSome = async (
  selectedUrl,
  path,
  method,
  headerType,
  body,
  queries
) => {
  let requestOptions = {
    method: methods[method],
    headers: headers[headerType],
  };

  let url = `${urls[selectedUrl]}${path}`;

  if (body) requestOptions.body = JSON.stringify(body);
  if (queries) url = `${url}/?${getQueries()}`;

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = { requestSome };
