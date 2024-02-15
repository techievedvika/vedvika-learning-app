import {
    View,
    Text,
    Pressable,
    Image,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    StyleSheet,
    PanResponder,
    Animated
  } from "react-native";
  import React, { useEffect, useState,useRef } from "react";
  import { Dimensions } from "react-native";
  
  import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
  } from "react-native-responsive-dimensions";
  import * as Speech from "expo-speech";
  import Draggable from "react-native-draggable";
import { useRouter } from "expo-router";
  const ColorLetters = () => {

    const router = useRouter();

    const[letters,setLetters]=useState([]);
    const[items,setItems]=useState([]);
    const[box1Boundary,setBox1Boundary]=useState([]);
    const[box2Boundary,setBox2Boundary]=useState([]);
    const box1Ref = useRef(null);
    const box2Ref=useRef(null);
    const[box1,setBox1]=useState([]);
    const[box2,setBox2]=useState([]);
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
    const handleBox1Layout = (event) => {
      const { x, y, width, height } = event.nativeEvent.layout;
      const parentWidth = Dimensions.get('window').width; // Get the width of the parent container
    
      // Adjust boundaries based on flex direction (assuming row direction)
      const minX = x; // Left edge of the box
      const maxX = x + width; // Right edge of the box
      const minY = y; // Top edge of the box
      const maxY = y + height; // Bottom edge of the box
    
      setBox1Boundary({
        minX: minX,
        maxX: maxX,
        minY: minY,
        maxY: maxY,
      });
    };
  
    const handleBox2Layout = (event) => {

      //console.log('Box 2 Layout: ',event.nativeEvent.layout);
      const { x, y, width, height } = event.nativeEvent.layout;
      //console.log("Box 2: ",x,y,width,height);
      setBox2Boundary({
        minX: x,
        maxX: x + width,
        minY: y,
        maxY: y + height,
      });
    };
    // const handleBox1Layout = (event) => {
    //   const { x, y } = event.nativeEvent.layout;
    //   setBox1({ x, y });
    // };
    
    // const handleBox2Layout = (event) => {
    //   const { x, y } = event.nativeEvent.layout;
    //   setBox2({ x, y });
    // };
    const handleBox1Ref = (e)=>{
      e.target.measure(
        (x, y, width, height, pageX, pageY) => {
          console.log('BOX 1 : ',x,y,pageX,pageY);
          setBox1({
            x: x + pageX, 
            y: y + pageY,
          });
        },
      );
    }
    const handleBox2Ref = (e)=>{
      if (box2Ref.current) {
        box2Ref.current.measure(( pageX, pageY) => {
          //console.log('Box 1 Page Coordinates:', { x: pageX, y: pageY });
          setBox2({
            x:pageX,
            y:pageY
          })
        });
      }
    }
    const handleDrop = (e, letter) => {
      const dropX = e.nativeEvent.pageX;
      const dropY = e.nativeEvent.pageY;
      console.log(e.nativeEvent);
      console.log('Box 1 :', box1Boundary);
      //console.log('Box 2 :', box2Boundary);
      if (
        dropX >= box1Boundary.minX &&
        dropX <= box1Boundary.maxX &&
        dropY >= box1Boundary.minY &&
        dropY <= box1Boundary.maxY
      ) {
        console.log(`Dropped ${letter} into Box 1`);
        // Perform actions for Box 1
      } else if (
        dropX >= box2Boundary.minX &&
        dropX <= box2Boundary.maxX &&
        dropY >= box2Boundary.minY &&
        dropY <= box2Boundary.maxY
      ) {
        console.log(`Dropped ${letter} into Box 2`);
        // Perform actions for Box 2
      } else {
        console.log(`Dropped ${letter} outside of both boxes`);
      }
    };
    useEffect(()=>{
        let arr = makeLettersArray();
        let selectedItems = selectItems(arr);
        setItems(selectedItems);
        //console.log(letters);
    },[]);
    return (
        <ScrollView>
            <View
                className="bg-cyan-100"
            >
                <View
                style={{
                    // width: responsiveWidth(100),
                    height: responsiveHeight(15),
                    // backgroundColor: "#fff",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginLeft: responsiveWidth(3),
                    marginRight: responsiveWidth(3),
                    flexDirection: "row",
                }}
                >
                <Pressable onPress={()=>router.back()}>
                    <Image
                    source={require("../../../../assets/bg1.png")}
                    alt="back button"
                    // className="h-12 w-12 overflow-visible"
                    resizeMode="contain"
                    style={{ width: responsiveWidth(12), height: responsiveHeight(12) }}
                    />
                </Pressable>
                <View>
                    <Text
                    style={{ fontSize: responsiveFontSize(5) }}
                    className="font-semibold underline"
                    >
                    Drop the Alphabet
                    </Text>
                </View>
                <Pressable>
                    <Image
                    source={require("../../../../assets/soundon.png")}
                    alt="back button"
                    // className="h-12 w-12 overflow-visible"
                    resizeMode="contain"
                    style={{ width: responsiveWidth(12), height: responsiveHeight(12) }}
                    />
                </Pressable>
                </View>
                {/* main content */}

                <View style={styles.contentContainer}>
                  <View style={styles.boxesContainer}>
                    <View ref={box1Ref}  style={styles.box1} onLayout={handleBox1Layout}>
                      <Image style={styles.boxImg} source={require('../../../../assets/img/redSmall.png')}/>
                    </View>
                    <View ref={box2Ref} style={styles.box2} onLayout={handleBox2Layout}>
                    <Image style={styles.boxImg} source={require('../../../../assets/img/blueCap.png')}/>
                    </View>
                  </View>
                  <View style={styles.textContainer}>
                    <View style={{flex:1,justifyContent:'center',backgroundColor:'green',paddingBottom:50,gap:105,flexDirection:'row',alignItems:'center'}}>
                        {items && items.map((a, ind) => (
                          <View key={ind}  >
                            <Draggable
                                style={styles.draggable}
                                onDragRelease={(event) => handleDrop(event, a.letter)}
                               
                                children 
                              >
                                <View style={styles.letterContainer}>
                                  <Text style={styles.letter}>{a.letter}</Text>
                                </View>
                              </Draggable> 
                          </View>
                        ))}
                    </View>
                  </View>
                </View>   
            </View>
        </ScrollView>
    );
  };
  
  export default ColorLetters;
  const styles = StyleSheet.create({
    contentContainer:{
        flex:1,
        flexDirection:'column-reverse',
        paddingHorizontal:20,
       
    },
    textContainer:{
        flexDirection:'row',
        justifyContent:'start',
        // borderWidth:1,
        minHeight:150
    },
    boxesContainer:{
      // flexDirection:'row',
      // gap:35,
      // justifyContent:'space-between',
      // // backgroundColor:'pink',
      // padding:20
    },
    box:{
      justifyContent:'center',
      backgroundColor:'gray',
      padding:0
    },
    box1:{
      height:220,
      width:300,
      backgroundColor:'gray',
      x:10
    },
    box2:{
      height:220,
      width:300,
      backgroundColor:'gray',
      padding:0
    },
    boxImg:{
      height:190,
      width:280
    },
    draggable:{
   
    
    },
    letterContainer:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#478778',
        borderRadius:50,
        width:90,
        height:90,
        textAlign:'center',
        padding:6
    },
    letter:{
        fontSize: 62,
        letterSpacing:2, 
        fontWeight: 'bold',
        color: 'white',        
    }
    
  })

  

