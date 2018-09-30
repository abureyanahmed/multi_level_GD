from utils import *
from input_functions import *

n, coord_list, edge_list = take_input('Layer7_force_directed.txt')
x = []
y = []
for i in range(len(coord_list)):
 x.append(coord_list[i][0])
 y.append(coord_list[i][1])

print(len(x))
print(len(edge_list))

draw_graph(x, y, edge_list, 'Layer7.png')

