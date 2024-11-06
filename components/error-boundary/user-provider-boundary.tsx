import React from 'react';
import { useUser } from "@/contexts/user-context";

interface UserProviderBoundaryProps {
  children: (user: any) => React.ReactNode;
  fallback?: React.ReactNode;
}

export function UserProviderBoundary({ children, fallback = null }: UserProviderBoundaryProps) {
  try {
    const userState = useUser();
    return <>{children(userState)}</>;
  } catch (error) {
    return <>{fallback}</>;
  }
} 