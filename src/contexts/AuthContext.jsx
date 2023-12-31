import { createContext, useState } from "react";

// LIBS
import { decodeToken, isExpired } from "react-jwt";

// TOOLS
import request from "../tools/request";

const AuthContext = createContext(null);
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    accessToken: null,
    authenticated: null,
    data: null,
  });

  const login = async (data) => {
    const res = await request.generic().post("/user/login", data);

    if (res.status === 200 && res.data.token) {
      localStorage.setItem("access_token", res.data.token);
      const decodeTokenJWT = decodeToken(res.data.token);
      setAuthState({
        accessToken: res.data.token,
        authenticated: true,
        data: decodeTokenJWT,
      });
      console.log("LOGIN : authState il doit y avoir le token et true");
      console.log(authState);
    }
    return res;
  };

  const logout = async () => {
    localStorage.removeItem("access_token");
    setAuthState({
      accessToken: null,
      authenticated: false,
      data: null,
    });
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };

  const getData = () => {
    return authState?.data ?? null;
  };

  const checkInLocalStorage = async () => {
    const currentToken = localStorage.getItem("access_token");

    if (currentToken) {
      const isExpiredJWT = isExpired(currentToken);
      if (isExpiredJWT) {
        setAuthState({ accessToken: null, authenticated: false, data: null });
      } else {
        const decodeTokenJWT = decodeToken(currentToken);
        console.log(isExpiredJWT, decodeTokenJWT);
        setAuthState({
          accessToken: currentToken,
          authenticated: true,
          data: decodeTokenJWT,
        });
      }
    } else {
      setAuthState({ accessToken: null, authenticated: false, data: null });
    }
  };

  return (
    <Provider
      value={{
        state: authState,
        getAccessToken,
        getData,
        setState: setAuthState,
        checkInLocalStorage,
        login,
        logout,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
