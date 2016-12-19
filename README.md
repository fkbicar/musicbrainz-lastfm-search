# musicbrainz-lastfm-search

##Description
Search artists and release from MusicBrainz and LastFM API using AngularJS

##Tools/Technologies
- HTML5
- CSS & Bootstrap
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

