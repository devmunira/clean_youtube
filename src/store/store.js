import { createStore } from 'easy-peasy';
import favoritePlaylistModel from './favoritePlaylistModel';
import PlaylistModal from './playlistModal';
import recentPlaylistModel from './recentsPlaylistModel';

const store = createStore({
  playlist : PlaylistModal,
  recents  : recentPlaylistModel,
  favorite : favoritePlaylistModel
});

export default store;