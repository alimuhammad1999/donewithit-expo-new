import { createStackNavigator } from "@react-navigation/stack";
import WelcomScreen from "../Screens/WelcomeScreen";
import LoginScreen from "../Screens/LoginScreen";
import routes from "./routes";
import RegisterScreen from "@/Screens/RegisterScreen";

const Stack = createStackNavigator();
const AuthNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name={routes.WELCOME} component={WelcomScreen} />
        <Stack.Screen name={routes.LOGIN} component={LoginScreen} />
        <Stack.Screen name={routes.REGISTER} component={RegisterScreen} />
    </Stack.Navigator>
)

export default AuthNavigator;
