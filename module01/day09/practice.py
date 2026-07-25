#!BUILD A BST

class Node:

    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None



def insert(root, value):

    if root is None:
        return Node(value)


    if value < root.value:
        root.left = insert(root.left, value)

    else:
        root.right = insert(root.right, value)


    return root



def inorder(root):

    if root is None:
        return


    inorder(root.left)

    print(root.value, end=" ")

    inorder(root.right)



balances = [500, 200, 800, 100, 300, 700, 900]

root = None


for balance in balances:
    root = insert(root, balance)


print("BST in-order traversal:")
inorder(root)



#!TREE DEPTH

def height(node):

    if node is None:
        return 0


    left_height = height(node.left)
    right_height = height(node.right)


    return max(left_height, right_height) + 1



print("\n\nTree height:")
print(height(root))



#!GRAPH BFS

def bfs(graph, start):

    visited = set()

    queue = [start]


    while queue:

        vertex = queue.pop(0)


        if vertex not in visited:

            visited.add(vertex)

            queue.extend(graph[vertex])


    return visited



graph = {

    "A": ["B", "C"],

    "B": ["D", "E"],

    "C": ["F"],

    "D": [],

    "E": [],

    "F": []

}



print("\nBFS traversal:")
print(bfs(graph, "A"))



#!GRAPH DFS

def dfs(graph, start, visited=None):

    if visited is None:
        visited = []


    visited.append(start)


    for neighbor in graph[start]:

        if neighbor not in visited:

            dfs(graph, neighbor, visited)


    return visited



print("\nDFS traversal:")
print(dfs(graph, "A"))



#!PRIORITY QUEUE

import heapq


tasks = []


heapq.heappush(tasks, (3, "Write report"))

heapq.heappush(tasks, (1, "Fix bug"))

heapq.heappush(tasks, (5, "Deploy app"))

heapq.heappush(tasks, (2, "Test code"))

heapq.heappush(tasks, (4, "Update website"))



print("\nPriority queue output:")


while tasks:

    priority, task = heapq.heappop(tasks)

    print(priority, task)