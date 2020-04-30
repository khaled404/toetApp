import React from 'react';
import { View, Text, Image } from 'react-native';
import { Grid, Col, Row } from 'native-base';
import { Rating } from 'react-native-elements';
import StylesConstant from '../../../../constants/styles';
import normalize from 'react-native-normalize';
import styles from '../../../../common/styles';
import StarRating from 'react-native-star-rating';

let person = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTG0Pc-r7rtMkhD0k2JkdvovVmvkvbDutWD6-e2gjlKrQpMrgJq';
export default ({ Review }) => {
    return (<Grid style={{ paddingHorizontal: normalize(20), marginBottom: normalize(20, 'height'),width:350 }}>
        {/* <Col size={1}>
            <Image source={{ uri: person }} style={{ width: 70, height: 70, borderRadius: 35 }} />
        </Col> */}
        <Col size={3}>
            <Row size={1} style={{ justifyContent: 'space-between' }}>


                <StarRating
                    disabled={true}
                    maxStars={5}
                    fullStarColor={StylesConstant.MainColor}
                    emptyStarColor="rgba(114, 124, 142, 1)"
                    starSize={12}
                    rating={Review.rating}
                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                />
                <Text style={[styles.FontFamilyMedium, { fontSize: 12 }]}>{Review.date_added}</Text>

            </Row>
            <Row>
                <Text style={[{ fontSize: 15 }, styles.FontFamilyBold]}>{Review.author}</Text>

            </Row>
            <Row style={{ flexDirection: 'column' }}>
                <Text style={{ fontSize: 14 }}>{Review.text}</Text>
            </Row>
            <Row></Row>
        </Col>
    </Grid>)
}