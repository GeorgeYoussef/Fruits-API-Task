<template>
  <section class="conOfEventItem h-100 mb-5" v-if="fruitItem">
    <v-container>
      <v-row class="mt-3">
        <v-col cols="12">
          <Breadcrumb :BreadcrumbList="BreadcrumbList" />
          <HeaderPage :headerPage="{ part1: fruitItem.name, part2: 'Fruit' }" />
        </v-col>
      </v-row>
    </v-container>
    <section class="mt-3">
      <div>
        <v-container>
          <section class="conOfHeader">
            <v-row>
              <v-col md="8" cols="12">
                <div class="headerSec">{{ fruitItem.name }}</div>
              </v-col>
            </v-row>
          </section>
        </v-container>
      </div>

      <v-container>
        <v-row>
          <v-col md="6" cols="12">
            <div class="conofcardSec">
              <v-row align="center" class="mx-0">
                <v-icon class="mr-3" :color="fruitItem.color">
                  mdi-food
                </v-icon>
                <div class="mt-2 text-subtitle-1">
                  $ {{ fruitItem.price }} • {{ fruitItem.taste }}
                </div>
              </v-row>

              <div class="descSec mt-5" v-html="fruitItem.description"></div>
              <v-chip class="my-5" color="red" text-color="white">
                Expiration: {{ fruitItem.expires | formatDate }}
              </v-chip>
            </div>
          </v-col>
          <v-col md="6" cols="12">
            <div class="conSecImage">
              <div class="conOfCardImg">
                <v-img
                  @error="setDefaultImage"
                  :lazy-src="fruitItem.image"
                  :src="fruitItem.image"
                  :alt="fruitItem.name"
                ></v-img>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </section>
</template>

<script>
// import EmptyState from "@/modules/shared/components/emptystate";
import Breadcrumb from "@/modules/shared/components/breadcrumbs-pages/breadcrumbs-pages.vue";
import HeaderPage from "@/modules/shared/components/header-pages/header-pages.vue";
import { ApiService } from "@/modules/shared/services/api";
let apiServices = new ApiService();
export default {
  data: () => ({
    defaultImage: require("@/assets/img/fruits-Default.jpg"),
    BreadcrumbList: [
      {
        text: "Home",
        href: "/",
        disabled: false,
      },
      {
        text: "Fruits List",
        href: "/fruits/fruits-list",
        disabled: false,
      },
      {
        text: "",
        disabled: true,
      },
    ],
    fruitItem: null,
    isLoading: false,
  }),
  components: {
    // EmptyState,
    Breadcrumb,
    HeaderPage,
  },
  methods: {
    setDefaultImage() {
      this.fruitItem.image = this.defaultImage;
    },
    getFruitItem() {
      this.fruitItem = [];
      this.isLoading = true;

      apiServices.get("fruit/" + this.$route.params.id).then((res) => {
        if (res) {
          this.fruitItem = res;
          this.BreadcrumbList[
            this.BreadcrumbList.length - 1
          ].text = `${res.name} fruit`;
          this.isLoading = false;
        } else {
          this.isLoading = false;
        }
      });
    },
  },
  created() {
    this.getFruitItem();
  },
};
</script>
<style lang="scss" scoped>
@import "./_fruit-item.scss";
</style>
