<template>
    <div class="single-answer">
        <p class="text-muted">
        <strong>{{ answer. author }}</strong> &#8901; {{ answer.created_at }}
        </p>
        <p>{{ answer.body }}</p>
        <div v-if="isAnswerAuthor">
            <!-- redirect to component AnswerEditor which provides answering -->
            <router-link
                :to="{ name: 'answer-editor', params: { id: answer.id } }"
                class="btn btn-sm btn-outline-secondary mr-1"
                >Edit
            </router-link>
            <!-- as soon as a button `Edit` i pressed we are using router link to redirect the user to the answer-editor path 
            and this path is using AnswerEditor component-->
            <button
                class="btn btn-sm btn-outline-danger"
                @click="trigerDeleteAnswer"
                >Delete
            </button>
        </div>
        <div v-else>
            <!-- :class provide style button dependent on `data` -->
            <button
                class="btn btn-sm"
                @click="toogleLike"
                :class="{
                    'btn-danger': userLikedAnswer,
                    'btn-outline-danger': !userLikedAnswer
                }"
            ><strong>Like [{{ likesCounter }}]</strong>
            </button>
        </div>
        <hr>
    </div>
</template>

<script>
import { apiService } from "@/common/api.service.js";
export default {
    name: "AnswerComponent",
    props: {
        answer: {
            type: Object,
            required: true
        },
        requestUser: {
            // passing parametr from Question.vue
            type: String,
            required: true
        }
    },
    data(){
        return {
            userLikedAnswer: this.answer.user_has_voted, // field from AnswerSerializer django
            likesCounter: this.answer.likes_count
        }
    },
    computed: {
        isAnswerAuthor() { 
            return this.answer.author === this.requestUser;
        }
    },
    methods:{
        toogleLike(){
            this.userLikedAnswer === false
                ? this.likeAnswer() //if true 
                : this.unLikeAnswer() // else
        },
        likeAnswer(){
            this.userLikedAnswer = true;
            this.likesCounter += 1;
            let enpoint = `/api/answers/${this.answer.id}/like/`;
            apiService(enpoint, "POST");
        },
        unLikeAnswer(){
            this.userLikedAnswer = false;
            this.likesCounter -= 1;
            let enpoint = `/api/answers/${this.answer.id}/like/`;
            apiService(enpoint, "DELETE");        
        },
        trigerDeleteAnswer(){
            //methods than emits signal
            this.$emit("delete-answer", this.answer);
        }
    }
}
</script>