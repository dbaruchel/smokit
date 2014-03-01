class SessionsController < ApplicationController

def create
	user= User.find_by(name: params[:session][:name])
	if User.exists?(user)	
	remember_token = User.new_remember_token
    	cookies.permanent[:remember_token] = remember_token
	cookies.permanent[:username] = user.name
    	user.update_attribute(:remember_token, User.encrypt(remember_token))
    	##self.current_user = user
	redirect_to "/" 
	puts "=========== "
	else
	#Grosse tricherie ici pour faire bugger rails pour que la reponse ajax ait des headers d'erreur et fasse bien apparaitre l'erreur comme on le souhaite !
	#La ligne suivante bug donc, sans que je sache pourquoi héhé
	render status: :unprocessable_entity
	end
end

  #def current_user=(user)
   # @current_user = user
  #end
  def current_user
    remember_token = User.encrypt(cookies[:remember_token])
    @current_user ||= User.find_by(remember_token: remember_token)
  end

end
