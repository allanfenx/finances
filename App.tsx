import React from 'react';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { Routes } from "./src/routes";
import { AuthProvider } from './src/contexts/AuthContext';
import { refreshToken } from './src/utils/refreshToken';

export default function App() {

  refreshToken();

  return (
    <AuthProvider>
      <NativeBaseProvider>
        <StatusBar barStyle="light-content"
          backgroundColor="transparent"
          translucent />
        <Routes />
      </NativeBaseProvider>
    </AuthProvider>
  );
}