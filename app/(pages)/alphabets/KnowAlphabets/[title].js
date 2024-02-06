import { View, Text, Pressable, Image, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from 'expo-router';
import Draggable from "react-native-draggable";
import { Link,useRoute,useLocalSearchParams } from "expo-router";
import { AlphaImages } from "../../../../constants/data";

const Alphabetsandimages = () => {
  const {title} = useLocalSearchParams();
  const[selAlpha,setSelAlpha]=useState({});
  const[selImages,setselImages] = useState([]);
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
  
  // Modified selectImages function to return an array of objects with img property
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
    let findImg = selAlpha.images.find((a)=>a===img);
    let newImg = {};
    if(findImg){
       newImg = {
        img:img,
        class:'p-2 border-2 border-green-500 rounded-full'
      }
    }else{
      newImg = {
        img:img,
        class:'p-3 border-2 border-red-500 rounded-full'
      }
    }
    images[index]=newImg;
    setselImages(images);
  }
  useEffect(()=>{
    let selected = AlphaImages.data.find((a)=>a.title===title);
    setSelAlpha(selected);
    const images = selectImages(AlphaImages.data,title,5);
    //console.log(images);
    setselImages(images);
  },[title])
  return (
    <ScrollView>

      <View
        className="bg-cyan-100 items-center justify-center "
        style={{ width: windowWidth, height: windowHeight }}
      >
        {/* header section */}
        <View
          style={{ width: windowWidth - 10 }}
          className="mt-5 ms-10 flex-row z-10 justify-between"
        >
          <Link asChild href='/alphabets/KnowAlphabets/CircleImages'>
            <Pressable
              className="flex-row justify-start items-start z-20"
            >
              <Image
                source={require("../../../../assets/bg1.png")}
                alt="back button"
                className="h-12 w-12 overflow-visible"
              />
            </Pressable>
          </Link>
          <View className="flex-row justify-center items-center w-full absolute ">
            
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
          className="flex-1 items-center"
          style={{ width: windowWidth - 20, height: windowHeight }}
        >
          
          <View className="items-center">
            <Image
              source={selAlpha.letter}
              alt="back button"
              className="h-16 w-16 mb-5 bottom-6 md:h-20 md:w-20 overflow-visible"
            />
          </View>
          <View className="sm:mt-2 md:mt-0 flex-1 gap-5 border-1 flex-row flex-wrap mx-8 justify-center items-center">
            {selImages.map((a,ind)=>(
            
              <Pressable
                onPress={()=>handlePress(a.img,ind)}
                key={ind}
                className={'flex justify-center items-center '+ a.class ? `${a.class}` : ''}
              >
                <Image
                  source={a.img}
                  alt="back button"
                  className="h-[80px] w-[80px] top-2  md:h-32 md:w-32 lg:h-[120px] lg:w-[120px]  overflow-visible"
                />
                
              </Pressable>
          
            ))}
            
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Alphabetsandimages;
