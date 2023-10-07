import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const userContext = createContext();

export default function UserProvider(props) {
  const [loggedinUser, setLoggedinUser] = useState({}); //inital?
  const navigate = useNavigate();

  const setCookie = async (formData) => {
    // console.log("this IS being logged in the handleSignIn function", formData.email);

    try {
      const response = await axios.post('/api/set-session', { email: formData.email });
      // console.log("resp in provider", response.data);
      setLoggedinUser(response.data.user);
      return response.data;
    } catch (error) {
      console.error(error);
    }
    // e.target.reset(); //is this needed?
    // setLoggedinUser();
  };

  const logOut = () => {
    setLoggedinUser({});
    navigate('/login');
    console.log("loggedinuser should be OUT", loggedinUser);
  };

  const userData = { loggedinUser, setCookie, logOut };

  return (
    <userContext.Provider value={userData}>
      {props.children}
    </userContext.Provider>
  );
}

