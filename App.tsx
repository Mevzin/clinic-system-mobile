import { StatusBar } from 'react-native';
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './src/config/firebase.config';
import { AuthProvider } from './src/hook/Auth';
import { Routes } from './src/routes';
import "./src/style/global.css"

initializeApp(firebaseConfig)

export default function App() {
  return (
      <AuthProvider>
          <StatusBar barStyle={'dark-content'}/>
          <Routes />
      </AuthProvider>
  );
}
