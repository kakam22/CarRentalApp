import React from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type TabKey = "search" | "trips" | "profile";

type Props = {
    userName?: string;
    userEmail?: string;
    onNavigate?: (tab: TabKey) => void;
    onLogout?: () => void;
};

const SETTINGS = [
    { key: "payment", label: "Payment methods" },
    { key: "personal", label: "Personal info" },
    { key: "notifications", label: "Notifications" },
    { key: "help", label: "Help & support" },
] as const;

const TABS: { key: TabKey; label: string }[] = [
    { key: "search", label: "Search" },
    { key: "trips", label: "Trips" },
    { key: "profile", label: "Profile" },
];

export default function ProfileScreen({
                                          userName = "User Name",
                                          userEmail = "user@email.com",
                                          onNavigate,
                                          onLogout,
                                      }: Props) {
    const activeTab: TabKey = "profile";

    return (
        <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Profile</Text>

                {/* User header */}
                <View style={styles.userRow}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>IMG</Text>
                    </View>
                    <View>
                        <Text style={styles.userName}>{userName}</Text>
                        <Text style={styles.userEmail}>{userEmail}</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                {/* Account settings */}
                <Text style={styles.sectionTitle}>Account Settings</Text>

                {SETTINGS.map((item) => (
                    <Pressable
                        key={item.key}
                        style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
                        onPress={() => {
                            // TODO: navigate to the matching screen
                        }}
                    >
                        <Text style={styles.rowLabel}>{item.label}</Text>
                        <Text style={styles.chevron}>›</Text>
                    </Pressable>
                ))}

                <Pressable
                    style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
                    onPress={onLogout}
                >
                    <Text style={styles.logout}>Log out</Text>
                </Pressable>
            </ScrollView>

            {/* Bottom tab bar */}
            <View style={styles.tabBar}>
                {TABS.map((tab) => {
                    const active = tab.key === activeTab;
                    return (
                        <Pressable
                            key={tab.key}
                            style={styles.tab}
                            onPress={() => onNavigate?.(tab.key)}
                        >
                            <View
                                style={[styles.tabIcon, active && styles.tabIconActive]}
                            />
                            <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
                                {tab.label}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </SafeAreaView>
    );
}

const PADDING = 16;
const LINE = "#E8E8E8";

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    content: {
        paddingHorizontal: PADDING,
        paddingTop: 16,
        paddingBottom: 24,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#2B2B2B",
    },
    userRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 24,
        gap: 16,
    },
    avatar: {
        width: 66,
        height: 66,
        borderRadius: 33,
        backgroundColor: "#E6E6E6",
        alignItems: "center",
        justifyContent: "center",
    },
    avatarText: {
        fontSize: 12,
        color: "#8A8A8A",
    },
    userName: {
        fontSize: 18,
        fontWeight: "700",
        color: "#2B2B2B",
    },
    userEmail: {
        fontSize: 14,
        color: "#8A8A8A",
        marginTop: 2,
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: LINE,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#2B2B2B",
        marginTop: 20,
        marginBottom: 6,
    },
    row: {
        height: 58,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: LINE,
    },
    rowPressed: {
        opacity: 0.6,
    },
    rowLabel: {
        fontSize: 16,
        color: "#2B2B2B",
    },
    chevron: {
        fontSize: 20,
        color: "#8A8A8A",
    },
    logout: {
        fontSize: 16,
        color: "#8B3A3A",
    },
    tabBar: {
        flexDirection: "row",
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: LINE,
        backgroundColor: "#FFFFFF",
        paddingTop: 12,
        paddingBottom: 8,
    },
    tab: {
        flex: 1,
        alignItems: "center",
        gap: 6,
    },
    tabIcon: {
        width: 26,
        height: 26,
        borderRadius: 6,
        backgroundColor: "#E6E6E6",
    },
    tabIconActive: {
        backgroundColor: "#2B2B2B",
    },
    tabLabel: {
        fontSize: 12,
        color: "#8A8A8A",
    },
    tabLabelActive: {
        color: "#2B2B2B",
        fontWeight: "500",
    },
});