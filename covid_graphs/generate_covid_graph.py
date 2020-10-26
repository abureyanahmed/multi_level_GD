from geopy.geocoders import Nominatim
from geopy.distance import geodesic
import networkx as nx

geo_distance_dct = {}
def geo_distance(addr1, addr2):
  if addr1 in geo_distance_dct.keys():
    if addr2 in geo_distance_dct[addr1].keys():
      return geo_distance_dct[addr1][addr2]
  geolocator = Nominatim(user_agent="draw_dynamic_tree")
  location = geolocator.geocode(addr1)
  #print((location.latitude, location.longitude))
  #print(location.raw.keys())
  #print([location.raw[k] for k in location.raw.keys()])
  location2 = geolocator.geocode(addr2)
  location_coord = (location.latitude, location.longitude)
  location_coord2 = (location2.latitude, location2.longitude)
  val = geodesic(location_coord, location_coord2).miles
  if addr1 not in geo_distance_dct.keys():
    geo_distance_dct[addr1] = {}
  if addr2 not in geo_distance_dct.keys():
    geo_distance_dct[addr2] = {}
  geo_distance_dct[addr1][addr2] = val
  geo_distance_dct[addr2][addr1] = val
  return val

'''
addr1 = "Snohomish Washington"
addr2 = "Cook Illinois"
print(geo_distance(addr1, addr2))
'''

def get_str(entry):
  #return entry['state'][:3] + '_' + entry['county'][:3] + '_' + entry['date'][5:7] + '_' + entry['date'][8:10]
  return entry['state'][:3] + ',' + entry['county'] + ',' + entry['date'][5:7] + ',' + entry['date'][8:10]

def get_addr(entry):
  return entry['county'] + ' ' + entry['state']

prev_dat_1 = ''
prev_dat_2 = ''
f = open("us-counties.csv", 'r')
f.readline()
i=0
all_entries = []
#while i<500:
while i<200:
#while i<100:
#while i<30:
#while i<5:
  l = f.readline()
  dat = l.split(',')
  #print(l)
  if prev_dat_1==dat[1] and prev_dat_2==dat[2]:
    i = i+1
    continue
  all_entries.append({'date':dat[0], 'county':dat[1], 'state':dat[2]})
  prev_dat_1 = dat[1]
  prev_dat_2 = dat[2]
  i = i+1
f.close()

'''
print(get_str(all_entries[0]))
print(get_addr(all_entries[0]))
'''

G = nx.Graph()
my_edges = []
label_to_id = {get_str(all_entries[0]):0}
id_to_label = {0:get_str(all_entries[0])}
edge_distance = {}
edge_count = 0
is_first = True
for i in range(1, len(all_entries)):
  min_dis = -1
  min_j = -1
  for j in range(i):
    addr1 = get_addr(all_entries[i])
    addr2 = get_addr(all_entries[j])
    v = get_str(all_entries[j])
    if v not in G.nodes():
      continue
    if addr1==addr2:
      cur_dis = 0
    else: cur_dis = geo_distance(addr1, addr2)
    if min_dis==-1:
      min_dis = cur_dis
      min_j = j
    elif cur_dis<min_dis:
      min_dis = cur_dis
      min_j = j
  v1 = get_str(all_entries[min_j])
  v2 = get_str(all_entries[i])
  G.add_edge(v1, v2)
  #max_degree = 5
  #max_degree = 6
  max_degree = 7
  if G.degree[v1]>max_degree or G.degree[v2]>max_degree:
    G.remove_edge(v1, v2)
    if G.degree[v1]==0:
      G.remove_node(v1)
    if G.degree[v2]==0:
      G.remove_node(v2)
  else:
    my_edges.append([v1, v2])
    if is_first:
      label_to_id[v2] = edge_count
      id_to_label[edge_count] = v2
      is_first = False
    label_to_id[v2] = edge_count+1
    id_to_label[edge_count+1] = v2
    #edge_distance[i-1] = 50
    edge_distance[edge_count] = 200
    edge_count = edge_count + 1
print("my_edges = ", my_edges)
print("label_to_id = ", label_to_id)
print("id_to_label = ", id_to_label)
print("edge_distance = ", edge_distance)



