// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

/**
 * @title TodoList
 * @dev A smart contract for managing shared todo lists with hybrid permissions
 * Todo lists are publicly visible but only assigned users can complete specific tasks
 */
contract TodoList {
    // Counters for IDs
    uint256 private _listIdCounter;
    uint256 private _todoIdCounter;

    // Structs
    struct TodoItem {
        uint256 id;              // Unique identifier for the todo item
        uint256 listId;          // ID of the parent todo list
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
        bool isActive;           // Status of the todo item
    }

    struct TodoListData {
        uint256 id;              // Unique identifier for the todo list
        string name;             // Name of the todo list
        string description;      // Description of the todo list
        address owner;           // Owner of the todo list
        uint256[] todoIds;       // Array of todo item IDs
        uint256 createdAt;       // Creation timestamp
        bool isActive;           // Status of the list
    }

    // Mappings
    mapping(uint256 => TodoListData) public todoLists;           // listId => TodoListData
    mapping(uint256 => TodoItem) public todoItems;              // todoId => TodoItem
    mapping(address => uint256[]) public userToLists;           // user => listIds[]
    mapping(uint256 => mapping(address => bool)) public listPermissions; // listId => user => hasPermission

    // Events
    event TodoListCreated(uint256 indexed listId, string name, address indexed owner);
    event TodoListUpdated(uint256 indexed listId, string name);
    event TodoListDeactivated(uint256 indexed listId);
    event TodoItemCreated(uint256 indexed listId, uint256 indexed todoId, string title, address indexed creator);
    event TodoItemUpdated(uint256 indexed todoId, string title);
    event TodoItemToggled(uint256 indexed todoId, bool isCompleted, address indexed completedBy);
    event TodoItemDeleted(uint256 indexed todoId);
    event PermissionGranted(uint256 indexed listId, address indexed user);
    event PermissionRevoked(uint256 indexed listId, address indexed user);

    // Modifiers
    modifier onlyListOwner(uint256 listId) {
        _onlyListOwner(listId);
        _;
    }

    modifier onlyAssignedUser(uint256 todoId) {
        _onlyAssignedUser(todoId);
        _;
    }

    modifier validList(uint256 listId) {
        _validList(listId);
        _;
    }

    modifier validTodo(uint256 todoId) {
        _validTodo(todoId);
        _;
    }

    modifier validPriority(uint256 priority) {
        _validPriority(priority);
        _;
    }

    modifier nonEmptyString(string memory str) {
        _nonEmptyString(str);
        _;
    }

    // Internal modifier functions
    function _onlyListOwner(uint256 listId) internal view {
        require(todoLists[listId].owner == msg.sender, "TodoList: Not the list owner");
    }

    function _onlyAssignedUser(uint256 todoId) internal view {
        uint256 listId = todoItems[todoId].listId;
        require(
            todoItems[todoId].assignedTo == msg.sender ||
            todoItems[todoId].creator == msg.sender ||
            todoLists[listId].owner == msg.sender ||
            listPermissions[listId][msg.sender],
            "TodoList: Not authorized for this todo"
        );
    }

    function _validList(uint256 listId) internal view {
        require(listId > 0 && listId <= _listIdCounter, "TodoList: Invalid list ID");
        require(todoLists[listId].isActive, "TodoList: List is not active");
    }

    function _validTodo(uint256 todoId) internal view {
        require(todoId > 0 && todoId <= _todoIdCounter, "TodoList: Invalid todo ID");
        require(todoItems[todoId].isActive, "TodoList: Todo is not active");
    }

    function _validPriority(uint256 priority) internal pure {
        require(priority >= 1 && priority <= 5, "TodoList: Priority must be between 1 and 5");
    }

    function _nonEmptyString(string memory str) internal pure {
        require(bytes(str).length > 0, "TodoList: String cannot be empty");
    }

    /**
     * @dev Creates a new todo list
     * @param name The name of the todo list
     * @param description The description of the todo list
     * @return listId The ID of the newly created list
     */
    function createTodoList(string memory name, string memory description) 
        external 
        nonEmptyString(name)
        returns (uint256 listId) 
    {
        _listIdCounter++;
        listId = _listIdCounter;
        
        todoLists[listId] = TodoListData({
            id: listId,
            name: name,
            description: description,
            owner: msg.sender,
            todoIds: new uint256[](0),
            createdAt: block.timestamp,
            isActive: true
        });
        
        // Grant the owner permission automatically
        listPermissions[listId][msg.sender] = true;

        userToLists[msg.sender].push(listId);
        
        emit TodoListCreated(listId, name, msg.sender);
    }

    /**
     * @dev Updates a todo list's details
     * @param listId The ID of the todo list to update
     * @param name The new name of the todo list
     * @param description The new description of the todo list
     */
    function updateTodoList(uint256 listId, string memory name, string memory description) 
        external 
        validList(listId)   // check validity first
        onlyListOwner(listId)
        nonEmptyString(name)
    {
        todoLists[listId].name = name;
        todoLists[listId].description = description;
        
        emit TodoListUpdated(listId, name);
    }

    /**
     * @dev Deactivates a todo list
     * @param listId The ID of the todo list to deactivate
     */
    function deactivateTodoList(uint256 listId) 
        external 
        validList(listId)   // check validity first
        onlyListOwner(listId)
    {
        todoLists[listId].isActive = false;
        
        emit TodoListDeactivated(listId);
    }

    /**
     * @dev Creates a new todo item
     * @param listId The ID of the todo list to add the item to
     * @param title The title of the todo item
     * @param description The description of the todo item
     * @param priority The priority level (1-5, where 1 is highest)
     * @param dueDate The due date as a Unix timestamp (0 if no due date)
     * @param assignedTo The address to assign the todo to (address(0) if unassigned)
     * @param category The category/tag for organization
     * @return todoId The ID of the newly created todo item
     */
    function createTodoItem(
        uint256 listId,
        string memory title,
        string memory description,
        uint256 priority,
        uint256 dueDate,
        address assignedTo,
        string memory category
    ) 
        external 
        validList(listId)
        nonEmptyString(title)
        validPriority(priority)
        returns (uint256 todoId) 
    {
        _todoIdCounter++;
        todoId = _todoIdCounter;
        
        todoItems[todoId] = TodoItem({
            id: todoId,
            listId: listId,
            title: title,
            description: description,
            isCompleted: false,
            priority: priority,
            dueDate: dueDate,
            creator: msg.sender,
            assignedTo: assignedTo,
            createdAt: block.timestamp,
            completedAt: 0,
            category: category,
            isActive: true
        });
        
        todoLists[listId].todoIds.push(todoId);
        
        emit TodoItemCreated(listId, todoId, title, msg.sender);
    }

    /**
     * @dev Updates a todo item's details
     * @param todoId The ID of the todo item to update
     * @param title The new title of the todo item
     * @param description The new description of the todo item
     * @param priority The new priority level (1-5, where 1 is highest)
     * @param dueDate The new due date as a Unix timestamp (0 if no due date)
     * @param assignedTo The new address to assign the todo to (address(0) if unassigned)
     * @param category The new category/tag for organization
     */
    function updateTodoItem(
        uint256 todoId,
        string memory title,
        string memory description,
        uint256 priority,
        uint256 dueDate,
        address assignedTo,
        string memory category
    ) 
        external 
        validTodo(todoId)
        nonEmptyString(title)
        validPriority(priority)
    {
        require(
            msg.sender == todoItems[todoId].creator || 
            msg.sender == todoLists[todoItems[todoId].listId].owner,
            "TodoList: Not authorized to update this todo"
        );
        
        todoItems[todoId].title = title;
        todoItems[todoId].description = description;
        todoItems[todoId].priority = priority;
        todoItems[todoId].dueDate = dueDate;
        todoItems[todoId].assignedTo = assignedTo;
        todoItems[todoId].category = category;
        
        emit TodoItemUpdated(todoId, title);
    }

    /**
     * @dev Toggles the completion status of a todo item
     * @param todoId The ID of the todo item to toggle
     */
    function toggleTodoCompletion(uint256 todoId) 
        external 
        validTodo(todoId)
        onlyAssignedUser(todoId)
    {
        todoItems[todoId].isCompleted = !todoItems[todoId].isCompleted;
        
        if (todoItems[todoId].isCompleted) {
            todoItems[todoId].completedAt = block.timestamp;
        } else {
            todoItems[todoId].completedAt = 0;
        }
        
        emit TodoItemToggled(todoId, todoItems[todoId].isCompleted, msg.sender);
    }

    /**
     * @dev Deletes a todo item
     * @param todoId The ID of the todo item to delete
     */
    function deleteTodoItem(uint256 todoId) 
        external 
        validTodo(todoId)
    {
        require(
            msg.sender == todoItems[todoId].creator || 
            msg.sender == todoLists[todoItems[todoId].listId].owner,
            "TodoList: Not authorized to delete this todo"
        );
        
        todoItems[todoId].isActive = false;
        
        // Remove from the list's todoIds array
        uint256 listId = todoItems[todoId].listId;
        uint256[] storage todoIds = todoLists[listId].todoIds;
        for (uint256 i = 0; i < todoIds.length; i++) {
            if (todoIds[i] == todoId) {
                todoIds[i] = todoIds[todoIds.length - 1];
                todoIds.pop();
                break;
            }
        }
        
        emit TodoItemDeleted(todoId);
    }

    /**
     * @dev Grants permission to a user for a list
     * @param listId The ID of the todo list
     * @param user The address to grant permission to
     */
    function grantPermission(uint256 listId, address user) 
        external 
        validList(listId)   // check validity first
        onlyListOwner(listId)
    {
        require(user != address(0), "TodoList: Cannot grant permission to zero address");
        require(!listPermissions[listId][user], "TodoList: User already has permission");
        require(user != todoLists[listId].owner, "TodoList: Owner already has permission");

        listPermissions[listId][user] = true;
        userToLists[user].push(listId);
        
        emit PermissionGranted(listId, user);
    }

    /**
     * @dev Revokes permission from a user for a list
     * @param listId The ID of the todo list
     * @param user The address to revoke permission from
     */
    function revokePermission(uint256 listId, address user) 
        external 
        validList(listId)   // check validity first
        onlyListOwner(listId)
    {
        require(listPermissions[listId][user], "TodoList: User does not have permission");
        
        listPermissions[listId][user] = false;
        
        // Remove from user's list array
        uint256[] storage lists = userToLists[user];
        for (uint256 i = 0; i < lists.length; i++) {
            if (lists[i] == listId) {
                lists[i] = lists[lists.length - 1];
                lists.pop();
                break;
            }
        }
        
        emit PermissionRevoked(listId, user);
    }

    /**
     * @dev Gets all todo items in a list
     * @param listId The ID of the todo list
     * @return An array of todo item IDs
     */
    function getTodoItemsByList(uint256 listId) 
        external 
        view 
        validList(listId)
        returns (uint256[] memory) 
    {
        return todoLists[listId].todoIds;
    }

    /**
     * @dev Gets all lists owned by or accessible to a user
     * @param user The address of the user
     * @return An array of list IDs
     */
    function getUserLists(address user) external view returns (uint256[] memory) {
        return userToLists[user];
    }

    /**
     * @dev Gets all uncompleted todos assigned to a user
     * @param user The address of the user
     * @return An array of todo item IDs
     */
    function getPendingTodos(address user) external view returns (uint256[] memory) {
        uint256 count = 0;
        
        // First pass: count the number of pending todos
        for (uint256 i = 1; i <= _todoIdCounter; i++) {
            if (todoItems[i].isActive && 
                !todoItems[i].isCompleted && 
                todoItems[i].assignedTo == user) {
                count++;
            }
        }
        
        // Second pass: populate the array
        uint256[] memory result = new uint256[](count);
        uint256 index = 0;
        
        for (uint256 i = 1; i <= _todoIdCounter; i++) {
            if (todoItems[i].isActive && 
                !todoItems[i].isCompleted && 
                todoItems[i].assignedTo == user) {
                result[index] = i;
                index++;
            }
        }
        
        return result;
    }

    /**
     * @dev Gets the total number of lists
     * @return The total number of lists
     */
    function getTotalLists() external view returns (uint256) {
        return _listIdCounter;
    }

    /**
     * @dev Gets the total number of todos
     * @return The total number of todos
     */
    function getTotalTodos() external view returns (uint256) {
        return _todoIdCounter;
    }
}
