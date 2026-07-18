import { View, Text, Pressable, Alert, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import * as Clipboard from "expo-clipboard"
import { useTheme } from '../../context/ThemeContext'

export default function ClipboardScreen() {
    const [textToCopy, setTextToCopy] = useState("");
    const [pastedText, setPastedText] = useState("");
    const { colors, darkMode } = useTheme();

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
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.text }]}>Clipboard Demo</Text>

            <TextInput 
                style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.border, color: colors.text }]} 
                placeholder='Type something to copy ...' 
                placeholderTextColor={colors.textMuted}
                value={textToCopy} 
                onChangeText={setTextToCopy}
            />

            <View style={styles.row}>
                <Pressable 
                    style={[
                        styles.buttonHalf, 
                        darkMode ? { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.primary } : { backgroundColor: colors.primary }
                    ]} 
                    onPress={handleTextToCopy} 
                >
                    <Text style={[styles.buttonText, { color: darkMode ? colors.primary : 'white' }]}>Copy Text</Text>
                </Pressable>

                <Pressable 
                    style={[
                        styles.buttonHalfAlt, 
                        darkMode ? { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.success } : { backgroundColor: colors.success }
                    ]} 
                    onPress={handleTextToPaste} 
                >
                    <Text style={[styles.buttonText, { color: darkMode ? colors.success : 'white' }]}>Paste Text</Text>
                </Pressable>
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Copy Actions</Text>
            <View style={styles.row}>
                <Pressable style={[styles.actionBtn, { borderColor: colors.primary }]} onPress={handleCopySurveyId}>
                    <Text style={[styles.actionBtnText, { color: colors.primary }]}>Copy Survey ID</Text>
                </Pressable>

                <Pressable style={[styles.actionBtn, { borderColor: colors.primary }]} onPress={handleCopyContactNumber}>
                    <Text style={[styles.actionBtnText, { color: colors.primary }]}>Copy Contact Number</Text>
                </Pressable>
            </View>

            <Pressable 
                style={[
                    styles.clearBtn, 
                    darkMode ? { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.danger } : { backgroundColor: colors.danger }
                ]} 
                onPress={handleClearClipboard}
            >
                <Text style={[styles.clearBtnText, { color: darkMode ? colors.danger : 'white' }]}>Clear Clipboard</Text>
            </Pressable>

            {pastedText ? (
                <View style={[styles.pasteResult, { backgroundColor: colors.card, borderColor: colors.border, shadowColor: colors.shadow }]}>
                    <Text style={[styles.pasteLabel, { color: colors.textMuted }]}>Pasted Content:</Text>
                    <Text style={[styles.pastedText, { color: colors.text }]}>{pastedText}</Text>
                </View>
            ) : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 20
    },
    title:{
        fontSize: 22,
        fontWeight:"bold",
        marginBottom: 20,
        textAlign: 'center'
    },
    input: {
      width: '100%',
      height: 45,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 15,
      marginBottom: 20,
      fontSize: 16
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    buttonHalf: {
      padding: 12,
      borderRadius: 6,
      width: '48%',
      alignItems: 'center'
    },
    buttonHalfAlt: {
      padding: 12,
      borderRadius: 6,
      width: '48%',
      alignItems: 'center'
    },
    buttonText: {
      fontWeight: 'bold',
      fontSize: 15
    },
    divider: {
        height: 1,
        marginVertical: 20
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    actionBtn: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 6,
        width: '48%',
        alignItems: 'center'
    },
    actionBtnText: {
        fontWeight: '600'
    },
    clearBtn: {
        padding: 12,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 25
    },
    clearBtnText: {
        fontWeight: 'bold',
        fontSize: 15
    },
    pasteResult: {
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
    },
    pasteLabel: {
        fontSize: 14,
        marginBottom: 5
    },
    pastedText: {
      fontSize: 16,
      fontWeight: '500'
    }
})
