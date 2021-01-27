//const urlPath = process.env.URI;
const urlPath = "http://localhost:3001/api";

const header = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

const requestSome = async (
  options = {
    path: "/",
    queries: {},
    method: "GET",
    body: undefined,
    headers: header,
    redirect: "follow",
  }
) => {
  const url = new URL(`${urlPath}${options.path}`);
  if (options.queries)
    for (const key of Object.keys(options.queries)) {
      url.searchParams.append(key, options.queries[key]);
    }
  if (options.body) options.body = JSON.stringify(options.body);
  const rawResponse = await fetch(url.toString(), options);
  const response = await rawResponse.json();
  return response;
};

export default requestSome;
