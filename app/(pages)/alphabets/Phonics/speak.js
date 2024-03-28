import {
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";
import React, { useEffect } from "react";
import { PhonicImage } from "../../../../constants/data"
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import * as ScreenOrientation from 'expo-screen-orientation';

const Speak = () => {

  
  const router = useRouter();
  // voiceRecord screen open toggle
 
  useEffect(() => {
    async function lockScreenOrientation() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
    lockScreenOrientation();
   
  }, []);

  return (
    <>
      <StatusBar hidden={true}/>
       
        <View className="w-full h-full">
          <View className="mt-5 ml-10 relative flex-row z-10 drop-shadow-2xl items-center">
            <Pressable
              onPress={()=>router.back()}
              className="flex-row justify-start items-start z-20"
            >
              <Image
                source={require("../../../../assets/bg1.png")}
                alt="back button"
                className="h-12 w-12"
              />
            </Pressable>
            <View className="flex-row justify-center items-center w-full absolute ">
              <View className="flex-row justify-center items-center w-full absolute mx-auto gap-x-6">
                <View>
                  <Text className="text-5xl text-black font-extrabold">
                    Select Image
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <ScrollView vertical={true} className=" flex-1 w-full">
            {PhonicImage.data.map((items, index) => {
              return (
                <View
                  key={index}
                  className="flex-1 justify-center items-center w-full"
                >
                  <Text className="text-3xl lg:text-7xl font-extrabold mt-3">Letter {items.title}</Text>
                  <View className="flex-row">
                    {items.images.map((itm, i) => {
                      return (
                        <View
                          key={i}
                          className="flex-1 justify-center items-center w-full"
                        >
                          <View className="flex-row my-4">
                            <Link
                              asChild
                              href={{
                                pathname:'/alphabets/Phonics/VoiceRecording',
                                params:{
                                  img:itm?.img ,
                                  imgName:itm?.name
                                }
                              }}
                            
                            >
                              <Pressable
                                className="items-center"
                              >
                                <Image
                                  source={itm?.img}
                                  alt="back button"
                                  className="h-[117px] w-28 lg:h-48 lg:w-44 overflow-visible"
                                />
                                <Text className="text-3xl">{itm.name}</Text>
                              </Pressable>
                            </Link>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      
    </>
  );
};

export default Speak;
