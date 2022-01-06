import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import Colors from '../definitions/Colors';
import { getPopularPeople, searchPeople, getDetailsPeople } from '../api/TheMovieDB';
import PersonneItem from './PersonneItem';
import DisplayError from '../components/DisplayError';

const ListeFavoris = ({ route, navigation, favPersonnes }) => {


    const [personnes, setPersonnes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [nextOffset, setNextOffset] = useState(0);
    const [isMoreResults, setIsMoreResults] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isError, setIsError] = useState(false);
    const [indicator, setIndicator] = useState(true);


    useEffect(() => {
        async function fetchMyAPI() {
            setIndicator(true);
            let personnesTemp = [];
            for (const id of favPersonnes) {
                const res = await getDetailsPeople(id)
                personnesTemp.push(res);
            };
            setPersonnes(personnesTemp);
            setIndicator(false);
        }
        fetchMyAPI();
    }, [favPersonnes])

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
            <FlatList
                data={personnes}
                // extraData={favRestaurants}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            // onEndReached={loadMoreRestaurants}
            // onEndReachedThreshold={0.5}
            // refreshing={isRefreshing}
            // onRefresh={searchRestaurants}
            />
        </View>
    );
};

const mapStateToProps = (state) => {
    return {
        favPersonnes: state.favPersonnesID
    }
}

export default connect(mapStateToProps)(ListeFavoris);

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