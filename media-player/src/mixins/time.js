// eslint-disable-next-line
export const timeMixin = {
  methods: {
    timeDisplay(time) {
      const negative = (time < 0);
      if (negative) {
        // eslint-disable-next-line no-param-reassign
        time *= -1;
      }
      const minutes = ((negative ? '-' : '') + Math.floor(time / 60).toString());
      const seconds = ((time % 60 > 9) ? (time % 60) : `0${time % 60}`);
      return `${minutes}:${seconds}`;
    },
  },
};
