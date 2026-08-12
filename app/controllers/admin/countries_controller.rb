class Admin::CountriesController < Admin::BaseController
  def index
    @countries = Country.order(:name)
  end

  def show
    @country = Country.find(params[:id])

    respond_to do |format|
      format.html
      format.json { render json: @country }
    end
  end

  def edit
    @country = Country.find(params[:id])
  end

  def update
    @country = Country.find(params[:id])

    if @country.update(country_params)
      flash.now[:notice] = "Country saved successfully"
      render json: @country
    else
      flash.now[:alert] = "Could not save country"
      render json: @country.errors, status: :unprocessable_entity
    end
  end

  private

  def country_params
    params.require(:country).permit(:government_structure, :electoral_system, :political_parties, :eu_alignment, :governance_indicators, :key_issues, :updated_at)
  end
end
