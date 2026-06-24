class Admin::CountriesController < Admin::BaseController
  def index
    @countries = Country.order(:name)
  end

  def edit
    @country = Country.find(params[:id])
  end
end
