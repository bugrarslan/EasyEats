import { View, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Animated from 'react-native-reanimated';

export default function CachedImage(props) {
    const [cachedSource, setCachedSource] = useState(null);
    const {uri} = props;

    useEffect(() => {
        const getCachedImage = async () => {
                try {
                    const cachedImageData = await AsyncStorage.getItem(uri);
                    if (cachedImageData) {
                        setCachedSource({uri: cachedImageData});
                    } else {
                        const response = await fetch(uri);
                        const imageBlob = await response.blob();
                        const base64data = await new Promise((resolve) => {
                            const reader = new FileReader();
                            reader.readAsDataURL(imageBlob);
                            reader.onloadend = () => {
                                resolve(reader.result);
                            };
                        });
                        await AsyncStorage.setItem(uri, base64data);
                        setCachedSource({uri: base64data});
                    }
                } catch (error) {
                    console.error('Error caching image', error);
                    setCachedSource({uri});
                }
        };
        getCachedImage();
    }, [])
    
  return <Animated.Image source={cachedSource} {...props} />
}