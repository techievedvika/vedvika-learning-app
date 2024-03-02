// App.js
import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Dot = ({ x, y, onPress }) => (
  <TouchableOpacity onPress={() => onPress(x, y)}>
    <Svg>
      <Circle cx={x} cy={y} r={5} fill="black" />
    </Svg>
  </TouchableOpacity>
);

const App = () => {
  const [dots, setDots] = useState([]);
  const lineRef = useRef(null);

  const handleDotPress = (x, y) => {
    setDots([...dots, { x, y }]);
    drawLine();
  };

  const drawLine = () => {
    if (dots.length < 2) return;
    const lastDot = dots[dots.length - 1];
    const secondLastDot = dots[dots.length - 2];

    const d = `M ${secondLastDot.x},${secondLastDot.y} L ${lastDot.x},${lastDot.y}`;
    lineRef.current.setNativeProps({ d });
  };

  return (
    <View style={styles.container}>
      <View style={styles.canvas}>
        {dots.map(({ x, y }, index) => (
          <Dot key={index} x={x} y={y} onPress={handleDotPress} />
        ))}
        <Svg>
          <Path
            ref={lineRef}
            stroke="black"
            strokeWidth="2"
            fill="none"
          />
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  canvas: {
    width: windowWidth,
    height: windowHeight,
  },
});

export default App;
