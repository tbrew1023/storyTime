<template>
  <div id="app">
    <div class="loading-veil">
      <div class="loading-veil-inner">
        <div class="load-cat"></div>
        <div class="load-text">
            <div class="load-wrapp">
              <div class="load-6">
                <div class="letter-holder" style="display:flex; justify-content: center">
                  <div class="l-1 letter"><p>L</p></div>
                  <div class="l-2 letter"><p>o</p></div>
                  <div class="l-3 letter"><p>a</p></div>
                  <div class="l-4 letter"><p>d</p></div>
                  <div class="l-5 letter"><p>i</p></div>
                  <div class="l-6 letter"><p>n</p></div>
                  <div class="l-7 letter"><p>g</p></div>
                  <div class="l-8 letter"><p>.</p></div>
                  <div class="l-9 letter"><p>.</p></div>
                  <div class="l-10 letter"><p>.</p></div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
    <div class="cc" :class="[ 'g-cursor', { 'g-cursor_hover': hover }, {'g-cursor_hide': hideCursor} ]">
      <div :style="cursorCircle" class="g-cursor__circle"></div>
      <div class="g-cursor__point" ref="point" :style="cursorPoint"></div>
    </div>
    <div id="nav" class="hoverable">
      <h1 class="main-title">eric li</h1>
      <div class="link-list hoverable">
        <ul>
          <li @click="$refs.fullpage.api.moveTo(1)" class="hoverable"><span>></span>Home</li>
          <li @click="$refs.fullpage.api.moveTo(2)" class="hoverable"><span>></span>Work</li>
          <li @click="$refs.fullpage.api.moveTo(3)" class="hoverable"><span>></span>Contact</li>
        </ul>
      </div>
    </div>
    <router-view :dataRef='dataRef' :options="options" />
  </div>
</template>

<script>
import firebase from 'firebase'
//import CustomCursor from '@/components/CustomCursor'

export default {
  name: 'App',
  components: {
    //CustomCursor
  },
  data() {
    return {
      options: {
        scrollingSpeed: 2000,
        fadingEffect: true,
        setAutoscrolling: false,
        //easingcss3: 'cubic-bezier(0.87, 0, 0.13, 1)', //expo
        //easingcss3: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', //bounce
        easingcss3: 'cubic-bezier(0.65, 0, 0.35, 1)',
        anchors: ['home','work'],
        onLeave: (origin, destination, direction) => {
          this.handleLeave(origin, destination, direction);
        }
      },
      dataRef: {},
      xChild: 0,
      yChild: 0,
      xParent: 0,
      yParent: 0,
      hover: false,
      hideCursor: true
    }
  },
  computed: {
    cursorCircle() {
      return `transform: translateX(${this.xParent}px) translateY(${this.yParent}px) translateZ(0) translate3d(0, 0, 0);`
    },
    cursorPoint() {
      return `transform: translateX(${this.xChild - 3}px) translateY(${this.yChild - 3}px) translateZ(0) translate3d(0, 0, 0);`
    }
  },
  mounted() {
    this.fetchData();
    document.addEventListener("mousemove", this.moveCursor);
    document.addEventListener('mouseleave', (e) => {
      this.hideCursor = true;
      console.log('left: ', e.target);
    });
    document.addEventListener('mouseenter', (e) => {
      this.hideCursor = false;
      console.log('entered: ', e.target);
    });
  },
  methods: {
    fetchData() {
      var self = this;

      var fireRef = firebase.firestore().collection('test-collection');

      fireRef.get().then((docs) => {
        docs.forEach((doc) => {
          //console.log(doc.data());
          self.dataRef = doc.data();
        });
      });

    },
    handleNav(index) {
      console.clear();
      console.log(index);
      console.log('ROUTE HOME');
      this.$refs.fullpage.api.moveTo(1);
    },
    moveCursor(e) {
      var self = this;

      //console.log(e.target.classList);

      if(e.target.classList.contains('hoverable')) {
        //console.log('HOVERABLE:)');
        self.hover = true;
      }
      else {
        //console.log('NOT HOVERABLE!');
        self.hover = false;
      }

      this.xChild = e.clientX;
      this.yChild = e.clientY;
      setTimeout(() => {
        this.xParent = e.clientX - 20;
        this.yParent = e.clientY - 20;
      }, 100);
    }
  }
}
</script>

<style lang="scss">
html {
  transition: filter 1s;
}

