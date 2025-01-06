const loadAuthConfig = () => {
  const adminAuthTokenKey =
    process.env["NEXT_PUBLIC_ADMIN_AUTH_TOKEN_KEY"] ||
    "admin_auth_bearer_token";

  return {
    adminAuthTokenKey
  };
};

export { loadAuthConfig };
