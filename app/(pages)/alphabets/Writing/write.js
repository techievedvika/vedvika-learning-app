import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { Canvas, Circle, Line } from 'react-native-svg';

const Write = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState([]);

  const handleDrawStart = ({ nativeEvent }) => {
    setIsDrawing(true);
    const { locationX, locationY } = nativeEvent;
    setPoints([{ x: locationX, y: locationY }]);
  };

  const handleDrawMove = ({ nativeEvent }) => {
    if (isDrawing) {
      const { locationX, locationY } = nativeEvent;
      const newPoint = { x: locationX, y: locationY };
      setPoints((prevPoints) => [...prevPoints, newPoint]);
    }
  };

  const handleDrawEnd = () => {
    setIsDrawing(false);
  };

  const renderLines = () => {
    if (points.length < 2) {
      return null;
    }

    const lines = [];
    for (let i = 0; i < points.length - 1; i++) {
      lines.push(
        <Line
          key={i}
          x1={points[i].x}
          y1={points[i].y}
          x2={points[i + 1].x}
          y2={points[i + 1].y}
          stroke="black"
          strokeWidth={5} // Adjust line thickness as needed
        />
      );
    }

    return lines;
  };

  return (
    <View style={styles.container}>
      <PanGestureHandler
        onGestureEvent={handleDrawMove}
        onHandlerStateChange={(event) => {
          if (event.nativeEvent.state === State.BEGAN) {
            handleDrawStart(event);
          } else if (event.nativeEvent.state === State.END) {
            handleDrawEnd();
          }
        }}
      >
        <View style={styles.canvasContainer}>
          
            {/* Render lines between points */}
            {/* {renderLines()} */}
            {/* Render dots as circles */}
            {points.map((point, index) => (
              <Circle
                key={index}
                cx={point.x}
                cy={point.y}
                r={5} // Radius of dots
                fill="black"
              />
            ))}
          
        </View>
      </PanGestureHandler>
      <TouchableOpacity onPress={handleDrawEnd} style={styles.clearButton}>
        <View>
          <Text>Clear</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  canvasContainer: {
    flex: 1,
    width: '100%',
    aspectRatio: 1,
    overflow: 'hidden',
  },
  canvas: {
    flex: 1,
  },
  clearButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    padding: 12,
    backgroundColor: 'red',
    borderRadius: 8,
  },
});

export default Write;
