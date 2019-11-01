<template>
    <div class="container mt-2">
        <h1 class="mb-3">Ask a Question</h1>
        <form @submit.prevent="onSubmit">
            <textarea
                v-model="question_body"
                class="form-control"
                placeholder="What do you want to ask?"
                rows="3"
            ></textarea>
            <br>
            <button
                type="submit"
                class="btn btn-success"
            >Publish</button>
        </form>
        <p v-if="error" class="muted mt-2">{{ error }}</p>
    </div>
</template>

<script>
import { apiService } from "../common/api.service.js" //function instead axios
export default {
    name: "QuestionEditor",
    data(){
        return{
            question_body: null,
            error: null
        }
    },
    methods:{
        onSubmit(){ //creates new question
            // console.log("HERE");
            if (!this.question_body){
                this.error = "You can't send an empty question!";
            }else if (this.question_body.length > 240){
                this.error = "Ensure this field has no more than 240 charactera!";
            }else{
                let endpoint = "/api/questions/";
                let method = "POST";
                apiService(endpoint, method, { content: this.question_body })
                    .then(question_data => { //after retived data
                        this.$router.push({ //redirection to path with specyfied question
                            name: 'question',
                            params: { slug: question_data.slug } //retirived data unique slag
                        })
                    })
                
            }
        }
    },
    created(){
        document.title = "Editor - QuestionTime";
    }
}
</script>