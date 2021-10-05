import React from 'react'
import {Card} from 'react-native-paper'
export default function Movie({ item }) {
    console.log(item)
    return (
        <Card style={{marginBottom:20}} >
            <Card.Cover style={{ height: 500 }} source={{ uri: item.Poster }} />
            <Card.Title title={item.Title} />
        </Card>
    )
}