<template>
  <div>
    <v-app-bar class="navbar headerNavBar" color="white" app>
      <v-container class="d-flex align-center justify-space-between">
        <v-app-bar-nav-icon
          @click="drawer = true"
          class="hidden-lg-and-up"
        ></v-app-bar-nav-icon>

        <v-toolbar-title class="container-logo">
          <router-link :to="{ name: 'landingPage' }">
            <img src="@/assets/img/logo.jpg" alt="logo" />
          </router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-md-and-down">
          <v-menu
            :close-on-content-click="false"
            v-for="item in items"
            :key="item.title"
            open-on-hover
            bottom
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                :to="item.routeName ? { name: item.routeName } : ''"
                :class="[item.className, item.addActive]"
                :ripple="false"
                :exact="item.routeName == 'landingPage'"
              >
                {{ item.title }}
                <v-icon v-if="!item.single"> mdi-chevron-down </v-icon>
              </v-btn>
            </template>
            <v-list dense v-if="item.items">
              <v-list-item-group v-model="selectedItem" class="conChildItem">
                <v-list-item v-for="child in item.items" :key="child.title">
                  <v-btn
                    :to="child.routeName ? { name: child.routeName } : ''"
                    text
                    tile
                    :ripple="false"
                  >
                    <v-list-item-title
                      class="titleOfChildNav"
                      v-text="child.title"
                    ></v-list-item-title>
                  </v-btn>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
        </v-toolbar-items>
      </v-container>
    </v-app-bar>
    <!-- responsive -->
    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      v-if="drawer"
      class="fixedAndIndexed"
    >
      <v-list>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          :class="item.single ? 'hidden-lg-and-up' : ''"
        >
          <template v-slot:activator>
            <v-btn
              text
              :to="item.routeName ? { name: item.routeName } : ''"
              :class="[item.className, item.single ? 'singleItem' : '']"
              :ripple="false"
              :exact="item.routeName == 'landingPage'"
            >
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-btn>
          </template>

          <v-list-item
            v-for="child in item.items"
            :key="child.title"
            :to="child.routeName ? { name: child.routeName } : ''"
            link
          >
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      drawer: false,
      selectedItem: 1,
      items: [
        {
          title: "Home",
          routeName: "landingPage",
          addActive: "",
          single: true,
        },
        {
          title: "Fruits List",
          single: true,
          addActive: "",
          routeName: "fruitsList",
        },

        {
          active: false,
          title: "Technology Use",
          addActive: "",
          items: [
            { title: "vue.js version 2", routeName: "" },
            { title: "Vuex", routeName: "" },
            { title: "Vuetify 2", routeName: "" },
            { title: "Fruits API", routeName: "" },
            { title: "Axios", routeName: "" },
          ],
        },
        {
          title: "ApI Task",
          single: true,
          addActive: "",
          routeName: "",
        },
        {
          active: false,
          title: "About Me",
          addActive: "",
          isExistpdf: true,
          items: [
            { title: "Front-end developer", routeName: "" },
            { title: "Vue.js Focused", routeName: "" },
            {
              title: "Angular",
              routeName: "",
            },
            { title: "Data Visualization", routeName: "" },
            { title: "SEO EXP", routeName: "" },
          ],
        },
      ],
    };
  },
};
</script>
<style scoped lang="scss">
::v-deep {
  .theme--light.v-list-item--active:hover::before,
  .theme--light.v-list-item--active::before,
  .theme--light.v-btn--active:hover::before,
  .theme--light.v-btn--active::before {
    opacity: 0;
  }
}
</style>
