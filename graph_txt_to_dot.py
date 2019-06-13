import pygraphviz as pgv
import networkx as nx
from networkx.drawing.nx_agraph import write_dot
from networkx.drawing.nx_agraph import read_dot as nx_read_dot
from input_functions import *

import os

#path = 'dags/'
#path = 'small_30_dags/'
#path = 'dags_up_bound_1/'
#path = 'small_30_dags_up_bound_1/'
#path = 'small_30_dags_missing_graphs/'
#path = 'small_27_dags_iterations_10_4/'
#path = 'small_3_dags_iterations_10_4/'
#path = 'small_3_dags_undirected/'
path = 'small_3_dags_2/'

#files = []
# r=root, d=directories, f = files
#for r, d, f in os.walk(path):
#    for file in f:
#        if '.txt' in file:
#            files.append(os.path.join(r, file))
#print(files)

folder_name = path

if folder_name=='dags/' or folder_name=='dags_up_bound_1/':
 file_names = []
 nodes = [5, 10, 15, 20, 25]
 for n in nodes:
  m = 2*n
  file_names.append('graph_n_'+str(n)+'_m_'+str(m))
 heights = [2, 3, 4, 5, 6]
 for n in heights:
  file_names.append('tree_h_'+str(n))

if folder_name=='small_30_dags/' or folder_name=='small_30_dags_up_bound_1/' or folder_name=='small_27_dags_iterations_10_4/':
 file_names = []
 nodes = range(5,35)
 for n in nodes:
  m = 2*n
  file_names.append('graph_n_'+str(n)+'_m_'+str(m))

if folder_name=="small_30_dags_missing_graphs/" or folder_name=='small_3_dags_iterations_10_4/' or folder_name=='small_3_dags_undirected/' or folder_name=='small_3_dags_2/':
  file_names = []
  nodes = [5-1+9, 5-1+12, 5-1+28]
  for n in nodes:
   m = 2*n
   file_names.append('graph_n_'+str(n)+'_m_'+str(m))

file_names = [path+f+'.txt' for f in file_names]

files = file_names

i = 1
for f in files:
 if 'grad_desc' in f:continue
 n, coord_list, edge_list = take_input(f)
 G = nx.DiGraph()
 for e in edge_list:
  G.add_edge(e[0], e[1])
 write_dot(G, f[:len(f)-4]+'.dot')
 if os.path.isfile(path+'grad_desc'+str(i)+'.txt'):
  n, coord_list, edge_list = take_input(path+'grad_desc'+str(i)+'.txt')
  G = nx.DiGraph()
  pos = dict()
  for j in range(n):
   #pos[j] = (coord_list[j][0], coord_list[j][1])
   pos[j] = str(coord_list[j][0]) + "," + str(coord_list[j][1])
  for e in edge_list:
   G.add_edge(e[0], e[1])
  for n in pos.keys():
   G.node[n]['pos'] = pos[n]
  write_dot(G, f[:len(f)-4]+'_spx.dot')
 i += 1
