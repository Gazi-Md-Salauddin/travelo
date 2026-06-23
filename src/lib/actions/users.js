import { protectedFetch, serverFetch } from "../core/server";
import { getUserSession } from "../core/session";


export const getUsers = async () => {
  return protectedFetch("/api/users");
};

export const updateUserRole = async (
  id,
  role
) => {
  return protectedFetch(
    `/api/users/${id}/role`
    {
      method: "PATCH",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        role,
      }),
    }
  );

  return res.json();
};

export const markVendorAsFraud =
  async (id) => {
    return protectedFetch(
      `/api/users/${id}/fraud`,
      {
        method: "PATCH",
      }
    );

    return res.json();
  };


//for profile update
export const updateUser = async (
  id,
  data
) => {
  return protectedFetch(
    `/api/users/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return res.json();
};