import { View,StyleSheet, Text, Image, ScrollView, Pressable } from "react-native";
import React from "react";
import { AlphaImages } from "../../constants/data";
import { Link, useRouter } from "expo-router";

const Selectalphabets = () => {
  // navigation route
 
  //console.log(MasterData.data[0].Alphabet[2].AllImages[0]);

  return (
    <View style={styles.main} >
      <ScrollView>
        <View style={styles.container} >
          {AlphaImages.data.map((item, index) => {
            return (
              <View 
                style={styles.imgContainer} key={index} 
                className=" rounded-full">
                <Link 
                asChild
                href={{
                  pathname:'/alphabets/KnowAlphabets/[title]',
                  params:{
                      title: item.title, 
                  }
                }}
                >
                  <Pressable 
                  // className='ms-4' 
                  
                  >
                    <Image style={styles.img} source={item.letter} className="w-16 h-16" />
                  </Pressable>
                </Link>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Selectalphabets;
const styles = StyleSheet.create({
  main:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    marginTop:10
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
    height:60,
    width:60,
    margin:20
    
  },
  imgContainer:{
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 100,
    margin:4,
    display:'flex',
    marginLeft:10
  },
})
