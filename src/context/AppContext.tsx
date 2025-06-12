import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AppContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // const toggleSidebar = () => {
  //   setSidebarOpen(!sidebarOpen);
  // };
  const toggleSidebar = () => setSidebarOpen(prev => !prev);


  const value = {
    sidebarOpen,
    toggleSidebar,
    user,
    setUser,
    isLoggedIn: !!user,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};





// AppContext.tsx or wherever your context is defined
// import React, { createContext, useContext, useState } from 'react';

// const AppContext = createContext<any>(null);

// export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => setSidebarOpen(prev => !prev);

//   return (
//     <AppContext.Provider value={{ sidebarOpen, toggleSidebar }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => useContext(AppContext);
