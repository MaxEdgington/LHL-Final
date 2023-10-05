import { createContext, useContext, useState } from "react";
import axios from "axios";

export const userContext = createContext();

export default function UserProvider(props) {
  const [loggedinUser, setLoggedinUser] = useState({}); //inital?

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/set-session', loggedinUser);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const userData = { loggedinUser, handleSignIn };

  return (
    <userContext.Provider value={userData}>
      {props.children}
    </userContext.Provider>
  );
}

