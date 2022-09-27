<div align="center">
  <img src="https://i.imgur.com/ySmlMPR.gif" >
  <h1>Vue Auto Typer</h1>
</div>
<p align="center">
  Just a simple and lightweight auto writer/typer component made with Vue.js.
</p>

[![version](https://img.shields.io/npm/v/vue-auto-writer.svg)](https://github.com/Adolfok3/vue-auto-writer)
[![codecov](https://codecov.io/github/Adolfok3/vue-auto-writer/branch/master/graph/badge.svg)](https://codecov.io/github/Adolfok3/vue-auto-writer)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Downloads](https://img.shields.io/npm/dt/vue-auto-writer.svg)](https://github.com/Adolfok3/vue-auto-writer)
[![Build](https://github.com/Adolfok3/vue-auto-writer/actions/workflows/master.yml/badge.svg)](https://github.com/Adolfok3/vue-auto-writer)

## Demo
[![Edit Checkbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vue-auto-writer-ygci59)

## Installation
### npm
```bash
$ npm install vue-auto-writer --save
```

### yarn (recommended)
```bash
$ yarn add vue-auto-writer
```

## Quick start
### Vue.js
You can import in your `main.js` file

```js
import Vue from "vue";
import VueAutoWriter from "vue-auto-writer";

Vue.use(VueAutoWriter);
```

Or locally in any component
```js
import VueAutoWriter from "vue-auto-writer";

export default {
  components: {
    VueAutoWriter,
  },
};
```

## Basic usage
<img src="https://i.imgur.com/BAn4INi.gif">

```html
<template>
  <vue-auto-writer base-text="Hello World" />
</template>
```

You can use a custom css class to change the writer text style

<img src="https://i.imgur.com/hMdJ0Sc.gif">

```html
<template>
  <vue-auto-writer class="my-writer" base-text="Hello World" />
</template>

<style>
  .my-writer {
    font-family: 'Fredoka One';
    font-size: 20px;
    font-weight: 600;
    word-spacing: 5px;
  }
</style>
```

With replaceable texts. You can also use custom style to each replacement

<img src="https://i.imgur.com/N7whXFw.gif">

```html
<template>
  <vue-auto-writer base-text="Hi! I'm" :texts="replaceableTexts" />
</template>

<script>
  export default {
    data: () => ({
      replaceableTexts: [
       {
        value: 'John Doe',
       },
       {
        value: 'Jane Doe',
        style: 'color: red; font-size: 25px; background-color: yellow;'
       },
      ]
    })
  }
</script>
```

## Props
| Property name        | Type    | Default | Required         | Description                                                                                |
| -------------------- | ------- | ------- | ---------------- | ------------------------------------------------------------------------                   |
| base-text            | String  |         |:heavy_check_mark:| String that contains the base text to be displayed                                         |
| texts                | Array   |   []    |                  | Array of objects that contains the text and style which will be replaced                   |
| delay-on-writer      | Number  |   100   |                  | Set the writing speed in milliseconds                                                      |
| delay-on-start       | Number  |  1500   |                  | Set the delay before start write in milliseconds                                           |
| delay-between-texts  | Number  |  1500   |                  | Set the delay before write next text in milliseconds                                       |
| cursor-size          | Number  |   30    |                  | Set the cursor size in                                                                     |
| cursor-color         | String  | #000000 |                  | Set the cursor color                                                                       |
| cursor-blink-speed   | Number  |    2    |                  | Set the cursor blink speed                                                                 |
| disable-cursor-blink | Boolean |  false  |                  | Disable the cursor blink                                                                   |
| infinite             | Boolean |  false  |                  | Restarts writer after finish write the base text (won't work if the texts prop has passed) |

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/adolfok3)

## License
MIT © [Adolfok3](https://github.com/Adolfok3/vue-auto-writer/blob/master/LICENSE)