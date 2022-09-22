<template>
  <span>{{actualBaseText}}
    <span :style="currentTextStyle">{{ actualText }}
      <span :style="[cursorColorStyle, cursorSizeStyle, cursorBlinkSpeedStyle]" :class="[cursorBlinkClass]">|</span>
    </span>
  </span>
</template>

<script>
export default {
  name: 'VueAutoTyper',
  props: {
    baseText: {
      type: String,
      required: true,
    },
    texts: {
      type: Array,
      default: () => [],
    },
    delayOnWriter: {
      type: Number,
      default: 100,
    },
    delayOnStart: {
      type: Number,
      default: 1500,
    },
    delayBetweenTexts: {
      type: Number,
      default: 1500,
    },
    cursorSize: {
      type: Number,
      default: 30,
    },
    cursorBlinkSpeed: {
      type: Number,
      default: 2,
    },
    cursorColor: {
      type: String,
      default: '#000000',
    },
    disableCursorBlink: {
      type: Boolean,
    },
    infinite: {
      type: Boolean,
    },
  },

  watch: {
    delayOnStart() {
      clearInterval(this.interval);
      this.startFill();
    },
  },

  computed: {
    cursorColorStyle() {
      return { color: this.cursorColor };
    },
    cursorSizeStyle() {
      return { fontSize: `${this.cursorSize}px` };
    },
    cursorBlinkSpeedStyle() {
      return {
        animationDuration: `${this.cursorBlinkSpeed}s`,
        webkitAnimationDuration: `${this.cursorBlinkSpeed}s`
      };
    },
    cursorBlinkClass() {
      return !this.disableCursorBlink ? 'cursor-blink' : '';
    },
  },

  data: () => ({
    actualText: '',
    actualBaseText: '',
    currentTextStyle: '',
    actualTextIndex: 0,
    interval: null,
  }),

  methods: {
    addToActualBaseText(nextText) {
      let index = 0;

      this.interval = setInterval(() => {
        const char = this.baseText[index];
        if (!char) {
          clearInterval(this.interval);
          this.addToActualText(nextText);
          return;
        }

        this.actualBaseText = `${this.actualBaseText}${char}`;
        index++;
      }, this.delayOnWriter);
    },
    addToActualText(text) {
      let index = 0;
      this.interval = setInterval(() => {
        const char = text[index];
        if (!char) {
          clearInterval(this.interval);
          this.setNextTexts();
          return;
        }
        this.actualText = `${this.actualText}${char}`;
        index++;
      }, this.delayOnWriter);
    },
    setNextTexts() {
      if (this.infinite) {
        this.startFill();
        return;
      }

      if (!this.texts[this.actualTextIndex]) return;

      let nextTextIndex = this.actualTextIndex + 1;
      if (!this.texts[nextTextIndex]) nextTextIndex = 0;

      const nextText = this.texts[nextTextIndex];
      setTimeout(() => {
        this.replaceInActualText(this.texts[this.actualTextIndex].value, nextText.value, nextText.style);
        this.actualTextIndex = nextTextIndex;
      }, this.delayBetweenTexts);
    },
    replaceInActualText(previousText, nextText, nextTextStyle) {
      let index = previousText.length - 1;

      this.interval = setInterval(() => {
        const char = previousText[index];
        if (!char) {
          clearInterval(this.interval);
          this.currentTextStyle = nextTextStyle;
          this.addToActualText(nextText);
          return;
        }

        this.actualText = this.actualText.slice(0, -1);
        index--;
      }, this.delayOnWriter);
    },
    startFill() {
      const nextText = this.texts[this.actualTextIndex];
      const text = nextText ? nextText.value : '';
      this.currentTextStyle = nextText ? nextText.style : '';
      setTimeout(() => {
        this.actualText = '';
        this.actualBaseText = '';
        this.addToActualBaseText(text);
      }, this.delayOnStart);
    },
  },

  mounted() {
    this.startFill();
  },

};
</script>

<style scoped>
.no-spaces {
  padding: 0px;
  margin:0px;
}

.cursor-blink {
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-name: blink;
  animation-name: blink;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}

@-webkit-keyframes blink {
  from,
  50%,
  to {
    opacity: 1;
  }

  25%,
  75% {
    opacity: 0;
  }
}
@keyframes blink {
  from,
  50%,
  to {
    opacity: 1;
  }

  25%,
  75% {
    opacity: 0;
  }
}
</style>