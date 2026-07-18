import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    Alert,
} from "react-native";
import * as Contacts from "expo-contacts";
import { FlatList } from "react-native-web";

export default function ContactsScreen() {

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
            fields: [Contacts.Fields.Emails],
        });

        if (data.length > 0) {
            Alert.alert(
                "Success",
                `Total Contacts: ${data.length}`
            );

            console.log(data); 
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
            <FlatList data={name} keyExtractor={(item)=> item.id} renderItem={({item})=>(
                <View>{item.name}</View>
            )}/>
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
});
