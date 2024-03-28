import { StatusBar,StyleSheet,View,Pressable, ImageBackground,Image } from 'react-native'
import Logo from '../assets/img/vedvika.png';
import {Link} from 'expo-router';
import Bg from "../assets/img/purple_bg.png";
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from 'react';




const Home = () => {
  useEffect(() => {
    async function lockScreenOrientation() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
    lockScreenOrientation();
    
  }, []);

  return (
    <>
      <StatusBar hidden={true}/>
      <ImageBackground source={Bg} resizeMode="cover" className='flex-1 bg-contain bg-purple-600 justify-start gap-10 items-center'>
        <View className='flex-1 items-center justify-center'>
          <Image className='w-60 h-16 my-8 contain' source={Logo} />
        </View>
       <Pressable>
          <Link 
            className='text-white text-lg px-6 py-3 shadow-md leading-tight rounded-full  font-bold bg-[#bf1e2e] hover:bg-orange-700 bottom-12' 
            href="/HomeScreen">
            Get Started
          </Link>
       </Pressable>
       
      </ImageBackground>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
  button:{
    color:'white',
    backgroundColor:'#f1592a'
  }
});

export default Home;
