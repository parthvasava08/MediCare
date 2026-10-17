async function getAdminToken() {
  // Clerk can still be initialising for a moment after the page renders; wait
  // (up to ~3s) for the session instead of throwing a false "Not signed in".
  for (let i = 0; i < 20 && !window.Clerk?.session; i++) {
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
  const token = await window.Clerk?.session?.getToken();
  if (!token) {
    throw new Error("Not signed in — please sign in again.");
  }
  return token;
}

export async function adminHeaders(extra = {}) {
  const token = await getAdminToken();
  return {
    Authorization: `Bearer ${token}`,
    ...extra,
  };
}

export async function adminFetch(url, options = {}) {
  const headers = {
    ...(await adminHeaders()),
    ...(options.headers || {}),
  };
  return fetch(url, { ...options, headers });
}
