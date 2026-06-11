class Country < ApplicationRecord
  validates :iso, presence: true, uniqueness: true
  validates :name, presence: true
end
