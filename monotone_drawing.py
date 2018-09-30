import networkx as nx
import math
from utils import *

def monotone_draw(G):
  # take tree
  # assign unique slope
  # use tan-1 for slopes
  # if path, may consider same slop
  # run DFS
  n = len(G.nodes())
  x = []
  y = []
  for i in range(n):
    x.append(0.0)
    y.append(0.0)
  i = 1
  for e in nx.dfs_edges(G,0):
    u, v = e
    slp = math.atan(i)
    x[v] = x[u] + math.cos(slp)
    y[v] = y[u] + math.sin(slp)
    i = i + 1
  return x, y, G.edges()

G = nx.path_graph(5)
x, y, edge_list = monotone_draw(G)
draw_graph(x, y, edge_list, "path.png")

G = nx.balanced_tree(2, 3)
x, y, edge_list = monotone_draw(G)
draw_graph(x, y, edge_list, "tree.png")

