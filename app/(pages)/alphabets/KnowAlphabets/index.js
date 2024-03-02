import { View, Text, Image, Pressable, ScrollView, StatusBar } from "react-native";
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
              <View className="flex-row justify-between items-center w-full">
                <View className="flex-1 items-end">
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
                  {/* <IdentifyLatters /> */}
                </View>
                <View className="flex-1 items-center">
                  <Link asChild href='/alphabets/KnowAlphabets/SmallCaps'>
                    <Pressable
                    
                    >
                      <Image
                        source={require("../../../../assets/matchLatter.png")}
                        alt="back button"
                        className="h-[130px] w-[130px]"
                      />
                    </Pressable>
                  </Link>
                  <Text className="text-xl font-semibold my-2 flex-wrap max-w-[200px]">
                    Match capital and small alphabets
                  </Text>
                  {/* <MatchLatterImage /> */}
                </View>
                <View className="flex-1 items-start">
                  <Link asChild href='/alphabets/KnowAlphabets/CircleImages'>
                    <Pressable
                    >
                      <Image
                        source={require("../../../../assets/circleImages.png")}
                        alt="back button"
                        className="h-[130px] w-[130px]"
                      />
                    </Pressable>
                  </Link>
                  <Text className="text-xl font-semibold my-2">
                    Circle the Images
                  </Text>
                  {/* <CircleTheImages /> */}
                </View>
              </View>
              <View className="flex-row justify-between items-center w-full">
                <View className="flex-1 items-center">
                  <Link asChild href='/alphabets/KnowAlphabets/AlphaOrder'>
                    <Pressable
                      
                    >
                      <Image
                        source={require("../../../../assets/alphabetsOrder.png")}
                        alt="back button"
                        className="h-[130px] w-[130px]"
                      />
                    </Pressable>
                  </Link>
                  <Text className="text-xl font-semibold my-2">
                    Identify Alphabets orders
                  </Text>
                  {/* <IdentifyAlphabetsOrder /> */}
                </View>
                <View className="flex-1 items-start">
                  <Link asChild href='/alphabets/KnowAlphabets/DragLetters'>
                    <Pressable>
                      <Image
                        source={require("../../../../assets/smallAndCapitalLatter.png")}
                        alt="back button"
                        className="h-[130px] w-[130px]"
                      />
                    </Pressable>
                  </Link>
                  <Text className="text-xl font-semibold my-2 flex-wrap max-w-[200px]">
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

export default index;