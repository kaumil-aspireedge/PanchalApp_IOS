import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import api from "../Utils/api";
import LoadingPage from "./LoadingPage";
import NoDataFound from './NoDataFound';

const AboutUs = () => {

    const [aboutUs, setaboutUs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [dataFound, setDataFound] = useState(false);

    useEffect(() => {
        fetchAboutUs();
    }, []);

    const fetchAboutUs = async () => {
        try {
            setIsLoading(true);
            const response = await api.get('/aboutus');
            if (response.status === 200) {
                setIsLoading(true);
                const data = response.data;
                setaboutUs(data);
                setIsLoading(false);
            } else {
                console.log('aboutus Request failed with status:', response.status);
                setIsLoading(false);
            }
            if (response.data.length === 0) {
                setDataFound(true)
            } else {
                console.log("error about us")
            }
            setIsLoading(false);
        } catch (error) {
            console.error('An error occurred:', error);
            setIsLoading(false);
        }
    };

    const injectCSS = `
    <style>
      .description {
        font-size: 35px;
        text-align: justify;
        padding: 20px;
      }
    </style>
  `;
    console.log(aboutUs, " :::aboutUs")

    if (dataFound) {
        return (
            <NoDataFound />
        )
    }

    return (
        <ImageBackground source={require('../assets/bg3.jpg')} style={styles.container}>
            {isLoading ? (
                <LoadingPage />
            ) : (
                aboutUs.length > 0 && aboutUs.map(item => (
                    <WebView
                        key={item._id}
                        source={{
                            html: `${injectCSS}<div class="description">${item.description}</div>`,
                        }}
                        style={styles.webViewContent}
                    />
                ))
            )}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    webViewContent: {
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
    },
});

export default AboutUs;
