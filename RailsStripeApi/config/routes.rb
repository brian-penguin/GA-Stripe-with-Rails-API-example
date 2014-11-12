Rails.application.routes.draw do
  resources :charges, only: [:create]
end
