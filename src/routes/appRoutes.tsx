import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialIcons, FontAwesome6, FontAwesome5 } from '@expo/vector-icons'
import Home from "../screens/home"

export const AppRoutes = () => {
    const Tab = createMaterialBottomTabNavigator();

    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor='#e2e8f0'
            inactiveColor="#475569"
            activeIndicatorStyle={{ backgroundColor: '#1e293b' }}
            barStyle={{ backgroundColor: '#0f172a', borderTopColor: '#cbd5e1', borderStyle: 'solid', borderWidth: 1 }}
        >
            <Tab.Screen name="Dashboard" component={Home} options={{
                tabBarIcon: (({ color }) => (
                    <MaterialIcons
                        name='home'
                        size={24}
                        color={color}
                    />
                ))
            }} />
            <Tab.Screen name="Pacientes" component={Home} options={{
                tabBarIcon: (({ color }) => (
                    <FontAwesome6
                        name='user-group'
                        size={24}
                        color={color}
                    />
                ))
            }} />
            <Tab.Screen name="Consultas" component={Home} options={{
                tabBarIcon: (({ color }) => (
                    <FontAwesome5
                        name='notes-medical'
                        size={24}
                        color={color}
                    />
                ))
            }} />
            <Tab.Screen name="Agenda" component={Home} options={{
                tabBarIcon: (({ color }) => (
                    <MaterialIcons
                        name='schedule'
                        size={24}
                        color={color}
                    />
                ))
            }} />
            <Tab.Screen name="Perfil" component={Home} options={{
                tabBarIcon: (({ color }) => (
                    <FontAwesome5
                        name='user-tie'
                        size={24}
                        color={color}
                    />
                ))
            }} />
        </Tab.Navigator>
    )
}