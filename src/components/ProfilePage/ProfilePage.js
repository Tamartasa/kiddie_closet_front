import React from "react";
import { useEffect, useState } from "react";
import { USER_DATA } from "../../urls";

const ProfilePage = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(USER_DATA, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      if (!response.ok) {
        console.log(`error in ${fetchUserData.name}`);
        // Handle error response
        return;
      }
      const data = await response.json();
      console.log(`success setuser data: ${data}`);
      setUser(data);
    };
    fetchUserData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="profile-page">
      <h1>Welcome to Kiddie Closet, {user?.first_name}!</h1>
      <p>First name: {user.first_name}</p>
      <p>Last name: {user.last_name}</p>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
      <p>Phone number: {user?.app_user?.phone_number}</p>
      <p>City: {user?.app_user?.city}</p>
      <p>Neighborhood: {user?.app_user?.neighborhood}</p>
      <p>Here from: {formatDate(user.date_joined)}</p>
      {/* <p>Address: {user.address}</p>
      <p>Phone: {user.phone}</p> */}
      <h3>Your Listings:</h3>
      <ul>
        {/* {user.purchases.map((purchase) => (
          <li key={purchase.id}>
            {purchase.item} - {purchase.price}
          </li>
      ))} */}
      </ul>
    </div>
  );
};

export default ProfilePage;
