import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {ParallaxImage} from 'react-native-snap-carousel';
import styles from '../styles/sliderStyle';
import {selectAlbum, selectImage} from '../actions/actions';
import {connect} from 'react-redux';

class SliderEntry extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object,
  };

  get image() {
    const {
      data: {thumbnailUrl},
      parallax,
      parallaxProps,
      even,
    } = this.props;

    return parallax ? (
      <ParallaxImage
        source={{uri: thumbnailUrl}}
        containerStyle={[
          styles.imageContainer,
          even ? styles.imageContainerEven : {},
        ]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
        {...parallaxProps}
      />
    ) : (
      <Image source={{uri: thumbnailUrl}} style={styles.image} />
    );
  }

  updateParentState = data => {
    this.props.selectAlbum(data, this.props.allImages);
  };

  updateSelectedImage = (data, url) => {
    this.props.selectImage(data, url);
  };

  render() {
    const {
      data: {title, userId, thumbnailUrl, id, url},
      even,
    } = this.props;

    const uppercaseTitle = title ? (
      <Text
        style={[styles.title, even ? styles.titleEven : {}]}
        numberOfLines={2}>
        {userId}
      </Text>
    ) : (
      false
    );

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={() => {
          userId !== null && userId !== undefined
            ? this.updateParentState(userId)
            : this.updateSelectedImage(id, url);
        }}>
        <View style={styles.shadow} />
        <View
          style={[
            styles.imageContainer,
            even ? styles.imageContainerEven : {},
          ]}>
          {this.image}
          <View
            style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]}
          />
        </View>
        <View
          style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
          {uppercaseTitle}
          <Text
            style={[styles.subtitle, even ? styles.subtitleEven : {}]}
            numberOfLines={2}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
const mapStateToProps = state => ({
  allImages: state.reducer.allImages,
});

function bindAction(dispatch) {
  return {
    selectAlbum: (albumId, allImages) =>
      dispatch(selectAlbum(albumId, allImages)),
    selectImage: (imageId, url) => dispatch(selectImage(imageId, url)),
  };
}

export default connect(
  mapStateToProps,
  bindAction,
)(SliderEntry);
