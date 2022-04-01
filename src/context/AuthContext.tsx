import React from "react";

type ReqMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface ReqInit<B> extends Omit<RequestInit, "body"> {
  method?: ReqMethod;
  body?: B;
}

interface State {
  user: boolean | undefined;
  token: string | undefined | null;
  previousSessionId: string | undefined;
  loading: boolean;
  errorMessage: string;
}

interface Actions {
  login: (email: string) => Promise<void>;
  verifyLogin: (pin: number) => Promise<void>;
  logout: () => Promise<void>;
  logoutPreviousSession: () => Promise<void>;
  request: <B, R>(endpoint: RequestInfo, config: ReqInit<B>) => Promise<R>;
}

export interface AuthContextType {
  state?: State;
  actions?: Actions;
}

const AuthContext = React.createContext<AuthContextType>({});
export const useAuth = (): AuthContextType => React.useContext(AuthContext);

export default AuthContext;
