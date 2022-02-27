const fetchCreator = async (
  url: string,
  method: string,
  handleErrors: boolean,
  body?: any,
  headers?: any,
) => {
  const creator = fetch(url, {
    method,
    body,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .catch((error) =>
      handleErrors ? { error } : Error(error),
    );

  return creator;
};

export default fetchCreator;
