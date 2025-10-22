# Todo List dApp Smart Contract Design

## Overview
This document outlines the design for a shared todo list dApp with a hybrid permission approach where todo lists are publicly visible but only assigned users can complete specific tasks.

## Data Structures

### Todo Item
```solidity
struct TodoItem {
    uint256 id;              // Unique identifier for the todo item
    string title;            // Title of the todo item
    string description;      // Detailed description
    bool isCompleted;        // Completion status
    uint256 priority;        // Priority level (1-5, where 1 is highest)
    uint256 dueDate;         // Unix timestamp for due date (0 if no due date)
    address creator;         // Address of the creator
    address assignedTo;      // Address of assigned user (address(0) if unassigned)
    uint256 createdAt;       // Creation timestamp
    uint256 completedAt;     // Completion timestamp (0 if not completed)
    string category;         // Category/tag for organization
}
```

### Todo List
```solidity
struct TodoList {
    uint256 id;              // Unique identifier for the todo list
    string name;             // Name of the todo list
    string description;      // Description of the todo list
    address owner;           // Owner of the todo list
    uint256[] todoIds;       // Array of todo item IDs
    uint256 createdAt;       // Creation timestamp
    bool isActive;           // Status of the list
}
```

## Contract Architecture

### Main Contract: TodoListManager
The main contract will manage multiple todo lists and todo items.

#### State Variables
```solidity
// Counters for IDs
uint256 private _listIdCounter;
uint256 private _todoIdCounter;

// Mappings
mapping(uint256 => TodoList) public todoLists;           // listId => TodoList
mapping(uint256 => TodoItem) public todoItems;          // todoId => TodoItem
mapping(address => uint256[]) public userToLists;       // user => listIds[]
mapping(uint256 => mapping(address => bool)) public listPermissions; // listId => user => hasPermission
```

#### Core Functions

1. **List Management**
   - `createTodoList(string memory name, string memory description)` - Creates a new todo list
   - `updateTodoList(uint256 listId, string memory name, string memory description)` - Updates list details (owner only)
   - `deactivateTodoList(uint256 listId)` - Deactivates a list (owner only)

2. **Todo Item Management**
   - `createTodoItem(uint256 listId, string memory title, string memory description, uint256 priority, uint256 dueDate, address assignedTo, string memory category)` - Creates a new todo item
   - `updateTodoItem(uint256 todoId, string memory title, string memory description, uint256 priority, uint256 dueDate, address assignedTo, string memory category)` - Updates todo item details
   - `toggleTodoCompletion(uint256 todoId)` - Marks a todo as completed/incomplete (assigned user only)
   - `deleteTodoItem(uint256 todoId)` - Deletes a todo item (creator or list owner only)

3. **Permission Management**
   - `grantPermission(uint256 listId, address user)` - Grants permission to a user (owner only)
   - `revokePermission(uint256 listId, address user)` - Revokes permission from a user (owner only)

4. **View Functions**
   - `getTodoList(uint256 listId)` - Returns todo list details
   - `getTodoItem(uint256 todoId)` - Returns todo item details
   - `getTodoItemsByList(uint256 listId)` - Returns all todo items in a list
   - `getUserLists(address user)` - Returns all lists owned by or accessible to a user
   - `getPendingTodos(address user)` - Returns all uncompleted todos assigned to a user

#### Events
```solidity
event TodoListCreated(uint256 indexed listId, string name, address indexed owner);
event TodoListUpdated(uint256 indexed listId, string name);
event TodoListDeactivated(uint256 indexed listId);
event TodoItemCreated(uint256 indexed listId, uint256 indexed todoId, string title, address indexed creator);
event TodoItemUpdated(uint256 indexed todoId, string title);
event TodoItemToggled(uint256 indexed todoId, bool isCompleted, address indexed completedBy);
event TodoItemDeleted(uint256 indexed todoId);
event PermissionGranted(uint256 indexed listId, address indexed user);
event PermissionRevoked(uint256 indexed listId, address indexed user);
```

#### Modifiers
```solidity
modifier onlyListOwner(uint256 listId) {
    require(todoLists[listId].owner == msg.sender, "Not the list owner");
    _;
}

modifier onlyAssignedUser(uint256 todoId) {
    require(todoItems[todoId].assignedTo == msg.sender || todoItems[todoId].creator == msg.sender, "Not assigned to this todo");
    _;
}

modifier validList(uint256 listId) {
    require(listId > 0 && listId <= _listIdCounter, "Invalid list ID");
    require(todoLists[listId].isActive, "List is not active");
    _;
}

modifier validTodo(uint256 todoId) {
    require(todoId > 0 && todoId <= _todoIdCounter, "Invalid todo ID");
    _;
}
```

## Gas Optimization Considerations

1. Use `uint256` for IDs and timestamps
2. Store strings efficiently - consider using shorter category names
3. Limit the number of items returned in view functions
4. Use events for off-chain data storage
5. Implement pagination for functions returning arrays

## Security Considerations

1. Access control through modifiers
2. Input validation for all public functions
3. Reentrancy protection where needed
4. Zero-address checks for address parameters
5. Proper event logging for transparency

## Future Enhancements

1. Sub-todos functionality
2. Comments on todo items
3. Voting mechanism for task priority
4. Integration with NFTs for task rewards
5. Time tracking for tasks