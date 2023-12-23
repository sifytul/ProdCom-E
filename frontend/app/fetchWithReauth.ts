export const fetchWithReauth = async (path, options?, dispatch?, setJid?) => {
  let res = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + path, {
    ...options,
  });
  let parsedRes = await res.json();
  if (parsedRes.statusCode === 403) {
    const refreshTokenRes = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_API + "/auth/refresh-token",
      {
        ...options,
        method: "GET",
        body: null,
      }
    );

    const { accessToken } = await refreshTokenRes.json();
    if (accessToken) {
      dispatch(setJid(accessToken));
    }

    res = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/orders/new", {
      ...options,
      headers: {
        ...options.headers,
        authorization: `Bearer ${accessToken}`,
      },
    });
    parsedRes = await res.json();
  }

  return parsedRes;
};
