from django.urls import path

from .views import *

urlpatterns = [
    path('', home, name='home'),
    path('game', game, name='game'),
    path('game/team/<int:pk>', game_team, name='game-team'),
    path('game/team/score/<int:pk>', game_team_score, name='game-team-score'),
    path('highscore', highscore, name='highscore'),
    # Api
    path('submit-team',SubmitTeam.as_view(), name='submit-team'),
    path('submit-team-answers',SubmitTeamAnswers.as_view(), name='submit-team-answers'),
]
