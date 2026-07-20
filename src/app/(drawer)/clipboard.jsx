import { View, StyleSheet, Platform } from 'react-native'
import React, { useState } from 'react'
import { Text, TextInput, Button, Snackbar, Divider } from 'react-native-paper'
import * as Clipboard from "expo-clipboard"
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../../context/ThemeContext'

export default function ClipboardScreen() {
    const [textToCopy, setTextToCopy] = useState("");
    const [pastedText, setPastedText] = useState("");
    const [snackbar, setSnackbar] = useState({ visible: false, message: '' });
    const { colors, darkMode } = useTheme();

    const handleTextToCopy = async () => {
        if (!textToCopy.trim()) {
            setSnackbar({ visible: true, message: 'Write something to copy first' })
            return
        }
        await Clipboard.setStringAsync(textToCopy)
        setSnackbar({ visible: true, message: 'Text copied to clipboard' })
    }

    const handleTextToPaste = async () => {
        const copiedText = await Clipboard.getStringAsync()
        if (copiedText) {
            setPastedText(copiedText)
            setSnackbar({ visible: true, message: 'Text pasted from clipboard' })
        } else {
            setPastedText("")
            setSnackbar({ visible: true, message: 'Clipboard is empty' })
        }
    }

    const handleClearClipboard = async () => {
        await Clipboard.setStringAsync("");
        setPastedText("");
        setSnackbar({ visible: true, message: 'Clipboard cleared' })
    }

    const handleCopySurveyId = async () => {
        const mockSurveyId = "SRV-2024-9901";
        await Clipboard.setStringAsync(mockSurveyId);
        setSnackbar({ visible: true, message: `Survey ID ${mockSurveyId} copied` })
    }

    const handleCopyContactNumber = async () => {
        const mockContactNumber = "+1234567890";
        await Clipboard.setStringAsync(mockContactNumber);
        setSnackbar({ visible: true, message: `Contact ${mockContactNumber} copied` })
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Gradient Header */}
            <LinearGradient
                colors={colors.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.header}
            >

                <Text variant="headlineSmall" style={styles.headerTitle}>Clipboard</Text>
                <Text style={styles.headerSub}>Copy, paste, and manage clipboard data</Text>
            </LinearGradient>

            <View style={styles.content}>
                <TextInput
                    mode="outlined"
                    label="Type something to copy..."
                    value={textToCopy}
                    onChangeText={setTextToCopy}

                    outlineColor={colors.border}
                    activeOutlineColor={colors.primary}
                    outlineStyle={{ borderRadius: 12 }}
                    style={{ marginBottom: 14 }}
                />

                <View style={styles.row}>
                    <Button
                        mode="contained"
                        onPress={handleTextToCopy}
                        icon="content-copy"
                        style={[styles.halfBtn]}
                        buttonColor={colors.primary}
                        contentStyle={{ paddingVertical: 4 }}
                        labelStyle={{ fontWeight: '700', fontSize: 13 }}
                    >
                        Copy
                    </Button>
                    <Button
                        mode="contained"
                        onPress={handleTextToPaste}
                        icon="content-paste"
                        style={[styles.halfBtn]}
                        buttonColor={colors.success}
                        contentStyle={{ paddingVertical: 4 }}
                        labelStyle={{ fontWeight: '700', fontSize: 13 }}
                    >
                        Paste
                    </Button>
                </View>

                <Divider style={{ backgroundColor: colors.border, marginVertical: 20 }} />

                <Text variant="titleMedium" style={[styles.sectionTitle, { color: colors.text }]}>
                  Quick Copy
                </Text>
                <View style={styles.row}>
                    <Button
                        mode="outlined"
                        onPress={handleCopySurveyId}
                        icon="file-document-outline"
                        style={[styles.halfBtn, { borderColor: colors.primary }]}
                        textColor={colors.primary}
                        contentStyle={{ paddingVertical: 2 }}
                        labelStyle={{ fontSize: 12 }}
                    >
                        Survey ID
                    </Button>
                    <Button
                        mode="outlined"
                        onPress={handleCopyContactNumber}
                        icon="phone-outline"
                        style={[styles.halfBtn, { borderColor: colors.primary }]}
                        textColor={colors.primary}
                        contentStyle={{ paddingVertical: 2 }}
                        labelStyle={{ fontSize: 12 }}
                    >
                        Contact No.
                    </Button>
                </View>

                <Button
                    mode="outlined"
                    onPress={handleClearClipboard}
                    icon="delete-outline"
                    style={[styles.clearBtn, { borderColor: colors.danger }]}
                    textColor={colors.danger}
                    contentStyle={{ paddingVertical: 4 }}
                    labelStyle={{ fontWeight: '700' }}
                >
                    Clear Clipboard
                </Button>

                {pastedText ? (
                    <View style={[styles.pasteResult, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                        <View style={styles.pasteHeader}>
                            <Ionicons name="document-text-outline" size={18} color={colors.primary} />
                            <Text variant="labelMedium" style={{ color: colors.textMuted, fontWeight: '600' }}>
                                Pasted Content
                            </Text>
                        </View>
                        <View style={[styles.codeBlock, { backgroundColor: colors.surfaceElevated }]}>
                            <Text variant="bodyMedium" style={{ color: colors.text, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' }}>
                                {pastedText}
                            </Text>
                        </View>
                    </View>
                ) : null}
            </View>

            <Snackbar
                visible={snackbar.visible}
                onDismiss={() => setSnackbar({ visible: false, message: '' })}
                duration={2000}
                style={{ borderRadius: 12, marginBottom: 16 }}
            >
                {snackbar.message}
            </Snackbar>
        </View>
    )
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
    content: {
        padding: 16,
    },
    row: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
    },
    halfBtn: {
        flex: 1,
        borderRadius: 12,
    },
    sectionTitle: {
        fontWeight: '700',
        marginBottom: 12,
    },
    clearBtn: {
        borderRadius: 12,
        marginTop: 6,
        marginBottom: 20,
    },
    pasteResult: {
        borderRadius: 16,
        borderWidth: 1,
        overflow: 'hidden',
    },
    pasteHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        padding: 14,
        paddingBottom: 0,
    },
    codeBlock: {
        margin: 14,
        padding: 14,
        borderRadius: 10,
    },
})
