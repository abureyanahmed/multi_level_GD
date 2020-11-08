import networkx as nx

#G = nx.full_rary_tree(3, 4)
#G = nx.full_rary_tree(9, 19)
#G = nx.full_rary_tree(9, 50)
G = nx.full_rary_tree(9, 150)
for u, v in G.edges():
  print('"'+str(u)+'" -- "'+str(v)+'"')

