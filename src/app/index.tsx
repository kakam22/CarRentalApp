import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { AuthError } from '../services/authService';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Login / front page (wireframe page 1).
// Credentials are checked against the dummy users in src/data/users.ts.
export default function LoginScreen() {
  const { logIn, continueAsGuest } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const passwordRef = useRef<TextInput>(null);

  const handleLogIn = async () => {
    if (loading) return;
    if (!EMAIL_PATTERN.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length === 0) {
      setError('Please enter your password.');
      return;
    }

    setError(null);
    setLoading(true);
    try {
      await logIn(email, password);
      router.replace('/search');
    } catch (e) {
      setError(e instanceof AuthError ? e.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = () => {
    continueAsGuest();
    router.replace('/search');
  };

  // Clear the error as soon as the user starts correcting their input.
  const onChangeEmail = (text: string) => {
    setEmail(text);
    setError(null);
  };
  const onChangePassword = (text: string) => {
    setPassword(text);
    setError(null);
  };

  const handleSocial = (provider: string) => {
    Alert.alert(`${provider} login`, 'Coming soon.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.logo}>
            <Text style={styles.logoText}>LOGO</Text>
          </View>
          <Text style={styles.title}>Car Rental App</Text>
          <Text style={styles.subtitle}>Find your perfect ride</Text>

          <TextInput
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor="#999"
            value={email}
            onChangeText={onChangeEmail}
            editable={!loading}
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            textContentType="emailAddress"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
            submitBehavior="submit"
          />
          <View style={styles.passwordWrapper}>
            <TextInput
              ref={passwordRef}
              style={[styles.input, styles.passwordInput]}
              placeholder="Password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={onChangePassword}
              editable={!loading}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoComplete="password"
              textContentType="password"
              returnKeyType="go"
              onSubmitEditing={handleLogIn}
            />
            <Pressable
              style={styles.showPassword}
              onPress={() => setShowPassword((v) => !v)}
              accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
            >
              <Text style={styles.mutedText}>{showPassword ? 'Hide' : 'Show'}</Text>
            </Pressable>
          </View>

          <Pressable style={styles.forgot} onPress={() => router.push('/forgot-password')}>
            <Text style={styles.mutedText}>Forgot password?</Text>
          </Pressable>

          {error && <Text style={styles.error}>{error}</Text>}

          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.primaryButton,
              (pressed || loading) && styles.pressed,
            ]}
            onPress={handleLogIn}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.primaryButtonText}>Log In</Text>
            )}
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.button, styles.secondaryButton, pressed && styles.pressed]}
            onPress={() => router.push('/sign-up')}
            disabled={loading}
          >
            <Text style={styles.secondaryButtonText}>Sign Up</Text>
          </Pressable>

          <Pressable style={styles.guest} onPress={handleGuest} disabled={loading}>
            <Text style={[styles.mutedText, styles.guestText]}>Continue as guest</Text>
          </Pressable>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialRow}>
            {[
              { label: 'G', name: 'Google' },
              { label: 'A', name: 'Apple' },
              { label: 'F', name: 'Facebook' },
            ].map(({ label, name }) => (
              <Pressable
                key={name}
                style={({ pressed }) => [styles.socialButton, pressed && styles.pressed]}
                onPress={() => handleSocial(name)}
                accessibilityLabel={`Log in with ${name}`}
              >
                <Text style={styles.socialText}>{label}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flex: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 17,
    paddingVertical: 32,
  },
  logo: {
    alignSelf: 'center',
    width: 96,
    height: 96,
    borderRadius: 12,
    backgroundColor: '#e6e6e6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#999',
  },
  title: {
    marginTop: 28,
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 32,
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
  },
  input: {
    height: 44,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    borderRadius: 6,
    backgroundColor: '#f2f2f2',
    fontSize: 14,
    color: '#333',
  },
  passwordWrapper: {
    justifyContent: 'center',
  },
  passwordInput: {
    paddingRight: 60,
  },
  showPassword: {
    position: 'absolute',
    right: 12,
    top: 0,
    height: 44,
    justifyContent: 'center',
  },
  forgot: {
    alignSelf: 'flex-end',
    marginTop: -4,
    marginBottom: 20,
  },
  mutedText: {
    fontSize: 12,
    color: '#999',
  },
  error: {
    marginTop: -8,
    marginBottom: 12,
    fontSize: 12,
    color: '#c62828',
  },
  button: {
    height: 48,
    marginBottom: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#333',
  },
  primaryButtonText: {
    fontSize: 15,
    color: '#fff',
  },
  secondaryButton: {
    borderWidth: 1.5,
    borderColor: '#333',
    backgroundColor: '#fff',
  },
  secondaryButtonText: {
    fontSize: 15,
    color: '#333',
  },
  pressed: {
    opacity: 0.7,
  },
  guest: {
    alignSelf: 'center',
    marginTop: 12,
  },
  guestText: {
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e6e6e6',
  },
  dividerText: {
    marginHorizontal: 32,
    fontSize: 11,
    color: '#999',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 24,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialText: {
    fontSize: 15,
    color: '#999',
  },
});
