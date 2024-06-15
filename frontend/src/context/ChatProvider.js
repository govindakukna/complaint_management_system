import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [profileView, setProfileView] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState();


  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    setUser(userInfo);

    if (
      !userInfo &&
      (window.location.pathname === "/usercomplaints" ||
        window.location.pathname === "/registerComplain")
    ) {
      navigate("/");
    }
  }, []);

  const toggleProfileView = () => {
    console.log("hiii profile");
setProfileView(!profileView);
  } 
  

  return (
    <ChatContext.Provider
      value={{
    
        profileView,
        toggleProfileView,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
