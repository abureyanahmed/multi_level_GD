import networkx as nx
import math

def monotone_draw(G):
  # take tree
  # assign unique slope
  # use tan-1 for slopes
  # if path, may consider same slop
  # run DFS
  n = len(G.nodes())
  coords = []
  for i in range(n):
    coords.append([])
    coords[i].append(0.0)
    coords[i].append(0.0)
  i = 1
  for e in nx.dfs_edges(G,0):
    u, v = e
    slp = math.atan(i)
    coords[v][0] = coords[u][0] + math.cos(slp)
    coords[v][1] = coords[u][1] + math.sin(slp)
    i = i + 1
  return coords

G = nx.path_graph(5)
print(monotone_draw(G))
