# Generated by Django 5.1.2 on 2024-10-24 16:53

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Player',
            fields=[
                ('SL', models.IntegerField(primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(max_length=100)),
                ('batch', models.IntegerField()),
                ('playingPosition', models.CharField(max_length=5)),
                ('status', models.BooleanField(default=False)),
                ('randomized', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False, unique=True)),
                ('team_name', models.CharField(max_length=255)),
                ('balance', models.IntegerField(default=1000)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.player')),
            ],
        ),
        migrations.CreateModel(
            name='TeamPlayer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.IntegerField()),
                ('player', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.player')),
                ('team', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.team')),
            ],
            options={
                'unique_together': {('player', 'team')},
            },
        ),
    ]
