from django.shortcuts import render, redirect
from rest_framework.views import APIView 
from rest_framework.response import Response
from rest_framework import status
from .models import Team, Player,Question

def home(request):
    return render(request, "home.html",)

def game(request):
    return render(request, "game.html",)

class SubmitTeam(APIView):
    def post(self, request, *args, **kwargs):
        form = request.data
        team_name = form['team_name']
        number_of_player = form['number_player']
        players_information = form['players_information']

        team =  Team.objects.create(
            name = team_name,
            number_of_player=number_of_player,
        )
        team.save()
        for player in players_information:
            name =  player['player_name']
            family_name =  player['player_family_name']
            phone =  player['player_phone']
            email =  player['player_email']
            city =  player['player_city']

            player = Player.objects.create(
                name=name,
                family_name=family_name,
                phone=phone,
                email=email,
                city=city,
                team =team
            )
            player.save()
            
        data={
            "team_id":team.id
        }
        return Response(status=status.HTTP_200_OK,data=data)

def game_team(request,pk):
    team = Team.objects.filter(pk=pk).first()
    questions = Question.objects.all().order_by('question_number')
    context={
        "team":team,
        "questions":questions
    }
    return render(request, "game_team.html",context)


def highscore(request):
    teams = Team.objects.all().order_by("-score")
    context={
        "team1":teams[0],
        "team2":teams[1],
        "team3":teams[2],
        "team4":teams[3],
        "team5":teams[4],
    }
    return render(request, "highscore.html",context)
    
def game_team_score(request,pk):
    team = Team.objects.filter(pk=pk).first()
    context={
        "team":team
    }
    return render(request, "game_team_score.html",context)


class SubmitTeamAnswers(APIView):
    def post(self, request, *args, **kwargs):
        form = request.data
        team_id = form['team_id']
        answers = form['answers']

        team =  Team.objects.filter(pk = team_id).first()
        questions = Question.objects.all().order_by('question_number') 

        score = 0
        for  question in questions:
            qst = "question"+str(question.question_number)
            players_answer = answers[qst]

            right_answer = question.right_answer
            answer_coefficient = question.question_conff
            if players_answer == right_answer:
                score  = score + answer_coefficient
        
        team.score = score
        team.save()

        data={
            "team_id":team_id
        }
        return Response(status=status.HTTP_200_OK,data=data)

