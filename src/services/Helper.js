const httpResponseStatusHandler = async (response) => {
  if (response.ok) {
    return response.json();
  } else {
    let message = await response.json().then((json) => json.message);
    throw new Error(message);
  }
};

export { httpResponseStatusHandler };