{/* <Draggable
                              style={styles.draggable}
                              x={10 + (ind * 105)}
                              y={50}
                              onDragRelease={(event) => handleDrop(event, a.letter)}
                              zIndex={1}
                              children 
                            >
                              <View style={styles.letterContainer}>
                                <Text style={styles.letter}>{a.letter}</Text>
                              </View>
                            </Draggable> */}
  {/* <View  
                     style={styles.imgContainer}
                     className='border-1 bg-red-900  ' 
                            onLayout={handleBox2Layout}  
                     >
                        <Image style={{height:70,width:70}} source={require('../../../../assets/img/smallA.png')}/>
                        <View
                            
                            onLayout={handleBox2Layout}
                            style={styles.boxContainer}
                        >
                            <Image  style={styles.boxImg} source={require('../../../../assets/img/redbox01.png')}/>
                        </View>
                    </View> */}

                    // imgContainer:{
    //     flex:1,
    //     flexDirection:'column',
    //     justifyContent:'center',
    //     alignItems:'center',
    //     padding:0
    // },
    // boxContainer:{
    //     alignItems:'center',
    //     overflow:'hidden',
    //     height:200,
    //     width:200
    // },
    // draggableText: {
    //     fontSize: 68,
    //     letterSpacing:2, 
    //     fontWeight: 'bold',
    //     color: 'green',
    //     marginLeft: 4,
    //     marginRight: 4,
    //   },
    // boxImg:{
    //     height:150,
    //     width:270,
    //     borderWidth:1,
    //     borderColor:'white'
        
    // },
    // letterImg:{
    //     height:100,
    //     width:100
    // },
    // blueBox:{
    //     height:150,
    //     width:150,
       
    // }