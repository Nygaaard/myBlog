import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>Min sida</h2>
      <h3>Hej och välkommen {user?.firstname || "Användare"}</h3>
    </div>
  );
};

export default ProfilePage;
