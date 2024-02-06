import { View,StyleSheet, Text, Image, ScrollView, Pressable } from "react-native";
import React from "react";
import { AlphaImages } from "../../constants/data";
import { Link } from "expo-router";

const Selectalphabets = () => {
  // navigation route
 
  //console.log(MasterData.data[0].Alphabet[2].AllImages[0]);

  return (
    <View style={styles.main} >
      <ScrollView>
        <View style={styles.container} >
          {AlphaImages.data.map((item, index) => {
            return (
              <View style={styles.imgContainer} key={index} className="border-2 p-4 rounded-full">
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
    height:60,
    width:60,
    
  },
  imgContainer:{
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 50,
    padding: 20,
    margin:4
  },
})
