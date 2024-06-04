import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "../screens/home"

export const AppRoutes = () => {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    )
}