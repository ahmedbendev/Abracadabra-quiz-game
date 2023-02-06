axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

let app = new Vue({
    el: "#game-team-app",
    delimiters: ['[[', ']]'],
    data: {
        number_player: "",
        team_name:"",
        current_question:1,
        answers:{
            "question1":0,
            "question2":0,
            "question3":0,
            "question4":0,
            "question5":0,
            "question6":0,
            "question7":0,
            "question8":0,
            "question9":0,
            "question10":0,
        },


    },
    methods:{
        next_question: function(){
            slected_question = "question"+this.current_question
            console.log("slected_question",slected_question);
            console.log("this.answers[slected_question]",this.answers[slected_question]);
            if(this.answers[slected_question] > 0 && this.current_question < 11){
                this.current_question = this.current_question + 1
                next_question = "question" + this.current_question
                console.log("slected_question,next_question",slected_question,next_question);
                this.show_next_question(slected_question,next_question)
                // if (this.current_question == 3) {
                //     console.log("show submit btn");
                //     // change the btn to see result
                //     document.getElementById("next-button").style.display = "none"
                //     document.getElementById("submit-button").style.display = "block"
                // }
            }
        },
        prev_question: function(){
            slected_question = "question"+this.current_question
            if(this.current_question < 11){
                this.current_question = this.current_question - 1
                next_question = "question" + this.current_question
                this.show_next_question(slected_question,next_question)
            }
        },
        show_next_question: function(slected,next){
            if(document.getElementById(next)){
                slected_question_div = document.getElementById(slected).classList.remove("active-question");
                next_question = document.getElementById(next).classList.add("active-question");
            }
        },
        select_answer: function(id,question_id,type){
            this.answers[question_id] = id

            console.log("id,question_id,type",id,question_id,type);
            if (type == "text") {
                // remove all selected    
                answer_div_1 = document.getElementById(question_id+"-answer1").classList.remove("answers-item-slected")
                answer_div_2 = document.getElementById(question_id+"-answer2").classList.remove("answers-item-slected")
                answer_div_3 = document.getElementById(question_id+"-answer3").classList.remove("answers-item-slected")
                answer_div_4 = document.getElementById(question_id+"-answer4").classList.remove("answers-item-slected")

                slected_answer = document.getElementById(question_id+"-answer"+id).classList.add("answers-item-slected")
            }else{
                if(id == 1){
                    answer_div_1 = document.getElementById(question_id+"-answer1").classList.add("answers-img-item-left-selected")
                    answer_div_2 = document.getElementById(question_id+"-answer2").classList.remove("answers-img-item-right-selected")
                }else if(id == 2){
                    answer_div_1 = document.getElementById(question_id+"-answer1").classList.remove("answers-img-item-left-selected")
                    answer_div_2 = document.getElementById(question_id+"-answer2").classList.add("answers-img-item-right-selected")
                }
            }
        },
        submit_question: function(team_id){
            form={
                "team_id":team_id,
                "answers":this.answers
            }
            axios.post("/submit-team-answers",data=form)
            .then(response => {
                team_id = response.data.team_id
                url = '/game/team/score/'+team_id
                window.location.replace(url)
            })
            .catch(error => {
                console.log(error.response);
            })
        }

    }
});
