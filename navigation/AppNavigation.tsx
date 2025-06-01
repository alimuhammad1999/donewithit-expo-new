import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ListingEditScreen from "../Screens/ListingEditScreen";
import AppIcon from "../components/AppIcon";
import FeedNavigator from "./FeedNavigator";
import AccountNavigator from "./AccountNavigation";
import navigation from '@/navigation/rootNavigation';
import routes from "../navigation/routes";
import useNotifications from "@/hooks/useNotifications";
import { TouchableOpacity } from "react-native";


const Tab = createBottomTabNavigator();
const TabNavigator = () => {
    useNotifications(response =>
        navigation.navigate(routes.ACCOUNT_DETAILS, { screen: routes.MESSAGES }))

    return (
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: colors.danger,
            tabBarInactiveTintColor: colors.greyText,
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: {
                backgroundColor: colors.white, elevation: 10, height: '6%',
            },
        }} >
            <Tab.Screen name={routes.LISTING_SCREEN} component={FeedNavigator} options={{
                tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name="home" size={size * 1.4} color={color} />
            }} />
            <Tab.Screen name={routes.LISTING_ADD} component={ListingEditScreen} options={{
                tabBarLabel: '',
                tabBarIcon: ({ size }) => <AppIcon name="plus-circle" size={size * 2.5}
                    style={{
                        marginBottom: size * 0.75, borderWidth: 10, borderColor: 'white',
                        backgroundColor: colors.danger, // Add background
                        borderRadius: size * 1.9,
                        transform: [{ translateY: size * 0.3 }],
                    }} />,
                // headerLeftLabelVisible: false
            }} />
            <Tab.Screen name={routes.ACCOUNT_DETAILS} component={AccountNavigator} options={{
                tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name="account" size={size * 1.4} color={color} />
            }} />
        </Tab.Navigator>
    )
}

const AppNavigation = () => {
    return <TabNavigator />
};

export default AppNavigation;