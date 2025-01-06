const loadAppConfig = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_CRYPTO_API_URL;
  const network = process.env["NEXT_PUBLIC_NETWORK"] || "";

  return {
    network,
    apiBaseUrl
  };
};

export { loadAppConfig };
