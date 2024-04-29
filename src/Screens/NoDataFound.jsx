import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { useTranslation } from 'react-i18next';

const NoDataFound = () => {
    const { t } = useTranslation();
    return (
        <View style={styles.blankcontainer}>
            <View>
                <Image
                    source={require('../assets/NoPageFound3.png')}
                    alt="Change Password"
                    style={{ width: 250, height: 250 }}
                />
            </View>
            <Text style={styles.blank}>{t('nodatafound')}</Text>
        </View>
    )
}

export default NoDataFound


const styles = StyleSheet.create({
    blank: {
        color: 'black',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '500',
        width: '90%',
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },

    blankcontainer: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
});
