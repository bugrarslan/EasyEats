import { View, Text, ScrollView, TextInput, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {BellIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import Categories from '../components/Categories';
import axios from 'axios';
import Recipes from '../components/Recipes';

export default function HomeScreen() {

  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  const handleChangeCategory = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setRecipes([]);
  }
  

  const getCategories = async () => {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
      // console.log('got categories: ', response.data);
      if (response && response.data.categories) {
        setCategories(response.data.categories);
      }
    } catch (err) {
      console.log('error: ', err.message);
    }
  }

  const getRecipes = async (category='Beef') => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      // console.log('got melas: ', response.data);
      if (response && response.data.meals) {
        setRecipes(response.data.meals);
      }
    } catch (err) {
      console.log('error: ', err.message);
    }
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom:50}}
      className="space-y-6 pt-14"
      >
        {/* avatar and bell icon */}
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image 
          source={require('../assets/avatar.png')} 
          style={{height:hp(5), width:hp(5.5)}} 
          />
          <BellIcon size={hp(4)} color="gray"/>
        </View>

        {/* greetings and punchline */}
        <View className="mx-4 space-y-2 mb-2">
          <Text className="text-neutral-600" style={{fontSize:hp(1.7)}}>Hello, Buğra!</Text>
          <View>
            <Text className="font-semibold text-neutral-600" style={{fontSize:hp(3.8)}}>Make your own food,</Text>
            <Text style={{fontSize:hp(3.8)}} className="font-semibold text-neutral-600">
              stay at <Text className="text-amber-400">home</Text>
            </Text>
          </View>
        </View>

        {/* search bar */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput 
          placeholder='Search any recipe'
          placeholderTextColor={'gray'}
          style={{fontSize:hp(1.7)}}
          className="flex-1 text-base mb-1 pl-3 tracking-wider"
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color={'gray'}/>
          </View>
        </View>

        {/* categories */}
        <View>
          {categories.length > 0 && <Categories activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} categories={categories}/>}
        </View>

        {/* recipes */}
        <View>
          {recipes.length > 0 && <Recipes recipes={recipes} categories={categories}/>}
        </View>
      </ScrollView>
    </View>
  )
}