<template>
  <div class="conOfHeaderPages">
    <div class="sectionHeader mianTitleResposive">
      <span> {{ headerPage.part1 }} </span> {{ headerPage.part2 }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["headerPage"],
};
</script>
<style scoped lang="scss">
@import "~@/assets/styles/abstracts/variables";
.conOfHeaderPages {
  .sectionHeader {
    font-size: 2.5rem;
    color: $color-secondary;
    font-weight: bold;
    text-transform: capitalize;
    span {
      color: $color-primary;
    }
  }
}
</style>
