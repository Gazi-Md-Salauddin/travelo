export const getUsers = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
    {
      cache: "no-store",
    }
  );

  return res.json();
};

export const updateUserRole = async (
  id,
  role
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}/role`,
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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}/fraud`,
      {
        method: "PATCH",
      }
    );

    return res.json();
  };