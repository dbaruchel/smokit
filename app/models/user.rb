class User < ActiveRecord::Base
	has_many :smokes
	validates :name, length: {maximum: 16, minimum: 0}
end
