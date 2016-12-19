/**
 * Created by franz on 12/17/16.
 */
'use strict';

var ctrl = angular.module('musicSearch.musicbrainz-controller', []);

var MusicbrainzController = function($scope, GenericFactoryService){

    $scope.artists = [];
    $scope.releases = [];
    $scope.noDataMessage = "";

    //artist search callback
    var successArtistsCallback = function(data) {
        $scope.artists = [];

        //musicbrainz return object even if no match found
        if(data.count === 0) {
            $scope.noDataMessage = "No data available.";
            return;
        } else {
            $scope.noDataMessage = "";
        }

        angular.forEach(data.artists, function(value, key) {
            angular.forEach(value, function(innervalue, innerkey){
                value["toggle"] = true;
            });
        });

        $scope.artists = data;
    };

    //releases search callback
    var successReleasesCallback = function(data) {
        $scope.releases = [];

        //musicbrainz return object even if no match found
        if(data.count === 0) {
            $scope.noDataMessage = "No data available.";
            return;
        } else {
            $scope.noDataMessage = "";
        }

        $scope.releases = data;

        //store already retrieved releases to container
        GenericFactoryService.cacheReleaseData($scope.releaseQuery, data);
        $scope.isResultsAvailable = true;
    };

    //error search callback
    var errorCallback = function(data) {
        $scope.error = 'Could not fetch the data.';
    };

    //search artist
    $scope.searchArtists = function (artist) {

        GenericFactoryService.getArtists(artist, 0)
            .then(successArtistsCallback)
            .catch(errorCallback);
    };

    $scope.isEmptyArtists = function() {
        return ($scope.artists.length === 0);
    };

    //search releases
    $scope.searchReleases = function (artistid) {
        $scope.releaseQuery = artistid;

        //toggle display
        toggleText(artistid);
        $scope.isResultsAvailable = false;

        //return cached data
        if($scope.releases = GenericFactoryService.getCachedReleaseData(artistid)) {
            $scope.isResultsAvailable = true;
            return;
        }

        GenericFactoryService.getReleases(artistid)
            .then(successReleasesCallback)
            .catch(errorCallback);
    };

    //cache favorite releases
    $scope.faveRelease = function(releaseid, release) {
        GenericFactoryService.cacheFavoriteReleaseData(releaseid, release);
    };

    //check if release has been favorited
    $scope.isFavorite = function(releaseid) {
        if (GenericFactoryService.isFavoriteRelease(releaseid)) {
            return "fa fa-star fa-lg";
        } else {
            return "fa fa-star-o fa-lg";
        }
    };

    //utility function to toggle show/hide release text
    var toggleText = function() {
        //reset all other displays
        angular.forEach($scope.artists.artists, function(value, key) {
            if(value.id === $scope.releaseQuery) {
                if (value["toggle"] === true) {
                    value["toggle"] = false;
                } else {
                    value["toggle"] = true;
                }

            } else {
                value["toggle"] = true;
            }
        });
    };
};

ctrl.controller('MusicbrainzController',['$scope', 'GenericFactoryService', MusicbrainzController]);
