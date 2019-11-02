<template>
    <div class="container mt-2">
        <h1 class="mb-3">Edit Your Answer</h1>
        <form @submit.prevent="onSubmit">
            <textarea
                v-model="answerBody"
                class="form-control"
                rows="3"
            ></textarea>
            <br>
            <button
                type="submit"
                class="btn btn-success"
            >Publish your answer</button>
        </form>
        <p v-if="error" class="muted mt-2">{{ error }}</p>
    </div>
</template>

<script>
import { apiService } from "@/common/api.service.js"
export default {
    name: "AnswerEditor",
    props: {
        // try to make independent components - pass only id/ slug of object NOT whole object
        // by having id component can access to the object which is need here 
        id : {
            type: Number,
            required: true
        },
        previousAnswer: {
            type: String,
            required: true
        },
        questionSlug:{
            type: String,
            required: true
        }
    },
    data(){
        return {
            answerBody: this.previousAnswer,
            error: null
        }
    },
    methods:{
        onSubmit(){
            if (this.answerBody) {
                let endpoint = `/api/answers/${this.id}/`;
                apiService(endpoint, "PUT", { body: this.answerBody })
                    .then(() =>{
                        this.$router.push({ //redirection user to question url after answered
                            name: "question",
                            params: { slug: this.questionSlug }
                        })
                    })
            }else{ // check user don't want to subbmit empty answer
                this.error = "You can't submit an ampty answer!";
                }
        }
    },
    async beforeRouteEnter(to, from, next){ //functionality from Vue.js - code before router
        // `to` - target root object beeing navigated to
        // `from` - current throught beeing navigated away from 
        // `next` - function that we used to move to the next page in the pipeline
        let endpoint = `/api/answers/${to.params.id}/`; //details from the answers
        let data = await apiService(endpoint);
        // function is executed before route, but we hae to pass data answer to the component itself => change serializer in django
        to.params.previousAnswer = data.body;
        to.params.questionSlug = data.question_slug; //.question_slug param from django object
        return next();
    }

}
</script>