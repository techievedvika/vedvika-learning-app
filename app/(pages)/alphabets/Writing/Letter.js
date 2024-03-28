import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import {
    View,
    Text,
    ImageBackground,
    useWindowDimensions,
    ScrollView,
    Image,
    TouchableOpacity,
    Pressable,
    StatusBar,
  } from "react-native";
  import React from "react";
  import backgroundImage from "../../../../assets/img/purple_bg.png";
  import backbt from "../../../../assets/backward-01.png";
  

const Letter = () => {
   const params = useLocalSearchParams();
   const router = useRouter();
   const{letter}=params;
   //console.log(letter);
   const data = [
    {
      A: {
        twentyFive: {
          img: require(`../../../../assets/VedvikaTechnology/100_(A-Z)/A-01.png`),
          title: letter,
        },
        fifty: {
          img: require(`../../../../assets/VedvikaTechnology/75_(A-Z)/A-01.png`),
          title: letter,
        },
        seventyFive: {
          img: require(`../../../../assets/VedvikaTechnology/50_(a-z)/A-01(1).png`),
          title: letter,
        },
        hundred: {
          img: require(`../../../../assets/VedvikaTechnology/25_(A-Z)/A-01.png`),
          title: letter,
        },
      },
    },
  ];

  const { width, height } = useWindowDimensions();
     //console.log(data[0]?.A.twentyFive.title);
  return (
    <>
        <StatusBar hidden={true}/>
        <ImageBackground
        source={backgroundImage}
        style={{ height: height, width: width }}
        resizeMode="cover"
        className="overflow-visible flex-1"
        >
        <View className="mt-5 ms-10">
            <Pressable onPress={() => router.back()}>
            <Image source={backbt} alt="back button" 
            className="h-10 w-10" />
            </Pressable>
        </View>

        <View className="flex-1 mx-5">
            <ScrollView
            horizontal
            bounces={false}
            showsHorizontalScrollIndicator={false}
            >
            {/* {data?.map((item, index) => { */}
            {/* return ( */}
            <View
                className="flex-row justify-center items-center gap-5"
                // key={index}
            >
                <Link 
                    asChild
                    href={{
                        pathname:'/alphabets/Writing/DrawLetter',
                        params:{
                            letter:letter,
                            image: "100",
                        }
                        }}
                >
                    <TouchableOpacity
                    >
                    {/* <WritingDraw /> */}
                    <Image
                        // source={data[0].A.twentyFive.img}
                        source={{
                        uri: `https://new.advanceexcel.in/vedvika/Vedvika%20Technology/100_(A-Z)/${letter}-01(1).png`,
                        }}
                        className="h-64 w-56 border-1 rounded-lg shadow-md bg-white overflow-hidden"
                    />
                    </TouchableOpacity>
                </Link>
                <Link
                    asChild
                        href={{
                        pathname:'/alphabets/Writing/DrawLetter',
                        params:{
                            letter:letter,
                            image: "75",
                        }
                        }}
                >
                    <TouchableOpacity>
                    <Image
                        // source={data[0].A.fifty.img}
                        source={{
                        uri: `https://new.advanceexcel.in/vedvika/Vedvika%20Technology/75_(A-Z)/${letter}-01(1).png`,
                        }}
                        className="h-64 w-56 border-1 rounded-lg shadow-md bg-white"
                    />
                    </TouchableOpacity>
                </Link>
                <Link
                    asChild
                        href={{
                        pathname:'/alphabets/Writing/DrawLetter',
                        params:{
                            letter: letter,
                            image: "50",
                        }
                        }}
                >
                    <TouchableOpacity
                    >
                    <Image
                        // source={data[0].A.seventyFive.img}
                        source={{
                        uri: `https://new.advanceexcel.in/vedvika/Vedvika%20Technology/50_(A-Z)/${letter}-01(1).png`,
                        }}
                        className="h-64 w-56 border-1 rounded-lg shadow-md bg-white"
                    />
                    </TouchableOpacity>
                </Link>
                <Link
                    asChild
                        href={{
                        pathname:'/alphabets/Writing/DrawLetter',
                        params:{
                            letter: letter,
                            image: "25",
                        }
                        }}
                >
                    <TouchableOpacity
                    >
                    <Image
                        // source={data[0].A.hundred.img}
                        source={{
                        uri: `https://new.advanceexcel.in/vedvika/Vedvika%20Technology/25_(A-Z)/${letter}-01(1).png`,
                        }}
                        className="h-64 w-56 border-1 rounded-lg shadow-md bg-white"
                    />
                    </TouchableOpacity>
                </Link>
                <Link
                asChild
                        href={{
                        pathname:'/alphabets/Writing/DrawLetter',
                        params:{
                            letter: letter,
                            image: "",
                        }
                        }}
                >
                    <TouchableOpacity
                
                    >
                    <Image
                        // source={require("../../../../../assets/VedvikaTechnology/Alphabet(png)/A(1).png")}
                        source={{
                        uri: `https://new.advanceexcel.in/vedvika/Vedvika%20Technology/Alphabet(png)/${letter}(1).png`,
                        }}
                        className="h-64 w-56 border-1 rounded-lg shadow-md"
                    />
                    </TouchableOpacity>
                </Link>
            </View>
            {/* );
            })} */}
            </ScrollView>
        </View>
        </ImageBackground>
    </>
  );
}


export default Letter
