import { useContext, createContext, type PropsWithChildren } from "react";
import { useStorageState } from "@/utils/StorageState";
import { login, logout } from "@/axios/auth";
import { useRouter } from "next/navigation";
import type { AuthContextProps } from "@/types";

// Create the AuthContext
export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export function useSession() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }
  return context;
}

export function SessionProvider({ children }: PropsWithChildren<object>) {
  const [[isLoading, session], setSession] = useStorageState<string>("session");
  const [[loading, userData], setUserData] = useStorageState<any>("user");
  const router = useRouter();



  return (
    <AuthContext.Provider
      value={{
        login: async (credentials: { email: string; password: string }) => {
          try {
            if (credentials.email === "dhanushkumar@gmail.com" && credentials.password === "Password@123") {
              setSession("1234");
              setUserData({
                email: "dhanushkumar@gmail.com",
                name: "Dhanush Kumar",
                photo: "https://randomuser.me/api/portraits",
              });
              router.push("/dashboard");
            } else {
              throw new Error("Invalid credentials");
            }
          } catch (e) {
            console.error("Error logging in:", e);
            throw e;
          }
        },
        logout: () => {
          logout();
          setSession(null);
          setUserData(null);
        },
        userData,
        session,
        isLoading,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
