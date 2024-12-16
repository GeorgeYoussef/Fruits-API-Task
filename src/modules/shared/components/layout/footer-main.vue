<template>
  <section class="conOfFooter">
    <section class="sectionOne">
      <v-container>
        <v-row>
          <v-col lg="3" md="4" cols="12" class="d-flex justify-center">
            <div>
              <div class="d-flex justify-center">
                <img class="resImg" src="@/assets/img/logo.jpg" />
              </div>
              <div>
                <div class="btnContainer text-center mt-3">
                  <v-btn text target="_blank" href="#">
                    <v-icon color="iconTxt"> mdi-instagram </v-icon>
                  </v-btn>
                  <v-btn text target="_blank" href="#">
                    <v-icon color="iconTxt"> mdi-twitter </v-icon>
                  </v-btn>
                  <v-btn text target="_blank" href="#">
                    <v-icon color="iconTxt"> mdi-youtube </v-icon>
                  </v-btn>
                </div>
              </div>
            </div>
          </v-col>
          <v-col lg="9" md="8" cols="12">
            <v-row>
              <v-col md="4" sm="4" cols="12">
                <div class="conEachFooterSec">
                  <div class="headerSec">ABOUT Task</div>
                  <div class="conOFLinks">
                    <v-btn
                      text
                      tile
                      :ripple="false"
                      class="eachLinkFooter"
                      href="https://www.npmjs.com/package/fruit-api"
                    >
                      task description
                    </v-btn>
                    <v-btn
                      text
                      tile
                      :ripple="false"
                      class="eachLinkFooter"
                      href="https://www.linkedin.com/in/george-youssef/"
                    >
                      my profile
                    </v-btn>
                    <v-btn text tile :ripple="false" class="eachLinkFooter">
                      development
                    </v-btn>
                  </div>
                </div>
              </v-col>
              <v-col md="4" sm="4" cols="12">
                <div class="conEachFooterSec">
                  <div class="headerSec">Technology Use</div>
                  <div class="conOFLinks">
                    <v-btn
                      text
                      tile
                      :ripple="false"
                      class="eachLinkFooter"
                      href="https://v2.vuejs.org/"
                    >
                      vue.js version 2
                    </v-btn>
                    <v-btn
                      text
                      tile
                      :ripple="false"
                      class="eachLinkFooter"
                      href="https://v2.vuetifyjs.com/en/"
                    >
                      Vuetify 2
                    </v-btn>
                    <v-btn
                      text
                      tile
                      :ripple="false"
                      class="eachLinkFooter"
                      href="https://www.npmjs.com/package/fruit-api"
                    >
                      Fruits API
                    </v-btn>
                  </div>
                </div>
              </v-col>
              <v-col md="4" sm="4" cols="12">
                <div class="conEachFooterSec">
                  <div class="headerSec">CONTACT me</div>
                  <div class="conOFLinks">
                    <v-btn
                      href="tel:937660927"
                      text
                      tile
                      :ripple="false"
                      class="eachLinkFooter"
                    >
                      937660927
                    </v-btn>
                    <v-btn
                      href="tel:+351937660927"
                      text
                      tile
                      :ripple="false"
                      class="eachLinkFooter"
                    >
                      +351 937 660 927
                    </v-btn>
                    <v-btn
                      href="mailto:george.youssef222@gmail.com"
                      text
                      tile
                      :ripple="false"
                      class="eachLinkFooter"
                    >
                      mailto:george.youssef222@gmail.com
                    </v-btn>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </section>
</template>
<script>
export default {
  name: "footerMessage",
};
</script>
