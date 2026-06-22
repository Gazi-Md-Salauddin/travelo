import React from "react";

const UserHomePage = () => {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          Welcome to User Dashboard 👋
        </h1>
        <p className="mt-3 text-default-500">
          Select an option from the sidebar to get started.
        </p>
      </div>
    </div>
  );
};

export default UserHomePage;