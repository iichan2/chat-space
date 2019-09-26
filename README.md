# chat-space設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|storing|null: false|
|password|string|null: false|
|nickname|string|null: false|
### Association
- has_many :tweets through: :groups_users
- has_many :groups

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
|group_name|storing|null: false|
### Association
- has_many :tweets through: :groups_users
- has_many :groups

## groups_users
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|






<!-- This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ... -->
