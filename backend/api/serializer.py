from rest_framework import serializers # type: ignore
from .models import Player, Team, TeamPlayer

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player  
        fields = '__all__'

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team  
        fields = '__all__'

class TeamPlayerSerializer(serializers.ModelSerializer):
    # Use PrimaryKeyRelatedField for player and team to accept IDs
    player = serializers.PrimaryKeyRelatedField(queryset=Player.objects.all())
    team = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all())

    class Meta:
        model = TeamPlayer
        fields = ['team', 'player', 'price']


class TeamPlayerSerializer2(serializers.ModelSerializer):
    # Embed PlayerSerializer to include detailed player information
    player = PlayerSerializer()
    team = TeamSerializer()

    class Meta:
        model = TeamPlayer
        fields = ['team', 'player', 'price']