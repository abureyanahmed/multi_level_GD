#filename = "crd_5000.txt"
#filename = "crd_5000_100.txt"
filename = "crd_5000_200.txt"

f = open(filename, 'r')
crd_x = {}
for i in range(5000+1):
  l = f.readline()
  arr = l.split(':')
  crd_x[arr[0]] = float(arr[1])
crd_y = {}
for i in range(5000+1):
  l = f.readline()
  arr = l.split(':')
  crd_y[arr[0]] = float(arr[1])
f.close()
print("crd_x = ", crd_x)
print("crd_y = ", crd_y)


