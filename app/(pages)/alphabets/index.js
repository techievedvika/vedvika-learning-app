import React, { useEffect } from 'react'
import { Text, View,ImageBackground, StatusBar,Pressable,Image } from 'react-native'
import AlphaCategories from '../../../components/alphabets/AlphaCategories';
import Bg from '../../../assets/img/purple_bg.png';
import { useRouter } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import backbt from '../../../assets/backward-01.png';

const data = [
    {
      image: require("../../../assets/img/phonics.jpeg"),
      route: "/alphabets/Phonics",
      title: "Phonics",
    },
    {
      image: require("../../../assets/img/alphabetabc.jpg"),
      route: "/alphabets/KnowAlphabets",
      title: "Play and Learn",
    },
    // {
    //   image: require("../../assets/img/alphabetGamesImg.jpeg"),
    //   route: "Games",
    //   title: "Matching",
    // },
    {
      image: require("../../../assets/img/write.jpeg"),
      route: "alphabets/Writing",
      title: "Writing Section",
    },
  ];
const index = () => {
  const router = useRouter();

  useEffect(() => {
    async function lockScreenOrientation() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
    lockScreenOrientation();
   
  }, []);
  return (
    <>
      <StatusBar hidden={true}/>
      <ImageBackground className='flex-col justify-center   ' source={Bg} >

          <View className=" flex-row ">     
                  <Pressable
                  onPress={()=>router.back()}
                  className=" py-4 top-6  "
                  >
                    <Image  onPress={()=>router.back()} source={backbt} alt="back" style={{ height:60,width:60,marginStart:60}}  className="" />
                  </Pressable>
          </View>
          <AlphaCategories data={data} autoPlay={false} pagination={true} />
      </ImageBackground>
    </>
  )
}

export default index
