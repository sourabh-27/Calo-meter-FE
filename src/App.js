import "./App.css";
import CommonLogin from "./Components/CommonLogin";
import React, { useEffect, useState } from "react";
import ShowItems from "./Components/ShowItems";

function App() {
  const [isSignUp, setIsSignUp] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");

  function checkIfLoggedIn() {
    const localStorageItem = JSON.parse(localStorage.getItem("userDetails"));
    if (
      localStorageItem &&
      localStorageItem.userName &&
      localStorageItem.tokenType &&
      localStorageItem.accessToken &&
      localStorageItem.userId
    ) {
      setUserId(localStorageItem.userId);
      return true;
    }
    return false;
  }

  useEffect(() => {
    setIsLoggedIn(checkIfLoggedIn());
  }, []);

  return (
    <>
      {!isLoggedIn && (
        <div>
          {isSignUp ?? (
            <>
              <button style={{marginTop: "25%", marginLeft: "45%", fontSize: "25px"}} onClick={() => setIsSignUp(true)}>Sign Up </button>
              <button style={{fontSize: "25px"}} onClick={() => setIsSignUp(false)}> Sign In</button>
            </>
          )}
          {isSignUp !== null && (
            <CommonLogin
              isSignUp={isSignUp}
              setIsSignUp={setIsSignUp}
              setIsLoggedIn={setIsLoggedIn}
            />
          )}
        </div>
      )}
      {isLoggedIn && (
        <div>
          <ShowItems setIsLoggedIn={setIsLoggedIn} userId={userId} />
        </div>
      )}
    </>
  );
}

export default App;
