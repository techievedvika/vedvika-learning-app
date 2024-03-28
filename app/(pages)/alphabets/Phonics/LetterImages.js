import { View, Text, StatusBar, TouchableOpacity,Animated, Image, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ScreenOrientation from 'expo-screen-orientation';
import { PhonicImage } from "../../../../constants/data";
import { Link, useRouter } from "expo-router";
import { Audio } from "expo-av";
import * as Speech from "expo-speech";

const Letters = () => {
    const router = useRouter();
  
    const[letters,setLetters]=useState([])
  
   
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

            <View style={{ flex:1 }} className='bg-blue-200 flex-1'>
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
                    
                </View>
                <View className="flex-row flex-wrap justify-center  px-8 py-8">
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

                    {PhonicImage.data?.map((item, index) => {
                        return (
                            <View
                            className="m-1.5 flex items-center justify-center"
                            key={index}
                            >
                          <Link 
                          
                            asChild
                            href={{
                            pathname:'/alphabets/Phonics/Alphabet' ,
                            params:{
                            title:item.title,
                           
                            }
                        }}
                            >
                                <TouchableOpacity
                                    //onPress={() => speak(item?.title)}
                                    // style={{backgroundColor:getColor()}}
                                    className="border-black border-2 p-3 rounded-full"
                                >
                                    <Image
                                    source={ item?.image }
                                    className=" h-14 w-14 overflow-visible"
                                    />
                                </TouchableOpacity>
                            </Link>
                            </View>
                        );
                    })}
                    
                </View>
            </View>
        </ScrollView>
    </>
  )
}
const getColor = () => {
    const red = Math.floor(Math.random() * 128 + 128);
    const green = Math.floor(Math.random() * 64 + 128); // Adjust the range for darker green
    const blue = Math.floor(Math.random() * 64 + 128); // Adjust the range for darker blue
  
    const color = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
  
    return color;
}


export default Letters