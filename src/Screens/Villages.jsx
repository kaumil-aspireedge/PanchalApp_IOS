import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    FlatList,
    ImageBackground,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Fontisto from 'react-native-vector-icons/dist/Fontisto';
import api from '../Utils/api';
import i18n from '../context/i18n';
import LoadingPage from './LoadingPage';
import NoDataFound from './NoDataFound';

const Villages = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [villagesData, setVillagesData] = useState([]);
    const [dataFound, setDataFound] = useState(false);
    const { t } = useTranslation();
    const [language, setLanguage] = useState('');

    useEffect(() => {
        getSelectedLanguage()
        fetchVillagesData();
    }, []);

    const getSelectedLanguage = async () => {
        try {
            const storedLanguage = await AsyncStorage.getItem('selectedLanguage');
            if (storedLanguage) {
                i18n.changeLanguage(storedLanguage).catch((error) => {
                    console.error('Error changing language:', error);
                });
                console.log(storedLanguage, "storedLanguage")
                setLanguage(storedLanguage);
            }
        } catch (error) {
            console.error('Error retrieving language:', error);
        }
    };
    const fetchVillagesData = async () => {
        try {
            setIsLoading(true);
            api.get('/location')
                .then((response) => {
                    if (response.status === 200) {
                        setIsLoading(true);
                        const data = response.data;
                        setVillagesData(data);
                        setIsLoading(false);
                    } else {
                        setIsLoading(false);
                        console.log('location Request failed with status:', response.status);
                    }
                    if (response.data.length <= 0) {
                        setDataFound(true)
                    } else {
                        console.log("Data Found")
                    }
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error(error, 'Handle error');
                });

        } catch (error) {
            setIsLoading(false);
            console.error('An error occurred in location:', error);
        }
    };
    const predefinedColors = ['#f0c2e7', '#f7d5ee', '#ebdac3', '#bdbdf0', '#c8e6cc', '#d5f7f1', '#f7f1d5']

    const getPredefinedColor = index => {
        return predefinedColors[index % predefinedColors.length];
    };

    const renderItem = data => {
        const villageName = language === 'en' ? data.item.villageE : data.item.villageG;
        const colorIndex = data.index % predefinedColors.length;
        const predefinedColor = getPredefinedColor(colorIndex);
        return (
            <View key={data.index}
                style={{
                    width: "32%", height: 100, backgroundColor: predefinedColor, elevation: 7,
                    padding: 5,
                    borderRadius: 10,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: 'black',
                }}>
                <View style={styles.box} >
                    <Fontisto name="holiday-village" color="#333" size={18} />
                    <Text style={styles.boxText}>{villageName}</Text>
                </View>
            </View>
        );
    };

    if (dataFound) {
        return (
            <NoDataFound />
        )
    }
    return (
        <ImageBackground source={require('../assets/bg3.jpg')}>
            {isLoading ? (
                <LoadingPage />
            ) : villagesData && villagesData.length ? (
                <View>
                    <FlatList
                        data={villagesData}
                        renderItem={renderItem}
                        numColumns={3}
                        columnWrapperStyle={[{ justifyContent: 'space-around', gap: 10 }, styles.container]}
                        style={{ width: '100%' }}
                    />
                </View>
            ) : (
                <View style={styles.blankcontainer}>
                    <Text style={styles.blank}>{t('nosearchdatafound')}</Text>
                </View>
            )}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingBottom: 0,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    text1: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    box: {
        // backgroundColor: '#fff',
        padding: 5,
        borderRadius: 6,
        flexDirection: 'column',
        alignItems: 'center',
    },
    villagesCard: {
        backgroundColor: 'white',
        width: '100%',
        padding: 10,
    },
    boxText: {
        fontSize: 18,
        fontWeight: '600',
        paddingVertical: 7,
        color: 'black'
    },

    villageList: {
        paddingHorizontal: '4%',
        paddingVertical: 10,
    },

    pincode: {
        fontSize: 14,
        color: '#666',
    },

    blankcontainer: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },

    blank: {
        color: 'black',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '500',
        width: '90%',
        textTransform: 'capitalize',
    },
});

export default Villages;