import { View, Text, Pressable, Image, Dimensions } from "react-native";
import React, { useState } from "react";
import Draggable from "react-native-draggable";
import SelectAlphabets from "../../../../components/alphabets/Selectalphabets";

const CircleTheImages = () => {

  return (
    <View className="bg-white w-full h-full">
      <View className="mt-5 ml-10 flex-row z-10">
        <Pressable
         
          className="flex-row justify-start items-start z-20"
        >
          <Image
            source={require("../../../../assets/bg1.png")}
            alt="back button"
            className="h-12 w-12 overflow-visible"
          />
        </Pressable>
        <View className="flex-row justify-center items-center w-full absolute ">
          <Text className="text-4xl text-black font-extrabold">
            Select the Alphabet
          </Text>
        </View>
      </View>
      {/* main content */}
      <View className="flex-1 justify-center items-center ">
        <SelectAlphabets />
      </View>
    </View>
  );
};

export default CircleTheImages;