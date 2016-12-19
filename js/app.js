/**
 * Created by franz on 12/17/16.
 */
'use strict';

var app = angular.module('musicSearch',[
    'musicSearch.musicbrainz-controller',
    'musicSearch.lastfm-controller',
    'musicSearch.favorites-controller',
    'musicSearch.generic-service',
    'ui.router'
]);

app.config(function($stateProvider) {
  var musicbrainz = {
    name: 'musicbrainz',
    url: '/musicbrainz',
    templateUrl: 'musicbrainz.html',
    controller: 'MusicbrainzController'
  };

  var lastfm = {
    name: 'lastfm',
    url: '/lastfm',
    templateUrl: 'lastfm.html',
    controller: 'LastFMController'
  };

  var favorites = {
    name: 'favorites',
    url: '/favorites',
    templateUrl: 'favorites.html',
    controller: 'FavoritesController'
  };



  $stateProvider.state(musicbrainz);
  $stateProvider.state(lastfm);
  $stateProvider.state(favorites);
  $stateProvider.state("otherwise", {
    url: "*path",
    templateUrl: "musicbrainz.html",
    controller: 'MusicbrainzController'
  });

});

