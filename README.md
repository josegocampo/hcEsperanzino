
**BACKEND La Esperanza Golf**



---


Esperanza Golf is a Golf Score and Stats tracker app which will allow the users of the exclusive golf club “La Esperanza” to play games with other members of the club, input their scores while playing, and calculate the correct Gross, Net and Handicap scores on the run, and will save them to a Database. \
 \
The Frontend App will display the scoreboard and have the functionalities of allowing members to play against each other, write down their scores, calculate all the different kinds of scores for them, keep track of who won each match, show game statistics, handicap statistics and server for future tournaments.

The Backend for this project will be composed of a Relational Database, meaning that it is a database that stores the information in tables in a columns and rows format, much like an excel table would, and a RESTful API, meaning that you can access the data stored in the database using HTTP methods (get, put, post, delete) on the different routes. \
 \
The API is located on https://hcesperanzino.herokuapp.com/ and the end points to access it will be described below. 

The Database will be composed of 4 tables, **Players**, **Games**, **Player_Games** (which is a Join Table between player and games because of the many to many relationship between them) and **Handicap**. \
 \
For now the register part will be handled by the admin as they want to keep control of who is allowed to join, and users will only be given login access. 

<br/><br/>
**<span style="text-decoration:underline;">TABLES</span>**



*   **players** 


<table>
  <tr>
   <td>
<strong>column</strong>
   </td>
   <td><strong>data type</strong>
   </td>
  </tr>
  <tr>
   <td>id
   </td>
   <td>unsigned integer
   </td>
  </tr>
  <tr>
   <td>name
   </td>
   <td>string
   </td>
  </tr>
  <tr>
   <td>password
   </td>
   <td>string
   </td>
  </tr>
</table>



     




*   **games** 


<table>
  <tr>
   <td>
<strong>column</strong>
   </td>
   <td><strong>data type</strong>
   </td>
  </tr>
  <tr>
   <td>id
   </td>
   <td>unsigned integer
   </td>
  </tr>
</table>




*   **player_games** 


<table>
  <tr>
   <td>
<strong>column</strong>
   </td>
   <td><strong>data type</strong>
   </td>
  </tr>
  <tr>
   <td>game_id
   </td>
   <td>unsigned integer
   </td>
  </tr>
  <tr>
   <td>player_id
   </td>
   <td>unsigned integer
   </td>
  </tr>
  <tr>
   <td>holes_played
   </td>
   <td>unsigned integer
   </td>
  </tr>
  <tr>
   <td>hc_score
   </td>
   <td>unsigned integer
   </td>
  </tr>
  <tr>
   <td>gross_score
   </td>
   <td>unsigned integer
   </td>
  </tr>
  <tr>
   <td>net_score
<p>
price
   </td>
   <td>unsigned integer
   </td>
  </tr>
  <tr>
   <td>holes 1 trough 9
   </td>
   <td>unsigned integers
   </td>
  </tr>
</table>



     




*   **handicap**

<table>
  <tr>
   <td>
<strong>column</strong>
   </td>
   <td><strong>data type</strong>
   </td>
  </tr>
  <tr>
   <td>id
   </td>
   <td>unsigned integer
   </td>
  </tr>
  <tr>
   <td>played_id
   </td>
   <td>unsigned integer
   </td>
  </tr>
  <tr>
   <td>recorded_on
   </td>
   <td>timestapm
   </td>
  </tr>
  <tr>
   <td>handicap_number
   </td>
   <td>unsigned integer
   </td>
  </tr>
</table>

<br/><br/>
**<span style="text-decoration:underline;">ENDPOINTS: </span>**

**<span style="text-decoration:underline;"><ins>Register and Login endpoint</ins>:</span>** \
 \
**.post(“/”)**   // register a new player



*   sent object requires >>>   **name**, **password**, both strings. *tbd, implement login and hash passwords with bcrypt.

**.post(“/login”)** // login an existing user, it will automatically distinguish which database the user should be checked against.



*   the login object needs to send only a **name **and a **password**. No need to send the role when logging in, as the backend will search both databases for the user and send back the one that corresponds. \

*   if the login is correct, meaning **name **and **password **correspond to a user in the database then the response will send out a cookie “token” containing the user info.
<br/><br/>
**<span style="text-decoration:underline;"><ins>Players endpoint</ins>:</span>**

**GET**  (“/players**”)     // returns a list of all players.



*   returns >>>   an array of objects, each object containing  **{id, name, password}**  for each user.

 

**GET**  (“/players/:id”)     // **returns an individual player.



*   returns >>>   an object containing  **{id, name, handicap}**  for a specific user.

**GET**  (“/players/:id/games”) **   // returns all the games by an individual player.



*   returns >>>   //** **a list with an individual player's past games, with scores per hole, hc, gross, and net score, game id,  and date.
<br/><br/>
**<span style="text-decoration:underline;"><ins>Games endpoint</ins>:</span>**

**GET**  (“/games/”)  **//returns a list of all the games played



*   returns >>>   an array of objects, each object containing all previous games

**POST** (“/games/”)  **//posts a new game to the database.



*   no need to send any data in the request, as we are only looking for an id here which will be created automatically as the primary key.

**GET** (“/games/:id”) **// returns a specific game



*   returns >>>   an object containing the info for a specific game.

**GET**  (“/games/gameinfo”)  **//returns a list of all the games played and their info.



*   returns >>>   an array of objects, each object containing all previous games with their info, date, players, player scores, comes from the player_games table which joins the players and games tables.

**GET** (“games/:id/gameinfo”)  **// returns the complete info for a specific game.



*   returns >>> an array of objects in which every object is the information of a player for that specific game, comes for the player_games table which joins players and games.

**POST** (“/games/:id/gameinfo”)  **//posts new game information to a game after it has been finished.



*   sent object requires >>>> per each player playing, we have to sent an object with the following data:

	game_id, player_id, holes_played, hc_score, gross_score, net_score and the individual score per each hole, hole1, hole2, ….hole9.
<br/><br/>
**<span style="text-decoration:underline;"><ins>Handicaps endpoint:</ins></span>**

**GET**  (“/players/handicaps”)  **//returns a list of all players handicaps and their history.



*   returns >>>   an array of objects, each object containing the history of the handicap of every player.

**GET**  (“/players/:id/handicap”)  **//returns a single player handicap history.



*   returns >>>   an object containing the information of a player and its handicap history.

**POST** (“/players/:id/handicap”)  **//posts a new handicap to a player handicaps history.



*   sent object requires >>> player_id, handicap_number.