/**
 * Created by franz on 12/18/16.
 */
'use strict';

var srvc = angular.module('musicSearch.generic-service', []);

var GenericFactoryService = function($http) {

    var musicBrainzDataArray = {};
    var favoriteReleaseDataArray = {};
    var favoriteArtistDataArray = {};

    var getArtists = function(artist, site) {
        // 0 - musicbrainz
        // 1 - lastfm
        //default - musicbrainz

        var artistBaseURL = "";

        if(site === 0) {
            artistBaseURL = 'http://musicbrainz.org/ws/2/artist?query=artist:' + encodeURIComponent(artist) + '&fmt=json&include=all';
        } else if(site === 1) {
            var apiKey = "57ee3318536b23ee81d6b27e36997cde";
            artistBaseURL = 'http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=' + encodeURIComponent(artist) + '&api_key=' + apiKey + '&format=json';
        } else {
            artistBaseURL = 'http://musicbrainz.org/ws/2/artist?query=artist:' + encodeURIComponent(artist) + '&fmt=json&include=all';
        }
        return getData(artistBaseURL);

    };

    var getReleases = function(artistid) {
        var musicBrainzReleaseBaseURL = 'http://musicbrainz.org/ws/2/release?query=arid:' + encodeURIComponent(artistid) + '&fmt=json&include=all';
        return getData(musicBrainzReleaseBaseURL);
    };

    var getData = function(url) {
        console.log(url);
        return $http({
            method: 'GET',
            url: url
        })
            .then(function(response) {
                return response.data;
            })
            .catch(function(response) {
                return response.data;
            });
    };

    var cacheReleaseData = function(key, obj) {
        if (!(key in musicBrainzDataArray)) {
            musicBrainzDataArray[key] = obj;
        }
    };

    var getCachedReleases = function() {
        return musicBrainzDataArray;
    };

    var getCachedReleaseData = function(key) {
        if(key in musicBrainzDataArray) {
            return musicBrainzDataArray[key];
        }
    };

    var getFavoriteReleases = function() {
        return favoriteReleaseDataArray;
    };

    var getFavoriteReleaseData = function(key) {
        if (key in favoriteReleaseDataArray) {
            return favoriteReleaseDataArray[key];
        }
    };

    var getFavoriteArtists = function() {
        return favoriteArtistDataArray;
    };

    var getFavoriteArtistData = function(key) {
        if (key in favoriteArtistDataArray) {
            return favoriteArtistDataArray[key];
        }
    };

    var isFavoriteRelease = function(key) {
      return (key in favoriteReleaseDataArray);
    };

    var isFavoriteArtist = function(key) {
      return (key in favoriteArtistDataArray);
    };

    var cacheFavoriteReleaseData = function(key, obj) {
        if (!(key in favoriteReleaseDataArray)) {
            favoriteReleaseDataArray[key] = obj;
        } else {
            delete favoriteReleaseDataArray[key];
        }
    };

    var cacheFavoriteArtistData = function(key, obj) {
        if (!(key in favoriteArtistDataArray)) {
            favoriteArtistDataArray[key] = obj;
        } else {
            delete favoriteArtistDataArray[key];
        }
    };


    return {
        getArtists: getArtists,
        getReleases: getReleases,
        cacheReleaseData: cacheReleaseData,
        getCachedReleaseData: getCachedReleaseData,
        getFavoriteReleases: getFavoriteReleases,
        getFavoriteArtists: getFavoriteArtists,
        isFavoriteRelease: isFavoriteRelease,
        isFavoriteArtist: isFavoriteArtist,
        cacheFavoriteReleaseData: cacheFavoriteReleaseData,
        cacheFavoriteArtistData: cacheFavoriteArtistData


        // getFavoriteReleases: getFavoriteReleases,
        // getFavoriteArtists: getFavoriteArtists,
        // getCacheArtistData: getCacheArtistData,
        // getCacheReleaseData: getCacheReleaseData,

    };
};

srvc.factory("GenericFactoryService", ['$http', GenericFactoryService]);