class User < ActiveRecord::Base
	validates_uniqueness_of :name
	has_many :smokes
	validates :name, length: {maximum: 16, minimum: 0}
end
