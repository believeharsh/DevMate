import { signOut } from "firebase/auth";
import { auth } from "../../../firebase-config";
import { useState } from "react";
import Spinner from "../../General/Spinner";

function Logout() {
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (err) {
      alert(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="">
      {
        loading ? <Spinner />
          :
          <button className=" w-full text-left" onClick={handleLogout}> Log Out</button>
      }
    </div>

  )
}

export default Logout;
