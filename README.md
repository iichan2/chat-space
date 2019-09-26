# chat-space設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|nickname|string|null: false|
### Association
- has_many :tweets
- has_many :groups, through: :groups_users
- has_many :groups_users

## tweetsテーブル
|Column|Type|Options|
|------|----|-------|
|image|text||
|text|text||
|date|datetime|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|storing|null: false|
### Association
- has_many :tweets 
- has_many :groups,through: :groups_users
- has_many :groups_users

## groups_users
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Assosiation
- belongs_to :user
- belongs_to :gruop
