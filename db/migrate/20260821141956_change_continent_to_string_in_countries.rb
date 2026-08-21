class ChangeContinentToStringInCountries < ActiveRecord::Migration[8.1]
  def change
    change_column :countries, :continent, :string
  end
end
