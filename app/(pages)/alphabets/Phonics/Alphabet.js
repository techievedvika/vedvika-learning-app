import { View, Text, StatusBar, Pressable, Image, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ScreenOrientation from 'expo-screen-orientation';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { PhonicImage } from "../../../../constants/data";
import * as Speech from "expo-speech";

const Alphabet = () => {
    const router = useRouter();
    const params = useLocalSearchParams();

    const[letter,setLetter]=useState({});
    const[currentInd,setCurrentInd]=useState(0)
    const[images,setImages]=useState([]);

    const {title}=params;
    //console.log(title)
    const findLetter = () =>{
        let item = PhonicImage.data.find((a)=>a.title===title);
        if(item){
            return item;
        }
    }
    const speak = (txt) => {
       setTimeout(() => Speech.speak(txt), 1000) 
       // Speech.speak(txt);
        console.log('sound playing')
        Speech.stop();
      };
    useEffect(() => {
        async function lockScreenOrientation() {
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        }
        lockScreenOrientation();
        
        let item =findLetter();
        setLetter(item)
        setImages(item.images);
        if(item && item.images.length > 0){
            setTimeout(()=>speak(item.images[currentInd].speech),1000)
           
        }
      }, [currentInd]);
      //console.log(letter)
      //console.log(images)
  return (
    <>
        <StatusBar hidden={true} />
        <View style={{backgroundColor:'#edd5e6',flex:1,borderWidth:1}}>
                <View className='px-6 py-2  flex flex-row gap-10'>
                    <Pressable
                        onPress={() => router.back()}
                        className="flex-row justify-start items-start"
                    >
                        <Image
                        source={require("../../../../assets/bg2.png")}
                        alt="back button"
                        className="h-12 w-12"
                        />
                    </Pressable>
                    <View className=' flex-row justify-center '>
                        <ImageBackground
                        alt='img'
                        source={require("../../../../assets/img/frame1.png")}
                        className=' h-72 w-[600px]   flex py-20 px-16 '
                        >
                        <View className=' flex flex-row justify-center items-center gap-10 '>
                            <Image 
                            className='h-20 w-20' 
                            source={letter?.image}
                                alt='img'
                            />
                            <Image 
                            alt='img' 
                            className=' h-48 w-28' source={require('../../../../assets/GifAnimation/arrow.gif')}/>
                            <Image 
                            alt='img' 
                            className='h-40 w-36' source={images.length>0 && images[currentInd].img}/>
                        </View>
                        </ImageBackground>
                    </View>
                </View>
                <View className='flex flex-row relative'>
                    <Image 
                        source={require('../../../../assets/img/catpoint.png')}
                         className=' h-32 w-28 absolute bottom-1 left-10'   
                        />
                    
                   
                </View>
                <View className=' mx-36 bottom-2 flex flex-row   justify-between'>
                    <Pressable
                        onPress={()=>setCurrentInd(currentInd-1)}
                        className={`${currentInd>0 && 'border rounded-full bg-slate-800  '}`}
                    >
                        <Image 
                            source={ currentInd>0 && require('../../../../assets/img/left-blue-arrow.png')}
                            className=' h-10 w-10  '   
                            />
                    </Pressable>
                    <Pressable 
                    onPress={()=>setCurrentInd(currentInd+1)}
                    className={`${currentInd<3 && 'border rounded-full  bg-slate-800 '}`}
                    >
                        <Image 
                            source={currentInd<3 && require('../../../../assets/img/right-blue-arrow.png')}
                            className=' h-10 w-10 '   
                            />
                    </Pressable>
                </View>
        </View>
    </>
  )
}

export default Alphabet