import {
  expandPlaylistFromIds,
} from '../../../src/vuex/general_media/actions';

describe('actions test', () => {
  const dataPlaylist = {
    name: 'Main',
    tracks: [
      'ffc4d1b6-56f0-11e7-907b-a6006ad3dba0',
      'ffc4d45e-56f0-11e7-907b-a6006ad3dba0',
    ],
  };
  const dataTracks = {
    'ffc4d1b6-56f0-11e7-907b-a6006ad3dba0': {
      artist: 'Solu Music',
      duration: 59,
      track_path: 'http://www.stephaniequinn.com/Music/Allegro from Duet in C Major.mp3',
      title: 'Fade (feat Kimblee - Fuchse remix)',
      genre: 'Trance',
      rating: false,
      id: 'ffc4d1b6-56f0-11e7-907b-a6006ad3dba0',
    },
    'ffc4d45e-56f0-11e7-907b-a6006ad3dba0': {
      artist: 'Freemasons',
      duration: 90,
      track_path: 'http://www.stephaniequinn.com/Music/Canon.mp3',
      title: 'Tears (Club Mix)',
      genre: 'House',
      rating: false,
      id: 'ffc4d45e-56f0-11e7-907b-a6006ad3dba0',
    },
  };

  it('Tests building track list from IDs alone', () => {
    expect(expandPlaylistFromIds(dataTracks, dataPlaylist.tracks))
      .to.deep.equal(
        [dataTracks[dataPlaylist.tracks[0]], dataTracks[dataPlaylist.tracks[1]]]);
  });
});
