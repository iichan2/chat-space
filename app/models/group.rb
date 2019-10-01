class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  has_many :messages
  
  validates :name, presence: true, uniqueness: true

def index
end

def creat
end



end
