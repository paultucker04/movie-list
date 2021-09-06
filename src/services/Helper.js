const httpResponseStatusHandler = async (response) => {
  if (response.ok) {
    return response.json();
  } else {
    if (
      response.status === 401 &&
      window.location.pathname.substr(1) !== "login"
    ) {
      window.location.href = "/login";
    }
    let message = await response.json().then((json) => json.message);
    throw new Error(message);
  }
};

const getApiUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:8000";
  } else {
    return "http://3.238.82.170";
  }
};

export { httpResponseStatusHandler, getApiUrl };
