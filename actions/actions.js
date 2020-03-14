import * as actionTypes from '../constants';

export const loadAll = () => async dispatch => {
  // Reload all albums from jsonplaceholder. and store sorted albums

  var allAlbums = [];
  var sortedAlbums = [];
  var allImages = [];

  await fetch('http://jsonplaceholder.typicode.com/albums')
    .then(response => response.json())
    .then(data => {
      allAlbums = data;
    });

  await fetch('http://jsonplaceholder.typicode.com/photos')
    .then(response => response.json())
    .then(data => {
      allImages = data;
    });

  let userId = 0;
  for (let i = 0; i < allAlbums.length; i++) {
    if (userId !== allAlbums[i].userId) {
      sortedAlbums.push(allAlbums[i]);
      userId = allAlbums[i].userId;
    }
  }

  const payload = {
    sortedAlbums: sortedAlbums,
    allImages: allImages,
  };
  console.log('All albums retrieved' + sortedAlbums.length);
  console.log('All images retrieved' + allImages.length);
  dispatch({type: actionTypes.LOAD_ALL_ALBUMS, payload: payload});
};

export const selectAlbum = (albumId, allImages) => async dispatch => {
  console.log('Selected Album is ' + albumId);
  const albumImages = [];
  const photoList = allImages;
  for (let i = 0; i < photoList.length; i++) {
    if (albumId === photoList[i].albumId) {
      albumImages.push(photoList[i]);
    }
  }

  const payload = {
    albumId: albumId,
    albumImages: albumImages,
  };
  dispatch({type: actionTypes.SELECT_ALBUM, payload: payload});
};

export const selectImage = (imageId, url) => async dispatch => {
  console.log('Selected Image is ' + imageId);
  const payload = {
    imageId: imageId,
    imageUrl: url,
  };
  dispatch({type: actionTypes.SELECT_IMAGE, payload: payload});
};

export const resetImageSelection = () => async dispatch => {
  console.log('Selected image cancelled');
  dispatch({type: actionTypes.RESET_SELECTED_IMAGE});
};

export const resetSelectedAlbum = () => async dispatch => {
  console.log('Selected album cancelled');
  dispatch({type: actionTypes.RESET_SELECTED_ALBUM});
};
