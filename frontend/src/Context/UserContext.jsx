import { createContext, useContext, useState, useEffect } from "react";

const UserRoleContext = createContext();

export const UserRoleProvider = ({ children }) => {
  const [role, setRoleState] = useState("");

  // Sync from localStorage on mount
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRoleState(storedRole);
    }
  }, []);

  // Update both state and localStorage
  const setRole = (newRole) => {
    setRoleState(newRole);
    localStorage.setItem("role", newRole);
  };

  return (
    <UserRoleContext.Provider value={{ role, setRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = () => useContext(UserRoleContext);
