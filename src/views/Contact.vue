<template>
    <transition name="fade" mode="in-out">
        <div class="page-container">
            <div class="contact-container">
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
                    <a href="https://www.instagram.com/e.z.li/"><div class="sb"><div class="sb-icon ig"></div><span>e.z.li</span></div></a>
                    <a href="https://www.behance.net/ericzzli/moodboards"><div class="sb"><div class="sb-icon bh"></div><span>ericzzli</span></div></a>
                    <a href="https://www.linkedin.com/in/ericzzli/"><div class="sb"><div class="sb-icon li"></div><span>ericzzli</span></div></a>
                    <div class="contact-other">
                        <a href="mailto:ezl@protonmail.com"><div class="sb"><div class="sb-icon email"></div><span>eric@ericzzli.com</span></div></a>
                        <div class="sb sb-cv"><div class="sb-icon cv"></div><span>CV on request</span></div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/variables';

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
    //padding-left: 36px;
    margin-bottom: 12px;

    span {
        font-size: 20px;
    }

    &:hover {
        opacity: 0.4 !important;
    }

}

.sb-cv {
    pointer-events: none;
}

.contact-container {
    //background: green;
    display: flex;
    padding: $gap;
    justify-content: center;
    text-align: left;
}

.about-me {
    //background: blue;
    padding: 0px;
    margin: 0px;
    width: 22%;
    text-align: left;
    margin-right: $gap * 4;
    line-height: 1.5;

}

.contact-buttons {
    //background: orange;
    width: 14%;
    height: max-content;
    text-align: left;
    padding: $gap;
    margin-top: 64px;

    .social-button {
        background: blue;
    }
}

p {
    font-size: 18px;
}

h1 {
    font-size: 48px;
}
</style>