<template>
  <div class="single-question mt-2">
    <div class="container">
      <h1>{{ question.content }}</h1>
      <QuestionActions 
        v-if="isQuestionAuthor"
        :slug="question.slug"
      />
      <p class="mb-0">
        Posted by:
        <span class="author-name">{{ question.author }}</span>
      </p>
      <p>{{ question.created_at }}</p>
      <hr />
      <div v-if="userHasAnswered">
        <p class="answer-added">You've written an answer</p>
      </div>
      <div v-else-if="showForm" @submit.prevent="onSubmit">
        <form class="card">
          <div class="card-header px-3">
			  Answer the Question
		 </div>
          <div class="card-block">
            <textarea
              v-model="newAnswerBody"
              class="form-control"
              placeholder="Share your knowledge"
              rows="5"
            ></textarea>
          </div>
          <div class="card-footer px-3">
            <button type="submit" class="btn btn-sm btn-success">Submit Your Answer</button>
          </div>
        </form>
        <p v-if="error" class="error mt-2">{{ error }}</p>
      </div>
      <div v-else>
        <button class="btn btn-sm btn-success" @click="showForm = true">Answer the Question</button>
      </div>
      <hr />
    </div>

    <div class="container">
      	<!-- answer is a prop from Answer.vue -->
        <!-- delete-answer parameter for Answer component -->
		<AnswerComponent 
			v-for="answer in answers" 
			:answer="answer"
      :requestUser="requestUser"
			:key="answer.id" 
      @delete-answer="deleteAnswer"
		/>

		<div class="my-4">
			<p v-show="loadingAnswers">...loading...</p>
			<button
				v-show="next"
				@click="getQuestionAnswers"
				class="btn btn-sm btn-outline-success"
				>Load More
			</button>
		</div>
    </div>
  </div>
</template>

<script>
import { apiService } from "@/common/api.service.js"; //function instead axios
import AnswerComponent from "@/components/Answer.vue"; // @ is an aliasti to /src folder
import QuestionActions from "@/components/QuestionActions.vue";
export default {
  name: "Question",
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  components: {
    AnswerComponent,
    QuestionActions
  },
  data() {
    return {
      question: {},
      answers: [],
      newAnswerBody: null,
      error: null,
      userHasAnswered: false,
	    showForm: false,
	    next: null,
      loadingAnswers: false,
      requestUser: null
    };
  },
  computed: {
    isQuestionAuthor(){
      // return true if the logged user is also the author of question instance
      return this.question.author === this.requestUser;
    }
  },
  methods: {
    setPageTitle(title) {
      document.title = title;
    },
    setRequestUser(){
      // data for logged user
      this.requestUser = window.localStorage.getItem("username"); //data form loac storage
    },
    getQuestionData() {
      let endpoint = `/api/questions/${this.slug}/`; // `slug` is a prop, always remember about `/` at the end!
      apiService(endpoint).then(data => {
        this.question = data; //data property
        this.userHasAnswered = data.user_has_answered;
        this.setPageTitle(data.content);
      });
    },
    getQuestionAnswers() {
	  let endpoint = `/api/questions/${this.slug}/answers/`; //many answers
	  if(this.next){
		  endpoint = this.next;
	  }
	  this.loadingAnswers = true;
	  apiService(endpoint)
	  	.then(data => {
		this.answers.push(...data.results); //when get `next` (additional) data (pagination answer)
		this.loadingAnswers = false;
          if (data.next) { //url from django REST for next data (pagination)
            this.next = data.next;
          }else{ //if no addditional data exists
            this.next = null;
          }
      });
    },
    onSubmit() {
      if (this.newAnswerBody) {
        let enpoint = `/api/questions/${this.slug}/answer/`; //one answer
		apiService(enpoint, "POST", { body: this.newAnswerBody })
		.then(data => {
          this.answers.unshift(data);
        });
        this.newAnswerBody = null;
        this.showForm = false;
        this.userHasAnswered = true;
        if (this.error) {
          this.error = null;
        }
      } else {
        this.error = "You can't send an empty answer!";
      }
    },
    async deleteAnswer(answer){
      let endpoint = `/api/answers/${answer.id}/`;
      try{
        await apiService(endpoint, "DELETE");
        //delete element from local array
        this.$delete(this.answers, this.answers.indexOf(answer));
        this.userHasAnswered = false;
      }
      catch(err){
        console.log(err);
      }
    }
  },
  created() {
    //lifecycle hooks
    this.getQuestionData();
    this.getQuestionAnswers();
    this.setRequestUser();
  }
};
</script>

<style scoped>
.author-name {
  font-weight: bold;
  color: #dc3545;
}
.answer-added {
  font-weight: bold;
  color: green;
}
.error {
  font-weight: bold;
  color: red;
}
</style>