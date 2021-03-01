class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.text :content
      t.belongs_to :user

      t.timestamps
    end
  end
end
