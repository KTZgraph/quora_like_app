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
        <hr>
    </div>
</template>

<script>
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
    computed: {
        isAnswerAuthor() { 
            return this.answer.author === this.requestUser;
        }
    },
    methods:{
        trigerDeleteAnswer(){
            //methods than emits signal
            this.$emit("delete-answer", this.answer);
        }
    }
}
</script>