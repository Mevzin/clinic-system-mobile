import { StatusBar } from 'react-native';
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './src/config/firebase.config';
import { AuthProvider } from './src/hook/Auth';
import { Routes } from './src/routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated'
import 'react-native-gesture-handler'
import "./src/style/global.css"

initializeApp(firebaseConfig)


export default function App() {

  return (
    <GestureHandlerRootView>
      <AuthProvider>
        <StatusBar barStyle={'light-content'} backgroundColor={"#0f172a"} />
        <Routes />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
