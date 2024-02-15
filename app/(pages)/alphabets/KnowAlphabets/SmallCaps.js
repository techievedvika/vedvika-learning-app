import { View,Dimensions,ImageBackground, StyleSheet, Image, TouchableOpacity, Text, ScrollView,Pressable, StatusBar } from 'react-native';
import React, { useEffect, useRef, useState } from "react";
import { PhonicImage } from "../../../../constants/data";
import MatchLetters from '../../../../components/alphabets/MatchLetters';
import { Caterpillar } from '../../../../constants/data';
import { useRouter } from 'expo-router';

  const MatchCapSmall = () => {
    const router = useRouter();
    // screen height and width
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;

    const[letters,setLetters]=useState([]);
    const makeLettersArray = ()=>{
      let arr = [];
      for(let i=1;i<=26;i++){
        let obj = {
          cap:String.fromCharCode(64 + i),
          small:String.fromCharCode(96 + i),
        };
        
        arr.push(obj);
       
      }
      return arr;
  }
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      //console.log(array);
      const selectedPairs = array.slice(0, 4);
      setLetters(selectedPairs);
      //console.log(selectedPairs);
    };
   
    
  
  useEffect(()=>{
    let arr = makeLettersArray();
    if (Array.isArray(arr)) {
      shuffleArray(arr);
    } else {
      console.error('PhonicImage is not an array.');
    }
    
  },[]);
  //console.log(PhonicImage);
    return (
      <>
        <StatusBar hidden={true}/>
        <ScrollView>

            <View
              className="bg-cyan-100 items-center"
              style={{
                width: windowWidth,
                height: windowHeight,
                flex: 1,
              }}
            >
              {/* header section */}
              <View
                style={{ width: windowWidth - 10 }}
                className="mt-5 me-10 flex-row z-10 justify-between"
              >
                <Pressable
                  onPress={()=>router.back()}
                  className="flex-row justify-start items-start z-20"
                >
                  <Image
                    source={require("../../../../assets/bg1.png")}
                    alt="back button"
                    className="h-12 w-12 overflow-visible"
                  />
                </Pressable>
                
                {/* <Pressable className="items-end z-20 me-10">
                  <Image
                    source={require("../../../../assets/soundon.png")}
                    alt="back button"
                    className="h-12 w-12 overflow-visible"
                  />
                </Pressable> */}
              </View>
        
              {/* main content start */}
              <View
              className='border-1 bottom-14'
              // style={{ height: windowHeight - 80, width: windowWidth - 20 }}

            >
                  <MatchLetters
                    pairs={letters}
                  />
                </View>
              {/* main content end */}
            </View>
        </ScrollView>
      </>
    );
  };
  
  export default MatchCapSmall;
  
  const styles = StyleSheet.create({
    container: {
      // width: "100%",
      // height: "100%",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      position: "relative",
    },
    line: {
      backgroundColor: "black",
    },
    pairContainer: {
      margin: 10,
      alignItems: 'center',
    },
    imageContainer: {
      marginBottom: 10,
    },
    image: {
      width: 100,
      height: 100,
    },
  });
  