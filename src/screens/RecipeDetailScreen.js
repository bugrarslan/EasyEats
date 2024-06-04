import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function RecipeDetailScreen(props) {
  const [favourite, setFavourite] = useState(false);
  let item = props.route.params;
  const navigation = useNavigation();

  const getRecipes = async (id) => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      console.log('got meal: ', response.data);
      if (response && response.data.meals) {
        // setRecipes(response.data.meals);
      }
    } catch (err) {
      console.log('error: ', err.message);
    }
  }

  useEffect(() => {
    getRecipes(item.idMeal);
  }, [])
  

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{paddingBottom:30}}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar style='light'/>

      {/* recipe image */}
      <View className="flex-row justify-center">
        <Image
          source={{uri: item.strMealThumb}}
          style={{
            width:wp(98), 
            height:hp(50), 
            borderRadius:wp(4), 
            borderBottomLeftRadius:40, 
            borderBottomRightRadius:40, 
            marginTop:4
          }}
        />
      </View>

      {/* back button */}
      <View className="w-full absolute flex-row justify-between items-center pt-14">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full ml-5 bg-white"
        >
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color={"#fbbf24"}/>
        </TouchableOpacity>
        <TouchableOpacity
          className="p-2 rounded-full mr-5 bg-white"
          onPress={() => setFavourite(!favourite)}
        >
          <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={favourite ? "red" : "gray"}/>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}