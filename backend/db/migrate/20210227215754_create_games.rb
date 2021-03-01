class CreateGames < ActiveRecord::Migration[6.1]
  def change
    create_table :games do |t|
      t.string :name
      t.integer :white_player_id
      t.integer :black_player_id
      t.string :winner
      

      t.timestamps
    end
  end
end
