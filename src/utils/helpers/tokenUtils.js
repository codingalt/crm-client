export const setToken = (token) => {
  localStorage.setItem(import.meta.env.VITE_API_TOKEN_KEY, token);
  const event = new Event("tokenChanged");
  window.dispatchEvent(event);
};

function sendMessageToFlutter(message) {
  if (
    window.LogoutEvent &&
    typeof window.LogoutEvent.postMessage === "function"
  ) {
    window.LogoutEvent.postMessage(message);
  }
}

export const removeToken = () => {
  localStorage.removeItem(import.meta.env.VITE_API_TOKEN_KEY);
  const event = new Event("tokenChanged");
  window.dispatchEvent(event);

  sendMessageToFlutter("logout");
};
