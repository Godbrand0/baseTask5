export const TODO_LIST_ABI = [
  {
    "type": "function",
    "name": "createTodoItem",
    "inputs": [
      {"name": "listId", "type": "uint256", "internalType": "uint256"},
      {"name": "title", "type": "string", "internalType": "string"},
      {"name": "description", "type": "string", "internalType": "string"},
      {"name": "priority", "type": "uint256", "internalType": "uint256"},
      {"name": "dueDate", "type": "uint256", "internalType": "uint256"},
      {"name": "assignedTo", "type": "address", "internalType": "address"},
      {"name": "category", "type": "string", "internalType": "string"}
    ],
    "outputs": [{"name": "todoId", "type": "uint256", "internalType": "uint256"}],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "createTodoList",
    "inputs": [
      {"name": "name", "type": "string", "internalType": "string"},
      {"name": "description", "type": "string", "internalType": "string"}
    ],
    "outputs": [{"name": "listId", "type": "uint256", "internalType": "uint256"}],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "deactivateTodoList",
    "inputs": [{"name": "listId", "type": "uint256", "internalType": "uint256"}],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "deleteTodoItem",
    "inputs": [{"name": "todoId", "type": "uint256", "internalType": "uint256"}],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getPendingTodos",
    "inputs": [{"name": "user", "type": "address", "internalType": "address"}],
    "outputs": [{"name": "", "type": "uint256[]", "internalType": "uint256[]"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTodoItemsByList",
    "inputs": [{"name": "listId", "type": "uint256", "internalType": "uint256"}],
    "outputs": [{"name": "", "type": "uint256[]", "internalType": "uint256[]"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTotalLists",
    "inputs": [],
    "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTotalTodos",
    "inputs": [],
    "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getUserLists",
    "inputs": [{"name": "user", "type": "address", "internalType": "address"}],
    "outputs": [{"name": "", "type": "uint256[]", "internalType": "uint256[]"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "grantPermission",
    "inputs": [
      {"name": "listId", "type": "uint256", "internalType": "uint256"},
      {"name": "user", "type": "address", "internalType": "address"}
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "listPermissions",
    "inputs": [
      {"name": "", "type": "uint256", "internalType": "uint256"},
      {"name": "", "type": "address", "internalType": "address"}
    ],
    "outputs": [{"name": "", "type": "bool", "internalType": "bool"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "revokePermission",
    "inputs": [
      {"name": "listId", "type": "uint256", "internalType": "uint256"},
      {"name": "user", "type": "address", "internalType": "address"}
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "todoItems",
    "inputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
    "outputs": [
      {"name": "id", "type": "uint256", "internalType": "uint256"},
      {"name": "listId", "type": "uint256", "internalType": "uint256"},
      {"name": "title", "type": "string", "internalType": "string"},
      {"name": "description", "type": "string", "internalType": "string"},
      {"name": "isCompleted", "type": "bool", "internalType": "bool"},
      {"name": "priority", "type": "uint256", "internalType": "uint256"},
      {"name": "dueDate", "type": "uint256", "internalType": "uint256"},
      {"name": "creator", "type": "address", "internalType": "address"},
      {"name": "assignedTo", "type": "address", "internalType": "address"},
      {"name": "createdAt", "type": "uint256", "internalType": "uint256"},
      {"name": "completedAt", "type": "uint256", "internalType": "uint256"},
      {"name": "category", "type": "string", "internalType": "string"},
      {"name": "isActive", "type": "bool", "internalType": "bool"}
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "todoLists",
    "inputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
    "outputs": [
      {"name": "id", "type": "uint256", "internalType": "uint256"},
      {"name": "name", "type": "string", "internalType": "string"},
      {"name": "description", "type": "string", "internalType": "string"},
      {"name": "owner", "type": "address", "internalType": "address"},
      {"name": "createdAt", "type": "uint256", "internalType": "uint256"},
      {"name": "isActive", "type": "bool", "internalType": "bool"}
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "toggleTodoCompletion",
    "inputs": [{"name": "todoId", "type": "uint256", "internalType": "uint256"}],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateTodoItem",
    "inputs": [
      {"name": "todoId", "type": "uint256", "internalType": "uint256"},
      {"name": "title", "type": "string", "internalType": "string"},
      {"name": "description", "type": "string", "internalType": "string"},
      {"name": "priority", "type": "uint256", "internalType": "uint256"},
      {"name": "dueDate", "type": "uint256", "internalType": "uint256"},
      {"name": "assignedTo", "type": "address", "internalType": "address"},
      {"name": "category", "type": "string", "internalType": "string"}
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateTodoList",
    "inputs": [
      {"name": "listId", "type": "uint256", "internalType": "uint256"},
      {"name": "name", "type": "string", "internalType": "string"},
      {"name": "description", "type": "string", "internalType": "string"}
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "userToLists",
    "inputs": [
      {"name": "", "type": "address", "internalType": "address"},
      {"name": "", "type": "uint256", "internalType": "uint256"}
    ],
    "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
    "stateMutability": "view"
  },
  {
    "type": "event",
    "name": "PermissionGranted",
    "inputs": [
      {"name": "listId", "type": "uint256", "indexed": true, "internalType": "uint256"},
      {"name": "user", "type": "address", "indexed": true, "internalType": "address"}
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "PermissionRevoked",
    "inputs": [
      {"name": "listId", "type": "uint256", "indexed": true, "internalType": "uint256"},
      {"name": "user", "type": "address", "indexed": true, "internalType": "address"}
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "TodoItemCreated",
    "inputs": [
      {"name": "listId", "type": "uint256", "indexed": true, "internalType": "uint256"},
      {"name": "todoId", "type": "uint256", "indexed": true, "internalType": "uint256"},
      {"name": "title", "type": "string", "indexed": false, "internalType": "string"},
      {"name": "creator", "type": "address", "indexed": true, "internalType": "address"}
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "TodoItemDeleted",
    "inputs": [
      {"name": "todoId", "type": "uint256", "indexed": true, "internalType": "uint256"}
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "TodoItemToggled",
    "inputs": [
      {"name": "todoId", "type": "uint256", "indexed": true, "internalType": "uint256"},
      {"name": "isCompleted", "type": "bool", "indexed": false, "internalType": "bool"},
      {"name": "completedBy", "type": "address", "indexed": true, "internalType": "address"}
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "TodoItemUpdated",
    "inputs": [
      {"name": "todoId", "type": "uint256", "indexed": true, "internalType": "uint256"},
      {"name": "title", "type": "string", "indexed": false, "internalType": "string"}
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "TodoListCreated",
    "inputs": [
      {"name": "listId", "type": "uint256", "indexed": true, "internalType": "uint256"},
      {"name": "name", "type": "string", "indexed": false, "internalType": "string"},
      {"name": "owner", "type": "address", "indexed": true, "internalType": "address"}
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "TodoListDeactivated",
    "inputs": [
      {"name": "listId", "type": "uint256", "indexed": true, "internalType": "uint256"}
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "TodoListUpdated",
    "inputs": [
      {"name": "listId", "type": "uint256", "indexed": true, "internalType": "uint256"},
      {"name": "name", "type": "string", "indexed": false, "internalType": "string"}
    ],
    "anonymous": false
  }
] as const;

export const TODO_LIST_ADDRESS = (process.env.NEXT_PUBLIC_TODO_LIST_ADDRESS || "0xF3a6320824843755671D16fEc765d21F83e126B9") as `0x${string}`;

export const BASE_SEPOLIA_CHAIN_ID = 84532 as const;

export const BASE_SEPOLIA_RPC_URL = "https://base-sepolia-rpc.publicnode.com" as const;