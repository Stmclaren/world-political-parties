class AddUniqueIndexToCountriesIso < ActiveRecord::Migration[8.1]
  def change
    add_index :countries, :iso, unique: true
  end
end
