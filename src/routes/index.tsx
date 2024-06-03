import { Text, View } from "react-native"
import { useAuth } from "../hook/Auth"
import { NavigationContainer } from "@react-navigation/native"
import { AuthRoutes } from "./authRoutes"


export const Routes = () => {
    const { user } = useAuth()
    return(
        <NavigationContainer>
            {/* {user?.id ? } */}
            <AuthRoutes />
        </NavigationContainer>
    )
}