// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {Test, console} from "forge-std/Test.sol";
import {TodoList} from "../src/TodoList.sol";

contract TodoListTest is Test {
    TodoList public todoList;
    address public owner;
    address public user1;

    function setUp() public {
        owner = address(this);
        user1 = address(0x1);
        todoList = new TodoList();
    }

    function testCreateTodoList() public {
        todoList.createTodoList("Work", "Tasks");
        (,,,,,, bool isActive) = todoList.todoLists(1);
        assertTrue(isActive);
        assertEq(todoList.getTotalLists(), 1);
    }

    function testCreateTodoItem() public {
        todoList.createTodoList("Personal", "My todos");
        todoList.createTodoItem(1, "Task", "Desc", 3, 0, user1, "Work");
        (,, string memory title,,,,, address assignedTo,,,,,) = todoList.todoItems(1);
        assertEq(title, "Task");
        assertEq(assignedTo, user1);
    }

    function testToggleTodoCompletion() public {
        todoList.createTodoList("Personal", "My todos");
        todoList.createTodoItem(1, "Task", "Desc", 3, 0, user1, "Work");
        vm.prank(user1);
        todoList.toggleTodoCompletion(1);
        (,,,,, bool isCompleted,,,,,,,,,) = todoList.todoItems(1);
        assertTrue(isCompleted);
    }

    function testGrantPermission() public {
        todoList.createTodoList("Team", "Shared list");
        todoList.grantPermission(1, user1);
        assertTrue(todoList.listPermissions(1, user1));
    }
}


