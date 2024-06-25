import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ClockIcon, FireIcon, Square3Stack3DIcon, UsersIcon, HeartIcon } from 'react-native-heroicons/solid';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Image } from 'expo-image';
import Loading from '../components/Loading';
import YoutubePlayer from "react-native-youtube-iframe";

export default function RecipeDetailScreen(props) {
	let item = props.route.params;
	const navigation = useNavigation();

	const [favourite, setFavourite] = useState(false);
	const [meal, setMeal] = useState(null);
	const [loading, setLoading] = useState(true);

	const getMealData = async (id) => {
		try {
			const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
			console.log('got meal data: ', response.data);
			if (response && response.data.meals) {
				setMeal(response.data.meals[0]);
				setLoading(false);
			}
		} catch (err) {
			console.log('error: ', err.message);
		}
	}

	useEffect(() => {
		getMealData(item.idMeal);
	}, [])

	const ingredientsIndexes = (meal) => {
		if (!meal) return [];
		let indexes = [];
		for (let i=1; i<=20; i++) {
			if (meal[`strIngredient${i}`]) {
				indexes.push(i);
			}
		}

		return indexes;
	}

	const getYoutubeVideoId = (url) => {
		const regex = /[?&]v=([^&]+)/;
		const match = url.match(regex);
		if (match && match[1]) {
			return match[1];
		}
		return null;
	}

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
					source={{uri: meal?.strMealThumb}}
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

			{/* meal description */}
			{
				loading ? (
					<Loading size={"large"} className="mt-16"/>
				) : (
					<View className="flex justify-between px-4 space-y-4 pt-8">

						{/* name and area */}
						<View className="space-y-2">
							<Text 
								style={{fontSize:hp(3)}}
								className="font-bold flex-1 text-neutral-700"	
							>
								{meal?.strMeal}
							</Text>
							<Text 
								style={{fontSize:hp(2)}}
								className="font-medium flex-1 text-neutral-700"	
							>
								{meal?.strArea}
							</Text>
						</View>

						{/* misc */}
						<View className="flex-row justify-around">
							<View className="flex rounded-full bg-amber-300 p-2">
								<View 
									className="bg-white rounded-full flex items-center justify-center"
									style={{width:hp(6.5), height:hp(6.5)}}
								>
									<ClockIcon size={hp(4)} strokeWidth={2.5} color={"#525252"}/>
								</View>
								<View
									className="flex items-center py-2 space-y-1"
								>
									<Text
										style={{fontSize:hp(2)}} 
										className="font-bold text-neutral-700"
									>
										35
									</Text>
									<Text
										style={{fontSize:hp(1.3)}} 
										className="font-bold text-neutral-700"
									>
										Mins
									</Text>
								</View>
							</View>

							<View className="flex rounded-full bg-amber-300 p-2">
								<View 
									className="bg-white rounded-full flex items-center justify-center"
									style={{width:hp(6.5), height:hp(6.5)}}
								>
									<UsersIcon size={hp(4)} strokeWidth={2.5} color={"#525252"}/>
								</View>
								<View
									className="flex items-center py-2 space-y-1"
								>
									<Text
										style={{fontSize:hp(2)}} 
										className="font-bold text-neutral-700"
									>
										03
									</Text>
									<Text
										style={{fontSize:hp(1.3)}} 
										className="font-bold text-neutral-700"
									>
										Servings
									</Text>
								</View>
							</View>

							<View className="flex rounded-full bg-amber-300 p-2">
								<View 
									className="bg-white rounded-full flex items-center justify-center"
									style={{width:hp(6.5), height:hp(6.5)}}
								>
									<FireIcon size={hp(4)} strokeWidth={2.5} color={"#525252"}/>
								</View>
								<View
									className="flex items-center py-2 space-y-1"
								>
									<Text
										style={{fontSize:hp(2)}} 
										className="font-bold text-neutral-700"
									>
										103
									</Text>
									<Text
										style={{fontSize:hp(1.3)}} 
										className="font-bold text-neutral-700"
									>
										Cal
									</Text>
								</View>
							</View>

							<View className="flex rounded-full bg-amber-300 p-2">
								<View 
									className="bg-white rounded-full flex items-center justify-center"
									style={{width:hp(6.5), height:hp(6.5)}}
								>
									<Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color={"#525252"}/>
								</View>
								<View
									className="flex items-center py-2 space-y-1"
								>
									<Text
										style={{fontSize:hp(2)}} 
										className="font-bold text-neutral-700"
									>
										
									</Text>
									<Text
										style={{fontSize:hp(1.3)}} 
										className="font-bold text-neutral-700"
									>
										Easy
									</Text>
								</View>
							</View>
						</View>

						{/* ingredients */}
						<View className="space-y-4">
							<Text
								style={{fontSize:hp(2.5)}}
								className="font-bold flex-1 text-neutral-700"
							>
								Ingredients
							</Text>
							<View className="space-y-2 ml-3">
								{
									ingredientsIndexes(meal).map(i =>{
										return(
											<View
												key={i}
												className="flex-row space-x-4"
											>
												<View
													style={{width:hp(1.5), height:hp(1.5)}}
													className="bg-amber-300 rounded-full"
												/>
												<View className="flex-row space-x-2">
													<Text style={{fontSize:hp(1.7)}} className="font-extrabold text-neutral-700">{meal['strMeasure'+i]}</Text>
													<Text style={{fontSize:hp(1.7)}} className="font-medium text-neutral-600">{meal['strIngredient'+i]}</Text>
												</View>
											</View>
										)
									})
								}
							</View>
						</View>

						{/* instructions */}
						<View className="space-y-4">
							<Text
								style={{fontSize:hp(2.5)}}
								className="font-bold flex-1 text-neutral-700"
							>
								Instructions
							</Text>
							<Text className="text-neutral-700" style={{fontSize:hp(1.6)}}>
								{meal?.strInstructions}
							</Text>
							
						</View>

						{/* recipe video */}
						{
							meal?.strYoutube && (
								<View className="space-y-4">
									<Text
										style={{fontSize:hp(2.5)}}
										className="font-bold flex-1 text-neutral-700"
									>
									 	RecipeRecipe Video
									</Text>
									<View>
										<YoutubePlayer
											videoId={getYoutubeVideoId(meal?.strYoutube)}
											height={hp(30)}
										/>
									</View>
								</View>
							)
						}
					</View>
				)
			}
		</ScrollView>
	)
}