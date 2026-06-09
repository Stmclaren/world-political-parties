class ContinentsController < ApplicationController
  def show
    @continent = Continent.find(params[:id])
  end
end
