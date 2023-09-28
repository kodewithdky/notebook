import React from "react";

const Profile = () => {
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  return (
    <div>
      <h3>{name}</h3>
      <h6>{email}</h6>
    </div>
  );
};

export default Profile;
