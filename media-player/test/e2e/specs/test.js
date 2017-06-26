// Requires API to be running
// Primarily testing speeds

module.exports = {
  'Basic player operations': function test(browser) {

    const devServer = browser.globals.devServerURL;

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.library-title')
      .assert.containsText('.no-tracks', 'No tracks selected')
      .click('.track-play')
      .waitForElementVisible('.nowplaying-active', 1000)
      .assert.containsText('.player-duration', '1 of ')
      .click('.player-repeat')
      .waitForElementVisible('.player-repeat.toggle-active', 1000)
      .click('.player-repeat')
      .waitForElementNotPresent('.player-repeat.toggle-active', 1000)
      .click('.player-mute')
      .waitForElementVisible('.glyphicon-volume-off', 1000)
      .click('.player-mute')
      .waitForElementNotPresent('.glyphicon-volume-off', 1000)
      .click('.player-forward')
      .assert.containsText('.player-duration', '2 of ')
      .click('.player-back')
      .assert.containsText('.player-duration', '1 of ')
      .click('.row.track:nth-child(2) .track-play')
      .assert.containsText('.player-duration', '2 of ')
      .end();
  },
  'PlaylistView': function test(browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL;

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.library-title')
      .click('.link-playlist')
      .waitForElementVisible('.playlist.heading', 1000)
      .assert.containsText('.row.playlist:nth-child(2) .playlist-name', 'Main')
      .click('.row.playlist:nth-child(2) .playlist-link')
      .waitForElementVisible('.row.tracks:nth-child(1)', 1000)
      .assert.containsText('.track-artist', 'Rihanna')
      .end();
  },
};
