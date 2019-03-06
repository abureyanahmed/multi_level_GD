import networkx as nx
from input_functions import *
import json

def txt_to_setcola(file_name, output_file):
 print(file_name)
 G = build_networkx_graph(file_name)
 print(len(G.edges()))
 print(nx.diameter(G))
 n, coord_list, edge_list = take_input(file_name)
 graph = {}
 nodes = []
 for i in range(len(coord_list)):
  node = {}
  node['name'] = i
  nodes.append(node)
 graph['nodes'] = nodes
 edges = []
 root = 11
# for i in range(len(edge_list)):
#  edge = {}
#  if edge_list[i][1] == root:
#   t = edge_list[i][0]
#   edge_list[i][0] = edge_list[i][1]
#   edge_list[i][1] = t
#  elif G.degree(edge_list[i][0])==1:
#   t = edge_list[i][0]
#   edge_list[i][0] = edge_list[i][1]
#   edge_list[i][1] = t
#  edge['source']=edge_list[i][0]
#  edge['target']=edge_list[i][1]
#  edges.append(edge)
 for e in nx.dfs_edges(G, root):
  u, v = e
  edge = {}
  edge['source'] = u
  edge['target'] = v
  edges.append(edge)
 graph['links'] = edges
 constraintDefinitions = []
 number_of_constraintDefinitions = 2
# number_of_constraintDefinitions = 1
# for i in range(number_of_constraintDefinitions):
 for i in range(2,3):
  if i == 0:
   constraintDefinition = {}
   constraintDefinition['name'] = 'layer'
   set_definition = {}
   set_definition['partition'] = 'depth'
   constraintDefinition['sets'] = set_definition
   constraints = []
   constraint = {}
   constraint['constraint'] = 'align'
   constraint['axis'] = 'x'
   constraint['orientation'] = 'center'
   constraints.append(constraint)
   constraintDefinition['forEach'] = constraints
   constraintDefinitions.append(constraintDefinition)
  if i == 1:
   constraintDefinition = {}
   set_arr = ["layer"]
   constraintDefinition['sets'] = set_arr
   constraints = []
   constraint['constraint'] = 'order'
   constraint['axis'] = 'y'
   constraint['by'] = 'depth'
   constraint['reverse'] = 'true'
   constraints.append(constraint)
   constraintDefinition['forEach'] = constraints
   constraintDefinitions.append(constraintDefinition)
  if i == 2:
   constraintDefinition = {}
   from_definition = {}
   from_definition['expr'] = "node.type === 'unknown'"
   constraintDefinition['from'] = from_definition
   sets_definition = {}
   collect_arr = ["node._id", "node.neighbors.extract('_id')"]
   sets_definition['collect'] = collect_arr
   constraintDefinition['sets'] = sets_definition
   constraints = []
   constraint = {}
   constraint['constraint'] = 'hull'
   constraint['style'] = 'visible'
   constraints.append(constraint)
   constraintDefinition['forEach'] = constraints
   constraintDefinitions.append(constraintDefinition)
 graph['constraintDefinitions'] = constraintDefinitions
 with open(output_file, 'w') as outfile:
  json.dump(graph, outfile)

#parse_dot_file('Layer7.dot', 'Layer7.txt')
#parse_dot_file('Layer6.dot', 'Layer6.txt')
#get_connected_component()


#txt_to_setcola('Layer6.txt', 'Layer6.json')
for i in range(1,8):
 txt_to_setcola('Layer'+str(i)+'.txt', 'Layer'+str(i)+'.json')

