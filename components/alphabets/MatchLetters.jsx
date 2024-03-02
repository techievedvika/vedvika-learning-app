
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, ScrollView, ImageBackground, Pressable, Button } from 'react-native';
import Draggable from 'react-native-draggable';
import { Caterpillar } from '../../constants/data';
import { Sounds } from '../../constants/data';
import { Audio } from "expo-av";

const MatchLetters = ({pairs,reset}) => {
    //console.log(pairs);
    
    const[caps,setCaps]=useState([]);
    const[small,setSmall]=useState([]);
    const [letters,setLetters] = useState([]);
    const[currentInd,setCurrentInd]=useState(0);
    const[containers,setContainers]=useState([]);
    //const[reset,setReset]=useState(false);
    
    const handleLetters = (array,reset) => {
        let capLetters = array.map((a)=>a.cap);
        setCaps(capLetters);
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        const smallLetters = array.map((a,ind)=>a.small);
        setSmall(smallLetters);
        
      };
      const setData = ()=>{
        let arr = Caterpillar?.body.map((a)=>{
          let obj = {
            img:a,
            cap:'',
            small:''
          };
          return obj;
        });
        setContainers(arr);
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
      const handleCap = (letter)=>{
          //console.log('Index: ',currentInd);
          console.log('Cap',letter);
          let boxes = [...containers];
          //console.log(boxes);
          let findInd = boxes.findIndex((a)=>a.cap===letter);
          if(findInd>=0){
              console.log('Err');
              playError();
          }else{
            let emptyInd = boxes.findIndex((a) => !a.cap);
            if(emptyInd!==-1){
              if(boxes[emptyInd].small){
                let small = boxes[emptyInd].small;
                let findLetter = letters.find((a)=>a.small===small);
                if(findLetter){
                  console.log(findLetter);
                  if(findLetter.cap===letter){
                    boxes[emptyInd].cap=letter;
                    playSuccess();
                    setCurrentInd(currentInd + 1);
                  }else{
                    console.log('Wrong capital Letter');
                    playError();
                  }
                }
              }else{
                if(currentInd===0){

                  setCurrentInd(currentInd + 1);
                }
                boxes[emptyInd].cap=letter;
                playSuccess();
              }
              setContainers(boxes);
              
              
            }
          }
      }
      const handleSmall = (letter)=>{
        //console.log('Index: ',currentInd);
        console.log('small',letter);
        let boxes = [...containers];
          let findInd = boxes.findIndex((a)=>a.small===letter);
          if(findInd>=0){
              console.log('Err');
              playError();
          }else{
            let emptyInd = boxes.findIndex((a) => !a.small);
            if(emptyInd!==-1){
              if(boxes[emptyInd].cap){
                let capital = boxes[emptyInd].cap;
                let findLetter = letters.find((a)=>a.cap===capital);
                if(findLetter){
                  console.log(findLetter);
                  if(findLetter.small===letter){
                    boxes[emptyInd].small=letter;
                    playSuccess();
                    setCurrentInd(currentInd + 1);
                  }else{
                    console.log('Wrong small Letter');
                    playError()
                  }
                }
              }else{
                
                boxes[emptyInd].small=letter;
                playSuccess();
                if(currentInd===0){

                  setCurrentInd(currentInd + 1);
                }
              }
              setContainers(boxes);
              
              
            }
          }
          //console.log(containers);
      }
    useEffect(() => {
        setData();
        setLetters(pairs);
        handleLetters(pairs);
        setCurrentInd(0);
    }, [ pairs]);
    //console.log(small);
    //console.log(selectedPair);
    console.log(currentInd);
    return (
        <View  style={styles.container}>
       
        {/* Capital Letters */}
       {currentInd<5 && ( <View style={[styles.containerBox,{left:40,zIndex:1,top:20}]}>
          {caps.map((a, ind) => (    
            <View key={ind}>
              <Pressable style={styles.press} onPress={()=>handleCap(a)}>
               <Text style={{color:getColor(),fontSize:65,marginHorizontal:15, fontWeight:'900' }}>{a}</Text>
              </Pressable>
            </View>
                
          ))}
        </View>)}
        {currentInd===5 && (
          <View style={[styles.containerBox,{left:20,zIndex:1,top:50,marginBottom:60}]}>
                    <Pressable
                      onPress={()=>reset()}
                    >
                      <Image 
                        style={{width:80,height:80}}
                        source={require('../../assets/img/reset-1.png')}
                      />
                    </Pressable>
          </View>
        )}
        <View style={[styles.containerBox,{bottom:30,right:30}]} >
          <Image
            source={Caterpillar.head.img}
            style={{height:190,width:200,left:22,bottom:15 }}
          />
          {containers.map((a, index) => (
            <View key={index} 
              style={{
                left:index===1 ? 4 : index===2 ? -3 : index===3 ? -3 :10,justifyContent:'space-between'
                
              }}
              >

              <ImageBackground source={a.img} className='text-center' style={[styles.caterpillarImage,{right:15}]} >
                  <View style={styles.letterContainer}>
                    {a.cap && (
                      <Text style={styles.letter}>{a.cap}</Text>
                    )}
                    {a.small && (
                      <Text style={styles.letter}>{a.small}</Text>
                    )}
                  </View> 
              </ImageBackground>
            </View>
          ))}
        </View>
        {currentInd<5 &&(<View style={[styles.containerBox,{bottom:40}]} >
          {small.map((a,ind)=>(
            <View key={ind}>
              <Pressable onPress={()=>handleSmall(a)}>
               <Text style={{color:getColor(),fontSize:55,fontWeight:'900',marginHorizontal:20}}>{a}</Text>
              </Pressable>
            </View>
          ))}
        </View>)}
       
      </View>
    );
}
const getColor = ()=> {
  const red = Math.floor(Math.random() * 128);
  const green = Math.floor(Math.random() * 128);
  const blue = Math.floor(Math.random() * 128);

 
  const color = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;

  return color;

 
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
     
    },
    caterpillarContainer: {
        gap:0,
        border:'1px solid black',  
    },
    caterpillarImage: {
      width: 120, 
      height: 220, 
      overflow:'visible',
      flex:1
     
    },
    capitalContainer: {
      left:10,
      top:10
    },
    capitalText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    smallText: {
      fontSize: 16,
      backgroundColor: 'lightblue',
      padding: 10,
    },
    capImg:{
        height:40,
        width:40,
       left:5
    },
    capHead:{
      width: 160, 
      height: 210, 
      
    },
    letterImg:{
        height:60,
        width:60
    },
    containerBox:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'center'
    },
    letterContainer:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      border:1,
      //backgroundColor:'green'
    },
    letter:{
      fontSize:45,
      top:90,
      fontWeight:'500',
      textAlign:'justify',
      bottom:20,
      //color:'white'
    },
    alphabet:{
      fontSize:48,
      marginHorizontal:20,
      fontStyle:'bold',
     
    },
    press:{
      
      height:100,
      width:100
    }
  });
export default MatchLetters
