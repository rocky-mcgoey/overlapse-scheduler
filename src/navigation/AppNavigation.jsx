import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../contexts/AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import HomeScreen from "../screens/Home/HomeScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <LoadingSpinner />;

  return (
    <NavigationContainer>
      {!user ? (
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Login"
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          {/* later: Schedule, Profile, etc */}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
