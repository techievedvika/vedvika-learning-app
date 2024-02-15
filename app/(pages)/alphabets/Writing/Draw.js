import {  useLocalSearchParams, useRouter } from 'expo-router';
import {
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useRef, useState } from "react";
  import { Dimensions } from "react-native";
  import SignatureScreen from "react-native-signature-canvas";
  import backbt from "../../../../assets/arrow-left.png";
  import forword from "../../../../assets/forward-01.png";
  import backword from "../../../../assets/backward-01.png";
  import Dialog from "react-native-dialog";
  import AwesomeButton, {
    ThemedButton,
  } from "react-native-really-awesome-button";
  
  import axios from 'axios';

const Draw = () => {
    const params = useLocalSearchParams();
    const router = useRouter();
    const{letter,image}=params;
    console.log(letter,image);
    const [visible, setVisible] = useState(false);
    const ref = useRef();
   
    const [result, setResult] = useState();
    const [colorText, setPenColor] = useState("");
  
    const [signature, setSign] = useState();
  
    const handleOK = async (signature) => {
      console.log(signature);
      setSign(signature);
     
    };
    
  
    // Called after end of stroke
    const handleEnd = () => {
      ref.current.readSignature();
      // setTimeout(() => getResult(), 5000);
    };
  
    // #Function to handle Undo
    const handleUndo = () => {
      ref.current.undo();
    };
  
    // #Function to handle Redo
    const handleRedo = () => {
      ref.current.redo();
    };
   
    const imgWidth = 400;
    const imgHeight = 300;
  
    const style = `
    @media screen and (min-device-width: 768px) and (max-device-width: 1024px) {
      .m-signature-pad {
        margin: 0%;
      }
    }
  
    `;
   
      
      const handleResult = async()=>{
        console.log(typeof(signature));
        try{
          let response = await axios.post('http://192.168.1.5:5000/image',{signature,letter});
          console.log(response.data);
        }catch(err){
          console.log(err);
          console.log(err.response.data);
        }
      }
      
    const okHandle = () => {
        setVisible(false);
      };
  return (
    <>
    <StatusBar hidden={true}/>
    <Dialog.Container visible={visible} supportedOrientations={["landscape"]}>
      <Dialog.Title>Result</Dialog.Title>
      <Dialog.Description>
        {result?.text?.trim() === letter
          ? Math.floor(100 - result?.result) + " %"
          : result?.message
          ? result?.message
          : result?.text}
      </Dialog.Description>
      <Dialog.Button label="Try Again" onPress={okHandle} />
    </Dialog.Container>
    <View className="flex-row mt-2 ml-10 items-center ">
      <View className="flex-1 justify-start">
        <Pressable
          onPress={() => router.back()}
          className="flex-row justify-start items-start"
        >
          <Image source={backbt} alt="back button" />
        </Pressable>
      </View>
    </View>
    <View className="flex-row justify-center h-full gap-x-3 mx-5">
      <View className="flex-1 justify-start">
        <View className="flex-1 items-center">
          <TouchableOpacity onPress={handleUndo}>
            <Image
              source={backword}
              alt="back button"
              className="h-10 w-10"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ width: imgWidth, height: imgHeight }}>
        <SignatureScreen
          ref={ref}
          onEnd={handleEnd}
          onOK={handleOK}
          penColor={colorText}
          webStyle={style}
          minWidth={5}
          overlaySrc={
            image
              ? `https://new.advanceexcel.in/vedvika/Vedvika%20Technology/${image}_(A-Z)/${letter}-01(1).png`
              : ""
          }
          backgroundColor="white"
          overlayWidth={"100%"}
          overlayHeight={"100%"}
         
        />
      </View>

      <View className="flex-1 justify-start">
        <View className="flex-1 items-center">
          <TouchableOpacity onPress={handleRedo}>
            <Image source={forword} alt="back button" className="h-10 w-10" />
          </TouchableOpacity>
        </View>
        <View className="flex-1 items-center">
          {/* <TouchableOpacity
            onPress={getResult}
          > */}
          {signature ? (
            <AwesomeButton
              progress
              name="rick"
              type="primary"
              activityColor="green"
              backgroundShadow="red"
              onPress={()=>handleResult()
              }
              className="h-16 w-auto "
            >
              <Image
                source={require("../../../../assets/ok.png")}
                alt="back button"
                className="h-14 w-20 "
              />
            </AwesomeButton>
          ) : (
            ""
          )}

          {/* <Image
              source={require("../../../../assets/ok.png")}
              alt="back button"
              // className="h-14 w-20 flex flex-col justify-center items-center text-white font-bold text-lg"
            /> */}
          {/* </TouchableOpacity> */}
        </View>
      </View>
    </View>
  </>
  )
}

export default Draw;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    row: {
      flexDirection: "row",
      // marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#f2f2f2",
      paddingBottom: 5,
    },
    textSign: {
      color: "deepskyblue",
      fontWeight: "bold",
      paddingVertical: 3,
    },
    text: {
      color: "#fff",
      fontWeight: "900",
    },
    textInput: {
      paddingVertical: 10,
      textAlign: "center",
    },
    setButton: {
      backgroundColor: "deepskyblue",
      textAlign: "center",
      fontWeight: "900",
      color: "#fff",
      marginHorizontal: 10,
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderRadius: 5,
    },
  });


  // const handleResult = async()=>{
  //   console.log(typeof(signature));
  //   try{
  //       const perms = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
  //       if(perms.granted){
  //           const base64 = await FileSystem.readAsStringAsync(
  //               signature.replace("data:image/png;base64,", ""),
  //               { encoding: FileSystem.EncodingType.Base64 }
  //           );
  //           await FileSystem.StorageAccessFramework.createFileAsync(perms.directoryUri,'sign.png',MimeTypeArray)
  //       }
  //   }catch(err){
  //       console.log(err);
  //   }
  //   const path = FileSystem.cacheDirectory + "sign.png";
  //   FileSystem.writeAsStringAsync(
  //     path,
  //     signature.replace("data:image/png;base64,", ""),
  //     { encoding: FileSystem.EncodingType.Base64 }
  //   )
  //     .then(() => FileSystem.getInfoAsync(path))
  //     .then(console.log)
  //     .catch(console.error);
  // }