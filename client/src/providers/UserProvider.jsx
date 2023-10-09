import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const userContext = createContext();

export default function UserProvider(props) {
  const [loggedinUser, setLoggedinUser] = useState({});
  const navigate = useNavigate();

  const setCookie = async (formData) => {
    // console.log("this IS being logged in the handleSignIn function", formData.email);

    try {
      const response = await axios.post('/api/set-session', { email: formData.email });
      console.log("resp in USER provider", response.data.user);
      const user_id = response.data.user.id;
      setLoggedinUser(response.data.user);
      navigate(`/myProjects/${user_id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
    // e.target.reset(); //is this needed?
    // setLoggedinUser();
  };

  const selectUser = async (id) => {
    const idNum = parseInt(id);
    try {
      console.log('selectUser is running', idNum);

      const responseForUser = await axios.get(`/api/users/${idNum}`);
      // const [responseForProject, responseForUser] =
      //   await Promise.all([
      //     axios.get(`/api/myprojects/${idNum}`),
      //     axios.get(`/api/users/${idNum}`),
      //   ]);


      setLoggedinUser(responseForUser.data);
      // do i need to return the data?
      // console.log("selectuser - responseForProject", responseForProject.data);
      console.log("selectuser - responseForUser", responseForUser.data);

    } catch (error) {
      console.error(error);
    }
  };

  const logOut = () => {
    setLoggedinUser({});
    navigate('/login');
    console.log("loggedinuser should be OUT", loggedinUser);
  };

  const userData = { loggedinUser, selectUser, setCookie, logOut };

  return (
    <userContext.Provider value={userData}>
      {props.children}
    </userContext.Provider>
  );
}

