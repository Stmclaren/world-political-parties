class CountriesController < ApplicationController
  def index
    @countries = Country.order(:name)
  end

  def map_data
    render json: Country.all.map { |country|
      {
        iso: country.iso,
        ruling_party: country.ruling_party
      }
    }
  end
  def sidebar
   @country = Country.find_by(iso: params[:iso])
   if @country.nil?
      render partial: "countries/not_configured", status: :ok
   else
      render partial: "countries/sidebar", locals: { country: @country }
   end
  end
end
