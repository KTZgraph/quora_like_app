import Vue from "vue";
import VueRouter from "vue-router";
import AnswerEditor from '../views/AnswerEditor.vue'
import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";
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
    path: "/ask/:slug?", // ? - optional parameter - url is used to create new question (without slug yet) and to edit question in QuestionActions Edit button
    name: "question-editor",
    component: QuestionEditor,
    props: true
  },
  {
    path: "/answer/:id", //`slug` is a parameter
    name: "answer-editor",
    component: AnswerEditor,
    props: true
  },
  {
    path: "*", // for non existing paths
    name: "page-not-found",
    component: NotFound,
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
