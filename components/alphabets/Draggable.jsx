import { useRouter } from "expo-router";
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, PanResponder, Animated, StatusBar,Image, ScrollView, Pressable  } from "react-native";
import { playSuccess,playError } from "../../constants/sounds";


const Draggable = (props) => {
  const [showDraggable, setShowDraggable] = useState(true);
  const [dropAreaValues, setDropAreaValues] = useState(null);
   const pan = useState(new Animated.ValueXY({ x: 0, y: 0 }))[0];
  const opacity = useState(new Animated.Value(1))[0];
 
 

   const makeLettersArray = ()=>{
      let smallLetters = [];
      let capLetters = [];
      for(let i=1;i<=26;i++){
        let capobj = {
          id:i,
          letter:String.fromCharCode(64 + i),
        };
        let smallobj = {
          id:i,
          letter:String.fromCharCode(96 + i),
        };
        capLetters.push(capobj);
        smallLetters.push(smallobj);
      }
      let arr = {
        small:smallLetters,
        caps:capLetters
      };
     //setLetters(arr);
   }
      let smallLetters = [];
      let capLetters = [];
      for(let i=1;i<=26;i++){
      
        let capobj = String.fromCharCode(64 + i);
        let smallobj = String.fromCharCode(96 + i);
        
        capLetters.push(capobj);
        smallLetters.push(smallobj);
      }
      let letters = {
        small:smallLetters,
        caps:capLetters
      };
  const panStyle = {
    transform: [
      { translateX: pan.x },
      { translateY: pan.y }
    ]
  };
  let{letter,handleInd,dropZone1,dropZone2}=props;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (_, gesture) => {
      pan.setOffset({
        x: pan.x._value,
        y: pan.y._value,
      });
      pan.setValue({ x: 0, y: 0 });
    },
    onPanResponderMove: (_, gesture) => {
      pan.x.setValue(gesture.dx);
      pan.y.setValue(gesture.dy);
    },
    onPanResponderRelease: (_, gesture) => {
      
      //console.log(letters);
      //console.log(letters);
      if (isDropArea(gesture)) {
        playSuccess()
        handleInd()
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }).start(() => setShowDraggable(false));
      }else {
        playError();
        // Reset position of the draggable component
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
      }
    
    },
  });

  // const isDropArea = (gesture) => {
  //   //console.log('X: ',gesture.moveX,'Y: ',gesture.moveY)
  //   if (gesture.moveY > 200) {
  //     if (gesture.moveX >135 && gesture.moveX<320) {
  //       if(letters.small.includes(letter)){
  //         return true;
  //       }
  //     }
  //     if (gesture.moveX >580 && gesture.moveX<780) {
  //       if(letters.caps.includes(letter)){
  //         return true;
  //       }
  //     }
  //   }
  // };
  const isDropArea = (gesture) => {
    console.log('X: ',gesture.moveX,'Y: ',gesture.moveY,'letter: ',letter)
    let zone1 = {
      top:dropZone1.y,
      bottom:dropZone1.y + dropZone1.height,
      left:dropZone1.x,
      right:dropZone1.x + dropZone1.width
    };
    let zone2 = {
      top:dropZone2.y,
      bottom:dropZone2.y + dropZone2.height,
      left:dropZone2.x,
      right:dropZone2.x + dropZone2.width
    };
    //console.log(zone2);
    //console.log('Zone 1 :',dropZone1.y,dropZone1.height,dropZone1.x, dropZone1.x + dropZone1.width)
    if (
      gesture.moveY >= dropZone1.y+dropZone1.height &&
      gesture.moveY <= 300 &&
      gesture.moveX >= dropZone1.x &&
      gesture.moveX <= dropZone1.x + dropZone1.width
    ) {
      if(letters.small.includes(letter)){
                 return true;
        }
     
    }
    if (
      gesture.moveY >= dropZone2.y+dropZone2.height &&
      gesture.moveY <=  300 &&
      gesture.moveX >= dropZone2.x &&
      gesture.moveX <=  dropZone2.width+ dropZone2.x
    ) {
      if(letters.caps.includes(letter)){
        return true;
}

    }
    return false;
  };
  useEffect(()=>{
      //makeLettersArray();
  },[letter])
  return (
    <View style={{ width: '10%', justifyContent: 'center' }}>
      {showDraggable && (
        <View style={{ position: 'absolute',marginHorizontal:6, }}>
          <Animated.View
            {...panResponder.panHandlers}
            style={[panStyle, styles.circle, {opacity:opacity}]}
          >
          <Text style={{fontSize:62,color:'white',fontWeight:'bold'}}>{letter}</Text>
          </Animated.View>
        </View>
      )}
    </View>
  );
};


const CIRCLE_RADIUS = 30;

const styles = StyleSheet.create({
  circle: {
    backgroundColor:'#478778',
    width:90,
    height:90,
  borderRadius: 100,
  textAlign:'center',
  justifyContent:'center',
  alignItems:'center',
  padding:1,
  marginHorizontal:6

},
});

export default Draggable;

