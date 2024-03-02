import { Sounds } from "./data";
import { Audio } from "expo-av";

export const  playSuccess = async()=> {
    try{
      const { sound } = await Audio.Sound.createAsync(Sounds.success);
      await sound.playAsync();
    }catch(err){
      console.log('err playing success',err);
    }  
  }
  export const  playError = async()=>{
    try{
      const { sound } = await Audio.Sound.createAsync(Sounds.error);
      await sound.playAsync();
    }catch(err){
      console.log('err playing error',err);
    }
  }