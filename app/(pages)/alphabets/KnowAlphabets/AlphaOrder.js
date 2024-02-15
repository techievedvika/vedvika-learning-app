import {
    Image,
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    View,
    Dimensions,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { Sounds } from "../../../../constants/data";
  import { Audio } from "expo-av";
import { useRouter } from "expo-router";

  const IdentifyAlphabetsOrder = () => {

    const router = useRouter();
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
    
    const[orderedLetters,setOrderedLetters]=useState([]);
    const [items, setItems] = useState([]);
    const[reset,setReset]=useState(false);
    const[letterImg,setLetterImg]=useState([]);
    const [draggedLetters, setDraggedLetters] = useState([]);
    const[currentInd,setCurrentInd]=useState(0);
    const letterArr = [
      {
        img:require("../../../../assets/trainsecond.png"),
        letter:''
      },
      {
        img:require("../../../../assets/trainsecond.png"),
        letter:''
      },
      {
        img:require("../../../../assets/trainsecond.png"),
        letter:''
      },
      {
        img:require("../../../../assets/trainsecond.png"),
        letter:''
      },
      {
        img:require("../../../../assets/trainsecond.png"),
        letter:''
      },
    ];
    const makeLettersArray = ()=>{
      let arr = [];
      for(let i=1;i<=26;i++){
        let obj = {
          id:i,
          text:String.fromCharCode(64 + i),
        };
        arr.push(obj);
      }
      return arr;
    }
    const playSuccess = async()=> {
      try{
        const { sound } = await Audio.Sound.createAsync(Sounds.success);
        await sound.playAsync();
      }catch(err){
        console.log('err playing success',err);
      }  
    }
    const playError = async()=>{
      try{
        const { sound } = await Audio.Sound.createAsync(Sounds.error);
        await sound.playAsync();
      }catch(err){
        console.log('err playing error',err);
      }
    }
   
  
    const handleLetterPress = (letter, ind) => {
      //console.log(currentInd);
      let boxes = [...letterImg];
      if(currentInd<5 && letter===orderedLetters[currentInd].text){
        if(!draggedLetters.includes(letter)){
          let emptyInd = boxes.findIndex((box) => !box.letter);
          if(emptyInd!==-1){
            boxes[emptyInd].letter=letter;
            setLetterImg(boxes);
            setDraggedLetters([...draggedLetters,letter]);
            setCurrentInd(currentInd + 1);
            playSuccess();
          }
        }
      }else{
        console.log('Wrong Order');
        playError();
      }
    };

   
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array.splice(0,5);
    };
    const sortLetters = (arr)=>{
      let newArr =[...arr];
      return newArr.sort((a,b)=>a.id-b.id);
     
    }
    useEffect(()=>{
      let letters = makeLettersArray();
      let arr = shuffleArray(letters);
      setItems(arr);
      let sortedArr = sortLetters(arr);
      //console.log(sortedArr);
      setOrderedLetters(sortedArr);
      setLetterImg(letterArr);
      setCurrentInd(0);
      setDraggedLetters([]);
    },[reset]);
    
    return (
      <View
        className="bg-yellow-200 items-center"
        style={{
          width: windowWidth,
          height: windowHeight,
          flex: 1,
        }}
      >
        {/* header section */}
        <View
          style={{ width: windowWidth - 10 }}
          className="mt-5 ml-10 flex-row z-10 justify-between"
        >
          <Pressable
              onPress={()=>router.back()}
            className="flex-row justify-start items-start z-20"
          >
            <Image
              source={require("../../../../assets/bg1.png")}
              alt="back button"
              className="h-12 w-12 overflow-visible"
            />
          </Pressable>
          <View className="flex-row justify-center items-center w-full absolute ">
            <Text className="text-4xl text-black font-extrabold underline">
              Identify Alphabet Order
            </Text>
          </View>
          <Pressable className="items-end z-20 mr-10">
            <Image
              source={require("../../../../assets/soundon.png")}
              alt="back button"
              className="h-12 w-12 overflow-visible"
            />
          </Pressable>
        </View>
        {/* main content start */}
        <View
          style={{ height: windowHeight - 80, width: windowWidth - 10 }}
          className="items-center justify-center flex-row"
        >
        
          
          <View className="bg-yellow-200 sm:mt-5  sm:-ml-5 md:-ml-12 -ml-12 mt-8 ">
            { currentInd > 4 && (letterImg[4].letter) && (
                  <View className='flex-1  flex-row justify-center shadow-2xl'>
                    <Pressable
                      onPress={()=>setReset(!reset)}
                    >
                      <Image 
                        style={{width:80,height:80}}
                        source={require('../../../../assets/img/refresh-01.png')}
                      />
                    </Pressable>
                  </View>
                  )}
            <View className='flex bottom-10 ms-10 flex-row items-center justify-center'>
         
                { currentInd<5 && items.map((item,ind)=>(
                    <View key={ind}>
                      <View className="m-5 p-2 ">
                        <Pressable
                          onPress={() => handleLetterPress(item.text, ind)}
                        >
                          <Text className="text-7xl font-extrabold  text-indigo-600">{item.text}</Text>
                        </Pressable>
                      </View>
                    </View>
                      
                  
                ))}
            </View>
                  
            <View className='flex bottom-10 ms-10 flex-row items-center justify-center'>
         
                {letterImg.map((a,ind)=>(
                    <View key={ind}> 
                        <View
                          className=" justify-center items-center"
                        >
                          <ImageBackground
                            source={a.img}
                            className="justify-center items-center flex-row w-[110px] h-[90px] md:w-[145px] md:h-[120px] "
                          >   
                            {a.letter && (
                              <Text className="text-5xl  text-violet-900 font-bold  rounded-full py-3 text-justify p-2">{a.letter}</Text>
                            ) }
                          </ImageBackground>
                        </View>
                    </View>
                      
                  
                ))}
            </View>
            {/* <View className='flex bottom-10 ms-10 flex-row items-center justify-center'>
              
            </View> */}
          </View>
        </View>
        
  
        {/* main content end */}
      </View>
    );
  };
  
  export default IdentifyAlphabetsOrder;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    itemsInZoneStyle: {
      width: "100%",
    },
    contentContainerStyle: {
      padding: 20,
      paddingTop: 40,
    },
    itemsContainerStyle: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
    },
    zonesContainerStyle: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    dragItemStyle: {
      borderColor: "#F39200",
      borderWidth: 1,
      width: "47%",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 5,
      backgroundColor: "#F5F5F5",
      padding: 10,
    },
    dragItemTextStyle: {
      color: "#011F3B",
      fontWeight: "700",
      textAlign: "center",
    },
    dragZoneStyle: {
      borderColor: "#F39200",
      borderWidth: 1,
      width: "47%",
      padding: 15,
      minHeight: 130,
      marginVertical: 15,
    },
    dragZoneTextStyle: {
      position: "absolute",
      opacity: 0.2,
      zIndex: 0,
      alignSelf: "center",
      top: "50%",
    },
  });
  