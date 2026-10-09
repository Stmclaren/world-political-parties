class AddNewsKeywordsToCountry < ActiveRecord::Migration[8.1]
  def change
    add_column :countries, :news_keywords, :text
  end
end
