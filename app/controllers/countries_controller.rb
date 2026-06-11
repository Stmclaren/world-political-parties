class CountriesController < ApplicationController
 def sidebar
   @country = Country.find_by!(iso: params[:iso])
   render partial: "countries/sidebar", locals: { country: @country }
 end
end
