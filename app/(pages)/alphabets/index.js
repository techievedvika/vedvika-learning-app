import React, { useEffect } from 'react'
import { Text, View,ImageBackground } from 'react-native'
import AlphaCategories from '../../../components/alphabets/AlphaCategories';
import Bg from '../../../assets/img/purple_bg.png';
import { useRouter } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';

const data = [
    {
      image: require("../../../assets/img/phonics.jpeg"),
      route: "/alphabets/Phonics",
      title: "Phonics",
    },
    {
      image: require("../../../assets/img/alphabetabc.jpg"),
      route: "/alphabets/KnowAlphabets",
      title: "Know your Alphabets",
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
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);
  return (
    <ImageBackground source={Bg} className='flex-1 w-full items-center justify-center'>
      <AlphaCategories data={data} autoPlay={false} pagination={true} />
    </ImageBackground>
  )
}

export default index
