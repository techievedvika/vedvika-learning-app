import React, { useRef, useState } from 'react';
import { View, PanResponder, StyleSheet,Animated } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

const LetterAWithCircle = () => {
  const [circlePosition, setCirclePosition] = useState({ x: 50, y: 250 });
  const circleRef = useRef(null);
  const pan = useRef(new Animated.ValueXY()).current;

  const handlePanResponderMove = (event, gestureState) => {
    const { dx, dy } = gestureState;
    const { x, y } = circlePosition;
    const newX = x + dx;
    const newY = y + dy;
  
    // Check if the new position is within the boundary
    const minX = 50;
    const maxX = 250;
    const minY = 50;
    const maxY = 250;
  
    if (newX >= minX && newX <= maxX && newY >= minY && newY <= maxY) {
      // Update the circle position
      setCirclePosition({ x: newX, y: newY });
    }
    // let newX = circlePosition.x + dx;
    // let newY = circlePosition.y + dy;

    // // Clamp the circle position to stay within the SVG boundaries
    // newX = Math.max(Math.min(newX, 250), 50); // Clamping x between 50 and 250
    // newY = Math.max(Math.min(newY, 250), 50); // Clamping y between 50 and 250

    // setCirclePosition({ x: newX, y: newY });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
        listener: handlePanResponderMove,
      }),
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: { x: circlePosition.x, y: circlePosition.y },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <Svg width={768} height={1280} viewBox="0 0 768 1280">
        <Path
          d="M226,664 L390,96 L552,664 L502,664 L350,328 L198,328 Z"
          fill="none"
          stroke="black"
          strokeWidth="10"
        />
      </Svg>
      <View style={StyleSheet.absoluteFill}>
        <Animated.View
          style={[
            styles.circle,
            {
              transform: [{ translateX: pan.x }, { translateY: pan.y }],
            },
          ]}
          {...panResponder.panHandlers}
        >
          <Svg width={30} height={30}>
            <Circle cx={15} cy={15} r={15} fill="red" />
          </Svg>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    position: 'absolute',
  },
});

export default LetterAWithCircle;
