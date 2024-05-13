import { StatusBar } from 'react-native';
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './src/config/firebase.config';
import Login from './src/screens/Login';
import "./src/utils/styles/global.css"
import { AuthProvider } from './src/hook/Auth';

initializeApp(firebaseConfig)

export default function App() {
  return (
      <AuthProvider>
        <StatusBar barStyle={'dark-content'}/>
        <Login/>
      </AuthProvider>
  );
}
