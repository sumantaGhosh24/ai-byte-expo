import { useAuth } from "@clerk/expo";
import { PropsWithChildren, useEffect } from "react";

import { api } from "@/lib/api";

const AuthenticatedApiProvider = ({ children }: PropsWithChildren) => {
  const { getToken } = useAuth();

  useEffect(() => {
    const interceptor = api.interceptors.request.use(async (config) => {
      const token = await getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    return () => {
      api.interceptors.request.eject(interceptor);
    };
  }, [getToken]);

  return children;
};

export default AuthenticatedApiProvider;
