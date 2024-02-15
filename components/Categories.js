import React,{useRef,useState,useEffect} from 'react'
import { Text, View,StyleSheet,TouchableOpacity, ImageBackground,useWindowDimensions,Image, Pressable } from 'react-native'
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
    useAnimatedRef,
  } from "react-native-reanimated";
  import Pagination from "./Pagination";
import { Link } from 'expo-router';

const Categories = ({data,autoPlay,pagination}) => {
    const scrollViewRef = useAnimatedRef(null);
    const interval = useRef();
    const [isAutoPlay, setIsAutoPlay] = useState(autoPlay);
    const [newData] = useState([
      { key: "spacer-left" },
      ...data,
      { key: "spacer-right" },
    ]);
    const { width, height } = useWindowDimensions();
    const SIZE = width * 0.5;
    const SPACER = (width - SIZE) / 2;
    const x = useSharedValue(0);
    const offSet = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler({
      onScroll: (event) => {
        x.value = event.contentOffset.x;
      },
    });
    useEffect(() => {
      if (isAutoPlay === true) {
        let _offSet = offSet.value;
        interval.current = setInterval(() => {
          if (_offSet >= Math.floor(SIZE * (data.length - 1) - 10)) {
            _offSet = 0;
          } else {
            _offSet = Math.floor(_offSet + SIZE);
          }
          scrollViewRef.current.scrollTo({ x: _offSet, y: 0 });
        }, 2000);
      } else {
        clearInterval(interval.current);
      }
    }, [SIZE, SPACER, isAutoPlay, data.length, offSet.value, scrollViewRef]);
  
  return (
    <View className="flex-1">
    {/* <Pressable
          onPress={()=>router.back()}
          className="flex-row justify-start items-start z-20"
        >
          <Image
            source={require('../assets/bg1.png')}
            alt="back button"
            style={{height:80,width:80}}
          />
    </Pressable> */}
    <Animated.ScrollView
      ref={scrollViewRef}
      onScroll={onScroll}
      onScrollBeginDrag={() => {
        setIsAutoPlay(false);
      }}
      onMomentumScrollEnd={(e) => {
        offSet.value = e.nativeEvent.contentOffset.x;
        setIsAutoPlay(autoPlay);
      }}
      scrollEventThrottle={16}
      decelerationRate="fast"
      snapToInterval={SIZE}
      horizontal
      bounces={false}
      showsHorizontalScrollIndicator={false}
    >
       
      {newData.map((item, index) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const style = useAnimatedStyle(() => {
          // console.log((index - 2))
          const scale = interpolate(
            x.value,
            [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
            [0.7, 1.2, 0.7]
          );
          // console.log(scale)
          return {
            transform: [{ scale }],
          };
        });
        if (!item.image) {
          return <View style={{ width: SPACER }} key={index} />;
        }
        return (
          <View
            style={{
              width: SIZE,
              height: height,
              // flex: 1,
              // alignItems: "center",
              justifyContent: "center",
            }}
            key={index}
            className=""
          >
            <Animated.View
              style={[styles.imageContainer, style]}
              className=""
            >
            <Link href={item?.route} asChild>
                <TouchableOpacity                  
                    className=""
                >
                    <Image
                    source={item.image}
                    style={styles.image}
                    // resizeMode="stretch"
                    />
                </TouchableOpacity>
            </Link>
            </Animated.View>
          </View>
        );
      })}
    </Animated.ScrollView>
    {pagination && <Pagination data={data} x={x} size={SIZE} />}
  </View>
  )
}

export default Categories;

const styles = StyleSheet.create({
    imageContainer: {
      borderRadius: 18,
      overflow: "hidden",
      backgroundColor: "pink",
    },
    image: {
      width: "100%",
      height: undefined,
      aspectRatio: 16 / 9,
    },
  });
  
