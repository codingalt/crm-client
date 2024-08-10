export const setToken = (token) => {
  localStorage.setItem("crmClientToken", token);
  const event = new Event("tokenChanged");
  window.dispatchEvent(event);
};

function sendMessageToFlutter(message) {
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(message);
  } else {
    console.error("ReactNativeWebView is not defined");
  }
}

export const removeToken = () => {
  localStorage.removeItem("crmClientToken");
  const event = new Event("tokenChanged");
  window.dispatchEvent(event);

  sendMessageToFlutter("logout");
};