.loading-veil {
  display: none;
  background: rgba(black, 1);
  width: 100%;
  height: 100vh;
  position: fixed;
  margin: 0px;
  padding: 0px;
  pointer-events: none;
  z-index: 99999;

  .load-cat {
    background-image: url('assets/4x/cat-mono-fill.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    width: 240px;
    height: 400px;
    position: absolute;
    left: 0px;
    right: 0px;
    margin: auto;
    top: 260px;
    border-radius: 8px;
  }

  .load-text {
    margin-top: 40px;
    text-align: center;
    position: absolute;
    margin: auto;
    left: 0px;
    right: 0px;
    top: 660px;
    font-size: 18px;
  }
}

.cc {
  position: absolute;
}

.page-container {
  height: 100vh;
  width: 100%;
  margin: 0px;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}

// ---------- transition shit -----------

//transition animation fade

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.fade-enter-active, .fade-leave-active {
  transition: all 300ms ease;
}

body {
  padding: 0px;
  margin: 0px;
  cursor: none;
}

@font-face {
  font-family: "Neuzeit Grotesk";
  src: url("assets/FONTS/Neuzeit_Grotesk/NeuzeitGro-Reg.woff") format("woff"),
       url("assets/FONTS/Neuzeit_Grotesk/NeuzeitGro-Reg.ttf") format("ttf");
}

p {
  font-family: 'Inconsolata', monospace !important; 
}

#app {
  font-family: 'Neuzeit Grotesk', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background: black; 
}

.main-title {
  padding: 0px;
  margin: 36px;
  font-size: 64px;
}

#nav {
  position: fixed;
  z-index: 9999;

  h1 {
    padding-left: 18px;
  }

  ul {
    list-style: none;
    text-align: left;
    font-family: 'Inconsolata', monospace;

    li {
      margin-top: 6px;
      font-size: 18px;

      &:hover {
        span {
          opacity: 1;
          padding-right: 8px;
        }
      }

      span {
        opacity: 0;
        margin-right: 12px;
        transition: 300ms;
        font-weight: bold;
      }
    }
  }

  a {
    color: white;
    text-decoration: none;
    opacity: 0.7;
    cursor: none;

    &.router-link-exact-active {
      color: white;
      opacity: 1;
      font-weight: bold;
    }
  }
}

// --------- cursor stuff ----------

.g-cursor {

    &_hide {
      opacity: 0;
      width: 60px;
      height: 60px;
      transition: 
        width .6s ease,
        height .6s ease,
        opacity .6s ease;
    }

    &__circle {
      pointer-events: none;
      user-select: none;
      top: 0;
      left: 0;
      position: fixed;
      width: 36px;
      height: 36px;
      border: 4px solid rgba(white, 0.8);
      //background: rgba(white,0.3);
      border-radius: 100%;
      z-index: 5555;
      backface-visibility: hidden;
      transition: 
        margin 0.6s ease,
        opacity 0.6s ease,
        width 0.6s ease,
        height 0.6s ease,
    }

    &__point {
      top: 0;
      left: 0;
      position: fixed;
      width: 10px;
      height: 10px;
      pointer-events: none;
      user-select: none;
      border-radius: 100%;
      background: #fff;
      z-index: 55555555;
      backface-visibility: hidden;
      will-change: transform;
      transition:
        margin .4s ease,
        opacity .4s ease,
        width .4s ease,
        height .4s ease;
    }

    &_hover {
      .g-cursor__point {
          //opacity: 0.7;
          width: 36px;
          height: 36px;
          margin-left: -12px;
          margin-top: -12px;
          background: white;
          mix-blend-mode: difference;
          //background: rgba(white, 1);
          //border-color: white;
          transition: 
            margin .4s ease,
            width .4s ease,
            height .4s ease,
            opacity .4s ease,
            transform 0s;
        }

        .g-cursor__circle {
          opacity: 0;
          width: 3px;
          height: 3px;
          margin-left: 15px;
          margin-top: 15px;
          //background: rgba(white, 1);
          //border-color: transparent;
          transition: 
            margin .4s ease,
            width .4s ease,
            height .4s ease,
            opacity .4s ease;
      }
    }
  }

// ---------- load letter stuff ----------

.load-6 .letter {
  animation-name: loadingF;
  animation-duration: 1.6s;
  animation-iteration-count: infinite;
  animation-direction: linear;
}

.l-1 {
  animation-delay: 0.48s;
}
.l-2 {
  animation-delay: 0.6s;
}
.l-3 {
  animation-delay: 0.72s;
}
.l-4 {
  animation-delay: 0.84s;
}
.l-5 {
  animation-delay: 0.96s;
}
.l-6 {
  animation-delay: 1.08s;
}
.l-7 {
  animation-delay: 1.2s;
}
.l-8 {
  animation-delay: 1.32s;
}
.l-9 {
  animation-delay: 1.44s;
}
.l-10 {
  animation-delay: 1.56s;
}

@keyframes loadingF {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
  }
}
</style>
