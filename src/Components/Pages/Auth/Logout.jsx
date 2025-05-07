import { signOut } from "firebase/auth";
import { auth } from "../../../firebase-config";

function Logout() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out!");
    } catch (err) {
      alert(err.message);
    }
  };

  return <button onClick={handleLogout}>Log Out</button>;
}

export default Logout;
