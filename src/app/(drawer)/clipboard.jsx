import { View, Text, Pressable, Alert, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import * as Clipboard from "expo-clipboard"

export default function ClipboardScreen() {
    const [textToCopy, setTextToCopy] = useState("");
    const [pastedText, setPastedText] = useState("");

    const handleTextToCopy = async () => {
        if (!textToCopy.trim()) {
            Alert.alert("Type something", "write something to copy")
            return
        }
        await Clipboard.setStringAsync(textToCopy)
        Alert.alert("Text Copied", "Text has been copied to clipboard")
    }

    const handleTextToPaste = async () => {
        const copiedText = await Clipboard.getStringAsync()
        if (copiedText) {
            setPastedText(copiedText)
        } else {
            Alert.alert("Empty", "Clipboard is empty")
            setPastedText("")
        }
    }

    const handleClearClipboard = async () => {
        await Clipboard.setStringAsync("");
        setPastedText("");
        Alert.alert("Cleared", "Clipboard data cleared")
    }

    const handleCopySurveyId = async () => {
        const mockSurveyId = "SRV-2024-9901";
        await Clipboard.setStringAsync(mockSurveyId);
        Alert.alert("Copied", `Survey ID ${mockSurveyId} copied!`);
    }

    const handleCopyContactNumber = async () => {
        const mockContactNumber = "+1234567890";
        await Clipboard.setStringAsync(mockContactNumber);
        Alert.alert("Copied", `Contact Number ${mockContactNumber} copied!`);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Clipboard Demo</Text>

            <TextInput 
                style={styles.input} 
                placeholder='Type something to copy ...' 
                value={textToCopy} 
                onChangeText={setTextToCopy}
            />

            <View style={styles.row}>
                <Pressable style={styles.buttonHalf} onPress={handleTextToCopy} >
                    <Text style={styles.buttonText}>Copy Text</Text>
                </Pressable>

                <Pressable style={styles.buttonHalfAlt} onPress={handleTextToPaste} >
                    <Text style={styles.buttonText}>Paste Text</Text>
                </Pressable>
            </View>

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>Quick Copy Actions</Text>
            <View style={styles.row}>
                <Pressable style={styles.actionBtn} onPress={handleCopySurveyId}>
                    <Text style={styles.actionBtnText}>Copy Survey ID</Text>
                </Pressable>

                <Pressable style={styles.actionBtn} onPress={handleCopyContactNumber}>
                    <Text style={styles.actionBtnText}>Copy Contact Number</Text>
                </Pressable>
            </View>

            <Pressable style={styles.clearBtn} onPress={handleClearClipboard}>
                <Text style={styles.clearBtnText}>Clear Clipboard</Text>
            </Pressable>

            {pastedText ? (
                <View style={styles.pasteResult}>
                    <Text style={styles.pasteLabel}>Pasted Content:</Text>
                    <Text style={styles.pastedText}>{pastedText}</Text>
                </View>
            ) : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#f5f5f5",
        padding: 20
    },
    title:{
        fontSize: 22,
        fontWeight:"bold",
        color:"#333",
        marginBottom: 20,
        textAlign: 'center'
    },
    input: {
      width: '100%',
      height: 45,
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 15,
      marginBottom: 20,
      backgroundColor: 'white',
      fontSize: 16
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    buttonHalf: {
      backgroundColor: '#007BFF',
      padding: 12,
      borderRadius: 6,
      width: '48%',
      alignItems: 'center'
    },
    buttonHalfAlt: {
      backgroundColor: '#28a745',
      padding: 12,
      borderRadius: 6,
      width: '48%',
      alignItems: 'center'
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 15
    },
    divider: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 20
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333'
    },
    actionBtn: {
        borderWidth: 1,
        borderColor: '#007BFF',
        padding: 10,
        borderRadius: 6,
        width: '48%',
        alignItems: 'center'
    },
    actionBtnText: {
        color: '#007BFF',
        fontWeight: '600'
    },
    clearBtn: {
        backgroundColor: '#dc3545',
        padding: 12,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 25
    },
    clearBtnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15
    },
    pasteResult: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    pasteLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5
    },
    pastedText: {
      fontSize: 16,
      color: '#333',
      fontWeight: '500'
    }
})
