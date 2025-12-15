import { useContext, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";

import Input from "../../components/Input";
import Button from "../../components/Button";
import LoadingSpinner from "../../components/LoadingSpinner";
import Card from "../../components/Card";

export default function LoginScreen({ navigation }) {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleLogin() {
    setLoading(true);
    setError(null);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password;

    const { error } = await signIn(cleanEmail, cleanPassword);
    if (error) setError(error);

    setLoading(false);
  }

  const canSubmit = email.trim().length > 0 && password.length > 0 && !loading;

  return (
    <View className="flex-1 bg-gray-100 justify-center px-6">
      <Card>
        <Text className="text-2xl font-bold mb-6 text-center">Login</Text>

        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error ? (
          <Text className="text-red-500 mb-4 text-center">
            {error.message ?? String(error)}
          </Text>
        ) : null}

        {loading ? (
          <LoadingSpinner />
        ) : (
          <Button title="Login" onPress={handleLogin} disabled={!canSubmit} />
        )}

        {/* Register link */}
        <View className="mt-4">
          <Text className="text-center text-gray-600">
            Do not have an account?
          </Text>

          <Pressable onPress={() => navigation.navigate("Register")}>
            <Text className="text-center text-blue-600 font-semibold mt-1">
              Register
            </Text>
          </Pressable>
        </View>
      </Card>
    </View>
  );
}
