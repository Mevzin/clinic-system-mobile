import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SignIn from "../screens/auth/signin"
import SignUp from "../screens/auth/signup"

export const AuthRoutes = () => {
    const Stack = createNativeStackNavigator()
    return(
        <Stack.Navigator 
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="SignIn" component={SignIn}/>
            <Stack.Screen name="SignUp" component={SignUp}/>
        </Stack.Navigator>
    )
}