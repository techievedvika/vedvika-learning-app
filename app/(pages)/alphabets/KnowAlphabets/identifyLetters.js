import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    Modal,
  } from "react-native";
  
  import React, { useState, useEffect, useRef } from "react";
  import { StatusBar } from "expo-status-bar";
  import backbt from "../../../../assets/bg1.png";
  import * as Speech from "expo-speech";
  import Datas from "../../../../constants/data";
  import { SafeAreaView } from "react-native-safe-area-context";
  
  const letters = () => {

    const { width, height } = Dimensions.get("window");
    const [count, setCount] = useState(0);
    const [imgCount, setImgCount] = useState(0);
    const [modalVisible, setModalVisible] = React.useState(false);
    const Add = () => {
      setImgCount(0);
      setCount(count + 1);
    };
    const sub = () => {
      setImgCount(0);
      setCount(count - 1);
    };
  
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  
    // fadeAnim will be used as the value for opacity. Initial Value: 0
  
    useEffect(() => {
      setModalVisible(true);
      setTimeout(() => setModalVisible(false), 7000);
      setTimeout(() => setImgCount(imgCount + 1), 3000);
    }, [count]);
  
    const speak = (txt) => {
      modalVisible ? setTimeout(() => Speech.speak(txt), 1000) : "";
      Speech.speak(txt);
      Speech.stop();
    };
    return (
      <>
        <View className="bg-white" style={{ width: width, height: height }}>
          <StatusBar hidden={true} />
          <View className="flex-row my-3 ">
            <View className="flex-1 justify-start">
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="ml-16"
              >
                <Image source={backbt} alt="back button" className="h-10 w-10" />
              </TouchableOpacity>
            </View>
          </View>
  
          <View className="flex-row justify-center items-center">
            {!modalVisible ? (
              <View
                className="flex-1 w-8 mx-2 justify-center items-start"
                style={{ height: height }}
              >
                <View className="flex-row mb-14">
                  {count === 0 ? (
                    ""
                  ) : (
                    <TouchableOpacity activeOpacity={0.5} onPress={sub}>
                      <Image
                        source={require("../../../../assets/VedvikaTechnology/backwardButton.png")}
                        className="h-10 w-10 text-yellow-400"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ) : (
              ""
            )}
  
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              horizontal={true}
              supportedOrientations={["landscape"]}
            >
              <View
                className="flex-1 justify-center items-center"
                style={{ height: height, width: width }}
              >
                <View className="flex-1 justify-center items-center">
                  {Datas[count].map((item, index) => (
                    <View className="flex-row justify-center" key={index}>
                      <View className="flex-row justify-center w-80 ">
                        <Image
                          source={item.imageAlphabets}
                          className="overflow-visible"
                          style={{
                            ...Platform.select({
                              ios: {
                                width: 300,
                                height: 200,
                              },
                              android: {
                                width: 300,
                                height: 200,
                              },
                            }),
                          }}
                        />
                        <Image
                            source={require('../../../../assets/violet-arrow.png')}
                            className="overflow-hidden"
                          style={{
                            ...Platform.select({
                              ios: {
                                width: 200,
                                height: 100,
                              },
                              android: {
                                width: 200,
                                height: 100,
                              },
                            }),
                          }}
                        />
                      </View>
                      <View className="flex-row justify-center items-center">
                        {item.images[imgCount]?.map((itm, i) => (
                          <View
                            key={i}
                            className="flex-row justify-center items-center"
                          >
                            <View className="flex-row justify-center items-center">
                              <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={speak(itm?.speech)}
                              >
                                <Image
                                  source={itm.img}
                                  style={{
                                    ...Platform.select({
                                      ios: {
                                        width: 200,
                                        height: 250,
                                      },
                                      android: {
                                        width: 200,
                                        height: 250,
                                      },
                                    }),
                                  }}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        ))}
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </Modal>
  
            {!modalVisible ? (
              <View className="flex-1 w-full" style={{ height: height }}>
                <View className="flex-1 w-full">
                  {Datas[count].map((item, index) => (
                    <View className="flex-1 w-full" key={index}>
                      <View className="flex-row w-full justify-center">
                        <Image
                          source={item.imageAlphabets}
                          className="overflow-visible"
                          style={{
                            ...Platform.select({
                              ios: {
                                width: 100,
                                height: 80,
                              },
                              android: {
                                width: 100,
                                height: 80,
                              },
                            }),
                          }}
                        />
                      </View>
                      <View className="flex-row py-3 w-full justify-between items-center">
                        <View className="flex-1 justify-center items-center">
                          <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => Speech.speak(item.images[0][0].speech)}
                          >
                            <Image
                              source={item.images[0][0].img}
                              className="overflow-visible"
                              style={{
                                ...Platform.select({
                                  ios: {
                                    width: 200,
                                    height: 240,
                                  },
                                  android: {
                                    width: 200,
                                    height: 240,
                                  },
                                }),
                              }}
                            />
                          </TouchableOpacity>
                        </View>
                        <View className="flex-1 justify-center items-center">
                          <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => Speech.speak(item.images[1][0].speech)}
                          >
                            <Image
                              source={item.images[1][0].img}
                              className="overflow-visible"
                              style={{
                                ...Platform.select({
                                  ios: {
                                    width: 200,
                                    height: 240,
                                  },
                                  android: {
                                    width: 200,
                                    height: 240,
                                  },
                                }),
                              }}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            ) : (
              ""
            )}
            {!modalVisible ? (
              <View
                className="flex-1 w-8 mx-2 justify-center items-end"
                style={{ height: height }}
              >
                <View className="flex-row mb-14">
                  {count === 25 ? (
                    ""
                  ) : (
                    <TouchableOpacity activeOpacity={0.5} onPress={Add}>
                      <Image
                        source={require("../../../../assets/VedvikaTechnology/forwardButton.png")}
                        className="h-10 w-10"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ) : (
              ""
            )}
          </View>
        </View>
      </>
    );
  };
  
  export default letters;
  
  const styles = StyleSheet.create({
    imageContainer: {
      borderRadius: 18,
      overflow: "hidden",
      backgroundColor: "pink",
    },
    image: {
      ...Platform.select({
        ios: {
          width: 288,
        },
        android: {
          width: "200px",
        },
      }),
    },
  });
  