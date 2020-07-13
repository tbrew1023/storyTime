<script>
import firebase from 'firebase'
import moment from 'moment-timezone';

export default {
  name: 'Home',
  data() {
    return {
      options: {
        normalScrollElements: '.test-container, .modal-active, .modal-inactive, .more-work-grid, .more-work-container, .modal-images',
        controlArrows: false,
        loopHorizontal: false,
        scrollingSpeed: 2000,
        fadingEffect: true,
        //easingcss3: 'cubic-bezier(0.87, 0, 0.13, 1)', //exponential
        //easingcss3: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', //bouncey
        easingcss3: 'cubic-bezier(0.65, 0, 0.35, 1)', //swoopy
        anchors: ['home','work', 'contact'],
        onLeave: (origin, destination, direction) => {
          this.handleLeave(origin, destination, direction);
        },
        onSlideLeave: (origin, destination, direction) => {
          this.handleSlideLeave(origin, destination, direction);
        }
      },
      projects: [],
      extra: [],
      triggerUp: false,
      triggerDown: false,
      fix: false,
      activeSection: 0,
      activeSlide: 1,
      hover: false,
      modalActive: false,
      extraModalActive: false,
      currentExtra: '',
      currentPreview: '',
      currentProjectText: '',
      currentProjectTitle: '',
      scrollOverflow: false,
      context: 0,
      clock: {
        chicago: '',
        tokyo: '',
        newYork: '',
        sydney: '',
        london: ''
      },
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

    this.clock.chicago = chicago.substring(chicago.indexOf('T') + 1, chicago.indexOf('T') + 6);
    this.clock.tokyo = tokyo.substring(tokyo.indexOf('T') + 1, tokyo.indexOf('T') + 6);
    this.clock.newYork = newYork.substring(newYork.indexOf('T') + 1, newYork.indexOf('T') + 6);
    this.clock.sydney = sydney.substring(sydney.indexOf('T') + 1, sydney.indexOf('T') + 6);
    this.clock.london = london.substring(london.indexOf('T') + 1, london.indexOf('T') + 6);
  },
  mounted() {
    this.fetchProjects();
    this.fetchExtra();
    setInterval(() => {
      this.tock();
    }, 5000);
  },
  methods: {
    fetchProjects() {
      var self = this;

      firebase.firestore().collection("projects").get().then((docs) => {
        docs.forEach((doc) => {
          self.projects.push(doc.data());
        });
        console.log(self.projects);
      });
    },
    fetchExtra() {
      var self = this;

      firebase.firestore().collection("extra").get().then((docs) => {
        docs.forEach((doc) => {
          self.extra.push(doc.data());
        });
        console.log(self.extra);
      });
    },
    handleExtraClick(i) {
      console.log('clicked extra work item');
      this.extraModalActive = !this.extraModalActive;
      this.currentExtra = i;
    },
    handleStageExtra(i) {
      console.log('staging', i);
      this.currentExtra = i;
    },
    handleLeave(origin, destination, direction) {
      console.clear();
      console.log('origin: ', origin);
      console.log('destination: ', destination);
      console.log('direction: ', direction);
  
      this.activeSection = destination.index;

      console.log('activeSection: ', this.activeSection);

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
    handleSlideLeave(origin, destination, direction) {
      console.clear();
      console.log('origin: ', origin);
      console.log('destination: ', destination);
      console.log('direction: ', direction);
  
      this.activeSlide = destination.index;

      console.log('activeSlide: ', this.activeSlide);

      if(direction == 'up') {
        this.triggerUp = true;
        this.triggerDown = false;
      }
      else {
        this.triggerDown = true;
        this.triggerUp = false;
      }
    },
    handleMouseEnter(i, index) {
      console.clear();
      console.log('enter' , index);
      this.hover = true;
      this.currentPreview = i.thumb;
      this.currentProjectText = i.description;
      this.currentProjectTitle = i.title;
      this.context = index;

      console.log(this.currentPreview);
    },
    handleMouseLeave(i, index) {
      console.clear();
      console.log('leave', index);

      this.hover = false;

      /*if(!this.modalActive) {}*/
    },
    openWorksModal(i, index) {
      console.log('CLICK', index);

      this.modalActive = true;
      this.hover = false;

      console.log(this.projects);
    },
    handleScroll() {
      //console.log(scrollY);
      //this.bannerOffset = scrollY;
    },
    tock() {
      var chicago = moment.tz('America/Chicago').format();
      var tokyo = moment.tz('Asia/Tokyo').format();
      var newYork = moment.tz('America/New_York').format();
      var sydney = moment.tz('Australia/Sydney').format();
      var london = moment.tz('Europe/London').format();

      this.clock.chicago = chicago.substring(chicago.indexOf('T') + 1, chicago.indexOf('T') + 6);
      this.clock.tokyo = tokyo.substring(tokyo.indexOf('T') + 1, tokyo.indexOf('T') + 6);
      this.clock.newYork = newYork.substring(newYork.indexOf('T') + 1, newYork.indexOf('T') + 6);
      this.clock.sydney = sydney.substring(sydney.indexOf('T') + 1, sydney.indexOf('T') + 6);
      this.clock.london = london.substring(london.indexOf('T') + 1, london.indexOf('T') + 6);
    }
  }
}
</script>

<template>
  <div class="home">

    <div id="nav" class="hoverable">
      <h1 class="main-title">eric li</h1>
      <div class="link-list hoverable">
        <ul>
          <li @click="() => { $refs.fullpage.api.moveSlideLeft(); $refs.fullpage.api.moveTo(1); }" class="hoverable"><span>></span>Home</li>
          <li @click="() => { $refs.fullpage.api.moveSlideLeft(); $refs.fullpage.api.moveTo(2); }" class="hoverable"><span>></span>Work</li>
          <li @click="() => { $refs.fullpage.api.moveSlideLeft(); $refs.fullpage.api.moveTo(3); }" class="hoverable"><span>></span>Contact</li>
        </ul>
      </div>
    </div>

    <div :class="( activeSection != 0 ? '' : 'stage-up' )" class="corner-cat"></div>

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
                  <h4>{{ clock.chicago }}</h4>
                </div>
              </h2>
              <h2>
                <div class="clock-inner">
                  <h3>tokyo</h3>
                  <h4>{{ clock.tokyo }}</h4>
                </div>
              </h2>
              <h2>
                <div class="clock-inner">
                  <h3>new york</h3>
                  <h4>{{ clock.newYork }}</h4>
                </div>
              </h2>
              <h2>
                <div class="clock-inner">
                  <h3>sydney</h3>
                  <h4>{{ clock.sydney }}</h4>
                </div>
              </h2>
              <h2>
                <div class="clock-inner">
                  <h3>london</h3>
                  <h4>{{ clock.london }}</h4>
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
            <p class="dragon-text">Or we could just chill....</p>
          </div>
          <div :class="( fix ? 'invisible parallax1' : 'visible' )" class="bottom-cloud-container"></div>
        </div>  
      </section>

      <!-- MAIN WORKS PAGE -->
      <section class="section">
        <div class="slide work-slide">

          <!-- PROJECT MODAL -->
          <div class="modal" :class="( modalActive ? 'modal-active' : 'modal-inactive' )">
            <div class="modal-text"><h1 class="modal-title">{{ currentProjectTitle }}</h1><p>{{ currentProjectText }}</p></div>

            <div class="modal-images">
              <ul class="image-list fp-scrollable">
                <li class="modal-image-item hoverable" v-for="(i, index) in projects[context].images" :key="i.index">
                  <div :id="'image' + index" class="modal-image hoverable" :style="'background-image: url(' + i + ')'"></div>
                </li>
              </ul>
            </div>

            <div @click="() => { modalActive = false; }" class="modal-back hoverable"><span class="arrow hoverable">🡨</span><span class="hoverable">Back</span></div>
          </div>

          <div class="section-inner works-inner">
            <div class="preview" :class="( hover ? ( modalActive ? 'preview-stick' : 'preview-appear' ) : 'preview-disappear' )">
              <div class="preview-loader"></div>
              <div class="preview-inner hoverable" :style="'background-image: url(' + currentPreview + ')'"></div>
            </div>
            
            <div class="works-list" :class="( activeSection == 1 && activeSlide == 1 ? 'works-enter' : 'works-leave' )">
              <ul>
                <li 
                  v-for="(i, index) in projects"
                  @click="openWorksModal(i, index)" 
                  @mouseenter="handleMouseEnter(i, index)" 
                  @mouseleave="handleMouseLeave(i, index)" 
                  class="hoverable" 
                  :key="i.index"
                >
                  <span class="hoverable">
                    {{ i.title }}
                  </span>
                </li>
              </ul>
              <div @click="() => { $refs.fullpage.api.moveSlideRight(); }" class="more-btn hoverable"><p class="hoverable">+ More work</p></div>
            </div>

            <div class="clouds-container" :class="( hover ? 'blur' : 'clear' )" style="transition: 1s">
              <!--div class="cloud cloud5"></div-->
              <div class="cloud cloud6" :class="( fix ? 'invisible patallax1' : 'visible' )"></div>
              <div class="cloud cloud7" :class="( fix ? 'invisible parallax2' : 'visible' )"></div>
              <div class="cloud cloud8"></div>
              <div class="cloud cloud9" :class="( fix ? 'invisible parallax2' : 'visible' )"></div>
              <div class="cloud cloud10" :class="( fix ? 'invisible patallax1' : 'visible' )"></div>
              <div class="cloud cloud11" :class="( fix ? 'invisible parallax2' : 'visible' )"></div>
              <div class="cloud cloud12"></div>
            </div>
            
          </div>
        </div>

        <!-- EXTRA WORK -->
        <div class="slide more-work">
          <div class="more-work-container">

            <div :class="( extraModalActive ? 'mvm-active' : 'mwm-inactive' )">
              <img 
                @click="handleExtraClick(currentExtra)" 
                class="mwm-expanded hoverable" 
                :src="currentExtra" 
                alt="Extra works image" 
              />
            </div>

            <h1 :class="( activeSlide == 0 ? ( !extraModalActive ? 'xtra-werk' : 'xtra-werk blur' ) : 'stage-up' )">Extra Work</h1>

            <!-- GRID -->
            <div :class="( extraModalActive ? 'blur' : '' )" class="more-work-grid"><!-- animates first 11 items rendered -->
              <div 
                v-for="(i, index) in extra[0].images" 
                :key="i.index"
                :id="'extra' + index" 
                :style="'background-image: url(' + i + ')'" 
                :class="( activeSlide == 0 ? 'work-item' : 'stage-in' )" 
                class="extra-item hoverable"
                @click="handleExtraClick(i)"
                @mouseenter="handleStageExtra(i)"
              ></div>
            </div>
          </div>

          <div 
            @click="() => { $refs.fullpage.api.moveSlideLeft(); }" 
            :class="( activeSlide == 0 ? 'works-back-button hoverable' : 'stage-in' )"
          ><span class="arrow">🡨</span><span class="hoverable">Back</span></div>

        </div>
      </section>

      <!-- CONTACT PAGE -->
      <section class="section">
        <div class="contact-container">
          <div class="clouds-container">
            <div class="cloud cloud5"></div>
            <div class="cloud cloud6" :class="( fix ? 'invisible patallax1' : 'visible' )"></div>
            <div class="cloud cloud8"></div>
            <div class="cloud cloud10" :class="( fix ? 'invisible patallax1' : 'visible' )"></div>
            <div class="cloud cloud11" :class="( fix ? 'invisible parallax2' : 'visible' )"></div>
            <div class="cloud cloud12"></div>
          </div>
          <div class="contact-main" :class="( activeSection == 2 ? '' : 'stage-down' )">
            <div class="about-me">
                <h1>About me.</h1>
                <p>
                    What is there to say about me? Well, I'm a young guy trying to make his mark in this big world. I enjoy designing anything but I'm best at digital design and branding. 
                    I hope to one day take these skills to start my own business. In the mean time I enjoy producing beats and gardening.
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
        </div>
      </section>
    </full-page>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/variables';

.mwm-expanded {
  background: white;
  width: auto;
  height: 70%;
  border-radius: 18px;
  min-width: 25%;
}

.mwm-inactive {
  //background: blue;
  width: 100vw;
  height: 100vh;
  position: absolute;
  padding: 0px;
  margin: 0px;
  z-index: 999;
  transition: 1s;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  pointer-events: none;
  
  img {
    transition: 600ms;
    transform: scale(0.8);
    opacity: 0;
  }
}

.mvm-active {
  background: rgba(black, 0.8);
  width: 100vw !important;
  height: 100vh !important;
  position: absolute;
  padding: 0px;
  margin: 0px;
  z-index: 999;
  transition: 1s;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  transition-delay: 150ms;

  img {
    transition: 600ms;
    transform: scale(1);
  }
}

.extra-item {
  background-size: cover;
  background-position: 40% 25% !important;
  background-repeat: no-repeat;
  background: #555;
  border-radius: 18px;
}

.modal-title {
  font-size: 36px;
}

.image-list {
  list-style: none;
  padding: 0px;
  margin: 0px;
}

.modal-text {
  //@extendanimation: flyleft 1s ease forwards 3s;
  width:300px;
  text-align: left;
}

.modal-images {
  height: 750px;
  //background: blue;
  width: 50%;
  margin-left: $gap * 2;
  //animation: flyin 1s ease forwards 3s;
  //padding-top: 200px;
  padding-right: $gap;
  overflow: auto;

  .modal-image-item {
    .modal-image {
      width: 100%;
      height: 550px;
      border-radius: 18px;
      margin-bottom: 24px;
      background: #555;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
}

.corner-cat {
  background-image: url('../assets/SVG/cat-white.svg');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  transition: 2s;
  transition-delay: 1s;
  width: 80px;
  height: 80px;
  position: fixed;
  margin: 36px;
  right: 0px;
  top: 0px;
  z-index: 888;
}

.modal-back {
  //background: red;
  position: absolute;
  bottom: 48px;
  left: 48px;
  
  span {
    font-size: 26px !important;
    margin-left: 24px;
  }

  .arrow {
    transition: 300ms;
  }

  &:hover {
    .arrow {
      margin-left: -12px;
      margin-right: 36px;
    }
  }
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  //background: purple;
  transition: 1s;
}

.stage-up {
  opacity: 0;
  transition: 1s;
  transform: translate(0px, -64px);
}

.xtra-werk {
  opacity: 1;
  transition: transform 2s 2s, opacity 2s 2s, filter 600ms 0s;
}

.stage-in {
  opacity: 0;
  transition: 1s;
  height: 250px;
}

.more-work-container {
  height: 100vh;
  width: 100%;
  display:flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: left;

  h1 {
    margin-left: 375px;
    margin-bottom: 42px;
    font-size: 48px;
  }
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

.more-work-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  grid-gap: 18px;
  bottom: 0px; 
  overflow: auto;
  height: 760px;
  padding-right: 18px;
  transition: 600ms;
}

.work-item {
  background: #555;
  height: 250px;
  transition: 1.2s;

  &:hover {
    //transform: scale(0.95);
    //filter:hue-rotate(145deg);
  }

  &:nth-child(1) {
    transition-delay: 1.4s;  
  }

  &:nth-child(2) {
    transition-delay: 1.2s;  
  }

  &:nth-child(3) {
    transition-delay: 1s;  
  }

  &:nth-child(4) {
    transition-delay: 1.6s;  
  }

  &:nth-child(5) {
    transition-delay: 1.4s;  
  }

  &:nth-child(6) {
    transition-delay: 1.2s;  
  }

  &:nth-child(7) {
    transition-delay: 1.8s;  
  }

  &:nth-child(8) {
    transition-delay: 1.6s;  
  }

  &:nth-child(9) {
    transition-delay: 1.4s;  
  }
}

.works-back-button {
  //background: red;
  //opacity: 0;
  width: 200px;
  margin: auto;
  position: absolute;
  bottom: 80px;
  left: calc(100vw);
  font-size: 22px;
  //opacity: 0;
  //animation: flyleft 1s ease forwards 2s;

  .arrow {
    transition: 300ms;
  }

  &:hover {
    .arrow {
      margin-left: -18px;
      margin-right: 18px;
    }
  }

  strong {
    background: green;
  }
}

.work-slide {
  width: 100%;
  height: 100vh;
}

.test-container {
  overflow: scroll;
  background: orange;
  height: 300px;
  width: 600px;
  z-index: 9999;
}

.modal-active {
  background: black;
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 999;
  transition: 600ms;
  transition-delay: 600ms;
  margin: auto;
  left: 0px;
  top: 0px;
  overflow: auto;
}

.modal-inactive {
  background: black;
  opacity: 0;
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 999;
  transition: 600ms;
  margin: auto;
  left: 0px;
  top: 0px;
  overflow: auto;
  pointer-events: none;
}

.more-btn {
  background: black;
  color: white;
  width: max-content;
  padding: 0px 24px 0px 24px;
  float: right;
  border-radius: 12px;
  font-weight: bold;
  transition: opacity 300ms, transform 1s;
  margin-top: 42px;
}

.contact-main {
  transition-delay: 2s;
  transition: 2s;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.stage-down {
  opacity: 0;
  transition: 2s;
  transform: translate(0px, 300px);
}

.stage-left {
  transform: translate(120px, 0px);
  opacity: 0px;
}

.blur {
  filter: blur(24px);
}

.clear {
  filter: blur(0px);
}

.preview-appear  {
  background: white;
  opacity: 1;
}

.preview-disappear {
  //transform: translate(42px, 0px);
  //background: yellow !important;
  transform: translate(-120px, 0px);
  transition-delay: 300ms !important;
  opacity: 0;
  z-index: -1 !important;
}

.preview-stick {
  width: 800px;
  height: 700px;
}

.preview {
  border-radius: 12px;
  width: 650px;
  height: 350px;
  //margin-right: 220px;
  position: absolute;
  margin: auto;
  left: 420px;
  //right: 0px;
  top: -120px;
  bottom: 0px;
  transition: 1s ease;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.preview-loader {
  color: black;
  position: absolute;
  margin: auto;
  z-index: -1;
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #000; /* black */
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.preview-inner {
  height: inherit;
  width: inherit;
  border-radius: 18px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

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
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: -1;

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
    bottom: 600px;
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
    right: 110px;
    top: 180px;
    background-image: url("../assets/SVG/CLOUDS/Cloud11.svg");
    //animation-delay: 12s;
    animation-duration: 13s;
  }

    .cloud12 {
    right: 230px;
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
  height: 100vh;
  width: 100vw;
  top: 0px;

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
    background-image: url("../assets/SVG/cat-static.svg");
    filter:grayscale(1);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    //cursor: pointer;

    &:hover {
      filter: grayscale(0);
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

    .sb {
      padding-right: $gap;
    }
}

.sb-icon {
    background: black;
    height: 64px;
    width: 64px;
    margin-right: 32px;
    background-size: 50%;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 12px 0px 0px 12px;
    transition: 300ms;

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
        font-size: 22px;
        font-weight: bold;
    }

    &:hover {
      /*background: white;
      border-radius: 12px;
      color: black;
      //filter:invert(1);

      .sb-icon {
        //background-color: white;
        filter: invert(1);
      }*/

      opacity: 0.8;
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
    transition: 2s;
    transition-delay: 1s;
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
    transition: 600ms;
}

.contact-buttons {
    //background: orange;
    width: max-content;
    height: max-content;
    text-align: left;
    padding: $gap;
    margin-top: 64px;
}

.works-enter {
  li:nth-child(1) {
    //background: blue;
    transition-delay: 1s !important;
  }
  li:nth-child(2) {
    //background: blue;
    transition-delay: 1.2s !important;
  }
  li:nth-child(3) {
    //background: blue;
    transition-delay: 1.4s !important;
  }
  li:nth-child(4) {
    //background: blue;
    transition-delay: 1.6s !important;
  }
  .more-btn {
    //background: blue;
    transition-delay: 1.8s;
  }
}

.works-leave {
  li, .more-btn {
    //background: red;
    opacity: 0;
    transform: translate(120px, 0px);
  }
}

.works-list {
  //background:blue;
  position: absolute;
  right: 180px;
  width: max-content;
  text-align: right;
  transition: 2s;

  ul {
    list-style: none;
    margin: 0px;
    padding: 0px;

    li {
      margin-bottom: $gap;
      font-size: 48px;
      font-weight: bold;
      transition: 1s;

      span {
        transition: 300ms;
        padding-left: 12px;
        padding-right: 12px;
        border-radius: 12px;
      }

      &:hover {
        span {
          opacity: 0.8;
          //background: white;
          //color: black;
          //margin-right: 24px;
        }
      }
    }
  }
}

@media only screen and (max-width: 900px) {
  .main-stuff {
    transform: scale(0.45);
  }

  .dragon-container {
    width: 150px;
    height: 330px;
  }

  .bottom-cloud-container {
    transform: scale(2.5);
    height: 160px;
  }

  .dragon-after {
    margin-bottom: 64px;
  }

  .works-list {
    transform: scale(0.7);
    left: 0px;
    text-align: left;
    top: 200px;
    bottom: 0px;
  }

  .more-btn {
    float: left;
  }

  .modal {
    display: block;
  }

  .modal-text {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    width: 90%;
    margin-top: 300px;
  }

  .modal-images {
    width: 90%;
    padding: 0px;
    margin: 0px;
    margin-left: auto;
    margin-right: auto;
  }

  .nav {
    background: black;
    z-index: 9999;
  }

  .cloud {
    background-size: 50% !important;
  }

  .cloud2 {
    right: 700px !important;
  }
}
</style>