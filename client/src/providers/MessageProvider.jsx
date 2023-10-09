import { createContext, useState, useContext } from "react";
import axios from "axios";

export const messageContext = createContext();

export default function MessageProvider(props) {
  const [messages, setMessages] = useState([]);

  const fetchMessagesforProject = async (project_id) => {
    try {
      console.log('fetchMessagesforProject is running');
      const response = await axios.get(`/api/messages/${project_id}`);
      console.log("message provider", response.data);
      setMessages(response.data);
    } catch (error) {
      console.error("Could not find your projects", error.message);
    }
    console.log('Axios request URL:', `/api/messages/${project_id}`);
    console.log("message state in provider", messages);
  };


  const addMessage = async (formData) => {
    console.log("this is what msgProvider-add gets:", formData);
    try {
      const response = await axios.post(`/api/messages/add`, formData);
      // setMessages(response.data);
      //does this need to set anything or spread prev
    } catch (error) {
      console.error("Could not add message", error);
    }
  };

  const messageData = { messages, addMessage, fetchMessagesforProject };

  return (
    <messageContext.Provider value={messageData}>
      {props.children}
    </messageContext.Provider>
  );
}
