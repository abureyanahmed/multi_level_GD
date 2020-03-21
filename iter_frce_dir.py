import networkx as nx
from networkx.drawing.nx_agraph import write_dot
from networkx.drawing.nx_agraph import read_dot as nx_read_dot
import matplotlib
import matplotlib.pyplot as plt
from edge_crossing import *

my_inf = 10000000

#screen_width = 8.9
screen_width = 11.97
#screen_height = 6.7
screen_height = 5.9
adjusting_factor = .6
def coord_to_inch_x(x, max_x=640):
 global screen_width
 return x*screen_width/max_x

def inch_to_coord_x(x, max_x=640):
 global screen_width
 return x*max_x/screen_width

def coord_to_inch_y(y, max_y=480):
 global screen_height
 return y*screen_height/max_y

def inch_to_coord_y(y, max_y=480):
 global screen_height
 return y*max_y/screen_height

def draw_graph(x, y, edge_list, output_file, labels, label_sizes):
 global my_inf, adjusting_factor
 fig, ax = plt.subplots()
 plt.axis('off')
 plt.subplots_adjust(left=0, bottom=0, right=1, top=1.33, wspace=0, hspace=0)
 #ax.axis('equal')
 xmin = my_inf
 xmax = -1
 ymin = my_inf
 ymax = -1
 #padding = 3
 padding = 0
 #adjusting_factor = .6
 #adjusting_factor = 1
 for i in range(len(x)):
  if xmin > x[i]: xmin = x[i]
  if xmax < x[i]: xmax = x[i]
  if ymin > y[i]: ymin = y[i]
  if ymax < y[i]: ymax = y[i]
 xmin -= padding
 ymin -= padding
 xmax += padding
 ymax += padding
 #print("xmin, xmax:", xmin, xmax)
 #print("ymin, ymax:", ymin, ymax)
 for i in range(len(x)):
  #print("x, y:", x[i], y[i])
  #circle = plt.Circle((x[i], y[i]), (xmax+ymax-xmin-ymin)/200.00, clip_on=False)
  #ax.add_artist(circle)
  #ax.text(x[i]+1, y[i]+1, str(i), fontsize=12)
  x_l = inch_to_coord_x(label_sizes[i]*len(labels[i])/72*adjusting_factor, xmax)
  y_l = inch_to_coord_y(label_sizes[i]/72*adjusting_factor, ymax)
  #print("x_l, y_l:", x_l, y_l)
  #print("label:", labels[i])
  ax.text(x[i] - x_l/2, y[i] - y_l/2, labels[i], fontsize=label_sizes[i])
  rect = matplotlib.patches.Rectangle((x[i] - x_l/2, y[i] - y_l/2), x_l, y_l, linewidth=1, edgecolor='k', facecolor='none')
  ax.add_patch(rect)
 for i in range(len(edge_list)):
  ax.plot([x[edge_list[i][0]], x[edge_list[i][1]]], [y[edge_list[i][0]], y[edge_list[i][1]]], 'k-', lw=2)
 ax.set_xlim([min(xmin,ymin),max(xmax,ymax)])
 ax.set_ylim([min(xmin,ymin),max(xmax,ymax)])
 #fig.savefig(output_file)
 #plt.close(fig)
 plt.show()

def find_suitable_point(u, v_x, v_y, D_x, D_y, edge_list, index_to_label, label_sizes):
 #print("find_suitable_point:", index_to_label[u])
 crossing_exist = True
 while crossing_exist:
  crossing_exist = False
  for e in edge_list:
   p2, q2 = e
   if p2<len(D_x) and q2<len(D_x):
    if doIntersect(D_x[u], D_y[u], v_x, v_y, D_x[p2], D_y[p2], D_x[q2], D_y[q2]):
     crossing_exist = True
     break
  if not crossing_exist:
   for i in range(len(D_x)):
    crossing_exist = do_label_overlab_with_segment(i, D_x[i], D_y[i], D_x[u], D_y[u], v_x, v_y, index_to_label, label_sizes[i])
    if crossing_exist:
     break
  if not crossing_exist:
   # future todo: check whether the edge is inside a box, then run binary search, this is harder, we don't know any valid end point
   return v_x, v_y
  v_x = D_x[u] + (v_x - D_x[u])/2.0
  v_y = D_y[u] + (v_y - D_y[u])/2.0

