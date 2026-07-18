import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    Alert,
    FlatList,
} from "react-native";
import * as Contacts from "expo-contacts";

export default function ContactsScreen() {
    const [contactList, setContactList] = useState([]);

    const getContacts = async () => {
        const { status } = await Contacts.requestPermissionsAsync();

        if (status !== "granted") {
            Alert.alert(
                "Access Denied",
                "Contacts permission was not granted."
            );
            return;
        }

        const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
            setContactList(data);
            Alert.alert(
                "Success",
                `Total Contacts: ${data.length}`
            );
        } else {
            Alert.alert("No Contacts Found");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Contacts App</Text>

            <Button
                title="Get Contacts Access"
                onPress={getContacts}
            />
            
            <FlatList 
                data={contactList} 
                keyExtractor={(item) => item.id} 
                renderItem={({ item }) => (
                    <View style={styles.contactItem}>
                        <Text style={styles.contactText}>{item.name}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    contactItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
    },
    contactText: {
        fontSize: 16,
    },
});
