import { redirect } from 'next/navigation';
import React from 'react'
import userAuth from './userAuth';

interface ProtectedProps {
  children: React.ReactNode
}
export default function Protected ({children}:ProtectedProps) {
  const isAuthenticated = userAuth();
  console.log("auth",isAuthenticated);
  return isAuthenticated ? children : redirect("/");
}

 