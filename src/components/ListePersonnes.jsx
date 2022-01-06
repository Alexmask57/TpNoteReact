import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';

import Colors from '../definitions/Colors';
import { getPopularPeople, searchPeople } from '../api/TheMovieDB';
import PersonneItem from './PersonneItem';
import DisplayError from '../components/DisplayError';

const ListePersonnes = ({ route, navigation }) => {

    const [personnes, setPersonnes] = useState([]);
    const [entry, setEntry] = useState([]);
    const [nextOffset, setNextOffset] = useState(0);
    const [isMoreResults, setIsMoreResults] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isError, setIsError] = useState(false);


    useEffect(() => {
        requestPopularPersonnes();
    }, []); // Uniquement à l'initialisation

    // Pourrait être directement déclarée dans useEffect
    const requestPopularPersonnes = async () => {
        try {
            const popularPersonnesResult = await getPopularPeople();
            setPersonnes(popularPersonnesResult.results);
        } catch (error) {
            setIsError(true);
        }
    }

    const requestSearchPersonnes = async () => {
        try {
            let res = [];
            if (entry && entry != " ") {
                res = await searchPeople(entry);
            }
            setPersonnes(res.results);

        } catch (error) {
            console.log(error);
;            setIsError(true);
        }
    }

    const navigateToPersonneDetails = (PersonneID) => {
        navigation.navigate("ViewPersonne", { PersonneID });
    };

    const renderItem = ({ item }) => {
        return (
            <PersonneItem item={item} onClick={navigateToPersonneDetails} />
        );
    };

    return (

        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder='Name ...'
                    style={styles.inputRestaurantName}
                    onChangeText={setEntry}
                />
                <Button
                    title='Search'
                    color={Colors.mainGreen}
                    onPress={requestSearchPersonnes}
                />
            </View>
            <FlatList
                data={personnes}
                // extraData={favRestaurants}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                // onEndReached={loadMoreRestaurants}
                // onEndReachedThreshold={0.5}
                refreshing={isRefreshing}
                onRefresh={requestPopularPersonnes}
            />
        </View>
    );
};

// const mapStateToProps = (state) => {
//     return {
//         favPersonnes: state.favPersonneID
//     }
// }

// export default connect(mapStateToProps)(ListePersonnes);
export default ListePersonnes;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
        marginTop: 16,
    },
    searchContainer: {
        marginBottom: 16,
    },
    inputRestaurantName: {
        marginBottom: 8,
    },
});