<template>
  <div id="app">
    <!--CustomCursor
      :targets="['img', 'a', 'button', 'your-hover-class']"
      :circleColor="'#fff'"
      :circleColorHover="'#2f2f2f'"
      :dotColor="'#2f2f2f'"
      :dotColorHover="'lightgray'"
      :hoverSize="1.8"
    ></CustomCursor-->
    <div class="cc" :class="[ 'g-cursor', { 'g-cursor_hover': hover }, {'g-cursor_hide': hideCursor} ]">
      <div :style="cursorCircle" class="g-cursor__circle"></div>
      <div class="g-cursor__point" ref="point" :style="cursorPoint"></div>
    </div>
    <div id="nav" class="hoverable">
      <h1 class="main-title">eric li</h1>
      <div class="link-list hoverable">
        <ul>
          <li><span>></span><router-link class="hoverable" to="/#home" v-on:click.native="handleNav(1)">home</router-link></li>
          <li><span>></span><router-link class="hoverable" to="/#work" v-on:click.native="handleNav(2)">work</router-link></li>
          <li><span>></span><router-link class="hoverable" to="/contact">contact</router-link></li>
        </ul>
      </div>
    </div>
    <router-view :dataRef='dataRef' />
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
      border: 4px solid rgba(white, 0.5);
      //background: rgba(white,0.3);
      border-radius: 100%;
      z-index: 5555;
      backface-visibility: hidden;
      transition: 
        opacity 0.6s ease,
        width 0.6s ease,
        height 0.6s ease;
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
    }

    &_hover {
      .g-cursor__point {
          opacity: 0.8;
          //width: 40px;
          //height: 40px;
          //background: rgba(white, 1);
          //border-color: white;
          transition: 
            width .4s ease,
            height .4s ease,
            opacity .4s ease,
            transform 0s;
        }

        .g-cursor__circle {
          opacity: 0;
          width: 5px;
          height: 5px;
          //background: rgba(white, 1);
          //border-color: transparent;
          transition: 
            width .4s ease,
            height .4s ease,
            opacity .4s ease;
      }
    }
  }
</style>
