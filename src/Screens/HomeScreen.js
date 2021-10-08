import React from 'react'
import { StatusBar, View, StyleSheet, Text, FlatList, LogBox, } from 'react-native'
import { ActivityIndicator, Appbar, Button, Card, TextInput, Title } from 'react-native-paper'
import { Picker } from '@react-native-picker/picker';
import Movie from '../components/Movie';
import axios from 'axios';
import apikey from '../../config'
LogBox.ignoreLogs(['VirtualizedLists'])
export default function HomeScreen({ navigation }) {
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [search, setSearch] = React.useState('')
    const [error, setError] = React.useState('')
    const [year, setYear] = React.useState('2020')
    const [type, setType] = React.useState('')

    let getData = () => {
        setLoading(true)
        axios.get(`http://www.omdbapi.com/?s=Game&y=2020&apikey=${apikey}`).then(({ data }) => {
            setData(data)
            setLoading(false)
        })
    }

    let getYears = () => {
        let arr = []
        for (let i = 1850; i < 2021; i++) {
            arr.push(i)
        }
        return arr
    }

    let validate = (data) => {
        setSearch(data)
        if (data === '') {
            setError('Fill all the required fields.')
        } else if (0 < data.length && data.length < 4) {
            setError('Minimum length is 4 characters.')
        } else {
            setError('')
        }
    }


    let goToResults = () => {
        let filter = {
            year: year,
            type: type
        }
        if (error === '' && search !== '') {
            navigation.navigate('Result', { search: search, filter: filter })
        }
    }

    let clearFilters = () => {
        setYear('')
        setType('')
    }

    React.useEffect(() => {
        getData()
    }, [])

    let header =
        <View>
            <View>
                <Title style={styles.textCenter}>Year</Title>
                <Picker selectedValue={year.toString()} onValueChange={setYear}>
                    <Picker.Item value={''} label='Choose year' />
                    {getYears().map(el => <Picker.Item key={el} value={el.toString()} label={`${el}`} />)}
                </Picker>
                <Title style={styles.textCenter}>Type</Title>
                <Picker selectedValue={type} onValueChange={setType}>
                    <Picker.Item value={''} label='Choose type' />
                    <Picker.Item value="Movies" label="Movies" />
                    <Picker.Item value="Series" label="Series" />
                    <Picker.Item value="Episode" label="Episode" />
                </Picker>
                <Button onPress={clearFilters}>Clear</Button>
            </View>
            <View style={styles.inputRow}>
                <View style={styles.input}>
                    <TextInput error={error !== ''} onSubmitEditing={goToResults} label="Search" onChangeText={validate} value={search} mode={'flat'} placeholder="search.." />
                    {
                        error !== '' &&
                        <Text style={styles.error}>{error}</Text>
                    }
                </View>
                <Button disabled={error !== '' || search === ''} onPress={goToResults}>Search</Button>
            </View>
            <Title>Recommended movies</Title>
        </View >

    return (
        <View style={styles.page}>
            <StatusBar barStyle={'light-content'} />
            <Appbar.Header>
                <Appbar.Content title="Movie searcher" />
            </Appbar.Header>
            <FlatList style={styles.container} showsVerticalScrollIndicator={false} ListHeaderComponent={header} data={data.Search} renderItem={({ item }) => <Movie key={item.imbdId} item={item} />} />
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1
    },
    container: {
        padding: 16,
        flex: 1,
        // justifyContent: 'space-between'
    },
    error: {
        color: 'red'
    },
    textCenter: {
        textAlign: 'center'
    },
    input:{
        width: '65%'
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        height: 100
    }
})