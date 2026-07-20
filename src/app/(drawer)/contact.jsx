import React, { useState } from "react";
import {
    View,
    StyleSheet,
    FlatList,
    RefreshControl,
    Pressable,
    Platform,
} from "react-native";
import { Text, Searchbar, Avatar, IconButton, Button, Snackbar } from "react-native-paper";
import * as Contacts from "expo-contacts";
import * as Clipboard from "expo-clipboard";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

export default function ContactsScreen() {
    const [contactList, setContactList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const [snackbar, setSnackbar] = useState({ visible: false, message: '' });
    const { colors, darkMode } = useTheme();

    const getContacts = async (showCountAlert = false) => {
        const { status } = await Contacts.requestPermissionsAsync();

        if (status !== "granted") {
            setSnackbar({ visible: true, message: 'Contacts permission denied' });
            setRefreshing(false);
            return;
        }

        const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data && data.length > 0) {
            setContactList(data);
            if (showCountAlert) {
                setSnackbar({ visible: true, message: `Loaded ${data.length} contacts` });
            }
        } else {
            setContactList([]);
            if (showCountAlert) {
                setSnackbar({ visible: true, message: 'No contacts found' });
            }
        }
        setRefreshing(false);
    };

    const onRefresh = () => {
        setRefreshing(true);
        getContacts(false);
    };

    const copyToClipboard = async (number) => {
        if (!number) {
            setSnackbar({ visible: true, message: 'No phone number available' });
            return;
        }
        await Clipboard.setStringAsync(number);
        setSnackbar({ visible: true, message: `${number} copied to clipboard` });
    };

    const filteredContacts = contactList.filter(contact => {
        if (!searchQuery) return true;
        return contact.name?.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const getAvatarColor = (name) => {
        const charCode = (name || 'A').charCodeAt(0);
        const hues = ['#4F46E5', '#7C3AED', '#059669', '#D97706', '#DC2626', '#0891B2'];
        return hues[charCode % hues.length];
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Gradient Header */}
            <LinearGradient
                colors={colors.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.header}
            >

                <Text variant="headlineSmall" style={styles.headerTitle}>Contacts</Text>
                <Text style={styles.headerSub}>
                    {contactList.length > 0 ? `${contactList.length} contacts loaded` : 'Tap below to load contacts'}
                </Text>
            </LinearGradient>

            {/* Search */}
            <View style={styles.searchContainer}>
                <Searchbar
                    placeholder="Search contacts..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    style={[styles.searchbar, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
                    inputStyle={{ fontSize: 14 }}
                    elevation={0}
                />
            </View>

            {contactList.length === 0 && !refreshing ? (
                <View style={styles.emptyState}>
                    <View style={[styles.emptyIcon, { backgroundColor: colors.chipBg }]}>
                        <Ionicons name="people-outline" size={40} color={colors.primary} />
                    </View>
                    <Text variant="titleMedium" style={{ color: colors.text, fontWeight: '700', marginTop: 16 }}>
                        No Contacts Loaded
                    </Text>
                    <Text variant="bodyMedium" style={{ color: colors.textMuted, marginTop: 6, textAlign: 'center' }}>
                        Grant access to load your phone contacts
                    </Text>
                    <Button
                        mode="contained"
                        onPress={() => getContacts(true)}
                        style={{ marginTop: 20, borderRadius: 12 }}
                        buttonColor={colors.primary}
                        icon="account-multiple-plus"
                        contentStyle={{ paddingVertical: 4 }}
                    >
                        Load Contacts
                    </Button>
                </View>
            ) : (
                <FlatList 
                    data={filteredContacts} 
                    keyExtractor={(item) => item.id} 
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />
                    }
                    ListEmptyComponent={
                        <View style={styles.emptyState}>
                            <Ionicons name="search-outline" size={40} color={colors.textMuted} />
                            <Text style={{ color: colors.textMuted, marginTop: 12 }}>No contacts match your search</Text>
                        </View>
                    }
                    renderItem={({ item }) => {
                        const phoneNumber = item.phoneNumbers && item.phoneNumbers.length > 0 
                            ? item.phoneNumbers[0].number 
                            : null;

                        return (
                            <View style={[styles.contactItem, { borderBottomColor: colors.border }]}>
                                <Avatar.Text 
                                    size={44} 
                                    label={(item.name || '?').charAt(0).toUpperCase()} 
                                    style={{ backgroundColor: getAvatarColor(item.name) }}
                                    labelStyle={{ fontWeight: '700' }}
                                />
                                <View style={styles.contactDetails}>
                                    <Text variant="titleSmall" style={{ color: colors.text, fontWeight: '600' }}>
                                        {item.name}
                                    </Text>
                                    <Text variant="bodySmall" style={{ color: colors.textMuted, marginTop: 2 }}>
                                        {phoneNumber || "No Number"}
                                    </Text>
                                </View>
                                <IconButton
                                    icon="content-copy"
                                    size={20}
                                    iconColor={colors.primary}
                                    onPress={() => copyToClipboard(phoneNumber)}
                                    style={[styles.copyBtn, { backgroundColor: colors.chipBg }]}
                                />
                            </View>
                        )
                    }}
                />
            )}

            <Snackbar
                visible={snackbar.visible}
                onDismiss={() => setSnackbar({ visible: false, message: '' })}
                duration={2000}
                style={{ borderRadius: 12, marginBottom: 80 }}
            >
                {snackbar.message}
            </Snackbar>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 56 : 40,
        paddingBottom: 28,
        alignItems: 'center',
        gap: 4,
    },
    headerTitle: {
        color: '#FFFFFF',
        fontWeight: '800',
    },
    headerSub: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 13,
    },
    searchContainer: {
        padding: 16,
        paddingBottom: 8,
    },
    searchbar: {
        borderRadius: 14,
        borderWidth: 1,
    },
    contactItem: {
        padding: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    contactDetails: {
        flex: 1,
        marginLeft: 14,
    },
    copyBtn: {
        borderRadius: 12,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    emptyIcon: {
        width: 80,
        height: 80,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
