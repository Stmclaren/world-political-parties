class AddTrackNewsToCountry < ActiveRecord::Migration[8.1]
  def change
    add_column :countries, :track_news, :boolean
  end
end
