from django.contrib import admin
from .models import Player, Team, TeamPlayer

@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = ('SL', 'name', 'batch', 'playingPosition', 'status', 'randomized')
    search_fields = ('name', 'batch', 'playingPosition')
    list_filter = ('batch', 'playingPosition', 'status', 'randomized')
    ordering = ('SL',)

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('id','team_name','owner', 'balance')
    search_fields = ('id','team_name')
    ordering = ('id',)


@admin.register(TeamPlayer)
class TeamPlayerAdmin(admin.ModelAdmin):
    list_display = ('team', 'player', 'price')  # Display these fields in the list view
    search_fields = ('team__team_name', 'player')  # Allow search by team name and player name
    list_filter = ('team',)  # Filter by team