/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import SliderEntry from '../component/SliderEntry';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const data = [
    {
        "albumId": 1,
        "id": 1,
        "title": "accusamus beatae ad facilis cum similique qui sunt",
        "url": "https://via.placeholder.com/600/92c952",
        "thumbnailUrl": "https://via.placeholder.com/150/92c952"
    },
    {
        "albumId": 1,
        "id": 2,
        "title": "reprehenderit est deserunt velit ipsam",
        "url": "https://via.placeholder.com/600/771796",
        "thumbnailUrl": "https://via.placeholder.com/150/771796"
    },
    {
        "albumId": 1,
        "id": 3,
        "title": "officia porro iure quia iusto qui ipsa ut modi",
        "url": "https://via.placeholder.com/600/24f355",
        "thumbnailUrl": "https://via.placeholder.com/150/24f355"
    }];

const albums = [
    {
        "userId": 1,
        "id": 1,
        "title": "quidem molestiae enim"
    },
    {
        "userId": 1,
        "id": 2,
        "title": "sunt qui excepturi placeat culpa"
    },
    {
        "userId": 1,
        "id": 3,
        "title": "omnis laborum odio"
    },
    {
        "userId": 1,
        "id": 4,
        "title": "non esse culpa molestiae omnis sed optio"
    }
];

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

Enzyme.configure({adapter: new Adapter()});
describe('async actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })
});

it('renders correctly', () => {
    const store = mockStore();
    shallow(
        <Provider store={store}>
            <App/>
        </Provider>
    );
});

function setup() {
    const props = {
        albums: albums,
        selectedAlbum: albums[1].userId,

    }
    const store = mockStore();
    const enzymeWrapper =
        shallow(
            <Provider store={store}>
                <App {...props}/>
            </Provider>
        );
    const enzymeComponent = shallow(
        <Provider store={store}>
            <SliderEntry data={data}/>
        </Provider>)

    return {
        props,
        enzymeWrapper,
        enzymeComponent
    }
}

describe('components', () => {
    describe('App', () => {
        it("Base App check", () => {
            const {enzymeWrapper} = setup();
            console.log(enzymeWrapper.debug());
            const appProps = enzymeWrapper.find('Connect(App)').props();
            expect(appProps.selectedAlbum).toEqual(1);
            expect(appProps.albums.length).toEqual(4);
        });
      it("Component check", () => {
        const {enzymeComponent} = setup();
        console.log(enzymeComponent.debug());
        const compProps = enzymeComponent.find('Connect(SliderEntry)').props();
        expect(compProps.data.length).toEqual(3);
      });
    })
})
