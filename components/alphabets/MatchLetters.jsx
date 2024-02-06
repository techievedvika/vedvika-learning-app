
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, ScrollView, ImageBackground } from 'react-native';
import Draggable from 'react-native-draggable';
import { Caterpillar } from '../../constants/data';

const MatchLetters = ({pairs}) => {
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [selectedPair, setSelectedPair] = useState(null);
    const[caps,setCaps]=useState([]);
    const[small,setSmall]=useState([]);
    const [letters,setLetters] = useState([]);

    const handleDragStart = (pair) => {
      setSelectedPair(pair);
    };
    const handleLetters = (array) => {
        let capLetters = array.map((a)=>a.image);
        setCaps(capLetters);
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        const smallLetters = array.map((a,ind)=>{
            let obj = {
                cInd:ind,
                img:a.smallAlphabet,
                position:{
                    x:(50+(ind*2+1)),
                    y:50
                }
            };
            return obj;
        });
        setSmall(smallLetters);
        
      };
      const handleDragRelease = (event, index,capInd) => {
        let capital = caps[capInd];
        let smol = small[index].img;
        console.log(capital,smol);
        let findMatch = letters.find((a)=>a.image===capital && a.smallAlphabet===smol);
        if(findMatch){
            //console.log('matched');
        }else{
            //console.log('not matching');
        }
        setSelectedPair(null);
      };
  
    useEffect(() => {
        setLetters(pairs);
        handleLetters(pairs);
      if (matchedPairs.length === pairs.length) {
        // All pairs matched, you can handle the game completion logic here
        //console.log('Game completed!');
      }
    }, [ pairs]);
    //console.log(small);
    //console.log(caps);
    return (
        <View className='z-10' style={styles.container}>
        {/* Caterpillar Images */}
        {Caterpillar.body.map((caterpillarImage, index) => (
          <View key={index} className=''>
            <ImageBackground source={caterpillarImage} className='flex-1 border-2 items-center justify-center' style={styles.caterpillarImage} >
                {/* Capital Letters */}
                {caps.map((a, capitalIndex) => (
                    capitalIndex===index &&
                (<View  
                key={capitalIndex} 
                className='left-5 border-2'
                style={[styles.capitalContainer,{
                    
                }]}>
                        <Image  style={styles.capImg} source={a}/>
                </View>)
                ))}
            </ImageBackground>
  
            {/* Draggable Small Letters */}
            {small
            .filter((s) => s.cInd === index)
            .map((s, sInd) => (
              <Draggable
                key={sInd}
                x={s.position.x}
                y={s.position.y}
                onDragRelease={(event) => handleDragRelease(event, sInd,index)}
              >
                <Image style={styles.letterImg} source={s.img} />
              </Draggable>
            ))}
  
          </View>
        ))}
       
      </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems:'center'
      
    },
    caterpillarContainer: {
        gap:0,
        border:'1px solid black',
    },
    caterpillarImage: {
      width: 100, // Adjust the width as needed
      height: 200, // Adjust the height as needed
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
       top:70,
       left:5
    },
    letterImg:{
        height:60,
        width:60

    }
  });
export default MatchLetters
