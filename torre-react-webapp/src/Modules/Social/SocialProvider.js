//  Imports
//  React
import { useContext, createContext, useState, useEffect } from "react";
import requestSome from "../../Helpers/requests";

//  Contexts
const SocialContext = createContext();

export const useSocialContext = () => {
  return useContext(SocialContext);
};

export const SocialProvider = ({ children }) => {
  const [closePeople, setClosePeople] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("JWTtorreJobsToken");
    const username = sessionStorage.getItem("torreSocialUsername");
    if (username) {
      const options = {
        path: `/social/close/${username}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      requestSome(options)
        .then((response) => {
          setClosePeople(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const loadClosePeople = async () => {
    try {
      const token = sessionStorage.getItem("JWTtorreJobsToken");
      const username = sessionStorage.getItem("torreSocialUsername");
      if (username) {
        const options = {
          path: `/social/close/${username}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        requestSome(options)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            setClosePeople(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SocialContext.Provider value={{ closePeople, loadClosePeople }}>
      {children}
    </SocialContext.Provider>
  );
};
