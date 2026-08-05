class AddAccordionFieldsToCountries < ActiveRecord::Migration[8.1]
  def change
    add_column :countries, :government_structure, :text
    add_column :countries, :electoral_system, :text
    add_column :countries, :political_parties, :text
    add_column :countries, :eu_alignment, :text
    add_column :countries, :governance_indicators, :text
    add_column :countries, :key_issues, :text
  end
end
