from graphviz import Graph
from input_functions import *

def convert_one_file(dot_file_name, output_file):
 G = read_dot(dot_file_name)
 write_networx_graph(G, output_file)

convert_one_file('Layer7.dot', 'Layer7.txt')