def find_suitable_point_scale_up(current_vertex, change_x, change_y, D_x, D_y, edge_list, label_sizes, index_to_label):
 #print("find_suitable_point_scale_up", index_to_label[current_vertex])
 crossing_exist = True
 while crossing_exist:
  #print("change_x, change_y:",change_x, change_y)
  crossing_exist = False
  for e in edge_list:
   p1, q1 = e
   if p1<len(D_x) and q1<len(D_x) and (p1==current_vertex or q1==current_vertex):
    for e2 in edge_list:
     p2, q2 = e2
     if p2<len(D_x) and q2<len(D_x):
      if p1==current_vertex:
       p1x = D_x[p1]+change_x
       p1y = D_y[p1]+change_y
       q1x = D_x[q1]
       q1y = D_y[q1]
      else:
       p1x = D_x[p1]
       p1y = D_y[p1]
       q1x = D_x[q1]+change_x
       q1y = D_y[q1]+change_y
      p2x = D_x[p2]
      p2y = D_y[p2]
      q2x = D_x[q2]
      q2y = D_y[q2]
      if doIntersect(p1x, p1y, q1x, q1y, p2x, p2y, q2x, q2y):
       crossing_exist = True
       break
  if not crossing_exist:
   crossing_exist = do_overlap_exist(current_vertex, D_x[current_vertex]+change_x, D_y[current_vertex]+change_y, D_x, D_y, edge_list, label_sizes, index_to_label, label_sizes[current_vertex])
  if not crossing_exist:
   for e in edge_list:
    p1, q1 = e
    if p1<len(D_x) and q1<len(D_x) and (p1==current_vertex or q1==current_vertex):
     if p1==current_vertex:
      p1x = D_x[p1]+change_x
      p1y = D_y[p1]+change_y
      q1x = D_x[q1]
      q1y = D_y[q1]
     else:
      p1x = D_x[p1]
      p1y = D_y[p1]
      q1x = D_x[q1]+change_x
      q1y = D_y[q1]+change_y
     for i in range(len(D_x)):
      if i==p1 or i==q1: continue
      crossing_exist = do_label_overlab_with_segment(i, D_x[i], D_y[i], p1x, p1y, q1x, q1y, index_to_label, label_sizes[i])
      if crossing_exist: break
    if crossing_exist: break
  if crossing_exist:
   change_x, change_y = change_x/2.0, change_y/2.0
  if abs(change_x)<.001 and abs(change_y)<.001:
   break
 return D_x[current_vertex]+change_x, D_y[current_vertex]+change_y

def do_label_overlab_with_segment(label_index, v_x, v_y, px, py, qx, qy, labels, font_size):
    x_l = inch_to_coord_x(font_size*len(labels[label_index])/72*adjusting_factor)
    y_l = inch_to_coord_y(font_size/72*adjusting_factor)
    if doIntersect(v_x - x_l/2, v_y - y_l/2, v_x + x_l/2, v_y - y_l/2, px, py, qx, qy):
     return True
    if doIntersect(v_x + x_l/2, v_y - y_l/2, v_x + x_l/2, v_y + y_l/2, px, py, qx, qy):
     return True
    if doIntersect(v_x + x_l/2, v_y + y_l/2, v_x - x_l/2, v_y + y_l/2, px, py, qx, qy):
     return True
    if doIntersect(v_x - x_l/2, v_y + y_l/2, v_x - x_l/2, v_y - y_l/2, px, py, qx, qy):
     return True

