import { hashmapsArrays } from '../../../src/mixins/hashmapsArrays';
import { timeMixin } from '../../../src/mixins/time';

describe('timeMixin test', () => {
  it('tests the time conversion', () => {
    expect(timeMixin.methods.timeDisplay(55))
      .to.equal('0:55');
    expect(timeMixin.methods.timeDisplay(65))
      .to.equal('1:05');
  });
  it('tests single digits', () => {
    expect(timeMixin.methods.timeDisplay(5))
      .to.equal('0:05');
  });
  it('tests negative digits', () => {
    expect(timeMixin.methods.timeDisplay(-55))
      .to.equal('-0:55');
  });
});

describe('hashmapArray conversions', () => {
  const trackData = {
    id1: {
      name: 'track1',
    },
    id2: {
      name: 'track2',
    },
  };

  it('converts track object (with IDs as keys) to a track array', () => {
    expect(hashmapsArrays.methods.hashmapToArray(trackData))
      .to.deep.equal([{ name: 'track1' }, { name: 'track2' }]);
  });
});
