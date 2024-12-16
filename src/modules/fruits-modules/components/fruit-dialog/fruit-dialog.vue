<template>
  <v-dialog v-model="fruitsDialog" max-width="800">
    <v-card class="conOfPopup">
      <v-card-title>
        <span class="text-h5 callbacks modalTitle">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text class="conFormSubmit">
        <v-container>
          <v-row>
            <v-col md="6" cols="12">
              <v-text-field
                outlined
                label="Name"
                hide-details="auto"
                v-model="formItem.name"
                required
                :error-messages="nameErrors"
                @input="$v.formItem.name.$touch()"
                @blur="$v.formItem.name.$touch()"
              ></v-text-field>
            </v-col>
            <v-col md="6" cols="12">
              <v-text-field
                label="price"
                outlined
                hide-details="auto"
                v-model="formItem.price"
                required
                :error-messages="priceErrors"
                @input="$v.formItem.price.$touch()"
                @blur="$v.formItem.price.$touch()"
              ></v-text-field>
            </v-col>
            <v-col md="6" cols="12">
              <v-text-field
                label="Image URL"
                outlined
                hide-details="auto"
                v-model="formItem.image"
                required
                :error-messages="imageErrors"
                @input="$v.formItem.image.$touch()"
                @blur="$v.formItem.image.$touch()"
              ></v-text-field>
            </v-col>
            <v-col md="6" cols="12">
              <v-text-field
                v-model="formItem.taste"
                label="Taste"
                outlined
                required
                :error-messages="tasteErrors"
                @input="$v.formItem.taste.$touch()"
                @blur="$v.formItem.taste.$touch()"
              ></v-text-field>
            </v-col>
            <v-col md="6" cols="12">
              <div class="conDatePicker">
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      solo
                      v-model="formItem.expires"
                      label="Expirty Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      hide-details="auto"
                      required
                      :error-messages="ExpiresErrors"
                      @input="$v.formItem.expires.$touch()"
                      @blur="$v.formItem.expires.$touch()"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="formItem.expires"
                    :min="minDateValid"
                    @input="menu = false"
                  ></v-date-picker>
                </v-menu>
              </div>
            </v-col>
            <v-col cols="12">
              <v-textarea
                label="Description"
                outlined
                v-model="formItem.description"
                required
                :error-messages="descriptionErrors"
                @input="$v.formItem.description.$touch()"
                @blur="$v.formItem.description.$touch()"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <div class="d-flex justify-center">
                <v-color-picker
                  v-model="formItem.color"
                  dot-size="25"
                  hide-mode-switch
                  hide-sliders
                  mode="hexa"
                  swatches-max-height="200"
                ></v-color-picker>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="pb-10">
        <v-spacer></v-spacer>
        <v-btn class="btnDismissed" tile @click.stop="fruitsDialog = false">
          Cancel
        </v-btn>
        <v-btn
          class="btnPrimarySubmit mr-4"
          @click="saveFruitItem"
          :disabled="isLoadingSave"
          :loading="isLoadingSave"
        >
          Add Fruit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, numeric, helpers } from "vuelidate/lib/validators";

import { ApiService } from "@/modules/shared/services/api";
let apiServices = new ApiService();
export default {
  name: "fruit-dialog",
  props: {
    value: Boolean,
  },
  mixins: [validationMixin],
  validations() {
    const validations = {
      formItem: {
        name: { required },
        price: { required, numeric },
        expires: { required },
        image: {
          required,
          isUrl: helpers.regex("isUrl", /^\/([\w\-./]+)\.(jpg|jpeg|png)$/i),
        },
        description: { required },
        taste: { required },
      },
    };
    return validations;
  },
  data: () => ({
    defaultItem: {
      expires: new Date().toISOString().substring(0, 10),
      color: "#FF0000FF",
    },
    formItem: {},
    editedIndex: -1,
    isLoadingSave: false,
    minDateValid: new Date().toISOString().substring(0, 10),
    menu: false,
  }),
  methods: {
    closeFruitsDialog() {
      this.fruitsDialog = false;
      this.$nextTick(() => {
        this.$v.$reset();
        this.formItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    saveFruitItem() {
      if (this.editedIndex > -1) {
        this.editedFruitItem();
      } else {
        this.addFruitItem();
      }
    },
    addFruitItem() {
      this.$v.$touch();
      if (this.$v.$error) return;
      this.isLoadingSave = true;

      let expiresDate = this.covertDate(this.formItem.expires);
      const FruitObj = {
        ...this.formItem,
        expires: expiresDate,
        isFruit: true,
      };

      apiServices.post(`fruit`, FruitObj).then((response) => {
        if (response) {
          this.$emit("refreshGrid");
          this.isLoadingSave = false;
          this.closeFruitsDialog();
        } else {
          this.isLoadingSave = false;
        }
      });
    },
    editedFruitItem() {},
    covertDate(date) {
      const dateObj = new Date(date);
      return dateObj.toISOString();
    },
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add Fruit" : "Edit Fruit";
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.formItem.name.$dirty) return errors;
      !this.$v.formItem.name.required && errors.push("name is required");
      return errors;
    },
    priceErrors() {
      const errors = [];
      if (!this.$v.formItem.price.$dirty) return errors;
      !this.$v.formItem.price.required && errors.push("price Is Required.");
      !this.$v.formItem.price.numeric &&
        errors.push("price should be a number");
      return errors;
    },
    imageErrors() {
      const errors = [];
      if (!this.$v.formItem.image.$dirty) return errors;
      !this.$v.formItem.image.required && errors.push("image URL is required");
      !this.$v.formItem.image.isUrl &&
        errors.push(
          "image URL should be relative start with / and with an extention (jpg-jpeg-png)"
        );
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.formItem.description.$dirty) return errors;
      !this.$v.formItem.description.required &&
        errors.push("Description is required");
      return errors;
    },
    tasteErrors() {
      const errors = [];
      if (!this.$v.formItem.taste.$dirty) return errors;
      !this.$v.formItem.taste.required && errors.push("Taste is required");
      return errors;
    },
    ExpiresErrors() {
      const errors = [];
      if (!this.$v.formItem.expires.$dirty) return errors;
      !this.$v.formItem.expires.required &&
        errors.push("Expires date is required.");
      return errors;
    },
    fruitsDialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  created() {
    this.formItem = Object.assign({}, this.defaultItem);
  },
};
</script>
<style lang="scss" scoped>
@import "./_fruit-dialog.scss";
</style>
