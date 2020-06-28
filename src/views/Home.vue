<template>
  <div class="home">
    <full-page ref="fullpage" :options="options" id="fullpage">

      <!-- CONTACT PAGE -->
      <section class="section">
        <div class="section-inner">
          <div class="clouds-container">
            <div class="cloud cloud1"></div>
            <div class="cloud cloud2" :class="( fix ? 'invisible patallax1' : 'visible' )"></div>
            <div class="cloud cloud3" :class="( fix ? 'invisible parallax2' : 'visible' )"></div>
            <div class="cloud cloud4" :class="( fix ? 'invisible parallax3' : 'visible' )"></div>
          </div>
          <div class="main-stuff">
            <div class="home-section clocks-container">
              <h2>
                <div class="clock-inner">
                  <h3>chicago</h3>
                  <h4>{{ chicago }}</h4>
                </div>
              </h2>
              <h2>
                <div class="clock-inner">
                  <h3>tokyo</h3>
                  <h4>{{ tokyo }}</h4>
                </div>
              </h2>
              <h2>
                <div class="clock-inner">
                  <h3>new york</h3>
                  <h4>{{ newYork }}</h4>
                </div>
              </h2>
              <h2>
                <div class="clock-inner">
                  <h3>sydney</h3>
                  <h4>{{ sydney }}</h4>
                </div>
              </h2>
              <h2>
                <div class="clock-inner">
                  <h3>london</h3>
                  <h4>{{ london }}</h4>
                </div>
              </h2>
            </div>
            <div class="home-section roles-container">
              <h2>DESIGNER</h2>
              <h2>WORKER</h2>
              <h2>PRODUCER</h2>
            </div>
            <div :class="( fix ? 'implode' : '' )" class="cat-container cat-container-centered home-section">
              <div @click="$refs.fullpage.api.moveSectionDown()" class="cat hoverable"></div>
              <p>Scroll down for work</p>
            </div>
          </div>
          <div :class="( fix ? 'invisible dragon-after' : 'visible' )" class="dragon-container hoverable">
            <p class="dragon-text">Or we could just chil....</p>
          </div>
          <div :class="( fix ? 'invisible parallax1' : 'visible' )" class="bottom-cloud-container"></div>
        </div>  
      </section>

      <!-- MAIN WORKS PAGE -->
      <section class="section">
        <div class="section-inner">
          <div class="works-list">
            <ul>
              <li class="hoverable" v-for="(i) in works" :key="i.index"><span class="hoverable">{{ i }}</span></li>
            </ul>
          </div>
          <div class="clouds-container">
            <div class="cloud cloud5"></div>
            <div class="cloud cloud6" :class="( fix ? 'invisible patallax1' : 'visible' )"></div>
            <div class="cloud cloud7" :class="( fix ? 'invisible parallax2' : 'visible' )"></div>
            <div class="cloud cloud8"></div>
            <div class="cloud cloud9" :class="( fix ? 'invisible parallax2' : 'visible' )"></div>
            <div class="cloud cloud10" :class="( fix ? 'invisible patallax1' : 'visible' )"></div>
            <div class="cloud cloud11" :class="( fix ? 'invisible parallax2' : 'visible' )"></div>
            <div class="cloud cloud12"></div>
          </div>
        </div>
      </section>

      <!-- CONTACT PAGE -->
      <section class="section">
        <div class="contact-container">
          <div class="clouds-container flip">
            <div class="cloud cloud5"></div>
            <div class="cloud cloud6" :class="( fix ? 'invisible patallax1' : 'visible' )"></div>
            <div class="cloud cloud8"></div>
            <div class="cloud cloud10" :class="( fix ? 'invisible patallax1' : 'visible' )"></div>
            <div class="cloud cloud11" :class="( fix ? 'invisible parallax2' : 'visible' )"></div>
            <div class="cloud cloud12"></div>
          </div>
          <div class="about-me">
              <h1>About me.</h1>
              <p>
                  What is there to say about me? Well, I'm a young guy trying to make his mark in this big world. I enjoy designing anything but I'm best at digital design and branding. I hope to one day take these skills to start my own business. In the mean time I enjoy producing beats and gardening.
                  <br><br>
                  I grew up in the Chicagoland area and went to DePaul University. I'm a quick learner, open minded, and like coming up with creative solutions.
                  <br><br>
                  Anyways, lets link up and get that bread. 
              </p>
          </div>
          <div class="contact-buttons">
              <a href="https://www.instagram.com/e.z.li/"><div class="sb hoverable"><div class="sb-icon ig hoverable"></div><span class="hoverable">e.z.li</span></div></a>
              <a href="https://www.behance.net/ericzzli/moodboards"><div class="sb hoverable"><div class="sb-icon bh hoverable"></div><span class="hoverable">ericzzli</span></div></a>
              <a href="https://www.linkedin.com/in/ericzzli/"><div class="sb hoverable"><div class="sb-icon li hoverable"></div><span class="hoverable">ericzzli</span></div></a>
              <div class="contact-other">
                  <a href="mailto:ezl@protonmail.com"><div class="sb hoverable"><div class="sb-icon email hoverable"></div><span class="hoverable">eric@ericzzli.com</span></div></a>
                  <div class="sb sb-cv"><div class="sb-icon cv hoverable"></div><span>CV on request</span></div>
              </div>
          </div>
        </div>
      </section>

    </full-page>
  </div>
