
import {  ImageBackground, Pressable, StatusBar, View } from 'react-native';
import Categories from '../../components/Categories';
import Bg from '../../assets/img/purple_bg.png';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
  const router = useRouter();
  const data = [
    {
      image: require("../../assets/img/learningAlphabets.jpg"),
      route: "/alphabets",
    },
    {
      image: require("../../assets/img/colourSection.jpg"),
      route: "/colors",
    },
    {
      image: require("../../assets/img/learningNumber.jpg"),
      route: "/numbers",
    },
  ];
  useEffect(() => {
    async function lockScreenOrientation() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
    lockScreenOrientation();
    
  }, []);
  return (
    <>
       <StatusBar hidden={true} />
      <ImageBackground source={Bg} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {/* <View className="my-5 ml-10 flex-row z-10">
          <Pressable
            onPress={()=>router.back()}
            className="flex-row justify-start items-start z-20"
          >
            <Image
              source={require("../../assets/bg1.png")}
              alt="back button"
              className="h-12 w-12"
            />
          </Pressable>
          
        </View> */}
        <Categories data={data} autoPlay={false} pagination={true} />
      </ImageBackground>
    </>
  )
}

export default HomeScreen
