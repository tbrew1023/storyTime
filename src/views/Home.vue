<template>
<transition name="fade" mode="out-in">
  <div class="home">
    <full-page ref="fullpage" :options="options" id="fullpage">
      <section class="section">
        <div class="section-inner">
          <div class="clouds-container">
            <div :style="( triggerDown ? 'parallax-down' : ( triggerUp ? 'parallax-up' : '' ) )" class="cloud cloud1"></div>
            <div class="cloud cloud2"></div>
            <div class="cloud cloud3" :class="( fix ? 'invisible parallax2' : 'visible' )"></div>
            <div class="cloud cloud4" :class="( fix ? 'invisible parallax3' : 'visible' )"></div>
          </div>
          <div class="main-stuff">
            <div class="home-section clocks-container">
              <h2>
                <div class="clock-inner">
                  <h3>chicago</h3>
                  <h4>00:00</h4>
                </div>
              </h2>
              <h2>
                <div class="clock-inner">
                  <h3>tokyo</h3>
                  <h4>00:00</h4>
                </div>
              </h2>
              <h2>
                <div class="clock-inner">
                  <h3>new york</h3>
                  <h4>00:00</h4>
                </div>
              </h2>
              <h2>
                <div class="clock-inner">
                  <h3>sydney</h3>
                  <h4>00:00</h4>
                </div>
              </h2>
              <h2>
                <div class="clock-inner">
                  <h3>london</h3>
                  <h4>00:00</h4>
                </div>
              </h2>
            </div>
            <div class="home-section roles-container">
              <h2>DESIGNER</h2>
              <h2>WORKER</h2>
              <h2>PRODUCER</h2>
            </div>
            <div :class="( fix ? 'implode' : '' )" class="cat-container cat-container-centered home-section">
              <div @click="$refs.fullpage.api.moveSectionDown()" class="cat"></div>
              <p>Scroll down for work</p>
            </div>
          </div>
          <div :class="( fix ? 'invisible dragon-after' : 'visible' )" class="dragon-container">
            <p class="dragon-text">Or we could just chil....</p>
          </div>
          <div :class="( fix ? 'invisible parallax1' : 'visible' )" class="bottom-cloud-container"></div>
        </div>  
      </section>
      <!-- MAIN WORKS PAGE -->
      <section class="section">
        <div class="section-inner">
          <h2>hello there:)</h2>
        </div>  
      </section>
    </full-page>
  </div>
</transition>
</template>

<script>
//import firebase from 'firebase'

export default {
  name: 'Home',
  data() {
    return {
      options: {
        scrollingSpeed: 2000,
        fadingEffect: true,
        setAutoscrolling: false,
        anchors: ['home','work'],
        onLeave: (origin, destination, direction) => {
          this.handleLeave(origin, destination, direction);
        }
      },
      triggerUp: false,
      triggerDown: false,
      fix: false
    }
  },
  props: {
    dataRef: Object
  },
  components: {

  },
  methods: {
    handleLeave(origin, destination, direction) {
      console.clear();
      console.log('origin: ', origin);
      console.log('destination: ', destination);
      console.log('direction: ', direction);
  

      if(destination.index == 0) {
        console.log('lock');
        this.fix = false;
      }
      else {
        this.fix = true;
        console.log('unlock');
      }

      if(direction == 'up') {
        this.triggerUp = true;
        this.triggerDown = false;
      }
      else {
        this.triggerDown = true;
        this.triggerUp = false;
      }
    },
    handleScroll() {
      //console.log(scrollY);
      //this.bannerOffset = scrollY;
    },
  }
}
</script>

<style lang="scss" scoped>

@import '../assets/variables';

.implode {
  transform: scale(0.8);
  opacity: 0.4;
  position: absolute;
}

.shrunk {
  transform: translateY(-200px) !important;
  transition: 1s;
}

.parallax1 {
  transform: scale(1.15) translateY(-200px);
}

.parallax2 {
  transform: scale(0.8) translateY(-400px);
  opacity: 0.5;
}

.parallax3 {
  transform: scale(0.6) translateY(-300px);
  opacity: 0.8;
}

