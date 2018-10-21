import random
import networkx as nx
from input_functions import *
from utils import *
import subprocess

def force_directed(input_file, output_file, iterations, is_repulsion_crossing_enabled, is_random):
 p = subprocess.Popen(["node", "force_directed.js", input_file, output_file, iterations, is_repulsion_crossing_enabled, is_random], stdout=subprocess.PIPE)
 output, error = p.communicate()


def labeled_to_unlabeled(labeled_edges):
 nodes = dict()
 number_of_nodes = 0
 for i in range(len(labeled_edges)):
  if labeled_edges[i][0] not in nodes:
   nodes[labeled_edges[i][0]] = number_of_nodes
   number_of_nodes = number_of_nodes + 1
  if labeled_edges[i][1] not in nodes:
   nodes[labeled_edges[i][1]] = number_of_nodes
   number_of_nodes = number_of_nodes + 1
 #print(nodes)
 #print(number_of_nodes)
 #file_name = 'Layer7.txt'
 return nodes

def write_file_using_map(file_name, labeled_edges, nodes):
 file = open(file_name,"w")
 file.write(str(len(labeled_edges)+1)+"\n");
 for j in range(len(labeled_edges)+1):
  file.write(str(random.randint(1,30000))+" "+str(random.randint(1,30000))+"\n")
 for e in labeled_edges:
  file.write(str(nodes[e[0]])+" "+str(nodes[e[1]])+"\n")
 file.close()


def parse_dot_file(filename, output_filename):
 file = open(filename, 'r')
 arr = file.read().split('{')[1].split('}')[0].split(';')
 labeled_edges = []
 for i in range(len(arr)-1):
  labeled_edges.append([])
  t = arr[i].strip().split('"')
  labeled_edges[i].append(t[1])
  labeled_edges[i].append(t[3])
 #print(labeled_edges)
 node_map = labeled_to_unlabeled(labeled_edges)
 write_file_using_map(output_filename, labeled_edges, node_map)
 return node_map


def get_connected_component():
 G = build_networkx_graph('Layer7.txt')
 graphs = list(nx.connected_component_subgraphs(G))
 #print(len(graphs))
 #print(graphs[0].number_of_nodes())
 #write_as_txt_random_position_with_grid_size('Layer7_component.txt', graphs[0], 3000, 3000)


def reverse_map(node_map):
 rev_map = dict()
 for k in node_map.keys():
  rev_map[node_map[k]] = k
 return rev_map


def parse_files(file_arr):
 top_file = file_arr[0]
 bot_file = file_arr[1]
 node_map_bot = parse_dot_file(bot_file+'.dot', bot_file+'.txt')
 node_map_top = parse_dot_file(top_file+'.dot', top_file+'.txt')
 return node_map_top, node_map_bot


def get_boundaries(coord_list):
 global my_inf
 min_x = my_inf
 min_y = my_inf
 max_x = 0
 max_y = 0
 for coord in coord_list:
  if min_x>coord[0]:
   min_x = coord[0]
  if max_x<coord[0]:
   max_x = coord[0]
  if min_y>coord[1]:
   min_y = coord[1]
  if max_y<coord[1]:
   max_y = coord[1]
 return min_x, min_y, max_x, max_y


def fd_top_down(file_names, node_map_top, node_map_bot):
 iterations = "500"
 #iterations = "50"
 top_filename = file_names[0]
 bottom_filename = file_names[1]
 top_G_unlab = build_networkx_graph(top_filename)
 bot_G_unlab = build_networkx_graph(bottom_filename)
 rev_map_top = reverse_map(node_map_top)
 rev_map_bot = reverse_map(node_map_bot)
 top_G = nx.Graph()
 for e in top_G_unlab.edges():
  top_G.add_edge(rev_map_top[e[0]], rev_map_top[e[1]])
 bot_G = nx.Graph()
 for e in bot_G_unlab.edges():
  bot_G.add_edge(rev_map_bot[e[0]], rev_map_bot[e[1]])
 print(len(top_G.nodes()), ' ', len(bot_G.nodes()))
 bot_G.remove_edges_from(top_G.edges())
 print(len(bot_G.edges()))
 graphs = list(nx.connected_component_subgraphs(bot_G))
 large_components = []
 for g in graphs:
  if len(g.nodes())>1:
   large_components.append(g)
 print(len(large_components))
 force_directed("Layer6.txt", "Layer6_force_directed.txt", iterations, "no_repulsion_crossing", "input")
 n, coord_list_top, edge_list = take_input('Layer6_force_directed.txt')
 n, coord_list_bot, edge_list_bot = take_input('Layer7.txt')
 for u in range(len(coord_list_top)):
  v = node_map_bot[rev_map_top[u]]
  coord_list_bot[v][0] = coord_list_top[u][0]
  coord_list_bot[v][1] = coord_list_top[u][1]
 min_x_top, min_y_top, max_x_top, max_y_top = get_boundaries(coord_list_top)
 print(get_boundaries(coord_list_top))
 for g in large_components:
  labeled_edges = []
  for e in g.edges():
   labeled_edges.append([])
   labeled_edges[len(labeled_edges)-1].append(e[0])
   labeled_edges[len(labeled_edges)-1].append(e[1])
  node_map = labeled_to_unlabeled(labeled_edges)
  rev_map = reverse_map(node_map)
  write_file_using_map('tmp.txt', labeled_edges, node_map)
  force_directed("tmp.txt", "tmp_force_directed.txt", iterations, "no_repulsion_crossing", "input")
  n, coord_list_tmp, edge_list = take_input('tmp_force_directed.txt')
  min_x_tmp, min_y_tmp, max_x_tmp, max_y_tmp = get_boundaries(coord_list_tmp)
  for coord in coord_list_tmp:
   coord[0] = (coord[0]/max_x_tmp)*(max_x_top*len(coord_list_tmp)/len(coord_list_top))
   coord[1] = (coord[1]/max_y_tmp)*(max_y_top*len(coord_list_tmp)/len(coord_list_top))
  root = -1
  root_top = -1
  for u in range(len(coord_list_tmp)):
   for v in range(len(coord_list_top)):
    if rev_map[u]==rev_map_top[v]:
     root = u
     root_top = v
     break
   if root!=-1:
    break
  for u in range(len(coord_list_tmp)):
   v = node_map_bot[rev_map[u]]
   coord_list_bot[v][0] = coord_list_tmp[u][0] - coord_list_tmp[root][0] + coord_list_top[root_top][0]
   coord_list_bot[v][1] = coord_list_tmp[u][1] - coord_list_tmp[root][1] + coord_list_top[root_top][1]
  print(get_boundaries(coord_list_tmp))
 file = open("Layer7_top_down_force_directed.txt","w")
 file.write(str(len(coord_list_bot))+"\n");
 for j in range(len(coord_list_bot)):
  file.write(str(coord_list_bot[j][0])+" "+str(coord_list_bot[j][1])+"\n")
 for e in edge_list_bot:
  file.write(str(e[0])+" "+str(e[1])+"\n")
 file.close()


#parse_dot_file('Layer7.dot', 'Layer7.txt')
#parse_dot_file('Layer6.dot', 'Layer6.txt')
for i in range(1,8):
 parse_dot_file('Layer'+str(i)+'.dot', 'Layer'+str(i)+'.txt')
#get_connected_component()

def multi_level_GD():
 node_map_top, node_map_bot = parse_files(['Layer6', 'Layer7'])
 fd_top_down(['Layer6.txt', 'Layer7.txt'], node_map_top, node_map_bot)

#multi_level_GD()

