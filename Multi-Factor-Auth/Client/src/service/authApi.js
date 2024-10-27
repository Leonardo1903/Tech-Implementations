import api from "./api";

export const register = async (username, password) => {
  return await api.post("/users/register", {
    username,
    password,
  });
};

export const login = async (username, password) => {
  return await api.post(
    "/users/login",
    {
      username,
      password,
    },
    {
      withCredentials: true,
    }
  );
};

export const authStatus = async () => {
  return await api.get("/users/status", {
    withCredentials: true,
  });
};

export const logoutUser = async () => {
  return await api.post(
    "/users/logout",
    {},
    {
      withCredentials: true,
    }
  );
};

export const setup2FA = async () => {
  return await api.post(
    "/users/2fa/setup",
    {},
    {
      withCredentials: true,
    }
  );
};

export const verify2FA = async (token) => {
  return await api.post(
    "/users/2fa/verify",
    {
      token,
    },
    {
      withCredentials: true,
    }
  );
};

export const reset2FA = async () => {
  return await api.post(
    "/users/2fa/reset",
    {},
    {
      withCredentials: true,
    }
  );
};
