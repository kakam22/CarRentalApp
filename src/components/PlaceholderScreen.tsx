import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  title: string;
  subtitle?: string;
  children?: ReactNode;
};

// Temporary empty screen used until a page is implemented.
export default function PlaceholderScreen({ title, subtitle = 'Coming soon', children }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 13,
    color: '#999',
  },
});
