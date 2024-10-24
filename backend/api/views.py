from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .serializer import PlayerSerializer, TeamSerializer, TeamPlayerSerializer, TeamPlayerSerializer2
from .models import Player, Team, TeamPlayer
from rest_framework import generics
import random
# Player

@api_view(['GET'])
def get_players(request, pk=None):
    if pk:
        try:
            player = Player.objects.get(pk=pk)  # Retrieve a single player by SL
            serialized_data = PlayerSerializer(player)
            return Response(serialized_data.data, status=status.HTTP_200_OK)
        except Player.DoesNotExist:
            return Response({'detail': 'Player not found.'}, status=status.HTTP_404_NOT_FOUND)

    players = Player.objects.all()
    if not players.exists():
        return Response([], status=status.HTTP_200_OK)

    serialized_data = PlayerSerializer(players, many=True)
    return Response(serialized_data.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def random_players(request):
    while True:
        # Get all players who are not randomized and have a status of False
        players = Player.objects.filter(status=False, randomized=False)

        if not players.exists():
            # If no available players, reset all players' randomized field to False
            Player.objects.all().update(randomized=False)
            continue

        # Select a random player from the filtered queryset
        random_player = random.choice(players)

        # Set randomized to True for the selected player
        random_player.randomized = True
        random_player.save()

        # Serialize the selected player data
        serialized_data = PlayerSerializer(random_player)
        return Response(serialized_data.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_teams(request, pk=None):
    if pk:
        try:
            team = Team.objects.get(pk=pk)  # Retrieve a single player by SL
            serialized_data = TeamSerializer(team)
            return Response(serialized_data.data, status=status.HTTP_200_OK)
        except Team.DoesNotExist:
            return Response({'detail': 'Team not found.'}, status=status.HTTP_404_NOT_FOUND)

    team = Team.objects.all()
    if not team.exists():
        return Response([], status=status.HTTP_200_OK)

    serialized_data = TeamSerializer(team, many=True)
    return Response(serialized_data.data, status=status.HTTP_200_OK)


# TeamPlayer

@api_view(['GET'])
def get_team_players(request, pk=None):
    if pk is not None:
        # Fetch all players related to the team using the provided pk as the team id
        team_players = TeamPlayer.objects.filter(team_id=pk)  # Changed to pk
        if team_players.exists():
            serialized_data = TeamPlayerSerializer2(team_players, many=True)
            return Response(serialized_data.data, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Team not found.'}, status=status.HTTP_404_NOT_FOUND)
    
    # If no pk is provided, return all team players
    team_players = TeamPlayer.objects.all()
    if not team_players.exists():
        return Response([], status=status.HTTP_200_OK)
    
    serialized_data = TeamPlayerSerializer2(team_players, many=True)
    return Response(serialized_data.data, status=status.HTTP_200_OK)



@api_view(['POST'])
def create_team_players(request):
    data = request.data
    player_id = data.get('player')  # Expecting player ID from the request
    team_id = data.get('team')  # Expecting team ID from the request
    price = data.get('price')  # Expecting price from the request

    # Check if player and team exist before creating TeamPlayer
    try:
        player = Player.objects.get(SL=player_id)
    except Player.DoesNotExist:
        return Response({'error': 'Player not found.'}, status=status.HTTP_404_NOT_FOUND)

    # Check if the player is already sold
    if player.status:
        return Response({'error': 'Player is already sold.'}, status=status.HTTP_400_BAD_REQUEST)


    team = Team.objects.get(id=team_id)


    # Check if the team has enough balance
    if team.balance < price:
        return Response({'error': 'Insufficient balance.'}, status=status.HTTP_400_BAD_REQUEST)

    # Create the team player relationship
    team_player_data = {
        'player': player_id,
        'team': team_id,
        'price': price
    }

    serializer = TeamPlayerSerializer(data=team_player_data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
