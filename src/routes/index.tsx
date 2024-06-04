import { useAuth } from "../hook/Auth"
import { NavigationContainer } from "@react-navigation/native"
import { AuthRoutes } from "./authRoutes"
import { AppRoutes } from "./appRoutes"


export const Routes = () => {
    const { user } = useAuth()

    function handleRoutes() {
        if (user?.id) {
            return <AppRoutes />
        } else {
            return <AuthRoutes />
        }
    }
    return (
        <NavigationContainer>
            {handleRoutes()}
        </NavigationContainer>
    )
}