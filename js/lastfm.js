/**
 * Created by franz on 12/19/16.
 */
'use strict';

var ctrl = angular.module('musicSearch.lastfm-controller', []);

var LastFMController = function($scope, $location, $anchorScroll, GenericFactoryService){

    var shortlistData = [];
    $scope.artists = [];
    $scope.finalShortlistData = [];
    $scope.noDataMessage = "";

    //artist search callback
    var successArtistsCallback = function(data) {
        $scope.artists = [];

        if(data.results['opensearch:totalResults'] === 0) {
            $scope.noDataMessage = "";
            return;
        } else {
            $scope.noDataMessage = "No data available.";
        }

        angular.forEach(data.results.artistmatches.artist, function(value, key) {

            //get the image
            angular.forEach(value.image, function(imgval, imgkey) {
                if(imgval.size === "small") {
                    value["image"] = imgval["#text"];
                }
            });

            $scope.artists.push(value);
        });
    };

    //error search callback
    var errorCallback = function(data) {
        $scope.error = 'Could not fetch the data.';
    };

    //search artist
    $scope.searchArtists = function (artist) {

        GenericFactoryService.getArtists(artist, 1)
            .then(successArtistsCallback)
            .catch(errorCallback);
    };

    $scope.isEmptyArtists = function() {
        return ($scope.artists.length === 0);
    };

    $scope.isEmptyShortlist = function() {
        for(var key in shortlistData){
            return false; //return right away if key is found
        }
        return true;
    };

    $scope.isShortlist = function(artistid) {
        if (artistid in shortlistData) {
            return "lastfm-unshortlist fa fa-minus-circle fa-2x";
        } else {
            return "lastfm-shortlist fa fa-plus-circle fa-2x";
        }
    };

    $scope.shortlistArtist = function(artistid, artist) {
       if (!(artistid in shortlistData)) {
            shortlistData[artistid] = artist;
            $scope.finalShortlistData.push(artist);
        } else {
            delete shortlistData[artistid];
        }
    };

    //cache favorite artists
    $scope.faveArtist = function(artistid, artist) {
        GenericFactoryService.cacheFavoriteArtistData(artistid, artist);
    };

    //check if release has been favorited
    $scope.isFavorite = function(artistid) {
        if (GenericFactoryService.isFavoriteArtist(artistid)) {
            return "fa fa-star fa-lg";
        } else {
            return "fa fa-star-o fa-lg";
        }
    };

    $scope.gotoShortlistTable = function() {
        $location.hash('shortlist-anchor');
        $anchorScroll();
    };
};

ctrl.controller('LastFMController',['$scope', '$location', '$anchorScroll', 'GenericFactoryService', LastFMController]);
