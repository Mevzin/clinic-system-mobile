import Login from './src/screens/Login';
import { StatusBar, View } from 'react-native';
import "./src/utils/global.css"

export default function App() {
  return (
    <>
      <StatusBar barStyle={'default'}/>
      <Login/>
    </>
  );
}
