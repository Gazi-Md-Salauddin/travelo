import { getUserToken } from "./session";
import {redirect} from 'next/navigation'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const authHeader = async () => {
    const token = await getUserToken();
    const header = token ? {
        authorization: `Bearer ${token}`
    } : {};
    return header;
}

export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);
    // handle 401, 404, 403
    return handleStatusCode(res);
}


export const protectedFetch = async (
  path,
  options = {}
) => {
  const authHeaders = await authHeader();

  const res = await fetch(
    `${baseUrl}${path}`,
    {
      ...options,
      headers: {
        ...authHeaders,
        ...(options.headers || {}),
      },
    }
  );

  return handleStatusCode(res);
};


export const serverMutation = async (path, data) => {
    const headers = await authHeader()
  const res = await fetch(`${baseUrl}${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify(data),
    });

    // handle 401, 404, 403

    return handleStatusCode(res);
}


const handleStatusCode = res => {
    if (res.status === 401) {
        redirect('/unauthorized')
    }
    else if (res.status === 403) {
        redirect('/forbidden');
    }

  console.log("URL:", res.url);

  const text = await res.text();
  console.log(text);

  return JSON.parse(text);
   // return res.json()
}