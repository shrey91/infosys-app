import * as constants from '../constants';
const initialState = {
  count: 0,
  sortedAlbums: [],
  allImages: [],
  selectedImage: null,
  selectedAlbum: null,
  selectedAlbumImages: [],
  selectedImageUrl: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.COUNTER_CHANGE:
      return {
        ...state,
        count: action.payload,
      };
    case constants.LOAD_ALL_ALBUMS:
      return {
        ...state,
        sortedAlbums: action.payload.sortedAlbums,
        allImages: action.payload.allImages,
      };
    case constants.SELECT_ALBUM:
      return {
        ...state,
        selectedAlbum: action.payload.albumId,
        selectedAlbumImages: action.payload.albumImages,
      };
    case constants.SELECT_IMAGE:
      return {
        ...state,
        selectedImage: action.payload.imageId,
        selectedImageUrl: action.payload.imageUrl,
      };
    case constants.RESET_SELECTED_IMAGE:
      return {
        ...state,
        selectedImageUrl: null,
        selectedImage: null,
      };
    case constants.RESET_SELECTED_ALBUM:
      return {
        ...state,
        selectedAlbum: null,
        selectedAlbumImages: [],
      };
    default:
      return state;
  }
};
export default reducer;
