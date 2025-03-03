import { useAuth } from "../context/AuthContext";
import Form from "../components/Form";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>Min sida</h2>
      <h3>Hej och välkommen {user?.firstname || "Användare"}</h3>
      <Form />
    </div>
  );
};

export default ProfilePage;
