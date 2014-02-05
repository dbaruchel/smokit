# Be sure to restart your server when you modify this file.

# Your secret key is used for verifying the integrity of signed cookies.
# If you change this key, all old signed cookies will become invalid!

# Make sure the secret is at least 30 characters and all random,
# no regular words or you'll be exposed to dictionary attacks.
# You can use `rake secret` to generate a secure secret key.

# Make sure your secret_key_base is kept private
# if you're sharing your code publicly.
Smokit::Application.config.secret_key_base = 'b27d2d880eccdd8ce7dd310184c95daba24514f2ff5c053c4abfb24dbc9f674bf057748e9d978dee311e9a6684d8934f57d8f0dfe65b782442cbb5cd4f571ac3'
