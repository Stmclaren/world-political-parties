class CountriesController < ApplicationController
 def sidebar
   @country = Country.find_by(iso: params[:iso])
   if @country.nil?
      render partial: "countries/not_configured", status: :ok
   else
      render partial: "countries/sidebar", locals: { country: @country }
   end
 end
end
