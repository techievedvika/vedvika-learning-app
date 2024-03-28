import { View, Text, Image, Pressable, ScrollView, StatusBar, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { Link, useRouter } from "expo-router";
import * as ScreenOrientation from 'expo-screen-orientation';


const index = () => {
  // navigation route
  const router = useRouter();

  useEffect(() => {
    async function lockScreenOrientation() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
    lockScreenOrientation();
  }, []);

  return (
    <>
      <StatusBar hidden={true} />
      <View className="flex-1 bg-cyan-100">
        <View className="my-5 ml-10 flex-row ">
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
            <Text className="text-4xl py-4 pb-6 text-black font-extrabold">
              Play And Learn
            </Text>
          </View>
        </View>
        <ScrollView>
          <View className="flex-1 justify-center items-center">
            <View className="flex-1 items-center justify-center w-full">
              <View style={styles.container2} >
                {/* <View className="flex-1 items-end">
                  <Link asChild href='/alphabets/KnowAlphabets/identifyLetters'>
                    <Pressable
                    >
                      <Image
                        source={require("../../../../assets/identifyLetter.png")}
                        alt="back button"
                        className="h-[130px] w-[130px]"
                      />
                    </Pressable>
                  </Link>
                  <Text className="text-xl font-semibold my-2">
                    Identify Alphabets
                  </Text>
                </View> */}
                <View className="w-40 ">
                  <Link asChild href='/alphabets/KnowAlphabets/SmallCaps'>
                    <Pressable
                    
                    >
                      <Image
                        source={require("../../../../assets/matchLatter.png")}
                        alt="back button"
                        className="h-[80px] w-[80px]"
                      />
                    </Pressable>
                  </Link>
                  <Text className="text-lg font-semibold my-2 flex-wrap max-w-[200px]">
                    Match alphabets
                  </Text>
                  
                </View>
                <View className="w-40 ">
                  <Link asChild href='/alphabets/KnowAlphabets/CircleImages'>
                    <Pressable
                    >
                      <Image
                        source={require("../../../../assets/circleImages.png")}
                        alt="back button"
                        className="h-[80px] w-[80px]"
                      />
                    </Pressable>
                  </Link>
                  <Text className="text-lg font-semibold my-2">
                    Circle the Images
                  </Text>
                  {/* <CircleTheImages /> */}
                </View>
                  <View className=" w-40 ">
                    <Link asChild href='/alphabets/KnowAlphabets/AlphaOrder'>
                      <Pressable
                        
                      >
                        <Image
                          source={require("../../../../assets/alphabetsOrder.png")}
                          alt="back button"
                          className="h-[80px] w-[80px]"
                        />
                      </Pressable>
                    </Link>
                    <Text className="text-lg font-semibold my-2 max-w-100">
                      Identify Alphabets order
                    </Text>
                    {/* <IdentifyAlphabetsOrder /> */}
                  </View>
                  <View className="w-40 ">
                    <Link asChild href='/alphabets/KnowAlphabets/DragLetters'>
                      <Pressable>
                        <Image
                          source={require("../../../../assets/smallAndCapitalLatter.png")}
                          alt="back button"
                          className="h-[100px] w-[100px]"
                        />
                      </Pressable>
                    </Link>
                    <Text className="text-lg font-semibold max-w-100 my-2 flex-wrap max-w-[200px]">
                      Identify small and capital Alphabets
                    </Text>
                    {/* <ColorSmallCapitalLatters /> */}
                  </View>
              </View>

            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container2:{
    display:'flex',
    flexWrap:'wrap',
    flexDirection:'row',

    paddingHorizontal:30,
    justifyContent:'center',
    gap:10,
    alignItems:'center',
    paddingVertical:30
  }
})

export default index;