import { View, Text, StatusBar, TouchableOpacity,Animated, Image, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ScreenOrientation from 'expo-screen-orientation';
import { PhonicImage } from "../../../../constants/data";
import { useRouter } from "expo-router";
import { Audio } from "expo-av";
import * as Speech from "expo-speech";
//import Animated,{useSharedValue} from 'react-native-reanimated';

const Letters = () => {
    const router = useRouter();
    const[showCaps,setShowCaps]=useState(true)
    const[letters,setLetters]=useState([])
    const [scale] = useState(new Animated.Value(1));
    const capA = require('../../../../assets/img/Acap.png')
    const smallA = require('../../../../assets/img/Asmall.png')
    const [sound, setSound] = React.useState();
   // const width = useSharedValue(100);
    //const height = useSharedValue(100);
    const [pressedIndex, setPressedIndex] = useState(-1);
    
    const speak = (txt) => {
        //console.log(txt)
         setTimeout(() => Speech.speak(txt), 1000) ;
        Speech.speak(txt);
        Speech.stop();
    };
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
    const [animation] = useState(new Animated.Value(1));
  

    const handlePress = (index,title) => {
        setPressedIndex(index);
        
        Animated.timing(animation, {
            toValue: 0.4, 
            duration: 300, 
            useNativeDriver: true, 
        }).start(() => {
            Animated.timing(animation, {
                toValue: 1, 
                duration: 300, 
                useNativeDriver: true, 
            }).start();
        });
        speak(title);
    };
    useEffect(() => {
        async function lockScreenOrientation() {
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        }
        lockScreenOrientation();
        let arr = makeLettersArray();
        setLetters(arr)
        
      }, []);
  return (
    <>
        <StatusBar hidden={true}/>
        <ScrollView>
            <View style={{ flex:1 }} className='bg-slate-700 min-h-screen flex-1 h-full'>
                <View className='px-6 py-2  flex flex-row gap-64'>
                    <Pressable
                        onPress={() => router.back()}
                        className="flex-row justify-start items-start"
                    >
                        <Image
                        source={require("../../../../assets/bg1.png")}
                        alt="back button"
                        className="h-12 w-12"
                        />
                    </Pressable>
                    <Pressable
                        onPress={() => setShowCaps(!showCaps)}
                        className="flex-row justify-start items-start"
                    >
                        <Image
                        source={showCaps ? capA : smallA}
                        alt="back button"
                        className="h-24 w-24"
                        />
                    </Pressable>
                </View>
                <View className="flex-row flex-wrap justify-center  px-8 py-4">
                    {/* {letters.map((item,ind)=>(
                        <View
                         className="m-1.5 flex justify-center"
                         key={ind}
                        >
                            <TouchableOpacity
                                onPress={() => speak(item?.cap)}
                                 style={{backgroundColor:getColor()}}
                                className=" border p-1 jjustify-center rounded-full"
                            >
                                <Text style={{fontSize:40,height:50,width:50,textAlign:'center'}}>{showCaps ? item?.cap : item?.small }</Text>
                            </TouchableOpacity>
                        </View>
                    ))} */}
                    {/* <Animated.View
                     style={{
                        transform: [{ scale: animation }],
                     }}
                            className="m-1.5 flex items-center justify-center"
                            
                            >
                            <TouchableOpacity
                                onPress={handlePress}
                                //onPress={() => speak(item?.title)}
                               // style={{backgroundColor:getColor()}}
                                className="border-black bg-  p-2 rounded-full"
                            >
                                <Image
                                //style={{width:width,height:height}}
                                source={require('../../../../assets/VedvikaTechnology/caps/A.png') }
                                className=" h-12 w-12 overflow-visible"
                                />
                            </TouchableOpacity>
                    </Animated.View> */}
                    {PhonicImage.data?.map((item, index) => {
                        return (
                            <Animated.View
                            style={{
                                transform: [{ scale: index === pressedIndex ? animation : 1 }], // Apply animation only to pressed item
                            }}
                            className="m-1.5 flex items-center justify-center"
                            key={index}
                            >
                            <Pressable 
                             onPress={() => handlePress(index,item?.title)}
                             className="border- bg-red-200  bg-  p-2 rounded-full"
                            >
                                <View                       
                                    //onPress={() => speak(item?.title)}
                                // style={{backgroundColor:getColor()}}
                                   
                                >
                                
                                        <Image
                                        source={showCaps ? item?.image : item?.smallAlphabet }
                                        className="overflow-visible h-12 w-12"
                                        />
                                
                                </View>
                            </Pressable>
                            </Animated.View>
                        );
                    })}
                    
                </View>
            </View>
        </ScrollView>
    </>
  )
}
const getColor = () => {
    const red = Math.floor(Math.random() * 120 + 128);
    const green = Math.floor(Math.random() * 120 + 128); 
    const blue = Math.floor(Math.random() * 120 + 128);
  
    const color = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
  
    return color;
}


export default Letters



