import React, { useState } from 'react';
import { View, Text, StyleSheet, PanResponder } from 'react-native';

const DragAndDrop = () => {
  const [dropZone1, setDropZone1] = useState(false);
  const [dropZone2, setDropZone2] = useState(false);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      // Update the position of the dragged item
      // You can use this to visually update the position of the item
      console.log('Dragging');
    },
    onPanResponderRelease: (evt, gestureState) => {
      // Detect if the item is dropped into one of the boxes
      const { locationX, locationY } = evt.nativeEvent;

      if (locationX > 0 && locationX < 150 && locationY > 0 && locationY < 150) {
        setDropZone1(true);
        setDropZone2(false);
        console.log('Dropped in Box 1');
      } else if (locationX > 200 && locationX < 350 && locationY > 0 && locationY < 150) {
        setDropZone1(false);
        setDropZone2(true);
        console.log('Dropped in Box 2');
      }
    },
  });

  return (
    <View style={styles.container}>
      <View
        style={[styles.dropZone, dropZone1 && styles.dropZoneHighlighted]}
        onLayout={(event) => {
          // Measure the first drop zone
        }}
      >
        <Text style={styles.text}>Drop Zone 1</Text>
      </View>
      <View
        style={[styles.dropZone, dropZone2 && styles.dropZoneHighlighted]}
        onLayout={(event) => {
          // Measure the second drop zone
        }}
      >
        <Text style={styles.text}>Drop Zone 2</Text>
      </View>
      <View style={styles.draggableContainer} {...panResponder.panHandlers}>
        <Text style={styles.draggable}>Drag me!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropZone: {
    width: 150,
    height: 150,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  dropZoneHighlighted: {
    backgroundColor: 'lightblue',
  },
  text: {
    fontSize: 20,
  },
  draggableContainer: {
    width: 100,
    height: 100,
    backgroundColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  draggable: {
    fontSize: 20,
  },
});

export default DragAndDrop;
