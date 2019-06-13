import sys
import os

import pygraphviz as pgv
import networkx as nx
from networkx.drawing.nx_agraph import write_dot
from networkx.drawing.nx_agraph import read_dot as nx_read_dot
from input_functions import *

import os

path = 'community_neato/'
has_position = True
#path = 'dodec_and_twin/'
#has_position = False
files = []
# r=root, d=directories, f = files
for r, d, f in os.walk(path):
    for file in f:
        if '.dot' in file:
            files.append(os.path.join(r, file))
#print(files)

def convert_dot_to_txt(file_name):
 G = nx_read_dot(file_name)
 G = nx.Graph(G)
 x = [0.0 for i in range(len(G.nodes()))]
 y = [0.0 for i in range(len(G.nodes()))]
 if has_position:
  for n in G.nodes():
   arr = G.node[n]['pos'].split(',')
   x[int(n)]=float(arr[0])
   y[int(n)]=float(arr[1])
 edge_list = []
 for e in G.edges():
  u, v = e
  edge_list.append([int(u), int(v)])
 if file_name.startswith('dodec_and_twin'):
  G = nx.Graph()
  for e in edge_list:
   u, v = e
   G.add_edge(u-1, v-1)
 if has_position:
  write_as_txt(file_name[:len(file_name)-3]+'txt', edge_list, x, y)
 else:
  write_as_txt_random_position(file_name[:len(file_name)-3]+'txt', G)

for file_name in files:
 convert_dot_to_txt(file_name)
