import { useContext, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { AuthContext } from "../../context/AuthContext";

import Input from "../../components/Input";
import Button from "../../components/Button";
import LoadingSpinner from "../../components/LoadingSpinner";
import Card from "../../components/Card";

export default function RegisterScreen({ navigation }) {
  const { signUp } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleRegister() {
    setError(null);

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setError({ message: "Email and password are required." });
      return;
    }

    if (password.length < 6) {
      setError({ message: "Password must be at least 6 characters long." });
      return;
    }

    if (password !== confirmPassword) {
      setError({ message: "Passwords do not match." });
      return;
    }

    setLoading(true);

    const { error } = await signUp(cleanEmail, password);
    if (error) setError(error);

    setLoading(false);
  }

  const canSubmit =
    email.trim().length > 0 &&
    password.length > 0 &&
    confirmPassword.length > 0 &&
    !loading;

  return (
    <View className="flex-1 bg-gray-100 justify-center px-6">
      <Card>
        <Text className="text-2xl font-bold mb-6 text-center">Register</Text>

        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Input
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
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
          <Button
            title="Register"
            onPress={handleRegister}
            disabled={!canSubmit}
          />
        )}

        {/* Login link */}
        <View className="mt-4">
          <Text className="text-center text-gray-600">
            Already have an account?
          </Text>

          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text className="text-center text-blue-500 mt-1">Login</Text>
          </Pressable>
        </View>
      </Card>
    </View>
  );
}
