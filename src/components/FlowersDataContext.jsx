import { createContext, useContext, useEffect, useState } from "react";

const FlowersDataContext = createContext();

export const FlowersDataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const Url = "http://localhost:3000/flowers";

    fetch(Url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error occured during the fetching:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <FlowersDataContext.Provider value={data}>
          {children}
        </FlowersDataContext.Provider>
      )}
    </>
  );
};

export const useFlowersDataContext = () => {
  return useContext(FlowersDataContext);
};
