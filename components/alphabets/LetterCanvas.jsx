import React, { useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';
import Svg, { Path } from 'react-native-svg';

const LetterCanvas = ({ image, letter, colorText, style }) => {
  const canvasRef = useRef();

  // Function to handle the end of drawing
  const handleEnd = (signature) => {
    console.log('End of drawing', signature);
    // Add your logic here for handling the end of drawing
  };

  // Function to handle when the user confirms the drawing
  const handleOK = () => {
    console.log('Drawing confirmed');
    // Add your logic here for handling the confirmed drawing
  };

  return (
    <View style={styles.container}>
      <Svg width="100%" height="100%" viewBox="0 0 500 500">
        {/* Define the path of the letter shape */}
        <Path
          d="M 50 50 L 250 50 L 250 250 L 50 250 Z"
          fill="none"
          stroke="none"
          strokeWidth="0"
          clipRule="evenodd"
        />
      </Svg>
      <SignatureScreen
        ref={canvasRef}
        onEnd={handleEnd}
        onOK={handleOK}
        penColor='black'
        webStyle={style}
        minWidth={6}
        backgroundColor="transparent"
        overlayWidth="100%"
        overlayHeight="100%"
        customStyle={{ position: 'absolute', top: 0, left: 0 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
});

export default LetterCanvas;
