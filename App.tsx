import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
]);

import Carousel from 'react-native-snap-carousel';

import Icon from 'react-native-vector-icons/MaterialIcons';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const App = () => {
  const carrouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lista, setLista] = useState([
    {
      title: 'O Justiceiro',
      text: 'Após o assassinato de sua família, Frank Castle está traumatizado e sendo caçado. No submundo do crime, ele se tornará aquele conhecido como O Justiceiro',
      release: 2018,
      img: 'https://sujeitoprogramador.com/wp-content/uploads/2020/05/background.jpg',
    },
    {
      title: 'Bad Boys for life',
      text: 'Terceiro episódio das histórias dos policiais Burnett (Martin Lawrence) e Lowrey (Will Smith), que devem encontrar e prender os mais perigosos traficantes de drogas da cidade.',
      release: 2020,
      img: 'https://sujeitoprogramador.com/wp-content/uploads/2020/05/badboy.jpg',
    },
    {
      title: 'Viúva Negra',
      text: 'Em Viúva Negra, após seu nascimento, Natasha Romanoff (Scarlett Johansson) é dada à KGB, que a prepara para se tornar sua agente definitiva.',
      release: 2020,
      img: 'https://sujeitoprogramador.com/wp-content/uploads/2020/05/blackwidow.jpg',
    },
    {
      title: 'Top Gun: MAVERICK',
      text: 'Em Top Gun: Maverick, depois de mais de 30 anos de serviço como um dos principais aviadores da Marinha, o piloto à moda antiga Maverick (Tom Cruise) enfrenta drones e prova que o fator humano ainda é fundamental no mundo contemporâneo das guerras tecnológicas.',
      release: 2020,
      img: 'https://sujeitoprogramador.com/wp-content/uploads/2020/05/topgun.jpeg',
    },
    {
      title: 'BloodShot',
      text: 'Bloodshot é um ex-soldado com poderes especiais: o de regeneração e a capacidade de se metamorfosear. ',
      release: 2020,
      img: 'https://sujeitoprogramador.com/wp-content/uploads/2020/05/blood.jpg',
    },
    {
      title: 'Free Guy',
      text: 'Um caixa de banco preso a uma entediante rotina tem sua vida virada de cabeça para baixo quando ele descobre que é personagem em um brutalmente realista vídeo game de mundo aberto.',
      release: 2020,
      img: 'https://sujeitoprogramador.com/wp-content/uploads/2020/05/freeguy.jpg',
    },
  ]);

  //@ts-ignore
  const _renderItem = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity>
          <Image
            source={{uri: item.img}}
            //@ts-ignore
            style={styles.carouselImg}
          />
          <Text style={styles.carrouselText}>{item.title}</Text>
          <Icon
            name="play-circle-outline"
            size={30}
            color="#fff"
            style={styles.carrouselIcon}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const [background, setBackground] = useState(lista[0].img);
  return (
    <ScrollView style={styles.container}>
      <View style={{flex: 1, height: screenHeight}}>
        {/* @ts-ignore */}
        <View style={{...StyleSheet.absoluteFill, borderStartColor: '#000'}}>
          <ImageBackground
            source={{uri: background}}
            style={styles.imgBg}
            blurRadius={8}>
            <View style={styles.viewSearch}>
              <TextInput
                style={styles.input}
                placeholder="Pesquisar"
                placeholderTextColor={'#000'}
              />
              <TouchableOpacity style={styles.icon}>
                <Icon name="search" color="#000" size={25} />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                color: '#fff',
                fontSize: 25,
                fontWeight: 'bold',
                marginLeft: 10,
                marginVertical: 10,
              }}>
              Acabou de Chegar
            </Text>

            <View style={styles.slideView}>
              <Carousel
                style={styles.carousel}
                ref={carrouselRef}
                data={lista}
                renderItem={_renderItem}
                sliderWidth={screenWidth}
                itemWidth={200}
                inactiveSlideScale={0.5}
                onSnapToItem={index => {
                  setBackground(lista[index].img);
                  setActiveIndex(index);
                }}
              />
            </View>

            <View style={styles.moreInfo}>
              <View style={{marginTop: 10}}>
                <Text style={styles.textTitle}>{lista[activeIndex].title}</Text>
                <Text style={styles.textInfo}>{lista[activeIndex].text}</Text>
              </View>
              <TouchableOpacity  
              style={{marginRight: 20, marginTop: 10,}} 
              onPress={() => Alert.alert('CLICOU')}>
              <Icon name="queue" color="#131313" size={30}            />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgBg: {
    flex: 1,
    //@ts-ignore
    width: null,
    //@ts-ignore
    height: null,
    opacity: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#000',
  },
  viewSearch: {
    marginTop: 20,
    backgroundColor: '#fff',

    elevation: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '95%',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  input: {
    display: 'flex',
    width: '95%',
    padding: 13,
    paddingLeft: 20,
    fontSize: 17,
    color: '#000',
  },
  icon: {
    position: 'absolute',
    right: 20,
    top: 15,
  },
  slideView: {
    width: '100%',
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carousel: {
    flex: 1,
    overflow: 'visible',
  },
  carouselImg: {
    alignSelf: 'center',
    width: 200,
    height: 300,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  carrouselText: {
    padding: 15,
    color: '#fff',
    position: 'absolute',
    bottom: 10,
    left: 2,
    fontWeight: 'bold',
  },
  carrouselIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  moreInfo: {
    backgroundColor: '#fff',
    width: screenWidth,
    height: screenHeight,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-around',
  },
  textTitle: {
    paddingLeft: 15,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#131313',
    marginBottom: 5,
  },
  textInfo: {
    paddingLeft: 15,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#131313',
  },
});

export default App;
