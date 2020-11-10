<script>
export default {
  name: 'Home',
  data() {
    return {
      smallEnter: false,
      bigEnter: false,
      waveOffset: "120vw",
      waveLeft: true,
      options: {
        normalScrollElements: '.test-container, .modal-active, .modal-inactive, .more-work-grid, .more-work-container, .modal-images',
        controlArrows: true,
        loopHorizontal: false,
        scrollingSpeed: 1000,
        slidesNavigation: true,
        navigation: true,
        fadingEffect: true,
        navigationPosition: 'left',
        navigationTooltips: ['Home','About Podular', 'Modular Pods', 'Customization','Showroom','Contact'],
        showActiveTooltip: true,
        //easingcss3: 'cubic-bezier(0.87, 0, 0.13, 1)', //exponential
        //easingcss3: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', //bouncey
        easingcss3: 'cubic-bezier(0.65, 0, 0.35, 1)', //swoopy
        anchors: ['home','about-podular', 'modular-pods', 'customization','showroom','contact'],
        onLeave: (origin, destination, direction) => {
          this.handleLeave(origin, destination, direction);
        },
        onSlideLeave: (origin, destination, direction) => {
          this.handleSlideLeave(origin, destination, direction);
        }
      },
      triggerUp: false,
      triggerDown: false,
      fix: false,
      activeSection: 0,
      activeSlide: 1,
      hover: false,
      modalActive: false,
      extraModalActive: false,
      bio: 'loading...',
      currentExtra: '',
      currentPreview: '',
      currentProjectText: '',
      currentProjectTitle: '',
      scrollOverflow: false,
      context: 0,
    }
  },
  props: {
    dataRef: Object
  },
  components: {

  },
  created() {
    setTimeout(() => {
      //this.waveOffset = "30vw";
      this.waveLeft = false;
    }, 3000);
  },
  mounted() {
    this.hideNav = false;
  },
  methods: {
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
        this.waveOffset = "120vw";
        this.waveLeft = true;
        this.smallEnter = false;
        this.fromLeft
      } else if(destination.index == 1) {
        this.waveOffset = "30vw";
        this.smallEnter = false;
        this.waveLeft = false;
      } else if(destination.index == 2) {
        this.waveOffset = "50vw";
        this.smallEnter = true;
        this.waveLeft = true;
      } else if(destination.index == 3) {
        this.waveOffset = "30vw";
        this.waveLeft = false;
        this.smallEnter = false;
      } else if(destination.index == 4) {
        this.waveOffset = "30vw";
        this.waveLeft = false;
        this.smallEnter = false;
      } else {
        this.waveOffset = "50vw";
        this.waveLeft = true;
        this.smallEnter = false;
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
  }
}
</script>

<template>
  <div class="home">

    <div class="top-layer">
      <div :class="( smallEnter ? 'enter' : 'stage-left' )" class="modal-small">This is some text</div>
      <div :class="( bigEnter ? 'enter' : 'stage-left' )" class="modal-big"></div>
    </div>

    <div class="soc-container">
      <a href="https://www.facebook.com/Caf%C3%A9Bellas-LLC-1664700527089434/" target="_blank"><div class="hoverable soc-button fb"></div></a>
      <a href="https://www.instagram.com/cafebellas/" target="_blank"><div class="hoverable soc-button insta"></div></a>
      <a href="https://twitter.com/cafebellas" target="_blank"><div class="hoverable soc-button tw"></div></a>
      <a href="https://www.linkedin.com/company/cafebellas-of-illinois/" target="_blank"><div class="hoverable soc-button li"></div></a>
    </div>

    <div :style="'left:' + waveOffset" :class="(waveLeft ? 'wave-left' : 'wave-right' )" class="wave-panel">
        <div class="wave"></div>
    </div>

    <div id="nav" class="hoverable">
      <div class="link-list hoverable">

      </div>
    </div>

    <full-page ref="fullpage" :options="options" id="fullpage">
      <section class="section landing">
        <div class="landing-container">
          <div @click="() => { $refs.fullpage.api.moveSectionDown() }" class="arrows hoverable"></div>
        </div>
      </section>
      
      <!-- About Podular -->
      <section class="section">

      </section>

      <!-- Modular Pods -->
      <section class="section">

      </section>

      <!-- Customization -->
      <section class="section">

      </section>

      <!-- Showroom -->
      <section class="section">
        <div class="slide">slide 1</div>
        <div class="slide">slide 2</div>
        <div class="slide">slide 3</div>
        <div class="slide">slide 4</div>
      </section>

      <!-- Contact -->
      <section class="section">

      </section>

    </full-page>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/variables';

  .arrows {
    position: relative;
    width: 30px;
    height: 30px;
    transform: scale(0.5);
    margin-top: 190px;
  }
  
  .arrows:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-left: 26.66667px solid rgba(0, 0, 0, 0.7);
    border-bottom: 26.66667px solid rgba(0, 0, 0, 0.7);
    transform: translate(26.66667px, 106.66667px) rotate(-45deg);
    animation: arrows 3s linear infinite;
  }
  
  .arrows:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-left: 26.66667px solid rgba(0, 0, 0, 0.7);
    border-bottom: 26.66667px solid rgba(0, 0, 0, 0.7);
    transform: translate(53.33333px, 0px) rotate(-45deg);
    animation: arrows 3s linear infinite -1.5s;
  }
  
  @keyframes arrows {
    0% {
      border-left: 10px solid transparent;
      border-bottom: 10px solid transparent;
      transform: translate(-13.33333px, -53.33333px) rotate(-45deg);
    }
    10%, 90% {
      border-left: 10px solid transparent;
      border-bottom: 10px solid transparent;
    }
    50% {
      border-left: 10px solid rgba(255, 255, 255, 0.7);
      border-bottom: 10px solid rgba(255, 255, 255, 0.7);
      transform: translate(-13.33333px, 0px) rotate(-45deg);
    }
    100% {
      border-left: 26.66667px solid transparent;
      border-bottom: 26.66667px solid transparent;
      transform: translate(-13.33333px, 53.33333px) rotate(-45deg);
    }
  }

