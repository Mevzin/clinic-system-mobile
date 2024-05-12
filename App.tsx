import { ThemeProvider } from 'styled-components';
import Login from './src/screens/Login';
import theme from './src/utils/theme';
import { Container } from './style';
import { StatusBar } from 'react-native';
import "./src/utils/global.css"

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle={'default'}/>
      <Container>
        <Login/>
      </Container>
    </ThemeProvider>
  );
}
