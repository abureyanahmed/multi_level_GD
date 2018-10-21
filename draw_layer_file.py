from utils import *
from input_functions import *

def draw_layer_file(input_file, output_file):
 print('number_of_intersections:',number_of_intersections(input_file))
 n, coord_list, edge_list = take_input(input_file)
 x = []
 y = []
 for i in range(len(coord_list)):
  x.append(coord_list[i][0])
  y.append(coord_list[i][1])

 print(len(x))
 print(len(edge_list))

 draw_graph(x, y, edge_list, output_file)


draw_layer_file('Layer7_force_directed.txt', 'Layer7.png')
#draw_layer_file('Layer6_force_directed.txt', 'Layer6.png')
#draw_layer_file('Layer7_top_down_force_directed.txt', 'Layer7_top_down.png')



