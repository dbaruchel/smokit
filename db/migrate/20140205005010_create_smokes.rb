class CreateSmokes < ActiveRecord::Migration
  def change
    create_table :smokes do |t|
      t.integer :user_id
      t.datetime :smoke_date
      t.decimal :smoke_latitude
      t.decimal :smoke_longitude

      t.timestamps
    end
  end
end
