class AddContinentToCountries < ActiveRecord::Migration[8.1]
  def change
    add_column :countries, :continent, :integer
  end
end
