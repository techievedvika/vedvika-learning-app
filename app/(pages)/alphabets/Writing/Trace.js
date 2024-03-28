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
  import { Dimensions,Animated,PanResponder } from "react-native";
  import SignatureScreen from "react-native-signature-canvas";
  import backbt from "../../../../assets/arrow-left.png";
  import forword from "../../../../assets/forward-01.png";
  import backword from "../../../../assets/backward-01.png";
  import Dialog from "react-native-dialog";
  import AwesomeButton, {
    ThemedButton,
  } from "react-native-really-awesome-button";
  
  import axios from 'axios';
  import Svg, { Path,SvgUri} from 'react-native-svg';

  import { Buffer } from 'buffer';

const Draw = () => {
    const params = useLocalSearchParams();
    const router = useRouter();
    const{letter,image}=params;
   // console.log(letter,image);
    let img = `https://new.advanceexcel.in/vedvika/Vedvika%20Technology/Alphabet(png)/${letter}(1).png`;
    const [visible, setVisible] = useState(false);
    const ref = useRef();
   
    const [result, setResult] = useState();
    const [colorText, setPenColor] = useState("");
  
    const [signature, setSign] = useState();

    const guide = [[542.6499938964844,360.625],[533.6314392089844,356.5951156616211],[525.6138610839844,350.6504821777344],[518.1380844116211,344.034423828125],[511.29302978515625,337.22930908203125],[502.2423553466797,341.44702911376953],[493.0900573730469,345.4392623901367],[483.8201141357422,349.1495132446289],[474.4119644165039,352.49298095703125],[464.83821868896484,355.3244400024414],[455.0727081298828,357.3897171020508],[445.13172149658203,358.2041931152344],[435.1510238647461,357.93643951416016],[425.2008819580078,357.11585998535156],[415.3263854980469,355.6461715698242],[405.59654235839844,353.41480255126953],[396.1151885986328,350.2958679199219],[387.03102111816406,346.1642074584961],[378.54129791259766,340.92185974121094],[370.87364196777344,334.5393371582031],[364.22760009765625,327.0988464355469],[358.7117004394531,318.78461837768555],[354.3111801147461,309.827880859375],[350.92884063720703,300.43739318847656],[348.4388732910156,290.7705879211426],[346.71295166015625,280.9376525878906],[345.6367874145508,271.01192474365234],[345.1133346557617,261.04135513305664],[345.0901794433594,251.05731964111328],[345.82191467285156,241.10177993774414],[347.4283981323242,231.24994277954102],[349.9433898925781,221.5903091430664],[353.37085723876953,212.2156524658203],[357.6808166503906,203.21247100830078],[362.81349182128906,194.65126037597656],[368.6867141723633,186.57957077026367],[375.2079772949219,179.02114868164062],[382.2836685180664,171.9784450531006],[389.8347473144531,165.44781684875488],[397.8314208984375,159.47152137756348],[406.25511169433594,154.11418914794922],[415.0716781616211,149.43181037902832],[424.2338562011719,145.46833992004395],[433.68370056152344,142.25028038024902],[443.3574676513672,139.7853660583496],[453.19087982177734,138.06265830993652],[463.1231689453125,137.0543098449707],[473.1011962890625,136.72046661376953],[483.0681610107422,137.24411010742188],[492.93994903564453,138.72462272644043],[502.66361236572266,140.98651885986328],[512.2173309326172,143.88556480407715],[521.5946960449219,147.31314659118652],[530.6685256958008,151.47068977355957],[539.0897369384766,156.81215286254883],[545.8866882324219,164.05811309814453],[548.5502243041992,173.52718353271484],[544.4021606445312,182.33848571777344],[542.1211242675781,191.9593620300293],[540.9765243530273,201.8777084350586],[540.2314758300781,211.83488845825195],[539.7224044799805,221.80719375610352],[539.3764114379883,231.78651809692383],[539.1521453857422,241.76939010620117],[539.0209579467773,251.7539405822754],[539.0732192993164,261.73866271972656],[539.5558929443359,271.71138763427734],[540.6349182128906,281.6361427307129],[542.5972747802734,291.42147064208984],[545.693473815918,300.90892791748047],[549.4116592407227,310.1757049560547],[553.3596420288086,319.3474006652832],[557.4306869506836,328.46513748168945],[561.8132400512695,337.43629455566406],[563.1399154663086,346.9515609741211],[557.7030563354492,355.1506805419922],[548.9634704589844,359.81014251708984],[495.40210723876953,216.829833984375],[496.02489471435547,206.86561584472656],[497.2227096557617,196.95341110229492],[498.88214111328125,187.1076202392578],[497.96375274658203,178.82221221923828],[488.68431091308594,175.14153480529785],[479.03064727783203,172.64487266540527],[469.0627670288086,172.70289421081543],[459.17232513427734,174.03579711914062],[449.51271057128906,176.54061317443848],[440.2390670776367,180.22523880004883],[431.49070739746094,185.02647399902344],[423.3660888671875,190.82239151000977],[415.91102600097656,197.45891571044922],[409.13501739501953,204.7880744934082],[403.1452178955078,212.77124404907227],[398.11344146728516,221.38916015625],[394.1995620727539,230.56795120239258],[391.51538848876953,240.1783561706543],[390.0951385498047,250.0554656982422],[389.86351013183594,260.03360748291016],[390.41961669921875,270.0012969970703],[391.80652618408203,279.8860740661621],[394.26475524902344,289.5574378967285],[398.09635162353516,298.7658500671387],[403.59405517578125,307.0788764953613],[410.84312438964844,313.90981674194336],[419.52869415283203,318.78833770751953],[429.07421112060547,321.6630172729492],[438.9809036254883,322.83472061157227],[448.9624786376953,322.75732040405273],[458.8981628417969,321.8008232116699],[468.67576599121094,319.8030662536621],[478.10691833496094,316.549129486084],[486.8819808959961,311.8073844909668],[495.1265335083008,306.17700576782227],[502.54505157470703,299.93738174438477],[501.2350082397461,290.03828048706055],[499.9967575073242,280.1299858093262],[498.8425827026367,270.2115058898926],[497.79075622558594,260.28173446655273],[496.8665313720703,250.3392219543457],[496.10595703125,240.38293838500977],[495.56640625,230.41240692138672]]

    //Pan responder
    const pan = useRef(new Animated.ValueXY({ x: 444.544, y: 210 })).current;
    const path = useRef('');
    const panStyle = {
      transform: [
        { translateX: pan.x },
        { translateY: pan.y }
      ]
    };
  

    // const onPanResponderMove = Animated.event(
    //   [
    //     null,
    //     {
    //       dx: pan.x,
    //       dy: pan.y,
    //     },
    //   ],
    //   {
    //     useNativeDriver: Platform.OS === 'android' ? false : true,
    //   }
    // );

    const onPanResponderMove = (event, gestureState) => {
      const x = gestureState.moveX;
      const y = gestureState.moveY;
      console.log(x,y)
      const inside = pointInPolygon([x, y], guide);
    
      if (inside) {
        console.log('inside')
      }
      pan.setValue({ x: gestureState.dx, y: gestureState.dy });
    };

    const panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: onPanResponderMove,
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    });
 
  

    
    const pointInPolygon =(point, vs)=> {
      
      let x = point[0], y = point[1];
      
      var inside = false;
      for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
          let xi = vs[i][0], yi = vs[i][1];
          let xj = vs[j][0], yj = vs[j][1];
          
          let intersect = ((yi > y) != (yj > y))
              && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
          if (intersect) inside = !inside;
      }
      
      return inside;
  };


  
  const handleUndo = () => {
    ref.current.undo();
  };

  // #Function to handle Redo
  const handleRedo = () => {
    ref.current.redo();
  };
 
    
    const imgWidth = 400;
    const imgHeight = 300;
  
     
  return (
    <>
    <StatusBar hidden={true}/>
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
          <TouchableOpacity >
            <Image
              source={backword}
              alt="back button"
              className="h-10 w-10"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>

        <View  
        style={{ 
          width: 800,
          display:'flex',
          height:1000,
         //backgroundColor:'gray',
          flexDirection:'row',
          position:'relative',
          borderWidth:2
           }}>
          
          <View 
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center',position:'absolute', }}>
               <Svg
      width={473}
      height={400}
      viewBox="0 0 123.04 110"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
    
        fill="none"
        stroke="blue"
        strokeWidth={2}
        
        strokeMiterlimit={10}
        d="M104.53,68.125c-0.576,0-1.622-0.593-3.138-1.775
        c-1.364-1.103-2.381-2.084-3.048-2.945c-2.91,1.398-5.473,2.454-7.687,3.167c-2.213,0.712-4.063,1.069-5.548,1.069
        c-7.096,0-12.266-1.775-15.51-5.325c-3.063-3.335-4.593-8.445-4.593-15.331c0-6.508,2.524-12.075,7.573-16.702
        c5.048-4.625,11.074-6.939,18.078-6.939c2.639,0,5.595,0.605,8.869,1.815c4.124,1.506,6.186,3.322,6.186,5.446
        c0,0.726-0.303,1.372-0.909,1.937c-0.304,1.022-0.539,2.703-0.705,5.043c-0.167,2.34-0.266,5.339-0.296,8.996
        c-0.03,3.336,0.228,5.971,0.773,7.907c0.303,1.185,1.258,3.551,2.865,7.101c0.212,0.484,0.561,1.197,1.046,2.139l0.273,0.686
        c0,1.075-0.425,1.963-1.273,2.662C106.638,67.775,105.652,68.125,104.53,68.125z M95.07,40.086c0-1.156,0.083-2.413,0.25-3.771
        s0.417-2.804,0.751-4.337c-1.122-0.51-2.085-0.888-2.889-1.129c-0.804-0.242-1.448-0.363-1.933-0.363
        c-4.7,0-8.755,1.702-12.166,5.104c-3.411,3.402-5.117,7.322-5.117,11.76c0,4.411,0.879,7.72,2.638,9.925s4.396,3.308,7.914,3.308
        c2.911,0,5.382-0.47,7.414-1.412c1.091-0.51,2.622-1.532,4.593-3.065C95.555,48.976,95.07,43.637,95.07,40.086z"
      />
      
    </Svg>
          </View>
          <View style={{ position: 'absolute', }}>
          <Animated.View
            style={[panStyle]}
           {...panResponder.panHandlers}
           
           >
        <View style={styles.circle} />
          </Animated.View>
        </View>
        </View>
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
            <>

              <AwesomeButton
                progress
                name="rick"
                type="primary"
                activityColor="green"
                backgroundShadow="red"
               // onPress={handleResult}
                className="h-16 w-auto "
              >
                <Image
                  source={require("../../../../assets/ok.png")}
                  alt="back button"
                  className="h-14 w-20 "
                />
              </AwesomeButton>
             
            </>
          ) : (
            ""
          )}

      
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
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
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
      fontWeight: "500",
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
    circle: {
      backgroundColor:'#478778',
      width:30,
      height:30,
    borderRadius: 100,
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center',
    padding:1,
    marginHorizontal:6
  
  },
  });

 