class Node:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

def insert(root, data):
    if root is None:
        return Node(data)
    if data < root.data:
        root.left = insert(root.left, data)
    elif data > root.data:
        root.right = insert(root.right, data)
    return root

def inorder(root):
    if root:
        inorder(root.left)
        print(root.data, end=" ")
        inorder(root.right)

def preorder(root):
    if root:
        print(root.data, end=" ")
        preorder(root.left)
        preorder(root.right)

def postorder(root):
    if root:
        postorder(root.left)
        postorder(root.right)
        print(root.data, end=" ")

def count_leaf_nodes(root):
    if root is None:
        return 0
    if root.left is None and root.right is None:
        return 1
    return count_leaf_nodes(root.left) + count_leaf_nodes(root.right)

def count_non_leaf_nodes(root):
    if root is None or (root.left is None and root.right is None):
        return 0
    return 1 + count_non_leaf_nodes(root.left) + count_non_leaf_nodes(root.right)

if __name__ == "__main__":
    root = None
    while True:
        print("\n1. Insert")
        print("2. Inorder Traversal")
        print("3. Preorder Traversal")
        print("4. Postorder Traversal")
        print("5. Count Leaf Nodes")
        print("6. Count Non-Leaf Nodes")
        print("7. Exit")
        choice = int(input("Enter your choice: "))
        
        if choice == 1:
            data = int(input("Enter data to insert: "))
            root = insert(root, data)
        elif choice == 2:
            print("Inorder Traversal: ", end="")
            inorder(root)
            print()
        elif choice == 3:
            print("Preorder Traversal: ", end="")
            preorder(root)
            print()
        elif choice == 4:
            print("Postorder Traversal: ", end="")
            postorder(root)
            print()
        elif choice == 5:
            print("Leaf Nodes Count:", count_leaf_nodes(root))
        elif choice == 6:
            print("Non-Leaf Nodes Count:", count_non_leaf_nodes(root))
        elif choice == 7:
            print("Exiting program.")
            break
        else:
            print("Invalid choice. Please try again.")
