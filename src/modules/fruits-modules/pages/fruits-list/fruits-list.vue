<template>
  <section class="fruitsListSection h-100 pb-5">
    <v-container>
      <v-row class="mt-3">
        <v-col cols="12">
          <Breadcrumb :BreadcrumbList="BreadcrumbList" />
          <HeaderPage :headerPage="{ part1: 'Fruits', part2: 'List' }" />
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="fruitsList && fruitsList.length > 0">
      <v-row class="mt-3">
        <v-col cols="12">
          <section class="d-flex justify-end">
            <v-btn class="textBtnRed" text :ripple="false" @click="openDialog">
              <v-icon>mdi-plus</v-icon>
              Add New
            </v-btn>
          </section>
          <section>
            <v-data-table
              :headers="headers"
              :items="fruitsList"
              class="elevation-1"
            >
              <template v-slot:[`item.color`]="{ item }">
                <v-chip
                  class="chipSetColor"
                  :style="{ 'background-color': item.color }"
                >
                </v-chip>
              </template>

              <template v-slot:[`item.image`]="{ item }">
                <v-img
                  :lazy-src="item.image"
                  height="50"
                  max-width="60"
                  :src="item.image"
                  :alt="item.name"
                  @error="setDefaultImage(item)"
                ></v-img>
              </template>
              <template v-slot:[`item.expires`]="{ item }">
                <div>{{ item.expires | formatDate }}</div>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon
                  @click="
                    $router.push({
                      name: 'fruitItem',
                      params: { id: item.id },
                    })
                  "
                >
                  mdi-eye-outline
                </v-icon>
                <v-icon class="ml-2" @click="deleteItem(item)">
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table>
          </section>
        </v-col>
      </v-row>
    </v-container>
    <div class="conOfLoader" v-else-if="isLoading">
      <div class="loadercontentPage"></div>
      <div class="loaderContainer">
        <v-progress-circular
          :size="120"
          :width="4"
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
    </div>
    <EmptyState v-else></EmptyState>
    <fruit-dialog
      v-if="fruitsDialog"
      v-model="fruitsDialog"
      @refreshGrid="refreshGrid()"
    ></fruit-dialog>
    <confirm-dialog
      v-if="dialogConform"
      v-model="dialogConform"
      @confirmAction="cofirmAction()"
    />
  </section>
</template>
<script>
import { ApiService } from "@/modules/shared/services/api";
let apiServices = new ApiService();

import EmptyState from "@/modules/shared/components/empty-state/empty-state.vue";
import HeaderPage from "@/modules/shared/components/header-pages/header-pages.vue";
import Breadcrumb from "@/modules/shared/components/breadcrumbs-pages/breadcrumbs-pages.vue";
import FruitDialog from "../../components/fruit-dialog/fruit-dialog.vue";
import ConfirmDialog from "@/modules/shared/components/confirm-popup/confirm-popup.vue";

export default {
  name: "fruit-list",
  components: {
    FruitDialog,
    ConfirmDialog,
    Breadcrumb,
    HeaderPage,
    EmptyState,
  },
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
        disabled: true,
      },
    ],
    deleteIDFruit: null,
    fruitsList: [],
    headers: [
      { text: "name", sortable: false, value: "name" },
      { text: "Image", sortable: false, value: "image" },
      { text: "Price", sortable: false, value: "price" },
      {
        text: "Description",
        sortable: false,
        value: "description",
        width: "40%",
      },
      { text: "Taste", sortable: false, value: "taste" },
      { text: "Expires", sortable: false, value: "expires" },
      { text: "COLOR", sortable: false, value: "color" },
      { text: "ACTION", value: "actions", sortable: false, align: "right" },
    ],
    isLoading: false,
    fruitsDialog: false,
    dialogConform: false,
  }),
  methods: {
    refreshGrid() {
      this.getListData();
    },
    openDialog() {
      this.fruitsDialog = true;
    },
    setDefaultImage(item) {
      item.image = this.defaultImage;
    },
    mapFruits(obj, result = []) {
      Object.values(obj).forEach((value) => {
        if (typeof value === "object" && value !== null) {
          if (value.isFruit && value.id) result.push({ ...value });
          else this.mapFruits(value, result);
        }
      });
      this.fruitsList = result;
    },
    async getListData() {
      console.log("getListData called"); // Debugging log
      this.fruitsList = [];
      this.isLoading = true;
      const res = await apiServices.get("fruit");
      if (res) {
        this.mapFruits(res.data);
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    },
    deleteItem(item) {
      this.deleteIDFruit = item.id;
      this.dialogConform = true;
    },
    cofirmAction() {
      apiServices.delete(this.deleteIDFruit, "fruit").then((res) => {
        if (res) {
          this.dialogConform = false;
          this.getListData();
        } else this.dialogConform = false;
      });
    },
    closeConfirmDialog() {
      this.deleteIDFruit = null;
      this.dialogConform = false;
    },
  },
  mounted() {
    console.log("mounted");
    this.getListData();
  },
  watch: {
    fruitsDialog(val) {
      val || this.closeConfirmDialog();
    },
    dialogConform(val) {
      val || this.closeConfirmDialog();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./_fruits-list.scss";
</style>
