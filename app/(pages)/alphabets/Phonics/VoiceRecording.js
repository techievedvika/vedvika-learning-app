import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Button, Text, Pressable, Image } from "react-native";
import { Audio } from "expo-av";
import RecordingLevelLayout from "./speak";
import * as ScreenOrientation from 'expo-screen-orientation';

export default function AudioRecoder({ img, imgName }) {
  // navigation route

  // Refs for the audio
  const AudioRecorder = useRef(new Audio.Recording());
  const AudioPlayer = useRef(new Audio.Sound());

  // States for UI
  const [RecordedURI, SetRecordedURI] = useState();
  const [AudioPermission, SetAudioPermission] = useState(false);
  const [IsRecording, SetIsRecording] = useState(false);
  const [IsPLaying, SetIsPLaying] = useState(false);
  const [recordingImages, setRecordingImages] = useState(false);

  // voiceRecord screen open toggle
  const voiceRecordingToggleSwitch = () => {
    setRecordingImages((previousState) => !previousState);
  };

  // Initial Load to get the audio permission
  useEffect(() => {
    async function lockScreenOrientation() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
    lockScreenOrientation();
    
    GetPermission();
  }, []);

  // Function to get the audio permission
  const GetPermission = async () => {
    const getAudioPerm = await Audio.requestPermissionsAsync();
    SetAudioPermission(getAudioPerm.granted);
  };

  // Function to start recording
  const StartRecording = async () => {
    try {
      // Check if user has given the permission to record
      if (AudioPermission === true) {
        try {
          // Prepare the Audio Recorder
          await AudioRecorder.current.prepareToRecordAsync(
            (Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY = {
              isMeteringEnabled: true,
              android: {
                extension: ".m4a",
                // outputFormat: Android_Output_Format.MPEG_4,
                // audioEncoder: AndroidAudioEncoder.AAC,
                sampleRate: 44100,
                numberOfChannels: 2,
                bitRate: 128000,
              },
              ios: {
                extension: ".m4a",
                // outputFormat: IOSOutputFormat.MPEG4AAC,
                // audioQuality: IOSAudioQuality.MAX,
                sampleRate: 44100,
                numberOfChannels: 2,
                bitRate: 128000,
                linearPCMBitDepth: 16,
                linearPCMIsBigEndian: false,
                linearPCMIsFloat: false,
              },
            })
          );

          // Start recording
          await AudioRecorder.current.startAsync();
          SetIsRecording(true);
        } catch (error) {
          console.log(error);
        }
      } else {
        // If user has not given the permission to record, then ask for permission
        GetPermission();
      }
    } catch (error) {}
  };

  // Function to stop recording
  const StopRecording = async () => {
    try {
      // Stop recording
      await AudioRecorder.current.stopAndUnloadAsync();

      // Get the recorded URI here
      const result = AudioRecorder.current.getURI();
      if (result) SetRecordedURI(result);

      // Reset the Audio Recorder
      AudioRecorder.current = new Audio.Recording();
      SetIsRecording(false);
    } catch (error) {}
  };

  // Function to play the recorded audio
  const PlayRecordedAudio = async () => {
    try {
      // Load the Recorded URI
      await AudioPlayer.current.loadAsync({ uri: RecordedURI }, {}, true);

      // Get Player Status
      const playerStatus = await AudioPlayer.current.getStatusAsync();

      // Play if song is loaded successfully
      if (playerStatus.isLoaded) {
        if (playerStatus.isPlaying === false) {
          AudioPlayer.current.playAsync();
          SetIsPLaying(true);
        }
      }
    } catch (error) {}
  };

  // Function to stop the playing audio
  const StopPlaying = async () => {
    try {
      //Get Player Status
      const playerStatus = await AudioPlayer.current.getStatusAsync();

      // If song is playing then stop it
      if (playerStatus.isLoaded === true)
        await AudioPlayer.current.unloadAsync();

      SetIsPLaying(false);
    } catch (error) {}
  };

  return (
    <View className='flex-1'>
      {recordingImages ? (
        <RecordingLevelLayout />
      ) : (
        <View className="flex-1 w-full h-full">
          <View className="my-5 ml-10 flex-row z-10">
            <Pressable
              onPress={voiceRecordingToggleSwitch}
              className="flex-row justify-start items-start z-20"
            >
              <Image
                source={require("../../../../assets/bg1.png")}
                alt="back button"
                className="h-12 w-12"
              />
            </Pressable>
            <View className="flex-row justify-center items-center w-full absolute">
              <View className="flex-row justify-center items-center w-full mx-auto gap-x-6">
                <View>
                  <Text className="text-5xl text-black font-extrabold">
                    Voice Record
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View className="flex-row justify-between items-center w-full absolute h-full">
            <View className="flex-1 justify-center items-center w-full">
              <Image
                source={img}
                alt="back button"
                className="h-52 w-52 lg:h-72 lg:w-72 overflow-visible"
              />
              <Text className="capitalize font-extrabold text-3xl">
                {imgName}
              </Text>
            </View>

            <View className="flex-1 justify-center items-center w-full">
              {RecordedURI ? (
                <View className="flex-row  w-full h-full justify-end gap-14 mr-5 z-10">
                  <Pressable
                    onPress={() => SetRecordedURI("")}
                    className="z-20"
                  >
                    <Image
                      source={require("../../../../assets/RefreshButton-01.png")}
                      alt="back button"
                      className="h-10 w-10"
                    />
                  </Pressable>
                </View>
              ) : (
                ""
              )}

              {RecordedURI ? (
                <View className="flex-1 justify-center w-full items-center absolute">
                  {/* Play section */}
                  {RecordedURI ? (
                    <View className="z-10">
                      {IsPLaying ? (
                        <Image
                          source={require("../../../../assets/GifAnimation/audio-wave_2.gif")}
                          alt="back button"
                          className="h-24 w-24"
                        />
                      ) : (
                        <Image
                          source={require("../../../../assets/GifAnimation/music.gif")}
                          alt="back button"
                          className="h-24 w-24"
                        />
                      )}

                      <Button
                        title={IsPLaying ? "Stop Sound" : "Play Sound"}
                        color={IsPLaying ? "red" : "orange"}
                        onPress={IsPLaying ? StopPlaying : PlayRecordedAudio}
                        className="z-20"
                      />
                    </View>
                  ) : (
                    ""
                  )}
                </View>
              ) : (
                <View className="flex-1 justify-center w-full items-center absolute">
                  {/* recording section */}
                  <View className="z-10">
                    {IsRecording ? (
                      <Image
                        source={require("../../../../assets/GifAnimation/audio-wave.gif")}
                        alt="back button"
                        className="h-24 w-24 rounded"
                      />
                    ) : (
                      <Image
                        source={require("../../../../assets/GifAnimation/singerMic.gif")}
                        alt="back button"
                        className="h-40 w-40 rounded-xl"
                      />
                    )}

                    <Button
                      title={IsRecording ? "Stop sound" : "Make a sound"}
                      color={IsRecording ? "red" : "green"}
                      onPress={IsRecording ? StopRecording : StartRecording}
                      className="z-20"
                    />
                  </View>
                </View>
              )}

              <Text>{RecordedURI}</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
