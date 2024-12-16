<template>
  <div class="conOfBreadcrumbs">
    <v-breadcrumbs :items="BreadcrumbList">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script>
export default {
  props: ["BreadcrumbList"],
};
</script>
<style scoped lang="scss">
@import "~@/assets/styles/abstracts/variables";
.conOfBreadcrumbs {
  ul {
    padding: 0;
    &::v-deep {
      .v-breadcrumbs__divider {
        padding: 0;
      }
      .v-breadcrumbs__item {
        font-size: 0.8rem;
        color: $color-primary;
        font-weight: bold;
        &.v-breadcrumbs__item--disabled {
          color: #989898;
          font-weight: initial;
        }
      }
    }
  }
}
</style>
