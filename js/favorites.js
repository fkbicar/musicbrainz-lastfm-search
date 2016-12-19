/**
 * Created by franz on 12/18/16.
 */
'use strict';

var fav = angular.module('musicSearch.favorites-controller', []);

var FavoritesController = function($scope, GenericFactoryService){

    $scope.releases = [];
    $scope.artists = [];

    //load all releases in scope
    $scope.getAllFavoriteReleases = function() {
        $scope.releases = [];

        var temp = GenericFactoryService.getFavoriteReleases();

        for (var key in temp) {
            if (temp.hasOwnProperty(key)) {
               $scope.releases.push(temp[key]);
            }
        }
    };

    //load all artists in scope
    $scope.getAllFavoriteArtists = function() {
        $scope.artists = [];

        var temp = GenericFactoryService.getFavoriteArtists();

        for (var key in temp) {
            if (temp.hasOwnProperty(key)) {
               $scope.artists.push(temp[key]);
            }
        }
    };

    //cache favorite releases
    $scope.faveRelease = function(releaseid, release) {
        GenericFactoryService.cacheFavoriteReleaseData(releaseid, release);
    };

    //cache favorite artists
    $scope.faveArtist = function(artistid, artist) {
        GenericFactoryService.cacheFavoriteArtistData(artistid, artist);
    };

    //check if release has been favorited
    $scope.isFavoriteRelease = function(releaseid) {
        if (GenericFactoryService.isFavoriteRelease(releaseid)) {
            return "fa fa-star fa-lg";
        } else {
            return "fa fa-star-o fa-lg";
        }
    };

    //check if release has been favorited
    $scope.isFavoriteArtist = function(artistid) {
        if (GenericFactoryService.isFavoriteArtist(artistid)) {
            return "fa fa-star fa-lg";
        } else {
            return "fa fa-star-o fa-lg";
        }
    };

    $scope.isEmptyReleases = function() {
        return ($scope.releases.length === 0);
    };

    $scope.isEmptyArtists = function() {
        return ($scope.artists.length === 0);
    };

    $scope.noDataMessage = "No data available.";
};

fav.controller('FavoritesController',['$scope', 'GenericFactoryService', FavoritesController]);
