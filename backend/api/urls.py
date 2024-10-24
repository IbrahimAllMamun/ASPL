from django.urls import path
from .views import get_players, random_players # Updated to use new view name
from .views import get_teams  # Updated to use new view name
from .views import get_team_players, create_team_players  # Updated to use new view name

urlpatterns = [
    path('players/', get_players, name='get_players'),
    path('players/random', random_players, name='random_players'),
    path('players/<int:pk>', get_players, name='get_player'),
    path('teams/', get_teams, name='get_teams'),
    path('teams/<int:pk>', get_teams, name='get_team'),
    path('team-players/', get_team_players, name='get_team_players'),
    path('team-players/<int:pk>', get_team_players, name='get_team_player'),
    path('team-players/create', create_team_players, name='create_team_players'),
]
