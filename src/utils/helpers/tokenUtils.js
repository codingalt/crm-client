export const setToken = (token) => {
  localStorage.setItem("crmClientToken", token);
  const event = new Event("tokenChanged");
  window.dispatchEvent(event);
};

export const removeToken = () => {
  localStorage.removeItem("crmClientToken");
  const event = new Event("tokenChanged");
  window.dispatchEvent(event);
};
