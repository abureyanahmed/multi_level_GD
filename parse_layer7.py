import random
import networkx as nx
from input_functions import *

def labeled_to_unlabeled(labeled_edges, file_name):
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
 file = open(file_name,"w")
 file.write(str(number_of_nodes)+"\n");
 for j in range(number_of_nodes):
  file.write(str(random.randint(1,30000))+" "+str(random.randint(1,30000))+"\n")
 for e in labeled_edges:
  file.write(str(nodes[e[0]])+" "+str(nodes[e[1]])+"\n")
 file.close()


def parse_dot_file():
 file = open('Layer7.dot', 'r')
 arr = file.read().split('{')[1].split('}')[0].split(';')
 labeled_edges = []
 for i in range(len(arr)-1):
  labeled_edges.append([])
  t = arr[i].strip().split('"')
  labeled_edges[i].append(t[1])
  labeled_edges[i].append(t[3])
 #print(labeled_edges)
 labeled_to_unlabeled(labeled_edges, 'Layer7.txt')


def get_connected_component():
 G = build_networkx_graph('Layer7.txt')
 graphs = list(nx.connected_component_subgraphs(G))
 #print(len(graphs))
 #print(graphs[0].number_of_nodes())
 #write_as_txt_random_position_with_grid_size('Layer7_component.txt', graphs[0], 3000, 3000)

parse_dot_file()
#get_connected_component()