.enter {
  opacity: 1;
  transform: translate(0px, 0px);
}

.stage-left {
  opacity: 0 !important;
  transform: translate(-500px, 0px) scale(0.8);
  transition: 1.5s !important;
  transition-delay: 0s;
}

.stage-right {
  transform: translate(500px, 0px);
  opacity: 0 !important;
  transition: 2s $ezpz !important;
  transition-delay: 0ms;
}

.top-layer {
  position: fixed;
  z-index: 99999;
  height: 100vh;
  width: 100%;
  display: flex;
  pointer-events: none;
  justify-content: center;
  align-items: center;

  .modal-small {
    background: white;
    height: 400px;
    width: 400px;
    border-radius: 18px;
    position: absolute;
    margin-left: -900px;
    transition: 2s;
    opacity: 0.05;
    transition-delay: 500ms;
  }

  .modal-big {
    background: white;
    height: 500px;
    width: 700px;
    border-radius: 18px;
    position: absolute;
    margin-left: -140px;
    transition: 2s;
    //transition: 1.5s;
  }
}

.section {
  background: #222;
}

.soc-container {
  position: fixed;
  bottom: 48px;
  left: 48px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  //background: red;
}

.insta {
  background-image: url("../assets/i.png");
  background-size: 135% !important;
  filter: invert(1);
}

.fb {
  background-image: url("../assets/f.png");
  filter: invert(1);
  background-size: 130% !important;
}

.li {
  background-image: url("../assets/li.png");
  filter: invert(1);
  background-size: 105% !important;
  transform: scale(1.2);
}

.tw {
  background-image: url("../assets/t.png");
  filter: invert(1);
}

.soc-button {
  width: 24px;
  height: 24px;
  //background: white;
  //padding: 12px;
  margin-left: 24px;
  //border-radius: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.landing-container {
  background-image: url('../assets/podular-text-white.svg');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 300px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding: 0px;
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  top: 0px;

  h1 {
    font-size: 48px;
  }
}

.landing {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.wave-panel {
  background: #181818;
  position: fixed;
  height: 100vh;
  width: 100%;
  margin: 0px;
  z-index: 9;
  transition: 2s;
  pointer-events: none;

  .wave {
    height: 100vh;
    transform: translateX(0px) scale(4);
    width: 175px;
    position: absolute;
    background-image: url('../assets/wave.svg');
    background-size: contain;
    background-position-y: 50%;
    background-repeat: repeat-y;
    transition: 2s;
  }
}

.wave-left {
  .wave {
    background-position-y: 7% !important;
    //background: rgba(yellow, 0.2);
  }
}

.wave-right {
  .wave {
    background-position-y: 50% !important;
    //background: rgba(aqua, 0.2);
  }
}

.main-title {
  //background:red;
  width: 70px;
  background-image: url("../assets/podular-white-emblem.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  height: 70px;
  margin: 42px;
}

.hoverable {
  cursor: pointer;
}

.project-text {
  font-size: 14px !important;
}

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
    //cursor: none;

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

.blur {
  filter: blur(24px);
}

.clear {
  filter: blur(0px);
}


@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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
  li:nth-child(5) {
    //background: blue;
    transition-delay: 1.8s !important;
  }
  li:nth-child(6) {
    //background: blue;
    transition-delay: 2.0s !important;
  }
  li:nth-child(7) {
    //background: blue;
    transition-delay: 2.2s !important;
  }
  .more-btn {
    //background: blue;
    transition-delay: 2.4s;
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