import { View, Text, Pressable, Alert, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import * as Clipboard from "expo-clipboard"

export default function ClipboardScreen() {
    const [textToCopy,setTextToCopy] = useState("");
    const [pastedText, setPastedText] = useState("");

    const handleTextToCopy = async () =>{
        if(!textToCopy.trim()){
            Alert.alert("Type something", "write something to copy")
            return
        }
        await Clipboard.setStringAsync(textToCopy)
        Alert.alert("Text Copied", "Text has been copied to clipboard")
    }

    const handleTextToPaste = async ()=>{
        const copiedText = await Clipboard.getStringAsync()
        if(copiedText){
            setPastedText(copiedText)
        }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>clipboard Demo</Text>

      <TextInput 
        style={styles.input} 
        placeholder='Type something to copy ...' 
        value={textToCopy} 
        onChangeText={setTextToCopy}
      />

      <Pressable style={styles.button} onPress={handleTextToCopy} >
        <Text style={styles.buttonText}>Text to copy</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={handleTextToPaste} >
        <Text style={styles.buttonText}>Paste From Clipboard</Text>
      </Pressable>

      {pastedText ? (
        <Text style={styles.pastedText}>Pasted Text : {pastedText}</Text>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#f5f5f5",
        padding: 20
    },
    text:{
        fontSize:22,
        fontWeight:"600",
        color:"#333",
        marginBottom: 20
    },
    input: {
      width: '100%',
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 20,
      backgroundColor: 'white'
    },
    button: {
      backgroundColor: '#007BFF',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
      width: '100%',
      alignItems: 'center'
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold'
    },
    pastedText: {
      marginTop: 20,
      fontSize: 16,
      color: 'green'
    }
})
