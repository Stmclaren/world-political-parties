class CreateCountries < ActiveRecord::Migration[8.1]
  def change
    create_table :countries do |t|
      t.string :name
      t.string :slug
      t.string :iso_code
      t.references :continent_id, null: false, foreign_key: true
      t.string :ruling_party
      t.text :description

      t.timestamps
    end
  end
end
