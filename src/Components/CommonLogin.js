import React, { useState } from "react";
import { tryLogin } from "../Utils/loginHelper";
const CommonLogin = (props) => {
  const isSignUp = props.isSignUp;
  const componentBasedText = sendComponentBasedText(isSignUp);
  const reverseComponentBasedText = sendComponentBasedText(!isSignUp);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [targetCalories, setTargetCalories] = useState(2000);
  const [email, setEmail] = useState("");
  function switchComponent() {
    props.setIsSignUp(!isSignUp);
  }
  function sendComponentBasedText(isSignUp) {
    if (isSignUp) {
      return "Up";
    }
    return "In";
  }
  async function setupUserLogin() {
    const firstResponse = await tryLogin({
      isSignUp,
      userName,
      password,
      targetCalories,
      email,
    });
    if (isSignUp && firstResponse.status === 200) {
      // try to login
      const loginResponse = await tryLogin({
        isSignUp: false,
        userName,
        password,
        targetCalories,
        email,
      });
      if (loginResponse.status === 200) {
        loginSuccessfullFlow(loginResponse);
      }
    } else if (firstResponse.status === 200) {
      //user was already trying to login
      loginSuccessfullFlow(firstResponse);
    }
  }
  function loginSuccessfullFlow(response) {
    const {
      data: {
        access_token: accessToken,
        token_type: tokenType,
        user_id: userId,
      },
    } = response;
    localStorage.setItem(
      "userDetails",
      JSON.stringify({ userName, accessToken, tokenType, userId })
    );
    props.setIsLoggedIn(true);
  }
  return (
    <>
      <h1>Ready to Sign {componentBasedText}</h1>
      <h2>Your email will be your username</h2>
      <div>
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setUserName(e.target.value);
          }}
        />
      </div>{" "}
      <div>
        <label>Password</label>
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {isSignUp && (
        <>
          <div>
            <label>Target Calories</label>
            <input
              value={targetCalories}
              type="number"
              onChange={(e) => setTargetCalories(e.target.value)}
            />
          </div>
        </>
      )}
      <button onClick={() => setupUserLogin()}>Submit</button>
      <button
        onClick={() => {
          switchComponent();
        }}
      >
        Go to Sign {reverseComponentBasedText}{" "}
      </button>
    </>
  );
};

export default CommonLogin;
