import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    Alert,
    FlatList,
    TextInput,
    Pressable,
    RefreshControl
} from "react-native";
import * as Contacts from "expo-contacts";
import * as Clipboard from "expo-clipboard";
import { useTheme } from "../../context/ThemeContext";

export default function ContactsScreen() {
    const [contactList, setContactList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const { colors, darkMode } = useTheme();

    const getContacts = async (showCountAlert = false) => {
        const { status } = await Contacts.requestPermissionsAsync();

        if (status !== "granted") {
            Alert.alert("Access Denied", "Contacts permission was not granted.");
            setRefreshing(false);
            return;
        }

        const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data && data.length > 0) {
            setContactList(data);
            if (showCountAlert) {
                Alert.alert("Success", `Total Contacts: ${data.length}`);
            }
        } else {
            setContactList([]);
            if (showCountAlert) {
                Alert.alert("No Contacts Found");
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
            Alert.alert("No Number", "This contact does not have a phone number.");
            return;
        }
        await Clipboard.setStringAsync(number);
        Alert.alert("Copied!", "Phone number copied to clipboard.");
    };

    const filteredContacts = contactList.filter(contact => {
        if (!searchQuery) return true;
        return contact.name?.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const getInitials = (name) => {
        if (!name) return "?";
        return name.charAt(0).toUpperCase();
    };

    const renderEmptyState = () => (
        <View style={styles.emptyState}>
            <Text style={[styles.emptyStateText, { color: colors.textMuted }]}>No contacts found</Text>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.heading, { backgroundColor: colors.headerBg, color: colors.headerText }]}>Contacts App</Text>

            <View style={[styles.searchContainer, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
                <TextInput 
                    style={[styles.searchInput, { backgroundColor: colors.inputBg, color: colors.text }]}
                    placeholder="Search contacts..."
                    placeholderTextColor={colors.textMuted}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {contactList.length === 0 && !refreshing ? (
                <View style={styles.emptyState}>
                    <Text style={[styles.emptyStateText, { color: colors.textMuted, marginBottom: 15 }]}>Press the button below to load contacts</Text>
                    <Pressable
                        style={{
                            backgroundColor: colors.card,
                            paddingVertical: 12,
                            paddingHorizontal: 24,
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: colors.border
                        }}
                        onPress={() => getContacts(true)}
                    >
                        <Text style={{ color: colors.text, fontSize: 16, fontWeight: 'bold' }}>Get Contacts Access</Text>
                    </Pressable>
                </View>
            ) : (
                <FlatList 
                    data={filteredContacts} 
                    keyExtractor={(item) => item.id} 
                    contentContainerStyle={{ flexGrow: 1 }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    ListEmptyComponent={renderEmptyState}
                    renderItem={({ item }) => {
                        const phoneNumber = item.phoneNumbers && item.phoneNumbers.length > 0 
                            ? item.phoneNumbers[0].number 
                            : null;

                        return (
                            <Pressable 
                                style={[styles.contactItem, { backgroundColor: colors.card, borderBottomColor: colors.border }]}
                                onPress={() => copyToClipboard(phoneNumber)}
                            >
                                <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
                                    <Text style={[styles.avatarText, { color: darkMode ? colors.background : 'white' }]}>{getInitials(item.name)}</Text>
                                </View>
                                <View style={styles.contactDetails}>
                                    <Text style={[styles.contactText, { color: colors.text }]}>{item.name}</Text>
                                    <Text style={[styles.phoneText, { color: colors.textMuted }]}>
                                        {phoneNumber ? phoneNumber : "No Number"}
                                    </Text>
                                </View>
                            </Pressable>
                        )
                    }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        padding: 20,
        paddingTop: 35,
        paddingBottom: 25,
        textAlign: 'center',
    },
    searchContainer: {
        padding: 10,
        borderBottomWidth: 1,
    },
    searchInput: {
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
    },
    contactItem: {
        padding: 15,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    avatarText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    contactDetails: {
        flex: 1,
    },
    contactText: {
        fontSize: 16,
        fontWeight: '600',
    },
    phoneText: {
        fontSize: 14,
        marginTop: 4,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyStateText: {
        fontSize: 16,
        textAlign: 'center',
    }
})
