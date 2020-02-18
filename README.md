# twitch-overlays

My twitch components & overlays for my stream.

Added routes for each view (waiting/playing) or component (countdown...).

## Vues

### Playing

Contains all the overlays to play a game. Can be either all static or I can do lots of small views that can be integrated to the stream.

### Snack-time !

Countdown (or not) to take a pause while streaming.

### Beginning of the stream

Countdown before stream really begins.

### Ending of the stream

Countdown before stream shutdown.

## Project techs

I'm using Vue.js 2 with the plugin that permits to test the new hooks that are coming in Vue.js 3.

I'm using a minimum of libs (the lesser the better) and make straight calls to twitch api.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
