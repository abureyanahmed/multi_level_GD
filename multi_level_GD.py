from input_functions import *
from run_force_directed import *
from utils import *
import networkx as nx


#force_directed("../graphs/input/input2.txt", "../graphs/input/force_directed2.txt", "100", "no_repulsion_crossing")
#x,y = take_input_force_directed("../graphs/input/force_directed2.txt")
#n, coord_list, edge_list = take_input("../graphs/input/input2.txt")
#draw_graph(x, y, edge_list, "../graphs/input/force_directed2.png")

folder_name = "meeting_08_21_2018/"
file_names = ["er_8_0.6", "er_10_0.6", "er_15_0.4", "er_15_0.5", "er_17_0.4", "er_20_0.3", "er_20_0.4", "er_25_0.3", "er_25_0.4", "er_30_0.3"]
for i in range(len(file_names)):
 G = build_networkx_graph(folder_name+file_names[i]+".txt")
 T = nx.minimum_spanning_tree(G)
 #print(G.edges())
 #print(T.edges())
 write_as_txt_random_position(folder_name+file_names[i]+"_tree"+".txt", T)
 force_directed(folder_name+file_names[i]+"_tree.txt", folder_name+file_names[i]+"_tree_fd.txt", "100", "no_repulsion_crossing")
 x,y = take_input_force_directed(folder_name+file_names[i]+"_tree_fd.txt")
 tree_n, tree_coord_list, tree_edge_list = take_input(folder_name+file_names[i]+"_tree.txt")
 n, coord_list, edge_list = take_input(folder_name+file_names[i]+".txt")
 draw_graph(x, y, tree_edge_list, folder_name+file_names[i]+"_tree1.png")
 draw_graph(x, y, edge_list, folder_name+file_names[i]+"_graph1.png")
 G2 = G
 for e in T.edges():
  u, v = e
  G2.remove_edge(u, v)
 #print(G2.edges())
 write_as_txt(folder_name+file_names[i]+"_tree_complement"+".txt", G2, x, y)
 force_directed(folder_name+file_names[i]+"_tree_complement"+".txt", folder_name+file_names[i]+"_tree_complement_fd.txt", "3", "no_repulsion_crossing")
 x,y = take_input_force_directed(folder_name+file_names[i]+"_tree_complement_fd.txt")
 draw_graph(x, y, tree_edge_list, folder_name+file_names[i]+"_tree2.png")
 draw_graph(x, y, edge_list, folder_name+file_names[i]+"_graph2.png")


