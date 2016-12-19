# musicbrainz-lastfm-search

##Description
Search artists and release from MusicBrainz and LastFM API using AngularJS

##Tools/Technologies
- HTML5
- CSS
- Bootstrap
- JavaScript
- AngularJS

##Notes
The application is executed to run serverless, in that you don't need to have server instance
running to be able to use the application. Just double click on the index.html file and start
from there.

Initially, the different sections of the pages were divided into templates - one separate file
per template. However, due to the security issues of Chrome, is not possible. In the end it was
decided to just use inline templates. 

Also, instead of using ngRoute, I decided to use ui.router, which I found easier to implement. 

For the UI and responsiveness, this is not my expertise, and you may notice that the pages are
not as responsive as I'd want it to be.

Lastly, I ran out of time to add testing to the application. So I am leaving this as is. All 
features have been tested using Chrome, and their responsiveness is also tested through Chromes'
developer tools.

##Instructions

MusicBrainz - Searching MusicBrainz is straightforward. Just key in an artist name and it will
look for matching artist in MusicBrainz database. The initial request is only to search for the 
artist. Once you click the Show Releases button, the application will issue another request to 
retrieve the releases for the artist. 

Releases that are retrieved, are stored locally so that succeeding clicks on Show Releases, won't 
have to send another request to the API, and just loads the stored data.

You can favorite a release by clicking the star button that sits beside a specific release. Favorited 
releases are shown in the Favourite page.

LastFM - The LastFM search is a bit tricky. An artist needs to be shortlisted first, and then favorited, 
before it is displayed in the Favourite page. Same with the MusicBrainz search, just enter an artist to 
search, and click on the + button of the artist to shortlist. In the shortlist section (bottom of the page) 
you can favorite an artist for it to show in the Favourite page.

Favourite   - All the favorited Artists and Releases are shown here in two separate lists. A user has the 
ability to unfavorite or favorite an artist/release already on the list.

>> Note: The list of artist and releases, whether they are show on the list, refreshes when the user navigates 
away from the Favourites page, and navigates right back.

                