</template>

<script>
//import firebase from 'firebase'
import moment from 'moment-timezone'

export default {
  name: 'Home',
  data() {
    return {
      works: ['Yang Redesign', 'Old Orchard', 'Coinbase', 'ubloe.com'],
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
      triggerUp: false,
      triggerDown: false,
      fix: false,
      chicago: '',
      tokyo: '',
      newYork: '',
      sydney: '',
      london: '',
      activeSlide: 0
    }
  },
  props: {
    dataRef: Object
  },
  components: {

  },
  created() {
    var chicago = moment.tz('America/Chicago').format();
    var tokyo = moment.tz('Asia/Tokyo').format();
    var newYork = moment.tz('America/New_York').format();
    var sydney = moment.tz('Australia/Sydney').format();
    var london = moment.tz('Europe/London').format();

    this.chicago = chicago.substring(chicago.indexOf('T') + 1, chicago.indexOf('T') + 6);
    this.tokyo = tokyo.substring(tokyo.indexOf('T') + 1, tokyo.indexOf('T') + 6);
    this.newYork = newYork.substring(newYork.indexOf('T') + 1, newYork.indexOf('T') + 6);
    this.sydney = sydney.substring(sydney.indexOf('T') + 1, sydney.indexOf('T') + 6);
    this.london = london.substring(london.indexOf('T') + 1, london.indexOf('T') + 6);
  },
  mounted() {
    setInterval(() => {
      this.tock();
    }, 5000);
  },
  methods: {
    handleLeave(origin, destination, direction) {
      console.clear();
      console.log('origin: ', origin);
      console.log('destination: ', destination);
      console.log('direction: ', direction);
  
      this.activeSlide = destination.index;

      console.log('activeSlide: ', this.activeSlide);

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
    tock() {
      var chicago = moment.tz('America/Chicago').format();
      var tokyo = moment.tz('Asia/Tokyo').format();
      var newYork = moment.tz('America/New_York').format();
      var sydney = moment.tz('Sydney/Sydney').format();
      var london = moment.tz('Europe/London').format();

      this.chicago = chicago.substring(chicago.indexOf('T') + 1, chicago.indexOf('T') + 6);
      this.tokyo = tokyo.substring(tokyo.indexOf('T') + 1, tokyo.indexOf('T') + 6);
      this.newYork = newYork.substring(newYork.indexOf('T') + 1, newYork.indexOf('T') + 6);
      this.sydney = sydney.substring(sydney.indexOf('T') + 1, sydney.indexOf('T') + 6);
      this.london = london.substring(london.indexOf('T') + 1, london.indexOf('T') + 6);
    }
  }
}
</script>

<style lang="scss" scoped>

@import '../assets/variables';

.flip {
  //transform: rotateX(90deg);
}

.implode {
  transform: scale(0.9);
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
  transition: 2s cubic-bezier(0.65, 0, 0.35, 1);
}

.visible {
  opacity: 1;
  transition: 2s cubic-bezier(0.65, 0, 0.35, 1);
}

.clouds-container {
  //perspective: 8px;
  perspective-origin: 0%;

  .cloud {
    //background: blue;
    //transform: translateZ(3px);
    opacity: 1 !important;
    width: 100px;
    height: 80px;
    position: absolute;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    animation: sway 12s ease-in-out infinite;
    //z-index: -1;
  }

  .cloud1 {
    left: -25px;
    bottom: 400px;
    background-image: url("../assets/SVG/CLOUDS/Cloud1.svg");
    //animation-delay: 2s;
    animation-duration: 10s;
  }

  .cloud2 {
    left: 300px;
    bottom: 220px;
    background-image: url("../assets/SVG/CLOUDS/Cloud2.svg");
    //animation-delay: 6s;
    animation-duration: 11s;
  }

  .cloud3 {
    right: 340px;
    top: 100px;
    background-image: url("../assets/SVG/CLOUDS/Cloud3.svg");
    //animation-delay: 1s;
  }

  .cloud4 {
    right: -40px;
    bottom: 180px;
    background-image: url("../assets/SVG/CLOUDS/Cloud4.svg");
    //animation-delay: 12s;
    animation-duration: 9s;
  }

  .cloud5 {
    right: -40px;
    bottom: 180px;
    background-image: url("../assets/SVG/CLOUDS/Cloud5.svg");
    //animation-delay: 12s;
    animation-duration: 9s;
  }

  .cloud6 {
    left: 40px;
    bottom: 480px;
    background-image: url("../assets/SVG/CLOUDS/Cloud6.svg");
    //animation-delay: 19s;
    animation-duration: 10s;
  }

    .cloud7 {
    left: 340px;
    bottom: 280px;
    background-image: url("../assets/SVG/CLOUDS/Cloud7.svg");
    //animation-delay: 12s;
    animation-duration: 17s;
  }

    .cloud8 {
    left: 800px;
    bottom: 100px;
    background-image: url("../assets/SVG/CLOUDS/Cloud8.svg");
    //animation-delay: 11s;
    animation-duration: 11s;
  }

    .cloud9 {
    left: 520px;
    bottom: 580px;
    background-image: url("../assets/SVG/CLOUDS/Cloud9.svg");
    //animation-delay: 12s;
    animation-duration: 13.5s;
  }

    .cloud10 {
    left: 900px;
    top: 60px;
    background-image: url("../assets/SVG/CLOUDS/Cloud10.svg");
    //animation-delay: 10s;
    animation-duration: 10.5s;
  }

    .cloud11 {
    right: 60px;
    top: 180px;
    background-image: url("../assets/SVG/CLOUDS/Cloud11.svg");
    //animation-delay: 12s;
    animation-duration: 13s;
  }

    .cloud12 {
    right: 140px;
    bottom: 110px;
    background-image: url("../assets/SVG/CLOUDS/Cloud12.svg");
    //animation-delay: 14s;
    animation-duration: 14s;
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
  transition: transform 2s, margin opacity 2s;
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
    transition: 2s cubic-bezier(0.65, 0, 0.35, 1);
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
  background-repeat: repeat-x;
  animation: move-left 180s linear forwards infinite;
  z-index: 9999;
}

.main-stuff {
  //margin-bottom: 300px;
}

a {
    text-decoration: none;
    color: white !important;
}

.contact-other {
    margin-top: $gap * 2;
}

.sb-icon {
    background: black;
    height: 64px;
    width: 64px;
    margin-right: 32px;
    background-size: 50%;
    background-position: center;
    background-repeat: no-repeat;

}

.ig {
    background-image: url('../assets/sm/ig.svg');
}

.bh {
    background-image: url('../assets/sm/bh.svg');
}

.li {
    background-image: url('../assets/sm/li.svg');
}

.email {
    background-image: url('../assets/sm/email.svg');
}

.cv {
    background-image: url('../assets/sm/resume.svg');
    background-size: 40%;
}

.sb {
    //background: red;
    height: 64px;
    display: flex;
    text-align: center;
    align-items: center;
    //padding-left: 36px;1
    margin-bottom: 12px;
    transition: 300ms;
    cursor: none !important;

    span {
        font-size: 20px;
    }

    &:hover {
        //opacity: 0.4 !important;
        transform: scale(1.1);
    }

}

.sb-cv {
    pointer-events: none;
}

.contact-container {
    //background: green;
    display: flex;
    //padding: $gap;
    justify-content: center;
    text-align: left;
    height: 100vh !important;
    align-items: center;
}

.about-me {
    //background: blue;
    padding: 0px;
    margin: 0px;
    width: 20%;
    text-align: left;
    margin-right: $gap * 4;
    line-height: 1.5;
    font-size: 19px;

}

.contact-buttons {
    //background: orange;
    width: max-content;
    height: max-content;
    text-align: left;
    padding: $gap;
    margin-top: 64px;

    .social-button {
        background: blue;
    }
}

.works-list {
  //background:blue;
  position: absolute;
  right: 220px;
  width: max-content;
  text-align: right;

  ul {
    list-style: none;
    margin: 0px;
    padding: 0px;

    li {
      margin-bottom: $gap;
      font-size: 48px;
      font-weight: bold;
      transition: 300ms;

      &:hover {
        transform: translate(-24px, 0px);
      }
    }
  }
}
</style>