import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { View, StyleSheet, Image, Text, TouchableOpacity, ActivityIndicator, ScrollView, Button } from 'react-native';

import Assets from '../definitions/Assets';
import Colors from '../definitions/Colors';
import DisplayError from '../components/DisplayError';

import { getDetailsPeople } from '../api/TheMovieDB';



const PersonneItem = ({ route, favPersonnes, dispatch }) => {

    console.log(favPersonnes);
    const [indicator, setIndicator] = useState(true);
    const [personne, setPersonne] = useState();
    const [isError, setIsError] = useState(false);
    const [favoris, setFavoris] = useState();

    const IsFavoris = () => {
        if (favPersonnes.indexOf(route.params.PersonneID) != -1) {
            setFavoris(true);
        }
        else
            setFavoris(false);
    }

    useEffect(() => {
        async function fetchMyAPI() {
            setIndicator(true);
            let res = await getDetailsPeople(route.params.PersonneID);
            setPersonne(res);
            setIndicator(false);
        }
        IsFavoris();
        fetchMyAPI();
    }, [])

    const getThumbnail = () => {
        if (restaurantData.thumb) {
            return (
                <Image style={styles.thumbnail} source={{ uri: restaurantData.thumb }} />
            );
        };
        return (
            <View style={styles.noThumbnailContainer}>
                <Image source={Assets.icons.missingIMG} />
            </View>
        );
    };

    const AddToFavoris = () => {
        const fav = { type: 'SAVE_PERSONNE', value: route.params.PersonneID };
        dispatch(fav);
        setFavoris(true);
    }

    const RemoveFromFavoris = () => {
        const fav = { type: 'UNSAVE_PERSONNE', value: route.params.PersonneID };
        dispatch(fav);
        setFavoris(false);
    }

    const Loading = () => {
        return (
            <View>
                <ActivityIndicator size="large" animating={indicator} style={styles.loading} />
            </View>
        )
    }

    const Res = () => {

        return (
            <View>
                {/* <Image style={styles.Thumbnails} source={{ uri: restaurant.photos[0].photo.url, }} /> */}
                <View style={styles.subContainer}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ justifyContent: 'center', margin: 10 }}>
                            <Text style={styles.nomRestaurant}>{personne.name}</Text>
                            <Text style={styles.etablissement}>{personne.biography}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.subContainer}>
                    {favoris ? (
                        <Button
                            title='Supprimer des favoris'
                            color={Colors.mainRed}
                            onPress={RemoveFromFavoris}
                        />
                    ) : (
                        <Button
                            title='Ajouter aux favoris'
                            color={Colors.mainGreen}
                            onPress={AddToFavoris}
                        />
                    )}

                </View>
            </View>
        )
    }

    return (
        <View>
            {indicator ? (
                <Loading></Loading>
            ) : (
                <Res></Res>
            )}
        </View>
    );
};

const mapStateToProps = (state) => {
    return {
        favPersonnes: state.favPersonnesID
    }
}

export default connect(mapStateToProps)(PersonneItem);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    Item: {
        height: 128,
        flexDirection: 'row',
        marginVertical: 5
    },

    subContainer: {
        justifyContent: 'center',
        backgroundColor: Colors.mainWhite,
        marginHorizontal: 20,
        borderRadius: 12,
        marginBottom: 20,
        marginTop: 10
    },
    infosContainer: {
        marginBottom: 20,
        marginTop: 10,
        paddingHorizontal: 10
    },
    avisContainer: {
        borderRadius: 8,
        backgroundColor: Colors.mainGreen,
        height: 50,
        width: 80
    },
    subContainerItem: {
        justifyContent: 'center',
        marginHorizontal: 20
    },
    Thumbnails: {
        backgroundColor: Colors.mainGreen,
        borderRadius: 12,
        height: 512,
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 10
    },

    nomRestaurant: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    etablissement: {
        fontSize: 25,
    },
    icon: {
        tintColor: Colors.mainGreen,
        marginVertical: 7
    },

    text: {
        fontSize: 18,
    },
    textIcon: {
        fontSize: 25,
        marginHorizontal: 7,
        marginVertical: 7,
        color: Colors.mainWhite
    },
    greenTitle: {
        color: Colors.mainGreen,
        fontWeight: 'bold',
        fontSize: 18
    },
    loading: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center'
    }
});