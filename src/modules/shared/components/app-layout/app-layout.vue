<template>
  <v-app class="v-app-Style fill-height">
    <HeaderMain />
    <main class="mainStyle">
      <router-view></router-view>
    </main>
    <div class="conOfAllFooterSection">
      <FooterMain />
      <FooterCopyRight />
    </div>
  </v-app>
</template>

<script>
import HeaderMain from "@/modules/shared/components/layout/header-main.vue";
import FooterCopyRight from "@/modules/shared/components/layout/footer-copyRights.vue";
import FooterMain from "@/modules/shared/components/layout/footer-main.vue";

export default {
  components: {
    HeaderMain,
    FooterMain,
    FooterCopyRight,
  },
};
</script>
