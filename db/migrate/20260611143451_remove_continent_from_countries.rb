class RemoveContinentFromCountries < ActiveRecord::Migration[8.1]
  def change
    remove_reference :countries, :continent, null: false, foreign_key: true
  end
end
