import { useAuth } from '@/src/context/authContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, useRouter } from 'expo-router';
import { Appbar } from 'react-native-paper';


function AppHeader(props: any) {
    const router = useRouter();
    const { logout } = useAuth(); // adjust to your context API

    const handleLogout = async () => {
        try {
            await logout();                 // set user -> null
            router.replace("/(auth)/login"); // prevent back into protected
        } catch (e) {
            console.warn("Logout failed", e);
        }
    };

    return (
        <Appbar.Header>
            <Appbar.Content title="Auth demo with React" />
            <Appbar.Action icon="logout-variant" onPress={handleLogout} />
        </Appbar.Header>
    );
}


export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', header: (props) => <AppHeader {...props} /> }}>
            <Tabs.Screen
                name="productList"
                options={{
                    title: "Products",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={28} name="home" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                }}
            />
        </Tabs>
    );
}
