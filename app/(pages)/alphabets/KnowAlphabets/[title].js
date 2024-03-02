import { View, Text, Pressable, Image, Dimensions, TouchableOpacity, ScrollView, StyleSheet, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from 'expo-router';
import Draggable from "react-native-draggable";
import { Link,useLocalSearchParams } from "expo-router";
import { AlphaImages } from "../../../../constants/data";
import { Sounds } from "../../../../constants/data";
import { Audio } from "expo-av";


const Alphabetsandimages = () => {
  const {title} = useLocalSearchParams();
  const[selAlpha,setSelAlpha]=useState({});
  const[selImages,setselImages] = useState([]);
  const[correctItems,setCorrectItems]=useState([]);
  const[completed,setCompleted]=useState(false);

  const router = useRouter();
  // screen height and width
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
 

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  
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
  const selectImages = (data, title, count) => {
    const selectedObject = data.find((item) => item.title === title);
    const selectedImages = selectedObject ? selectedObject.images.slice(0, 3) : [];
  
    const remainingImages = data.reduce((acc, item) => {
      if (item.title !== title) {
        acc.push(...item.images);
      }
      return acc;
    }, []);
  
    const randomImages = [];
  
    while (randomImages.length < count - selectedImages.length) {
      const randomIndex = Math.floor(Math.random() * remainingImages.length);
      randomImages.push({ img: remainingImages.splice(randomIndex, 1)[0] });
    }
  
    const allImages = selectedImages.map((img) => ({ img })).concat(randomImages);
    return shuffleArray(allImages);
  };
  const handlePress = (img,index)=>{
    //console.log(img);
    let images = [...selImages];
    let items = [...correctItems];
    
    let findImg = selAlpha.images.find((a)=>a===img);
    let newImg = {};
    if(findImg){
      let findItem = items.find((a)=>a===img);
      if(!findItem){
        items.push(img);
      }
       newImg = {
        img:img,
        class:'p-2 border-2 border-green-500 rounded-full'
      };
      playSuccess();
    }else{
      newImg = {
        img:img,
        class:'p-2 border-2 border-red-500 rounded-full'
      };
      playError();
    }
    images[index]=newImg;
    setselImages(images);
    setCorrectItems(items);
    if(items.length>2){
      setCompleted(true);
    }
    console.log(items);

  }
  useEffect(()=>{
    let selected = AlphaImages.data.find((a)=>a.title===title);
    setSelAlpha(selected);
    const images = selectImages(AlphaImages.data,title,5);
    //console.log(images);
    setselImages(images);
    setCorrectItems([]);
  },[title,completed])
  return (
    <View className='h-full w-full ' style={styles.main}>
    <StatusBar hidden={true}/>
      <ScrollView>
        <View
          className="bg-cyan-100 items-center justify-center "
          style={{ width: windowWidth, height: windowHeight }}
        >
          {/* header section */}
          <View
            style={{ width: windowWidth - 10,marginBottom:25 }}
            className="mt-5 ms-10 flex-row z-10 justify-between  py-4"
          >
          
              <Pressable
                onPress={()=>router.back()}
                className="flex-row  z-20 ms-24"
              >
                <Image
                  source={require("../../../../assets/bg1.png")}
                  alt="back button"
                  className="h-12 w-12 overflow-visible ms-24"
                />
              </Pressable>
          
            <View className="flex-row justify-center items-center  w-full absolute ">
              <Text style={{fontSize:42,fontWeight:'bold'}}>Circle matching images</Text>
            </View>
            <Pressable className="items-end z-20 me-10">
              <Image
                source={require("../../../../assets/soundon.png")}
                alt="back button"
                className="h-12 w-12 overflow-visible"
              />
            </Pressable>
          </View>

          {/* main content */}
          <View
            className="flex-1  "
            style={{ width: windowWidth - 20, height: windowHeight }}
          >
            
            <View className="items-center">
              <Image
                source={selAlpha.letter}
                alt="back button"
                className="h-16 w-16 mb-5 bottom-6 md:h-20 md:w-20 overflow-visible"
              />
            </View>
            {!completed && (
              <View className="sm:mt-2 md:mt-0 flex-1 gap-2 border-1 flex-row flex-wrap mx-8 items-center">
              {selImages.map((a,ind)=>(
              
                <Pressable
                  onPress={()=>handlePress(a.img,ind)}
                  key={ind}
                  className={'flex justify-center items-center '+ a.class ? `${a.class}` : ''}
                >
                  <Image
                    source={a.img}
                    alt="back button"
                    className="h-[90px] w-[90px]   md:h-32 md:w-32 lg:h-[120px] lg:w-[120px]  overflow-visible"
                  />
                  
                </Pressable>
            
              ))}
            </View>
            )}
            {completed && (
              <View className='flex-1  flex-row justify-center shadow-2xl'>
                    <Pressable
                      onPress={()=>setCompleted(!completed)}
                    >
                      <Image 
                        style={{width:80,height:80}}
                        source={require('../../../../assets/img/reset-1.png')}
                      />
                    </Pressable>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Alphabetsandimages;

const styles = StyleSheet.create({
  main:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  container:{
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    marginStart:30,
    gap:10,
    justifyContent:'center',
  },
  img:{
  
  },
  pressable:{

  },
  imgContainer:{
    borderWidth: 2,
    borderColor: 'black',
    flex:1,
    flexDirection:'row',
    
  },
})
