class User < ActiveRecord::Base
    has_many :white_player_games, class_name: "Game", foreign_key: "white_player_id"
    has_many :black_player_games, class_name: "Game", foreign_key: "black_player_id"
end


  
 