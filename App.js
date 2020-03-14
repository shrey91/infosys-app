/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {
  View,
  Button,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import styles, {colors} from './styles/style';
import sliderStyle, {sliderWidth, itemWidth} from './styles/sliderStyle';
import {
  loadAll,
  resetImageSelection,
  resetSelectedAlbum,
} from './actions/actions';
import Carousel, {Pagination, ParallaxImage} from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import SliderEntry from './component/SliderEntry';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedAlbumList: [],
      AllImages: [],
      loading: true,
      slider1ActiveSlide: 1,
      selectedAlbum: null,
    };
  }

  componentDidMount() {
    this.props.loadAll();
  }

  _renderItem = ({item, index}) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.userId}</Text>
      </View>
    );
  };

  updateState = data => {
    alert(`You've clicked '${data}'`);
    this.setState({
      selectedAlbum: data,
    });
  };

  get gradient() {
    return (
      <LinearGradient
        colors={[colors.background1, colors.background2]}
        startPoint={{x: 1, y: 0}}
        endPoint={{x: 0, y: 1}}
        style={styles.gradient}
      />
    );
  }

  renderCarousel(dataset) {
    return (
      <View>
        <Carousel
          ref={c => (this._slider1Ref = c)}
          data={dataset}
          renderItem={this._renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={1}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={true}
          loopClonesPerSide={2}
          autoplay={false}
          onSnapToItem={index => this.setState({slider1ActiveSlide: index})}
        />
        <Pagination
          dotsLength={dataset.length}
          activeDotIndex={this.state.slider1ActiveSlide}
          containerStyle={styles.paginationContainer}
          dotColor={'rgba(255, 255, 255, 0.92)'}
          dotStyle={styles.paginationDot}
          inactiveDotColor={colors.black}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={this._slider1Ref}
          tappableDots={!!this._slider1Ref}
        />
        {this.props.selectedAlbum !== null &&
          this.props.selectedImage === null && (
            <Button
              title={'Return to Albums'}
              onPress={() => this.returnToAllAlbums()}
            />
          )}
      </View>
    );
  }

  _renderItemWithParallax({item, index}, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  }

  returnToSelectedAlbum() {
    this.props.resetSelectedImage();
  }

  returnToAllAlbums() {
    this.props.resetSelectedAlbum();
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {this.gradient}
          {this.props.selectedAlbum === null ? (
            this.renderCarousel(this.props.albums)
          ) : (
            <View>
              {this.props.selectedImage === null ? (
                this.renderCarousel(this.props.albumImages)
              ) : (
                <View
                  style={{
                    flex: 0,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                  }}>
                  <View
                    style={[
                      sliderStyle.slideInnerContainer,
                      {marginBottom: 20},
                    ]}>
                    <Image
                      source={{uri: this.props.selectedImageUrl}}
                      style={sliderStyle.image}
                    />
                  </View>
                  <Button
                    title={'Back'}
                    onPress={() => this.returnToSelectedAlbum()}
                  />
                </View>
              )}
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  albums: state.reducer.sortedAlbums,
  selectedAlbum: state.reducer.selectedAlbum,
  albumImages: state.reducer.selectedAlbumImages,
  selectedImage: state.reducer.selectedImage,
  selectedImageUrl: state.reducer.selectedImageUrl,
});

function bindAction(dispatch) {
  return {
    loadAll: () => dispatch(loadAll()),
    resetSelectedImage: () => dispatch(resetImageSelection()),
    resetSelectedAlbum: () => dispatch(resetSelectedAlbum()),
  };
}

export default connect(
  mapStateToProps,
  bindAction,
)(App);
