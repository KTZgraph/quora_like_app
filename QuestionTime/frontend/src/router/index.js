import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  }
];

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL, // don't want urls like http://127.0.0.1:8000/http:/127.0.0.1:8081/
  routes
});

export default router;
