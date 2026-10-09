class ChangeTrackNewsDefaultInCountries < ActiveRecord::Migration[8.1]
  def change
    change_column_default :countries, :track_news, from: nil, to: false
    change_column_null :countries, :track_news, false, false
  end
end
