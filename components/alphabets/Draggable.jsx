import React, { useState, useRef, useEffect } from 'react';
import { View, Animated, StyleSheet, PanResponder } from 'react-native';

const Draggable = ({ onDrop, index }) => {
  const [showDraggable, setShowDraggable] = useState(true);
  const pan = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    pan.addListener((value) => (pan._value = value));
    return () => {
      pan.removeAllListeners();
    };
  }, [pan]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gesture) => {
        if (isDropArea(gesture)) {
          Animated.timing(pan, {
            toValue: { x: 0, y: 0 },
            duration: 1000,
            useNativeDriver: false,
          }).start(() => {
            setShowDraggable(false);
            onDrop(index);
          });
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            friction: 5,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const isDropArea = (gesture) => {
    const dropZone1 = { left: 0, top: 0, right: 300, bottom: 300 };
    const dropZone2 = { left: 0, top: 0, right: 600, bottom: 200 };

    return (
      gesture.moveY > dropZone1.top &&
      gesture.moveY < dropZone1.bottom &&
      gesture.moveX > dropZone1.left &&
      gesture.moveX < dropZone1.right
    ) || (
      gesture.moveY > dropZone2.top &&
      gesture.moveY < dropZone2.bottom &&
      gesture.moveX > dropZone2.left &&
      gesture.moveX < dropZone2.right
    );
  };

  const panStyle = {
    transform: pan.getTranslateTransform(),
  };

  return (
    <View style={{ position: 'absolute' }}>
      {showDraggable && (
        <Animated.View
          {...panResponder.panHandlers}
          style={[panStyle, styles.circle]}
        />
      )}
    </View>
  );
};

const CIRCLE_RADIUS = 30;

const styles = StyleSheet.create({
  circle: {
    backgroundColor: 'skyblue',
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
  },
});

export default Draggable;

