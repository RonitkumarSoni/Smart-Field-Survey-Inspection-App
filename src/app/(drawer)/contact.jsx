import React, { useState, useEffect } from "react";
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

export default function ContactsScreen() {
    const [contactList, setContactList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [refreshing, setRefreshing] = useState(false);

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
            <Text style={styles.emptyStateText}>No contacts found</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Contacts App</Text>

            <View style={styles.searchContainer}>
                <TextInput 
                    style={styles.searchInput}
                    placeholder="Search contacts..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {contactList.length === 0 && !refreshing ? (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyStateText}>Press the button below to load contacts</Text>
                    <View style={{marginTop: 10}}>
                        <Button title="Get Contacts Access" onPress={() => getContacts(true)} />
                    </View>
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
                                style={styles.contactItem}
                                onPress={() => copyToClipboard(phoneNumber)}
                            >
                                <View style={styles.avatar}>
                                    <Text style={styles.avatarText}>{getInitials(item.name)}</Text>
                                </View>
                                <View style={styles.contactDetails}>
                                    <Text style={styles.contactText}>{item.name}</Text>
                                    <Text style={styles.phoneText}>
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
        backgroundColor: '#f5f5f5',
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        padding: 20,
        backgroundColor: '#007BFF',
        color: 'white',
        textAlign: 'center',
    },
    searchContainer: {
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    searchInput: {
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
    },
    contactItem: {
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    avatarText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    contactDetails: {
        flex: 1,
    },
    contactText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    phoneText: {
        fontSize: 14,
        color: '#666',
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
        color: '#666',
        textAlign: 'center',
    }
});
