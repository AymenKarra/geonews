import requests
  
# api-endpoint
URL = "https://nominatim.openstreetmap.org/search?q=<input>&format=json"
  

r = requests.get(url = URL.replace("<input>","tunis"))

print(URL)

data = r.json()
  


#print(data)