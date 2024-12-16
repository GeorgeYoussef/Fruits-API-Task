import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import "./assets/styles/main.scss";

Vue.config.productionTip = false;

Vue.filter("formatDate", function (value) {
  if (value) {
    var myDate = new Date(value);
    var year = myDate.getFullYear();
    var mes = myDate.getMonth() + 1;
    var dia = myDate.getDate();
    var filteredDate = dia + "-" + mes + "-" + year;
    return filteredDate;
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
