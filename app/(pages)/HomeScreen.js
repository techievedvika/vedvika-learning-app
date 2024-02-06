import Logo from '../../assets/img/vedvika_logo.png';
import { ImageBackground, View } from 'react-native';
import Categories from '../../components/Categories';
import Bg from '../../assets/img/purple_bg.png';


const HomeScreen = () => {
  const data = [
    {
      image: require("../../assets/img/learningAlphabets.jpg"),
      route: "/alphabets",
    },
    {
      image: require("../../assets/img/colourSection.jpg"),
      route: "/colors",
    },
    {
      image: require("../../assets/img/learningNumber.jpg"),
      route: "/numbers",
    },
  ];
  return (
    <ImageBackground source={Bg} className='flex-1 items-center justify-center'>
      <Categories data={data} autoPlay={false} pagination={true} />
    </ImageBackground>
  )
}

export default HomeScreen
