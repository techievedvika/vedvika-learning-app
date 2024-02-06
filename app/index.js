import { StatusBar,StyleSheet,Text,View,Pressable } from 'react-native'
import { withExpoSnack } from 'nativewind';
import Logo from '../assets/img/vedvika.png';
import {Link} from 'expo-router';
import Bg from "../assets/img/purple_bg.png";
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from 'react';
import {StyledView,StyledText,StyledBG,StyledImage,StyledPressable} from '../components/StyledComponents';



const Home = () => {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <>
      <StatusBar hidden={true}/>
      <StyledBG source={Bg} resizeMode="cover" className='flex-1 bg-contain bg-purple-600 justify-start gap-10 items-center'>
        <StyledView className='flex-2 items-center justify-center'>
          <StyledImage className='w-60 h-16 my-8 contain' source={Logo} />
        </StyledView>
       <Pressable></Pressable>
        <Link className='text-white px-6 py-3 shadow-md leading-tight rounded-full text-lg font-bold bg-[#bf1e2e] hover:bg-orange-700' href="/HomeScreen">
          Get Started
        </Link>
       
      </StyledBG>
    </>
  )
}
Home.navigationOptions = {
  headerShown:false
};
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

export default withExpoSnack(Home);