def do_overlap_exist(i, v_x, v_y, D_x, D_y, edge_list, label_sizes, labels, font_size):
  global adjusting_factor
  for e in edge_list:
   p2, q2 = e
   #if p2<len(D_x) and q2<len(D_x) and not (p2==u or q2==u):
   #if p2<len(D_x) and q2<len(D_x):
   if p2<len(D_x) and q2<len(D_x) and not (p2==i or q2==i):
    overlap_exist = do_label_overlab_with_segment(i, v_x, v_y, D_x[p2], D_y[p2], D_x[q2], D_y[q2], labels, font_size)
    if overlap_exist:
     return True
  #i = len(D_x)
  x_l = inch_to_coord_x(font_size*len(labels[i])/72*adjusting_factor)
  y_l = inch_to_coord_y(font_size/72*adjusting_factor)
  p1x = [v_x - x_l/2, v_x + x_l/2, v_x + x_l/2, v_x - x_l/2]
  p1y = [v_y - y_l/2, v_y - y_l/2, v_y + y_l/2, v_y + y_l/2]
  q1x = [v_x + x_l/2, v_x + x_l/2, v_x - x_l/2, v_x - x_l/2]
  q1y = [v_y - y_l/2, v_y + y_l/2, v_y + y_l/2, v_y - y_l/2]
  for j in range(len(D_x)):
   x_l = inch_to_coord_x(label_sizes[j]*len(labels[j])/72*adjusting_factor)
   y_l = inch_to_coord_y(label_sizes[j]/72*adjusting_factor)
   p2x = [D_x[j] - x_l/2, D_x[j] + x_l/2, D_x[j] + x_l/2, D_x[j] - x_l/2]
   p2y = [D_y[j] - y_l/2, D_y[j] - y_l/2, D_y[j] + y_l/2, D_y[j] + y_l/2]
   q2x = [D_x[j] + x_l/2, D_x[j] + x_l/2, D_x[j] - x_l/2, D_x[j] - x_l/2]
   q2y = [D_y[j] - y_l/2, D_y[j] + y_l/2, D_y[j] + y_l/2, D_y[j] - y_l/2]
   for k in range(4):
    for l in range(4):
     if doIntersect(p1x[k], p1y[k], q1x[k], q1y[k], p2x[l], p2y[l], q2x[l], q2y[l]):
      return True
  return False

def find_suitable_font_size(i, v_x, v_y, D_x, D_y, edge_list, label_sizes, labels, font_size):
 overlap_exist = True
 while overlap_exist:
  overlap_exist = do_overlap_exist(i, v_x, v_y, D_x, D_y, edge_list, label_sizes, labels, font_size)
  if not overlap_exist:
   return font_size
  font_size = font_size/2

def find_suitable_font_size_scale_up(j, D_x, D_y, edge_list, label_sizes, index_to_label):
 #d = 1
 org_font_size = label_sizes[j]
 scale = 12/org_font_size
 loop_counter = 0
 while True:
  #scale = 1+1/d
  loop_counter += 1
  #if (scale-1)<.001 or loop_counter>10:
  #if (scale-1)<.001:
  # return org_font_size
  font_size = min(org_font_size*scale, 12)
  overlap_exist = do_overlap_exist(j, D_x[j], D_y[j], D_x, D_y, edge_list, label_sizes, index_to_label, font_size)
  if not overlap_exist:
   return font_size
  #d = 2*d
  scale /= 2

