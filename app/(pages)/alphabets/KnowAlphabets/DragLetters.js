import { useRouter } from "expo-router";
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, PanResponder, Animated, StatusBar,Image, ScrollView, Pressable, useWindowDimensions  } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import Draggable from "../../../../components/alphabets/Draggable";



const App = () => {
  const[letters,setLetters]=useState([]);
  const[items,setItems]=useState([]);
  const[currentInd,setCurrentInd]=useState(-1);
  const[reset,setReset]=useState(false);
  const [dropZone1, setDropZone1] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [dropZone2, setDropZone2] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const { width, height } = useWindowDimensions();

  const makeLettersArray = ()=>{
    let arr = [];
    for(let i=1;i<=26;i++){
      let capobj = {
        id:i,
        letter:String.fromCharCode(64 + i),
      };
      let smallobj = {
        id:i,
        letter:String.fromCharCode(96 + i),
      };
      arr.push(capobj);
      arr.push(smallobj);
    }
    setLetters(arr);
    return arr;
}

const selectItems = (array)=>{
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    return array.splice(0, 6);
   
} 
useEffect(()=>{
  let arr = makeLettersArray();
  let selectedItems = selectItems(arr);
  setItems(selectedItems);
  setCurrentInd(-1);
    const dropZoneWidth = width * 0.40; 
    const dropZoneHeight = 200; 
    const dropZone1X = width * 0.05; 
    const dropZone2X = width * 0.55; 
    const dropZoneY = height * 0.3 - dropZoneHeight * 0.5; 

    setDropZone1({ x: dropZone1X, y: dropZoneY, width: dropZoneWidth, height: dropZoneHeight });
    setDropZone2({ x: dropZone2X, y: dropZoneY, width: dropZoneWidth, height: dropZoneHeight });
  //console.log(letters);
},[reset,width,height]);
  const router = useRouter();
  //console.log(currentInd);
  //console.log(dropZone1,dropZone2);
  return (
    <>
    <StatusBar hidden={true}/>
    <ScrollView>
        <View>
          <View style={styles.mainContainer}>
            <View style={styles.header}>
              <Pressable onPress={() => router.back()}>
                <Image
                  source={require('../../../../assets/bg1.png')}
                  resizeMode="contain"
                  style={{ width: responsiveWidth(12), height: responsiveHeight(12) }}
                />
              </Pressable>
              <Text style={styles.headerText}>Drop the Alphabet</Text>
              <Pressable onPress={() => console.log('Sound button pressed')}>
                <Image
                  source={require('../../../../assets/soundon.png')}
                  resizeMode="contain"
                  style={{ width: responsiveWidth(12), height: responsiveHeight(12) }}
                />
              </Pressable>
            </View>
            <View style={styles.secondContainer}>
                <View style={styles.boxContainer}>
                  <View style={[styles.dropZone,{ left: dropZone1.x, top: dropZone1.y, width: dropZone1.width, height: dropZone1.height }]}>
                    <Image style={styles.boxImg} source={require('../../../../assets/img/redSmall.png')} />
                  </View>
                  <View style={[styles.dropZone2,{ left: dropZone2.x, top: dropZone2.y, width: dropZone2.width, height: dropZone2.height }]}>
                    <Image style={styles.boxImg} source={require('../../../../assets/img/blueCap.png')} />
                  </View>
                </View>
                <View style={styles.ballContainer}/>
                {currentInd===5 && (
                  <View className='flex-1  flex-row justify-center shadow-2xl'>
                    <Pressable
                      onPress={()=>setReset(!reset)}
                    >
                      <Image 
                        style={{width:80,height:80}}
                        source={require('../../../../assets/img/reset-1.png')}
                      />
                    </Pressable>
                  </View>
                )}
                {currentInd<5 && (<View style={styles.row}>
                    {items && items.map((a, ind) => (
                              
                                  <Draggable 
                                    key={ind} 
                                    letter={a.letter}
                                    handleInd ={()=>setCurrentInd(currentInd+1)}
                                    dropZone1={dropZone1}
                                    dropZone2={dropZone2}
                                    style={{ marginHorizontal: 60 }} 
                                  />
                              
                    ))}
                </View>)}
            </View>
          </View>
        </View>
    </ScrollView>
    </>
  );
};

export default App;
let CIRCLE_RADIUS = 30;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor:'#cffafe',
    //flexDirection:'column-reverse'
  },
  secondContainer: {
    flex: 1,
   
    flexDirection:'column-reverse'
  },
  header: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: responsiveFontSize(5),
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  boxContainer:{
    //display:'flex',
    //flexDirection:'row',
    //justifyContent:'space-around',
    height:300
  },
  ballContainer: {
    height:10,
    //backgroundColor:'red'
  },
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
  row: {
    flexDirection: "row",
    marginStart:10,
    //backgroundColor:"blue",
    height:100,
    justifyContent:'center',
    gap:20,
    //borderWidth:2,
    //borderColor:'black',
    //paddingHorizontal:100
  },  
  dropZone: {
    position:'absolute',
    //height: 200,
    //backgroundColor: "#00334d"
  },
  dropZone2: {
    position:'absolute',
   // height: 200,
    //backgroundColor: "red"
  },
  boxImg:{
    height:190,
    width:280
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


