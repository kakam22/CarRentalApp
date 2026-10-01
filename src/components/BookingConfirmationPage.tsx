import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type BookingSummary = {
  vehicle: string;
  pickupDate: string;
  pickupLocation: string;
  returnDate: string;
  returnLocation: string;
  totalPaid: string;
  bookingId: string;
};

type Props = BookingSummary & {
  onViewTrip?: () => void;
  onDone?: () => void;
};

const STEPS = ['Details', 'Payment', 'Confirm'] as const;

// Booking confirmation (wireframe: step 3 of the booking flow).
export default function BookingConfirmationPage({
  vehicle,
  pickupDate,
  pickupLocation,
  returnDate,
  returnLocation,
  totalPaid,
  bookingId,
  onViewTrip,
  onDone,
}: Props) {
  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Progress stepper: all steps complete on this screen */}
        <View style={styles.stepper}>
          {STEPS.map((label, index) => (
            <View key={label} style={styles.stepWrap}>
              <View style={styles.stepTrack}>
                <View style={[styles.stepLine, index === 0 && styles.stepLineHidden]} />
                <View style={styles.stepCircle}>
                  <Text style={styles.stepNumber}>{index + 1}</Text>
                </View>
                <View
                  style={[styles.stepLine, index === STEPS.length - 1 && styles.stepLineHidden]}
                />
              </View>
              <Text style={styles.stepLabel}>{label}</Text>
            </View>
          ))}
        </View>

        {/* Success badge */}
        <View style={styles.badge}>
          <Text style={styles.badgeCheck}>✓</Text>
        </View>

        <Text style={styles.heading}>Booking Confirmed!</Text>
        <Text style={styles.subheading}>Your reservation has been placed</Text>

        {/* Trip summary card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Trip Summary</Text>
          <View style={styles.divider} />

          <Text style={styles.label}>Vehicle</Text>
          <Text style={styles.value}>{vehicle}</Text>

          <View style={styles.twoCol}>
            <View style={styles.col}>
              <Text style={styles.label}>Pickup</Text>
              <Text style={styles.value}>{pickupDate}</Text>
              <Text style={styles.place}>{pickupLocation}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>Return</Text>
              <Text style={styles.value}>{returnDate}</Text>
              <Text style={styles.place}>{returnLocation}</Text>
            </View>
          </View>

          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total paid</Text>
            <Text style={styles.totalValue}>{totalPaid}</Text>
          </View>
        </View>

        <Text style={styles.bookingId}>Booking ID: {bookingId}</Text>
      </ScrollView>

      {/* Actions pinned to the bottom */}
      <View style={styles.actions}>
        <Pressable
          style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
          onPress={onViewTrip}
        >
          <Text style={styles.primaryText}>View Trip</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}
          onPress={onDone}
        >
          <Text style={styles.secondaryText}>Done</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const DARK = '#333333';
const MUTED = '#8A8A8A';
const LINE = '#E8E8E8';
const PADDING = 20;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: PADDING,
    paddingTop: 24,
    paddingBottom: 16,
    alignItems: 'center',
  },

  // Stepper
  stepper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  stepWrap: {
    alignItems: 'center',
    width: 64,
  },
  stepTrack: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: DARK,
  },
  stepLineHidden: {
    backgroundColor: 'transparent',
  },
  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: DARK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumber: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  stepLabel: {
    marginTop: 6,
    fontSize: 12,
    color: MUTED,
  },

  // Success badge + headings
  badge: {
    marginTop: 28,
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 2,
    borderColor: DARK,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeCheck: {
    fontSize: 48,
    fontWeight: '700',
    color: DARK,
  },
  heading: {
    marginTop: 28,
    fontSize: 28,
    fontWeight: '700',
    color: DARK,
  },
  subheading: {
    marginTop: 4,
    fontSize: 16,
    color: MUTED,
  },

  // Card
  card: {
    alignSelf: 'stretch',
    marginTop: 32,
    padding: 20,
    borderWidth: 1,
    borderColor: LINE,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: DARK,
    marginBottom: 10,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#CCCCCC',
  },
  label: {
    marginTop: 14,
    fontSize: 14,
    color: MUTED,
  },
  value: {
    marginTop: 2,
    fontSize: 17,
    color: DARK,
  },
  twoCol: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  col: {
    flex: 1,
  },
  place: {
    marginTop: 2,
    fontSize: 14,
    color: MUTED,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
  },
  totalLabel: {
    fontSize: 16,
    color: MUTED,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: DARK,
  },
  bookingId: {
    marginTop: 24,
    fontSize: 14,
    color: MUTED,
  },

  // Buttons
  actions: {
    paddingHorizontal: PADDING,
    paddingBottom: 12,
    gap: 12,
  },
  primaryButton: {
    height: 52,
    borderRadius: 8,
    backgroundColor: DARK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  secondaryButton: {
    height: 52,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: DARK,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryText: {
    color: DARK,
    fontSize: 18,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.7,
  },
});