def iterative_force_directed(G):
 label_to_index = dict()
 index_to_label = dict()
 txt = "bot left"
 ind = 0
 label_to_index[txt] = ind
 index_to_label[ind] = txt
 txt = "bot right"
 ind = 1
 label_to_index[txt] = ind
 index_to_label[ind] = txt
 txt = "top right"
 ind = 2
 label_to_index[txt] = ind
 index_to_label[ind] = txt
 txt = "top left"
 ind = 3
 label_to_index[txt] = ind
 index_to_label[ind] = txt
 #for e in G.edges():
 edge_list = [[0, 1], [1, 2], [2, 3], [3, 0]]
 #bfs_edges = []
 #for e in nx.bfs_edges(G, "machine learning"):
 # u, v = e
 # bfs_edges.append((u, v))
 #print(bfs_edges)
 #quit()
 bfs_edges = [('machine learning', 'computer vision'), ('machine learning', 'signal processing'), ('machine learning', 'data mining'), ('machine learning', 'natural language processing'), ('machine learning', 'optimization'), ('machine learning', 'neuroscience'), ('machine learning', 'bioinformatics'), ('machine learning', 'statistics'), ('machine learning', 'artificial intelligence'), ('computer vision', 'image processing'), ('computer vision', 'robotics'), ('neuroscience', 'psychology'), ('bioinformatics', 'genomics'), ('bioinformatics', 'computational biology'), ('bioinformatics', 'biostatistics'), ('statistics', 'econometrics'), ('artificial intelligence', 'computer science'), ('psychology', 'education'), ('genomics', 'evolution'), ('genomics', 'genetics'), ('biostatistics', 'epidemiology'), ('econometrics', 'economics'), ('computer science', 'software engineering'), ('evolution', 'ecology'), ('genetics', 'molecular biology'), ('ecology', 'conservation biology'), ('ecology', 'climate change'), ('molecular biology', 'microbiology'), ('molecular biology', 'biochemistry'), ('climate change', 'hydrology'), ('microbiology', 'immunology'), ('biochemistry', 'biophysics'), ('hydrology', 'remote sensing'), ('immunology', 'cancer'), ('cancer', 'stem cells'), ('stem cells', 'tissue engineering'), ('tissue engineering', 'biomaterials'), ('biomaterials', 'drug delivery'), ('drug delivery', 'nanotechnology'), ('nanotechnology', 'materials science'), ('materials science', 'physics'), ('materials science', 'chemistry')]
 #for e in nx.bfs_edges(G, "machine learning"):
 for e in bfs_edges:
  #print(e)
  u, v = e
  if not u in label_to_index.keys():
   label_to_index[u] = len(label_to_index.keys())
   index_to_label[len(label_to_index.keys())-1] = u
  if not v in label_to_index.keys():
   label_to_index[v] = len(label_to_index.keys())
   index_to_label[len(label_to_index.keys())-1] = v
  edge_list.append([label_to_index[u], label_to_index[v]])
 #print(label_to_index)
 #print(index_to_label)
 font_size = 12
 #label_sizes = [font_size for i in range(4)] + [font_size for i in range(len(G.nodes()))]
 label_sizes = [font_size for i in range(4)] + [font_size for i in range(2)]
 D_x = [0, 640, 640, 0, 150, 150]
 D_y = [0, 0, 480, 480, 50, 150]
 i = 1+4
 while i<len(edge_list):
  #take a new edge or vertex
  u, v = edge_list[i]
  #Let u has |N_u| neighbors in D
  u_lab = index_to_label[u]
  N_u = list(G.neighbors(u_lab))
  #print("N_u:", [x for x in N_u])
  N_u2 = []
  #print("len(D_x):", len(D_x))
  for x in N_u:
   #print(x, label_to_index[x])
   if label_to_index[x]<len(D_x):
    N_u2.append(x)
  #print(N_u2)
  if len(N_u2)==1:
   # place it to 2v_u - v_w, where w is the other neighbor
   v_x = 2*D_x[u] - D_x[label_to_index[N_u2[0]]]
   v_y = 2*D_y[u] - D_y[label_to_index[N_u2[0]]]
  else:
   vec_x, vec_y = D_x[label_to_index[N_u2[0]]] - D_x[u], D_y[label_to_index[N_u2[0]]] - D_y[u]
   vec_len = math.sqrt(vec_x**2+vec_y**2)
   min_j = -1
   min_angle = None
   for j in range(1, len(N_u2)):
    vec_x2, vec_y2 = D_x[label_to_index[N_u2[j]]] - D_x[u], D_y[label_to_index[N_u2[j]]] - D_y[u]
    vec_len2 = math.sqrt(vec_x2**2+vec_y2**2)
    angle = (vec_x*vec_x2 + vec_y*vec_y2)/(vec_len*vec_len2)
    if min_j==-1:
     min_j = j
     min_angle = angle
    else:
     if min_angle<angle:
      min_j = j
      min_angle = angle
   if abs(min_angle+1)<.001:
    v_x, v_y = D_x[u] + D_y[label_to_index[N_u2[min_j]]] - D_y[label_to_index[N_u2[0]]], D_y[u] + D_x[label_to_index[N_u2[0]]] - D_x[label_to_index[N_u2[min_j]]]
   else:
    v_x, v_y = D_x[u] + D_x[label_to_index[N_u2[0]]] - D_x[label_to_index[N_u2[min_j]]] + D_x[label_to_index[N_u2[1]]] - D_x[label_to_index[N_u2[min_j]]], D_y[u] + D_y[label_to_index[N_u2[0]]] - D_y[label_to_index[N_u2[min_j]]] + D_y[label_to_index[N_u2[1]]] - D_y[label_to_index[N_u2[min_j]]]
  v_x, v_y = find_suitable_point(u, v_x, v_y, D_x, D_y, edge_list, index_to_label, label_sizes)
  fnt_size = find_suitable_font_size(v, v_x, v_y, D_x, D_y, edge_list, label_sizes, index_to_label, 12)
  D_x.append(v_x)
  D_y.append(v_y)
  label_sizes.append(fnt_size)
  output_file = "iteration_"+str(i)+".png"
  #draw_graph(D_x, D_y, edge_list[:len(D_x)-1], output_file, index_to_label, label_sizes)
  max_diff = math.sqrt(640**2 + 480**2)
  prev_max_diff = max_diff + 20
  loop_counter = 0
  while abs(max_diff-prev_max_diff)>10 or abs(label_sizes[len(label_sizes)-1]-12)>.001:
  #while max_diff>10 or abs(label_sizes[len(label_sizes)-1]-12)>.001:
  #while max_diff>10:
   loop_counter += 1
   #if loop_counter>100: break
   print("max_diff:", max_diff, "label_size:", label_sizes[len(label_sizes)-1])
   #print("D_x", D_x)
   prev_max_diff = max_diff
   max_diff = 0
   for j in range(4, len(D_x)):
    param = 2*math.sqrt(640*480/i)
    repulsion_x = 0
    repulsion_y = 0
    #param_a = 5
    param_a = 2*math.sqrt(640*480/i)
    attraction_x = 0
    attraction_y = 0
    for k in range(len(D_x)):
     if k==j: continue
     #print("calculating repulsion between:", index_to_label[k], k,  " and ", index_to_label[j])
     if not D_x[j]==D_x[k]: repulsion_x += (param**2)*((D_x[j]-D_x[k])/abs(D_x[j]-D_x[k]))/abs(D_x[j]-D_x[k])
     if not D_y[j]==D_y[k]: repulsion_y += (param**2)*((D_y[j]-D_y[k])/abs(D_y[j]-D_y[k]))/abs(D_y[j]-D_y[k])
    for e in edge_list:
     u, v = e
     if u>=len(D_x) or v>=len(D_x): continue
     if u==j:
      if not D_x[v]==D_x[j]: attraction_x += (1/param_a)*((D_x[v]-D_x[j])/abs(D_x[v]-D_x[j]))*abs(D_x[v]-D_x[j])**2
      if not D_y[v]==D_y[j]: attraction_y += (1/param_a)*((D_y[v]-D_y[j])/abs(D_y[v]-D_y[j]))*abs(D_y[v]-D_y[j])**2
     if v==j:
      if not D_x[u]==D_x[j]: attraction_x += (1/param_a)*((D_x[u]-D_x[j])/abs(D_x[u]-D_x[j]))*abs(D_x[u]-D_x[j])**2
      if not D_y[u]==D_y[j]: attraction_y += (1/param_a)*((D_y[u]-D_y[j])/abs(D_y[u]-D_y[j]))*abs(D_y[u]-D_y[j])**2
    new_x, new_y = find_suitable_point_scale_up(j, repulsion_x+attraction_x, repulsion_y+attraction_y, D_x, D_y, edge_list, label_sizes, index_to_label)
    D_x[j], D_y[j] = new_x, new_y
    #draw_graph(D_x, D_y, edge_list[:len(D_x)-1], output_file, index_to_label, label_sizes)
    if j == len(label_sizes)-1:
     fnt_size = find_suitable_font_size_scale_up(j, D_x, D_y, edge_list, label_sizes, index_to_label)
     label_sizes[len(label_sizes)-1] = fnt_size
    max_diff = max(max_diff, math.sqrt((repulsion_x+attraction_x)**2+(repulsion_y+attraction_y)**2))
  i = i+1
  if i==15: break
 #print("D_x, D_y:", D_x, D_y)
 draw_graph(D_x, D_y, edge_list[:len(D_x)-1], output_file, index_to_label, label_sizes)

G = nx_read_dot('Layer1.dot')
#G2 = nx.Graph()
#G2.add_edges_from(G.edges())
#nx.draw(G2, cmap=plt.get_cmap('Set1'), with_labels=True)
#plt.show()

iterative_force_directed(G)


