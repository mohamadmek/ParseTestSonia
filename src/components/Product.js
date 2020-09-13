import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';

export default function Product(props) {
  const dispatch = useDispatch();
  const fullWidth = Dimensions.get('window').width;
  const fullHeight = Dimensions.get('window').height;

  const {
    objectId,
    image,
    createdAt,
    description,
    title,
    price
  } = props.product;

  const {
    removeProduct
  } = props;

  return (
    <View style={{marginTop: 10}}>
      <FastImage
        style={{ width: fullWidth, height: fullHeight / 4, backgroundColor: '#ccc' }}
        source={{
            uri: image,
            priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
    />
    <View style={{paddingHorizontal: 10}}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>LBP {price}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.date}>{moment(createdAt).startOf('day').fromNow()}</Text>
      <TouchableWithoutFeedback onPress={() => removeProduct(objectId)}>
        <View style={styles.deleteButton}>
          <Text style={styles.textDeleteButton}>Delete</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 18
  },
  price: {
    fontWeight: '600',
    marginTop: 5
  },
  description: {
    fontWeight: '600',
    fontSize: 14,
    marginTop: 10
  },
  date: {
    textAlign: 'right'
  },
  deleteButton: {
    backgroundColor: 'red',
    width: 60,
    padding: 5,
    alignItems: 'center',
    borderRadius: 10
  }, 
  textDeleteButton: {
    color: '#fff',
    fontWeight: '700'
  }
})
