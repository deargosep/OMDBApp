import React from 'react'
import axios from 'axios'
import { View, StatusBar, FlatList, StyleSheet, Image } from 'react-native'
import { ActivityIndicator, Appbar, Card, Title } from 'react-native-paper'
import Movie from '../components/Movie'
import apikey from '../../config'
export default function ResultScreen({ navigation, route }) {
    const { search, filter } = route.params
    const [data, setData] = React.useState({})
    const [error, setError] = React.useState('')
    const [loading, setLoading] = React.useState(true)
    let getData = () => {
        let url = `http://www.omdbapi.com/?s=${search}&${filter.year && `y=${filter.year}&`}${filter.type && `type=${filter.type}`}&apikey=${apikey}`
        setLoading(true)
        axios.get(url).then(({ data }) => {
            if (data.Response !== 'False') {
                setData(data)
            } else {
                setError(data.Error)
            }
            setLoading(false)
        })
    }
    React.useEffect(() => {
        getData()
    }, [])
    return (
        <View style={styles.page}>
            <StatusBar barStyle={'light-content'} />
            <Appbar.Header>
                <Appbar.Action onPress={() => navigation.goBack()} icon="arrow-left" />
                <Appbar.Content title="Results" />
            </Appbar.Header>
            <View style={styles.container} >
                {
                    loading ?
                        <ActivityIndicator />
                        :
                        <FlatList showsVerticalScrollIndicator={false} ListEmptyComponent={<Empty error={error} />} data={data.Search} renderItem={({ item }) => <Movie item={item} />} />
                }
            </View>
        </View>
    )
}


function Empty({ error }) {
    if (error) return (
        <View style={styles.empty}>
            <Title style={styles.error}>{error}</Title>
        </View>
    )
    return (
        <View style={styles.empty}>
            <Title>Empty. Try searching again!</Title>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1
    },
    container: {
        paddingHorizontal: 16,
        flexGrow: 1,
        flex: 1,
        justifyContent: 'space-between'
    },
    error: {
        color:'red'
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        height: 100
    },
    empty: {
        alignSelf: 'center'
    }
})