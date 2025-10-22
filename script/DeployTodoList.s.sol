// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {TodoList} from "../src/TodoList.sol";

contract DeployTodoList is Script {
    TodoList public todoList;
    
    function setUp() public {}
    
    function run() public {
        vm.startBroadcast();
        
        todoList = new TodoList();
        
        vm.stopBroadcast();
    }
    
    function createSampleList() public {
        require(address(todoList) != address(0), "Contract not deployed");
        
        vm.startBroadcast();
        
        // Create a sample todo list
        uint256 listId = todoList.createTodoList(
            "Project Tasks",
            "Tasks for the smart contract project"
        );
        
        // Create some sample todos
        todoList.createTodoItem(
            listId,
            "Design architecture",
            "Create the system architecture and data flow diagrams",
            1,
            block.timestamp + 3 days,
            msg.sender,
            "Planning"
        );
        
        todoList.createTodoItem(
            listId,
            "Write smart contract",
            "Implement the TodoList smart contract",
            1,
            block.timestamp + 5 days,
            msg.sender,
            "Development"
        );
        
        todoList.createTodoItem(
            listId,
            "Write tests",
            "Create comprehensive tests for the contract",
            2,
            block.timestamp + 7 days,
            msg.sender,
            "Testing"
        );
        
        todoList.createTodoItem(
            listId,
            "Deploy contract",
            "Deploy the contract to testnet",
            3,
            block.timestamp + 10 days,
            msg.sender,
            "Deployment"
        );
        
        vm.stopBroadcast();
    }
}