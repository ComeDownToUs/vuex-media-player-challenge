// eslint-disable-next-line
export const hashmapsArrays = {
  methods: {
    hashmapToArray(tracks) {
      return Object.keys(tracks).map(track => tracks[track]);
    },
  },
};
