<template>
  <v-dialog v-model="show" max-width="400px">
    <v-card class="conConfirmPopup">
      <v-card-title>
        <span class="text-h5 modalTitle">Are you sure</span>
      </v-card-title>
      <v-card-text class="textConfirm"
        >Are you sure you want to Change this item?</v-card-text
      >
      <v-card-actions class="pb-7">
        <v-spacer></v-spacer>
        <v-btn class="btnDismissed" tile @click.stop="show = false"
          >Cancel</v-btn
        >
        <v-btn
          class="btnPrimarySubmit"
          tile
          @click="cofirmAction"
          :disabled="isLoadingConfirmDialog"
          :loading="isLoadingConfirmDialog"
          >Confirm</v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    isLoadingConfirmDialog: false,
  }),
  props: {
    value: Boolean,
  },
  methods: {
    cofirmAction() {
      this.isLoadingConfirmDialog = true;
      this.$emit("confirmAction");
    },
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>
