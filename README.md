# chess-chat
backend push



##### GAMES AND USERS #####

// USER MODEL
- would has_many games
- would have a name
- would either win or lose


// GAMES MODEL
- would actually have many users
- would have a winner
- would have a loser
- needs a game name??
- maybe a time clock for stretch goal
- we need a joins table

// USER_GAMES joins-table
- belong to user
- belongs to game

HOW WOULD THIS WORK???

// USER
    - has many games
    - has many games through user_games
    
// GAMES
    - has many users
    - has many users through user_games

// USER_GAMES
    -belongs to user
    -belongs to game