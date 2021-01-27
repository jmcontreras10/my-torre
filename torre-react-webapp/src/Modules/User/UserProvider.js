//  Imports
//  React
import { useContext, createContext, useState } from "react";
import requestSome from "../../Helpers/requests";

//  Contexts
const UserContext = createContext();
const UserUpdateContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};
export const useUserHandlerContext = () => {
  return useContext(UserUpdateContext);
};

export const UserProvider = ({ children }) => {
  //  The users Data context
  const [userData, setUserData] = useState({});

  /**
   * This login the user returning a JWT Token [Bearer]
   * @param {string} username
   * @param {string} password
   */
  const login = async (username, password) => {
    try {
      const options = {
        path: "/auth/login",
        method: "POST",
        body: { username, password },
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await requestSome(options);
      if (response?.internalCode === 1400) throw response;
      //  Save in the state the user Data fetched from the back
      const newUserData = {
        username: response.user.username,
      };
      //  Save Token
      sessionStorage.setItem("JWTtorreJobsToken", response.token);
      sessionStorage.setItem("torreSocialUsername", response.user.username);
      //  Save
      setUserData(newUserData);
      return true;
    } catch (error) {
      throw error;
    }
  };

  const register = async (username, password) => {
    try {
      const options = {
        path: "/auth",
        method: "POST",
        body: { username, password },
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await requestSome(options);
      if (response?.internalCode !== 1201) throw response;
      //  Save in the state the user Data fetched from the back
      const newUserData = {
        username: response.data.username,
      };
      //  Save Token
      sessionStorage.setItem("JWTtorreJobsToken", response.data.token);
      sessionStorage.setItem("torreSocialUsername", username);
      //  Save
      setUserData(newUserData);
      return true;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      const options = {
        path: "/auth/logout",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem(
            "JWTtorreJobsToken"
          )}`,
        },
      };
      await requestSome(options);
      //  Delete token
      sessionStorage.removeItem("JWTtorreJobsToken");
      sessionStorage.removeItem("torreSocialUsername");
      //  Save
      setUserData({});
    } catch (error) {
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ userData }}>
      <UserUpdateContext.Provider value={{ register, login, logout }}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
};
