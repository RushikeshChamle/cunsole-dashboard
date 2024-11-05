"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axiosInstance from '@/axiosInstance';

// Interfaces for API response data
export interface Account {
  id: number;
  name: string;
  created_date: string;
  email: string | null;
  phone_number: string | null;
  address: string | null;
  industry: string | null;
  credit_limit: string;
  updated_date: string;
  is_active: boolean;
  is_email_whitelabeled: boolean;
  is_verified: boolean;
}

export interface User {
  id: number;
  password: string;
  last_login: string | null;
  is_superuser: boolean;
  is_staff: boolean;
  date_joined: string;
  name: string;
  email: string;
  contact: string;
  is_active: boolean;
  created_at: string;
  account: number;
  groups: string[];
  user_permissions: string[];
}

export interface SessionDetails {
  accounts: Account[];
  users: User[];
}

interface AuthContextType {
  user: SessionDetails | null;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component with session fetching logic
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<SessionDetails | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axiosInstance.get<SessionDetails>('/users/sessiondetails/');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching session details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
