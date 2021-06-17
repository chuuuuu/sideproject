# import environment variable (API_KEY)
from dotenv import dotenv_values
CONFIG = dotenv_values(".env")

# https://googlemaps.github.io/google-maps-services-python/docs/index.html
import googlemaps
gmaps = googlemaps.Client(key=CONFIG['API_KEY'])

# Geocoding an address
geo_result = gmaps.geocode('台北市')[0]
loc = geo_result['geometry']['location']
northeast = geo_result['geometry']['bounds']['northeast']
southwest = geo_result['geometry']['bounds']['southwest']

# returns a location and accuracy radius based on information about cell towers and WiFi nodes given.
# however the result is wierd
# loc = gmaps.geolocate()['location']

loc = {'lat': 25.014064, 'lng': 121.534197}

# dict_keys(['html_attributions', 'next_page_token', 'results', 'status'])
rests = gmaps.places(query="餐廳", location=loc, radius=100, language='zh-TW')

# dict_keys(['html_attributions', 'next_page_token', 'results', 'status'])
rests = gmaps.places_nearby(location=loc, radius=100, language='zh-TW', keyword="餐廳")

# type: https://developers.google.com/maps/documentation/places/web-service/supported_types
rests = gmaps.places_nearby(location=loc, radius=100, language='zh-TW', type="restaurant")
rests_result = rests['results']

# results are weird
rests = gmaps.places_nearby(location=loc, radius=30, language='zh-TW', type="food")
rests_result = rests['results']