import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Question from "../views/Question.vue";
import QuestionEditor from "../views/QuestionEditor.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/question/:slug", //`slug` is a parameter
    name: "question",
    component: Question,
    props: true
  },
  {
    path: "/ask", //`slug` is a parameter
    name: "question-editor",
    component: QuestionEditor,
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
