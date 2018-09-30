import subprocess

def force_directed(input_file, output_file, iterations, is_repulsion_crossing_enabled, is_random):
 p = subprocess.Popen(["node", "force_directed.js", input_file, output_file, iterations, is_repulsion_crossing_enabled, is_random], stdout=subprocess.PIPE)
 output, error = p.communicate()


#force_directed("../graphs/input/input2.txt", "../graphs/input/force_directed2.txt", "100", "repulsion_crossing", "random")
#force_directed("../graphs/input/input2.txt", "../graphs/input/force_directed2.txt", "100", "no_repulsion_crossing", "input")

force_directed("Layer7.txt", "Layer7_force_directed.txt", "500", "no_repulsion_crossing", "input")