.invisible {
  //opacity: 0;
  transition: 2s;
}

.visible {
  opacity: 1;
  transition: 2s;
}

.clouds-container {
  //perspective: 8px;
  perspective-origin: 0%;

  .cloud {
    //background: blue;
    //transform: translateZ(3px);
    width: 100px;
    height: 80px;
    position: absolute;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    animation: sway 12s ease-in-out infinite;
  }

  .cloud1 {
    left: -25px;
    bottom: 400px;
    background-image: url("../assets/SVG/CLOUDS/Cloud1.svg");
    animation-delay: 2s;
    animation-duration: 10s;
  }

  .cloud2 {
    left: 300px;
    bottom: 220px;
    background-image: url("../assets/SVG/CLOUDS/Cloud2.svg");
    animation-delay: 6s;
    animation-duration: 11s;
  }

  .cloud3 {
    right: 340px;
    top: 100px;
    background-image: url("../assets/SVG/CLOUDS/Cloud3.svg");
    animation-delay: 1s;
  }

  .cloud4 {
    right: -40px;
    bottom: 180px;
    background-image: url("../assets/SVG/CLOUDS/Cloud4.svg");
    animation-delay: 12s;
    animation-duration: 9s;
  }
}

.section {
  text-align: center;
  display: flex !important;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
}

h3 {
  margin-bottom: 6px;
  margin-top: 0px;
}

h4 {
  font-family: 12px !important;
  //opacity: 0.5;
  margin: 0px;
  font-size: 16px;
}

.dragon-container {
  width: 400px;
  height: 800px;
  position: absolute;
  right: 0px;
  bottom: 0px;
  background-image: url('../assets/SVG/dragon.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  animation: float 16s ease-in-out infinite;
  transition: transform 1.5s, margin opacity 2s;
  //background: red;

  &:hover {
    .dragon-text {
      opacity: 1;
    }
  }

  .dragon-text {
    position: absolute;
    top: 220px;
    margin-left: 200px;
    right: 380px;
    width: max-content;
    opacity: 0;
  }
}

.dragon-after {
    margin: 0px -50px 240px 0px;
    right: -50px;
    opacity: 0.3;
    transition: 2s;
}

.home-section {
  margin-top: 24px;
}

.section-inner {
  position: absolute;
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  h2 {
    text-align: center;
    color: white;
  }
}

.clocks-container {
  //background: red;
  width: 100%;
  height: 100px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;

  h2 {
    margin-left: 48px;
    margin-right: 48px;
    font-size: 20px;
  }
}

.roles-container {
  //background: blue;
  width: 100%;
  height: 100px;
  margin-top: 48px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-family: 'Inconsolata', monospace;
  letter-spacing: 6px;
  
  h2 {
    margin-left: 32px;
    margin-right: 32px;
    font-size: 32px;
  }
}

.cat-container-fixed {
  //background: red;

  top: $gap !important;
  bottom: 100% !important;
  left: 90% !important;

  padding-top: 200px;
  height: 120px !important;

  p {
    opacity: 0;
  }
}

.cat-container-centered {
  //background: green;
}

.cat-container {
  //background: orange;
  width: max-content;
  height: 200px;
  font-family: 'Inconsolata', monospace;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 60px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  margin: auto;
  z-index: 999;
  transition: 2s;
  

  p {
    font-family: 'Inconsolata', monospace;
    text-align: center;
    font-size: 12px;
    margin-top: 18px !important;
    margin-left: -6px;
    transition: 1s;
  }

  .cat {
    //background: red;
    width: 150px;
    height: 150px;
    background-image: url("../assets/SVG/cat-white.svg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    //cursor: pointer;

    &:hover {
      background-image: url("../assets/SVG/cat-static.svg");
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
}

.bottom-cloud-container {
  //background: yellow;
  width: 100%;
  height: 200px;
  position: absolute;
  bottom: -50px;
  z-index: 12;
  background-image: url('../assets/SVG/bottom-clouds.svg');
  background-position: center;
  background-size: contain;
}

.main-stuff {
  //margin-bottom: 300px;
}
</style>