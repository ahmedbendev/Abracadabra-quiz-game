axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

let app = new Vue({
    el: "#game-app",
    delimiters: ['[[', ']]'],
    data: {
        number_player: "",
        team_name:"",
        current_player_number:0,
        players_information:[],
        player_name:"",
        player_family_name:"",
        player_phone:"",
        player_email:"",
        player_city:"",


    },
    methods:{
        switch_page: function(){    
            console.log("number_player",this.number_player);
            console.log("this.number_player < this.current_player_number",this.number_player < this.current_player_number);
            if(this.current_player_number == 0){
                if(this.number_player > 0 && this.team_name != ""){
                    console.log("step 1 validated");
                    // hide step1 form
                    document.getElementById("form-section-one").style.display = "none";
                    // show step2 form
                    document.getElementById("form-section-two").style.display = "flex";
                    this.current_player_number = 1;
                }else{
                    console.log("step 1 not validated");
                    alert("fill the fields before submit")
                }
            }else if ((this.player_name ==  "" ) || (this.player_family_name == "") || (this.player_phone == "") || (this.player_city == "")) {
                console.log("not  validated");
                alert("please complete the  required fields before you save")
            }else{
                if(this.number_player > this.current_player_number ){
                    // save player info and move forword
                    player = {
                        "player_name" : this.player_name,
                        "player_family_name" : this.player_family_name,
                        "player_phone" : this.player_phone,
                        "player_email" : this.player_email,
                        "player_city" : this.player_city,
                    }
                    this.players_information.push(player)
                    // return defult
                    this.player_name=""
                    this.player_family_name=""
                    this.player_phone=""
                    this.player_email=""
                    this.player_city=""
                    
                    this.current_player_number = this.current_player_number + 1;
                }else{
                    player = {
                        "player_name" : this.player_name,
                        "player_family_name" : this.player_family_name,
                        "player_phone" : this.player_phone,
                        "player_email" : this.player_email,
                        "player_city" : this.player_city,
                    }
                    this.players_information.push(player)
                    console.log("complete",this.players_information);

                    // submit form team
                    form={
                        "team_name":this.team_name,
                        "number_player":this.number_player,
                        "players_information":this.players_information,
                    }
                    axios.post("submit-team",data=form)
                    .then(response => {
                        console.log(response);
                        team_id = response.data.team_id
                        url = '/game/team/'+team_id
                        window.location.replace(url)
                    })
                    .catch(error => {
                        console.log(error.response);
                    })
                }
            }
        },
    }
  });
