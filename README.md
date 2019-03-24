# Moview

__Moview is a movie searching app with React.__

## Features
- Look up movies by their title. 
- Get more info from the movie's Wikipedia page by clicking on the movie's title.
- If there is no Wikipedia info found, it shows Tmdb overview in a modal window.
- Shows links to the movie's Tmdb and Wikipedia website.
- Movie data from the [TMDb](https://www.themoviedb.org/) API. ![tmdb logo](/src/assets/tmdb-logo-rectangle-blue.png)

## Extra feature
- Get inspired by searching for related movies.

![](/src/assets/moview_screen.gif)

## Setup

To run this project, install it locally from the project directory, using npm:

### `npm install`

When installing packages has finished, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.<br>
Your app is ready to be deployed!


## Components & how they work
- App: Moview app logo is shown on initial state, before a Search method has been fired.
- ButtonPrimary: Wraps Button component from Material UI in custom theme provided in utils directory.
- SearchBar: Input search field and logos. Search for entered string (a movie title) after pressing the Enter key. 
- MovieCard: Shows movie poster image, title, release year, original language and rating.
             Shows a placeholder image if no poster image found.
             All data fetched from TMdb API in the component.
             If no string is in the Search ```input```, prevents from re-rendering.
- MovieGrid: Wraps MovieCard into a Material UI Grid layout.
- MovieInfo: Opens modal window with movie information after clicking the movie title. 
             Has 3 buttons: Wikipedia,TMDb, and Close button. 
             Initally movie extract is fetched from Wikipedia, if not found, it looks for equivalent TMdb overview.
             Show if the information is fetched from Wikipedia or TMDb in a ```sub``` tag.
             If no information found, gives an error message.

### Improvements to be made:
- Use Router and history to be able to go back after clicking _'Related'_.
- Write tests with Jest and enzyme.
