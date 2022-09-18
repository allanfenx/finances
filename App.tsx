import React from 'react';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { Routes } from "./src/routes";
import { AuthProvider } from './src/contexts/AuthContext';

export default function App() {


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