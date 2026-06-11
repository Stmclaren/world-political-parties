class RenameIsoCodeToIsoInCountries < ActiveRecord::Migration[8.1]
  def change
    rename_column :countries, :iso_code, :iso
  end
end
