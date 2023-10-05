import { createContext, useContext, useState } from "react";
import axios from "axios";

export const userContext = createContext();

export default function UserProvider(props) {
  const [loggedinUser, setLoggedinUser] = useState({}); //inital?

  const setCookie = async (formData) => {
    console.log("this IS being logged in the handleSignIn function", formData.email);

    try {
      const response = await axios.post('/api/set-session', { email: formData.email });
      console.log("resp in provider", response.data);
      // setLoggedinUser(response.data);
      // console.log("i can set state loggedinuser", loggedinUser);
      return response.data;
    } catch (error) {
      console.error(error);
    }
    // e.target.reset(); //is this needed?
  };
  const userData = { loggedinUser, setCookie };

  return (
    <userContext.Provider value={userData}>
      {props.children}
    </userContext.Provider>
  );
}

