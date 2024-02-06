
import { Link } from "expo-router";
import * as React from "react";
import { Image, Pressable, Text, View } from "react-native";

const index = () => {
 
  // audioPlay screen open
  const [audioPlay, setAudioPlay] = React.useState(false);
  // voiceRecord screen open
  const [voiceRecording, setVoiceRecording] = React.useState(false);

  // audioPlay screen open toggle
  const audioPlayToggleSwitch = () => {
    setAudioPlay((previousState) => !previousState);
  };

  // voiceRecord screen open toggle
  const voiceRecordingToggleSwitch = () => {
    setVoiceRecording((previousState) => !previousState);
  };

  return (
    <>
      <View className=" bg-cyan-100 h-full w-full absolute">
        {audioPlay || voiceRecording ? (
          ""
        ) : (
          <View className="my-5 ml-10 flex-row z-10">
            <Pressable
              onPress={() => navigation.goBack()}
              className="flex-row justify-start items-start z-20"
            >
              {/* <Image
                source={require("../../../../assets/bg1.png")}
                alt="back button"
                className="h-12 w-12"
              /> */}
            </Pressable>
            <View className="flex-row justify-center items-center w-full absolute ">
              <Text className="text-5xl text-black">Phonics</Text>
            </View>
          </View>
        )}

        {/* <AudioRecoder /> */}
        <View className="flex absolute h-full justify-center w-full">
          <View className="flex-row justify-between items-center">
            <View className="flex-1 justify-center items-center">
                <Link href='/alphabets/Phonics/listen' asChild>
                    <Pressable
                        className="items-center gap-y-3"
                    >
                        <Image
                        source={require("../../../../assets/listen-01.png")}
                        alt="back button"
                        className="h-36 w-36 "
                        />
                        <Text className="text-3xl font-semibold">Listen</Text>
                    </Pressable>
                </Link>
            </View>
            <View className="flex-1 justify-center items-center">
              <Link href='/alphabets/Phonics/speak' asChild>
                <Pressable
                    className="items-center gap-y-3"
                    
                >
                    <Image
                    source={require("../../../../assets/speak-01.png")}
                    alt="back button"
                    className="h-36 w-36"
                    />
                    <Text className="text-3xl font-semibold">Speak</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default index;