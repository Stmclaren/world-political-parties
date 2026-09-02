class Country < ApplicationRecord
  validates :iso, presence: true, uniqueness: true
  validates :name, presence: true
  VALID_PARTIES = [ "Far Left", "Centre Left", "Centre", "Centre Right", "Far Right" ].freeze

  validates :ruling_party, inclusion: { in: VALID_PARTIES }, allow_blank: true
end
