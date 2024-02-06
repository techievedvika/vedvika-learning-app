import * as React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  ImageBackground,
  useWindowDimensions,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PhonicImage } from "../../../../constants/data";
import { Audio } from "expo-av";

const listen = () => {
  // screen size
  const { width, height } = useWindowDimensions();
  // navigation route
  const navigation = useNavigation();
  // modal display
  const [modalVisible, setModalVisible] = React.useState(false);
  // useState storage
  const [imgUrl, setImgUrl] = React.useState();
  const [speakType, setSpeakType] = React.useState();
  const [switchValue, setSwitchValue] = React.useState(false);
 

  // model image showing and speak
  const speak = async (txt, img, name) => {
    const random = await parseInt(Math.floor(Math.random() * img.length));
    setImgUrl(img);
    setSpeakType(img[random].title);
    setModalVisible(true);
  };

  // alphabets switch capital letter and small letter
  const toggleSwitch = () => {
    setSwitchValue((previousState) => !previousState);
  };

  const [sound, setSound] = React.useState();

  async function playSound(sund) {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(sund);
    setSound(sound);
    console.log("Playing Sound");
    await sound.playAsync();
  }

  return (
    <>
      <StatusBar hidden={true} />
      <ImageBackground
        // source={backGroundImage}
        resizeMode="cover"
        style={{ height: height, width: width }}
        className="overflow-visible flex-1 justify-center bg-cyan-100"
      >
        {modalVisible ? (
          <View className="z-20 absolute flex-1 justify-center items-center w-full">
            <View style={styles.modalView} className="w-2/3">
              <View className="w-full items-end">
                <Pressable onPress={() => setModalVisible(false)}>
                  <Image
                    source={require("../../../../assets/close-btn.png")}
                    className="h-12 w-12 overflow-visible"
                  />
                </Pressable>
              </View>
              <View className="flex-1 justify-center w-full">
                <View className="flex-row justify-between my-2 w-full">
                  <View className="flex-1 justify-center items-center">
                    <Pressable
                      // onPress={() => Speech.speak(imgUrl[0].title)}
                      onPress={() => playSound(imgUrl[0].title)}
                      className="mb-2 flex-1 justify-center items-center"
                    >
                      <Image
                        source={imgUrl[0]?.img}
                        className={
                          Platform.OS == "ios"
                            ? "h-24 w-24 overflow-visible"
                            : "h-[117px] w-28 lg:h-48 lg:w-44 overflow-visible"
                        }
                      />
                    </Pressable>
                    <Text
                      className={
                        switchValue ? "lowercase text-xl" : "uppercase text-xl"
                      }
                    >
                      {imgUrl[0]?.name}
                    </Text>
                  </View>
                  <View className="flex-1 justify-center items-center">
                    <Pressable
                      // onPress={() => Speech.speak(imgUrl[1].title)}
                      onPress={() => playSound(imgUrl[1].title)}
                      className="mb-2 flex-1 justify-center items-center"
                    >
                      <Image
                        source={imgUrl[1]?.img}
                        className={
                          Platform.OS == "ios"
                            ? "h-24 w-24 overflow-visible"
                            : "h-[117px] w-28 lg:h-48 lg:w-44 overflow-visible"
                        }
                      />
                    </Pressable>
                    <Text
                      className={
                        switchValue ? "lowercase text-xl" : "uppercase text-xl"
                      }
                    >
                      {imgUrl[1]?.name}
                    </Text>
                  </View>
                </View>
                <View className="flex-row justify-between my-2 w-full">
                  <View className="flex-1 justify-center items-center">
                    <Pressable
                      // onPress={() => Speech.speak(imgUrl[2].title)}
                      onPress={() => playSound(imgUrl[2].title)}
                      className="mb-2 flex-1 justify-center items-center"
                    >
                      <Image
                        source={imgUrl[2]?.img}
                        className={
                          Platform.OS == "ios"
                            ? "h-24 w-24 overflow-visible"
                            : "h-[117px] w-28 lg:h-48 lg:w-44 overflow-visible"
                        }
                      />
                    </Pressable>
                    <Text
                      className={
                        switchValue ? "lowercase text-xl" : "uppercase text-xl"
                      }
                    >
                      {imgUrl[2]?.name}
                    </Text>
                  </View>
                  <View className="flex-1 justify-center items-center">
                    <Pressable
                      // onPress={() => Speech.speak(imgUrl[3].title)}
                      onPress={() => playSound(imgUrl[3].title)}
                      className="mb-2 items-center"
                    >
                      <Image
                        source={imgUrl[3]?.img}
                        className={
                          Platform.OS == "ios"
                            ? "h-24 w-24 overflow-visible"
                            : "h-[117px] w-28 lg:h-48 lg:w-44 overflow-visible"
                        }
                      />
                    </Pressable>
                    <Text
                      className={
                        switchValue ? "lowercase text-xl" : "uppercase text-xl"
                      }
                    >
                      {imgUrl[3]?.name}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ) : (
          ""
        )}

        <View className="my-5 ml-10 relative flex-row">
          <Pressable
            onPress={() => navigation.goBack()}
            className="flex-row justify-start items-start"
          >
            <Image
              source={require("../../../../assets/bg1.png")}
              alt="back button"
              className="h-12 w-12"
            />
          </Pressable>
          <View className="flex-row w-full  ">
            <View className="flex-row justify-between items-center w-full absolute">
              <View className="flex-1 justify-center w-full items-center">
                <Text className="text-5xl text-black font-extrabold">
                  Audio Play
                </Text>
              </View>
              <View className="flex-1 w-full">
                <View className="flex-row gap-x-10 justify-end items-center mr-16">
                  <Text className="text-black text-xl">
                    {!switchValue
                      ? "Switch to small alphabet"
                      : "Switch to capital alphabet"}
                  </Text>

                  <Switch
                    onValueChange={toggleSwitch}
                    value={switchValue}
                    style={
                      Platform.OS == "ios"
                        ? { transform: [{ scaleX: 1.6 }, { scaleY: 1.6 }] }
                        : { transform: [{ scaleX: 2.3 }, { scaleY: 2.3 }] }
                    }
                  />
                </View>
              </View>
            </View>
          </View>
        </View>

        <ScrollView
          vertical
          bounces={false}
          showsHorizontalScrollIndicator={false}
          className="mx-5"
          // style={{overflow: 'visible'}}
        >
          <View className="flex-row flex-wrap justify-center">
            {PhonicImage.data?.map((item, index) => {
              return (
                <View
                  className="p-3 flex items-center justify-center"
                  key={index}
                >
                  <TouchableOpacity
                    onPress={() => speak(item?.title, item?.images, item?.name)}
                    className=" border-2 border-black p-3 rounded-xl"
                  >
                    {/* <WritingDraw /> */}
                    <Image
                      source={!switchValue ? item?.image : item?.smallAlphabet}
                      className="h-[110px] w-[100px] overflow-visible"
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default listen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    // margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    // padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // overflow: 'visible'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

