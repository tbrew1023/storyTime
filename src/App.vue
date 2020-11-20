<script>
export default {
  name: 'App',
  data() {
    return {
      time: {
        weekdays: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        currentDate: null,
        currentTime: null,
        currentTime24: null,
      },
      weather: {
        currentWeather: null,
        location: 'Chicago, IL',
        degreeType: 'F'
      },
      dataRef: {},
      xChild: 0,
      yChild: 0,
      xParent: 0,
      yParent: 0,
      hover: false,
      hideCursor: false,
      unveil: null
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
    this.getWeather();
    this.startTime();
    setTimeout(() => {
      this.unveil = true;
      //this.waveOffset = 700;
      console.log('unveiled');
    }, 3000);
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
    getWeather() {
      const weather = require('weather-js');

      weather.find(
        { 
          search: this.weather.location, 
          degreeType: this.weather.degreeType 
        },
        (error, result) => {
          if (error) console.error(error);

          //console.log(JSON.stringify(result, null, 2));
          console.log('chicago temp: ', result[0].current.temperature);
          this.weather.currentWeather = result[0].current.temperature + '°' + this.weather.degreeType;
        },
      )
    },
    handleNav(index) {
      console.clear();
      console.log(index);
      console.log('ROUTE HOME');
      this.$refs.fullpage.api.moveTo(1);
    },
    startTime() {
      //console.log('tock');
      var today = new Date();
      var h = today.getHours();
      var m = today.getMinutes();
      //var s = today.getSeconds();
      m = this.checkTime(m);
      //s = this.checkTime(s);
      this.time.currentTime = (h + ":" + m);
      this.time.currentTime24 = ((h < 13 ? h : h - 12 ) + ":" + m + ( h < 13 ? ' AM' : ' PM' ));
      this.time.currentDate = this.time.weekdays[parseInt(today.getDay())] + ' ' + this.time.months[today.getMonth()] + ' ' + today.getUTCDate();
      setTimeout(this.startTime, 500);
    },
    checkTime(i) {
      if (i < 10) {i = "0" + i}  // add zero in front of numbers < 10
      return i;
    },
    moveCursor(e) {
      var self = this;

      //console.log(e.target.classList);

      if(e.target.classList.contains('hoverable') || e.target.classList.contains('fp-tooltip') || e.target.tagName == "SPAN") {
        //console.log(e.target.tagName);
        //console.log('HOVERABLE:)');
        self.hover = true;
      } else {
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

<template>
  <div id="app">
    <div class="topbar">
      <div class="left">
        Activities
      </div>
      <div class="middle">
        <div class="time-container">
          {{ time.currentTime24 + ', ' + time.currentDate }}
        </div>
        <div class="weather-container">
          <div class="weather-icon icon"></div>
          <div class="weather-text">{{ weather.currentWeather }}</div>
        </div>
      </div>
      <div class="right menu icon"></div>
    </div>

    <div :class="(unveil ? 'swoop' : '' )" class="logo-loader"></div>
    <div :class="(unveil ? 'loading-veil unveil' : 'loading-veil')">
    </div>
    <!--div class="cc" :class="[ 'g-cursor', { 'g-cursor_hover': hover }, {'g-cursor_hide': hideCursor} ]">
      <div :style="cursorCircle" class="g-cursor__circle"></div>
      <div class="g-cursor__point" ref="point" :style="cursorPoint"></div>
    </div-->
    <router-view :dataRef='dataRef' />
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Work+Sans&display=swap');

html {
  transition: filter 1s;
  font-family: 'Work Sans', sans-serif !important;
}

body {
  background: black;
  margin: 0px;
  padding: 0px;
}

.topbar {
  background: black;
  color: white;
  position: fixed;
  top: 0px;
  width: 100vw;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 999999;
  font-size: 14px;
  line-height: 24px;

  .left {
    margin-left: 36px;
    cursor: pointer;

    &:hover {
      opacity: 0.3;
    }
  }

  .middle {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    .time-container {
      &:hover {
        opacity: 0.3;
      }
    }

    .weather-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .weather-icon {
      margin-left: 12px;
      margin-right: 12px;
      width: 20px;
      height: 20px;
      background-image: url('assets/icons/weather.svg');
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      
      &:hover {
        opacity: 0.3;
      }
    }
  }

  .right {
    margin-right: 18px;
    //background: red;
    background-image: url('assets/icons/menu.svg');
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    height: 22px;
    width: 22px;
    cursor: pointer;

    &:hover {
      opacity: 0.3;
    }
  }
}

.swoop {
  transform: translate(-78px, -88px) scale(0.08) !important;
  //background: green !important;
  transition: 1s cubic-bezier(0.65, 0, 0.35, 1);
}

.logo-loader {
  position: absolute;
  top: 0px;
  left: 0px;
  transform: translate(calc(50vw - 100px), calc(50vh - 100px));
  margin: auto;
  z-index: 999999;
  width: 200px;
  height: 200px;
  //background: pink;  
  transition: 2s cubic-bezier(0.65, 0, 0.35, 1);
  background-image: url('assets/sample-emblem-white.png');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}

.fp-slideNav {
  margin-bottom: 400px !important;

  ul li a span {
    background: red !important;
  }
}

#fp-nav {

  margin-left: 48px;

  li {
    margin-bottom: 36px !important;
  }

  .fp-tooltip {
    font-size: 18px !important;
    padding-left: 32px;
    line-height: 38px;
  }

  .active span {
    opacity: 1 !important;
    background: white !important;
    border: 2px solid white;
    //transform: translate(4px,4px);

    &:hover {
      //transform: translate(-1px,-1px) !important;
      //transform: scale(1.5);
    }
  }

  span {
    background: white !important;
    //background: rgba(0,0,0,0) !important;
    //height: 24px !important;
    //width: 24px !important;
    //transform: translate(-1px,-1px);
    transform: none !important;

    &:hover {
      //transform: translate(-1px,-1px);
      //transform: scale(1.05);
    }
  }
}

.unveil {
  opacity: 0 !important;
  transition: 4s;
  pointer-events: none;
}

.loading-veil {
  //display: none;
  background: #222;
  opacity: 1;
  width: 100%;
  height: 100vh;
  position: fixed;
  margin: 0px;
  padding: 0px;
  pointer-events: none;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 2s;
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

// --------- cursor stuff ----------

.g-cursor {
    position: absolute;

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
      top: 2px;
      left: 2px;
      position: fixed;
      width: 36px;
      height: 36px;
      border: 2px solid rgba(white, 1);
      mix-blend-mode: difference;
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
      opacity: 0;
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
          opacity: 0;
          width: 64px;
          height: 64px;
          margin-left: -24px;
          margin-top: -24px;
          border: 2px solid rgba(white, 1);
          //background: white;
          //mix-blend-mode: difference;
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
          opacity: 1;
          width: 64px;
          height: 64px;
          margin-left: -12px;
          margin-top: -12px;
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

@media only screen and (max-width: 900px) {
  .g-cursor {
    display: none !important;
  }
}
</style>
