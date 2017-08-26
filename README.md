[original submitted version for time restricted coding challenge is available on its own branch]


To run api

```
  cd api
  npm install
  npm start
```

To run SPA

```
  cd media-player
  npm install
  npm run dev
```

Built using Vue-Cli, Bootstrap and a repurposed API from elsewhere with the data from the provided server.

Data on the API is not written to anywhere so when you terminate the server, any data you've assigned is lost.

Tests and automation all set up by the cli, read media-player/README.md for the vue-cli options

## Features

### Working:
  - list of songs, all retrieved from server at once
  - play/pause button
  - next song, previous song (loops back/forward at beginning and end)
  - rate song, works and applies to server only included like/unlike, 1-5 could be easily done but it's not a good choice for the task at hand
  - when a song ends, the next one starts
  - time slider (although requires optimisation)
  - play operatons (likely buggy, underlying code ready for rewinding and fast-forwarding)

### Not working:
  - Sorting and filtering (both quite easy to add, I would imagine, but I dont know vue well enough)
  - Now Playing viewer, 

### Not working well:
  - playlists are missing many common key features that should be easily added now
  - the actual CSS is a mess but mostly scoped within the individual components, focus was on getting the operations running and I can make a nice stylesheet later if I want
  - there's some issue with the TrackList displayer at the moment, it tries to run it before the playlist is able to be loaded at some points
  - layout tweaks for iPhone 5/SE

### Extra features:
  - volume toggle (updates state)
  - repeat toggle (actually works, repeats one track)
  - save now playing as playlist (converts to simpler playlist object and posts to server)
  - play current tracklist as playlist (this would be a lot more impressive with sorting and filter working)
  - add track from tracklist to now playing (if the now playing list has been saved, this will enable you to save it again as a new playlist rather than updating that playlist)
  - responsive layout (designed to look okay on iPhone 5 in portrait)


## Reasoning

### Approach
I pretty much immediately decided to use vue-cli and vuex as it would get most of the setup out of the way (tests, webpack, hot reloading, editorconfig, eslint, etc) as this is really quite a long task. 

Following that I mapped out approaches to handle the state with vuex, I didn't really take into account just how awkward this would be with the player iterating through the time. This was mostly coming from the data in the provided server. Further benefits of Vuex for a project such as this have been mentioned elsewhere in my details.

Next I played around with the provided server. Wasn't very keen on it, it was writing post requests completely differently to the existing layout, ommitting aspects and the documentation didn't really explain whether this was intentional or not. As my logic was based around the existing server I decided I would just use the existing data with some tweaks in another server.

...and then I built it? Firstly the tracklist component and player, then routing, then a hodge podge of other parts

### Design goals
  - Responsive (following bootstrap conventions)
  - some attempts to ensure most functionality remains but mostly focused on a readable layout
  - Reasonably wide browser support (i.e. avoid very new CSS)
  - Everything fits on screen at once for each page (w/e of the list of tracks/playlists), position fixed applied to other components
  - Attempts to replicate most music players where possible 
    (e.g. like/unlike instead of star rating, option to play list of results as a dynamic playlist)
  - keep it simple, keep application logic as apart from UI as possible for making a better layout later

### 3rd Party Libraries
  - By using vue-cli, the system uses webpack, karma+mocha and nightwatch by default, which are probably the options I'd use in that case anyway
  - Vue was largely chosen due to this very speedy setup, I could probably do most of that manually but the task is already long enough
  - Vuex handles the state, honestly it made this task more complicated than needed but I'm confident following a few resolutions to core operations that it'd be very beneficial and suited to significantly scaling up. Please install the vue chrome extension for an easy view of the underlying logic. Several other operations have already got their general Vuex operations set out and ready for implementation
  - uuid is used to generate new IDs, I changed the database around a bit to be able to refer to items by their IDs more easily
  - Bootstrap 3 was used due to (1) extensive experience with it and (2) very quickly implemented responsive layout
  - Axios was used to handle the few API requests I made, no particular reason over any other one
  - vue-slider-component handles the slider operations

### Attempts at Clean Code
  - Using Vuex to enfore an ordered approach to operations
  - Aiming for readable and consistent naming conventions (readability > consistency)
  - Following Airbnb's ESLint specifications (search 'eslint-disable' for anywhere I failed here)
  - buttons typically will contain their action on the same line as the tag name, all further attributes located on further lines
  - a lot of class naming for potential future testability

### Testing
  - Nightwatch for general operations testing, just clicking on all the various things and ensuring they change correctly basically
  - karma for unit testing, very limited because I haven't had to test with Vuex before and the basic setup for testing individual components was taking ages (tests currently failing due to some issue with the store I hadn't time to fully break down)
  - the only portions that really need testing were mostly hurt by time constraints (e.g. sorting and filtering) and the actual play operation sorely needs testing

### Todos
  - Resolve testing issues
  - sort trackList table
  - filter trackList table
  - now playing display modal
  - edit and name playlists
  - CSS Grid layout (I like CSS Grid)
  - alternative layouts
Further suggestions very much appreciated!
