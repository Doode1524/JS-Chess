class Game < ApplicationRecord
    belongs_to :white_player, class_name: "User"
    belongs_to :black_player, class_name: "User"

    # def white_player_attributes=({})

    # end
    
end
