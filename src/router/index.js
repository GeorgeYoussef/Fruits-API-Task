import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    component: {
      render(c) {
        return c("router-view");
      },
    },
    children: [
      {
        path: "",
        component: () => import("../modules/home-module/home-module.vue"),
        children: [
          {
            path: "",
            name: "landingPage",
            component: () =>
              import(
                "../modules/home-module/pages/landing-page/landing-page.vue"
              ),
          },
        ],
      },
      {
        path: "fruits",
        component: () => import("../modules/fruits-modules/fruits-modules.vue"),
        children: [
          {
            path: "fruits-list",
            name: "fruitsList",
            component: () =>
              import(
                "../modules/fruits-modules/pages/fruits-list/fruits-list.vue"
              ),
          },
          {
            path: "fruit-item/:id",
            name: "fruitItem",
            component: () =>
              import(
                "../modules/fruits-modules/pages/fruit-item/fruit-item.vue"
              ),
          },
        ],
      },
    ],
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
