import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Draggable from '../../../../components/alphabets/Draggable';
import * as ScreenOrientation from 'expo-screen-orientation';

const DragLetters = () => {
    
  return (
    <ScrollView>
        <View style={styles.mainContainer}>
            <View style={styles.dropZone}>
            <Text style={styles.text}>Drop them here!</Text>
            </View>
            <View style={styles.ballContainer} />
            <View style={styles.row}>
            <Draggable />
            <Draggable />
            <Draggable />
            <Draggable />
            <Draggable />
            </View>
        </View>
    </ScrollView>
  )
}

export default DragLetters;
const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      flexDirection:'column'
    },
    ballContainer: {
      height:200,
      backgroundColor:'green'
    },
    row: {
      flexDirection: "row",
      backgroundColor:'gray'
    },  
    dropZone: {
      height: 200,
      backgroundColor: "#green"
    },
    text: {
      marginTop: 25,
      marginLeft: 5,
      marginRight: 5,
      textAlign: "center",
      color: "#fff",
      fontSize: 25,
      fontWeight: "bold"
    }
  });




