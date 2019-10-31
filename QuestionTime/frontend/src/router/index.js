import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Example from "../views/Example.vue";
import About from "../views/About.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/example",
    name: "example",
    component: Example
  },
  {
    path: "/about",
    name: "about",
    component: About
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
      // import(/* webpackChunkName: "about" */ "../views/About.vue") // not necessary with django
  }
];

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL, // don't want urls like http://127.0.0.1:8000/http:/127.0.0.1:8081/
  routes
});

export default router;
