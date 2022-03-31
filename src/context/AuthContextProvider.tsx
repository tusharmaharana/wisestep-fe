// @ts-expect-error
import { ClientJS } from "clientjs";
import React, { useCallback, useEffect, useState } from "react";
import AuthContext, { AuthContextType, ReqInit } from "./AuthContext";

export interface ILoginPayload {
  token: string;
  isLoggedIn: boolean;
}

export interface Message {
  message: string;
}

export const AuthProvider: React.FC = (props) => {
  const [user, setUser] = useState<boolean | undefined>(undefined);
  const [token, setToken] = useState<string | undefined | null>(undefined);
  const [loading, setLoading] = useState(false);
  const [previousSessionId, setPreviousSessionId] = useState<
    string | undefined
  >(undefined);

  const client = new ClientJS();
  const fingerPrint = client.getFingerprint();

  const fetchUser = useCallback(async (): Promise<void> => {
    try {
      const res = (await request("/")) as Message;
      setUser(true);
    } catch (err) {
      console.log(err);
      setUser(false);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser, user]);

  const login = async (email: string): Promise<void> => {
    try {
      const res = (await request("/auth/login", {
        body: { email, fingerPrint },
      })) as ILoginPayload;
      if (res.token) setToken(res.token);
    } catch (error) {
      console.log(error);
      console.log("nhi hua");
    }
  };

  const verifyLogin = async (pin: number): Promise<void> => {
    setLoading(true);
    try {
      await request("/auth/login/verify", {
        body: { pin, token },
      });
      setUser(true);
    } catch (error) {
      console.log(error);
      console.log("nhi hua verify");
      setUser(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    await request("/auth/logout/current-session");
    setToken(null);
    setUser(false);
  };

  const logoutPreviousSession = async (): Promise<void> => {
    setLoading(true);
    await request("/auth/logout/previous-session", {
      body: { previousSessionId },
    });
    setPreviousSessionId(undefined);
  };

  const request = async <B, R>(
    endpoint: RequestInfo,
    config: ReqInit<B> = {}
  ): Promise<R> => {
    const { body, ...customConfig } = config;

    const reqConfig: RequestInit = {
      method: body ? "POST" : "GET",
      ...customConfig,
      body: body ? JSON.stringify(body) : null,
      credentials: "include",
      headers: {
        "content-type": "application/json",
        ...customConfig.headers,
      },
    };

    return fetch(
      `${process.env.REACT_APP_API_URL}/api${endpoint}`,
      reqConfig
    ).then(async (response) => {
      const data = await response.json();
      if (response.status === 209) {
        setPreviousSessionId(data.previousSessionId);
      }
      if (response.ok) {
        return data;
      }
      return Promise.reject(data);
    });
  };

  const values: AuthContextType = {
    state: { user, token, previousSessionId, loading },
    actions: {
      login,
      logout,
      verifyLogin,
      logoutPreviousSession,
      request,
    },
  };

  return <AuthContext.Provider value={values} {...props} />;
};
