"use client";

import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from "@/constants/contract";
import { parseEther, formatEther } from "viem";

export interface TodoList {
  id: bigint;
  name: string;
  description: string;
  owner: string;
  createdAt: bigint;
  isActive: boolean;
  // todoIds is not returned by the todoLists function, it's only used internally
}

export interface TodoItem {
  id: bigint;
  listId: bigint;
  title: string;
  description: string;
  isCompleted: boolean;
  priority: bigint;
  dueDate: bigint;
  creator: string;
  assignedTo: string;
  createdAt: bigint;
  completedAt: bigint;
  category: string;
  isActive: boolean;
}

export function useTodoListContract() {
  // Read functions
  const useGetTotalLists = () => {
    return useReadContract({
      address: TODO_LIST_ADDRESS,
      abi: TODO_LIST_ABI,
      functionName: "getTotalLists",
    });
  };

  const useGetTotalTodos = () => {
    return useReadContract({
      address: TODO_LIST_ADDRESS,
      abi: TODO_LIST_ABI,
      functionName: "getTotalTodos",
    });
  };

  const useGetTodoList = (listId: bigint) => {
    const result = useReadContract({
      address: TODO_LIST_ADDRESS,
      abi: TODO_LIST_ABI,
      functionName: "todoLists",
      args: [listId],
    });
    
    // Convert the array response to a TodoList object
    // According to the ABI, todoLists returns: id, name, description, owner, createdAt, isActive
    const data = result.data ? {
      id: result.data[0] as bigint,
      name: result.data[1] as string,
      description: result.data[2] as string,
      owner: result.data[3] as string,
      createdAt: result.data[4] as bigint,
      isActive: result.data[5] as boolean,
    } as TodoList : undefined;
    
    return { data, error: result.error, isLoading: result.isLoading };
  };

  const useGetTodoItem = (todoId: bigint) => {
    const result = useReadContract({
      address: TODO_LIST_ADDRESS,
      abi: TODO_LIST_ABI,
      functionName: "todoItems",
      args: [todoId],
    });
    
    // Convert the array response to a TodoItem object
    const data = result.data ? {
      id: result.data[0],
      listId: result.data[1],
      title: result.data[2],
      description: result.data[3],
      isCompleted: result.data[4],
      priority: result.data[5],
      dueDate: result.data[6],
      creator: result.data[7],
      assignedTo: result.data[8],
      createdAt: result.data[9],
      completedAt: result.data[10],
      category: result.data[11],
      isActive: result.data[12],
    } as TodoItem : undefined;
    
    return { data, error: result.error, isLoading: result.isLoading };
  };

  const useGetUserLists = (user: string) => {
    return useReadContract({
      address: TODO_LIST_ADDRESS,
      abi: TODO_LIST_ABI,
      functionName: "getUserLists",
      args: [user as `0x${string}`],
    }) as { data: bigint[] | undefined; error: Error | null; isLoading: boolean };
  };

  const useGetTodoItemsByList = (listId: bigint) => {
    return useReadContract({
      address: TODO_LIST_ADDRESS,
      abi: TODO_LIST_ABI,
      functionName: "getTodoItemsByList",
      args: [listId],
    }) as { data: bigint[] | undefined; error: Error | null; isLoading: boolean };
  };

  const useGetPendingTodos = (user: string) => {
    return useReadContract({
      address: TODO_LIST_ADDRESS,
      abi: TODO_LIST_ABI,
      functionName: "getPendingTodos",
      args: [user as `0x${string}`],
    }) as { data: bigint[] | undefined; error: Error | null; isLoading: boolean };
  };

  const useHasPermission = (listId: bigint, user: string) => {
    return useReadContract({
      address: TODO_LIST_ADDRESS,
      abi: TODO_LIST_ABI,
      functionName: "listPermissions",
      args: [listId, user as `0x${string}`],
    }) as { data: boolean | undefined; error: Error | null; isLoading: boolean };
  };

  // Write functions
  const { writeContract: createTodoList, data: createTodoListHash, isPending: isCreateTodoListPending } = useWriteContract();
  const { isLoading: isCreateTodoListLoading, isSuccess: isCreateTodoListSuccess } = useWaitForTransactionReceipt({
    hash: createTodoListHash,
  });

  const { writeContract: createTodoItem, data: createTodoItemHash, isPending: isCreateTodoItemPending } = useWriteContract();
  const { isLoading: isCreateTodoItemLoading, isSuccess: isCreateTodoItemSuccess } = useWaitForTransactionReceipt({
    hash: createTodoItemHash,
  });

  const { writeContract: updateTodoList, data: updateTodoListHash, isPending: isUpdateTodoListPending } = useWriteContract();
  const { isLoading: isUpdateTodoListLoading, isSuccess: isUpdateTodoListSuccess } = useWaitForTransactionReceipt({
    hash: updateTodoListHash,
  });

  const { writeContract: updateTodoItem, data: updateTodoItemHash, isPending: isUpdateTodoItemPending } = useWriteContract();
  const { isLoading: isUpdateTodoItemLoading, isSuccess: isUpdateTodoItemSuccess } = useWaitForTransactionReceipt({
    hash: updateTodoItemHash,
  });

  const { writeContract: toggleTodoCompletion, data: toggleTodoHash, isPending: isToggleTodoPending } = useWriteContract();
  const { isLoading: isToggleTodoLoading, isSuccess: isToggleTodoSuccess } = useWaitForTransactionReceipt({
    hash: toggleTodoHash,
  });

  const { writeContract: deleteTodoItem, data: deleteTodoHash, isPending: isDeleteTodoPending } = useWriteContract();
  const { isLoading: isDeleteTodoLoading, isSuccess: isDeleteTodoSuccess } = useWaitForTransactionReceipt({
    hash: deleteTodoHash,
  });

  const { writeContract: deactivateTodoList, data: deactivateListHash, isPending: isDeactivateListPending } = useWriteContract();
  const { isLoading: isDeactivateListLoading, isSuccess: isDeactivateListSuccess } = useWaitForTransactionReceipt({
    hash: deactivateListHash,
  });

  const { writeContract: grantPermission, data: grantPermissionHash, isPending: isGrantPermissionPending } = useWriteContract();
  const { isLoading: isGrantPermissionLoading, isSuccess: isGrantPermissionSuccess } = useWaitForTransactionReceipt({
    hash: grantPermissionHash,
  });

  const { writeContract: revokePermission, data: revokePermissionHash, isPending: isRevokePermissionPending } = useWriteContract();
  const { isLoading: isRevokePermissionLoading, isSuccess: isRevokePermissionSuccess } = useWaitForTransactionReceipt({
    hash: revokePermissionHash,
  });

  return {
    // Read hooks
    useGetTotalLists,
    useGetTotalTodos,
    useGetTodoList,
    useGetTodoItem,
    useGetUserLists,
    useGetTodoItemsByList,
    useGetPendingTodos,
    useHasPermission,
    
    // Write functions
    createTodoList: (name: string, description: string) => {
      createTodoList({
        address: TODO_LIST_ADDRESS,
        abi: TODO_LIST_ABI,
        functionName: "createTodoList",
        args: [name, description],
      });
    },
    
    createTodoItem: (
      listId: bigint,
      title: string,
      description: string,
      priority: number,
      dueDate: number,
      assignedTo: string,
      category: string
    ) => {
      createTodoItem({
        address: TODO_LIST_ADDRESS,
        abi: TODO_LIST_ABI,
        functionName: "createTodoItem",
        args: [listId, title, description, BigInt(priority), BigInt(dueDate), assignedTo as `0x${string}`, category],
      });
    },
    
    updateTodoList: (listId: bigint, name: string, description: string) => {
      updateTodoList({
        address: TODO_LIST_ADDRESS,
        abi: TODO_LIST_ABI,
        functionName: "updateTodoList",
        args: [listId, name, description],
      });
    },
    
    updateTodoItem: (
      todoId: bigint,
      title: string,
      description: string,
      priority: number,
      dueDate: number,
      assignedTo: string,
      category: string
    ) => {
      updateTodoItem({
        address: TODO_LIST_ADDRESS,
        abi: TODO_LIST_ABI,
        functionName: "updateTodoItem",
        args: [todoId, title, description, BigInt(priority), BigInt(dueDate), assignedTo as `0x${string}`, category],
      });
    },
    
    toggleTodoCompletion: (todoId: bigint) => {
      toggleTodoCompletion({
        address: TODO_LIST_ADDRESS,
        abi: TODO_LIST_ABI,
        functionName: "toggleTodoCompletion",
        args: [todoId],
      });
    },
    
    deleteTodoItem: (todoId: bigint) => {
      deleteTodoItem({
        address: TODO_LIST_ADDRESS,
        abi: TODO_LIST_ABI,
        functionName: "deleteTodoItem",
        args: [todoId],
      });
    },
    
    deactivateTodoList: (listId: bigint) => {
      deactivateTodoList({
        address: TODO_LIST_ADDRESS,
        abi: TODO_LIST_ABI,
        functionName: "deactivateTodoList",
        args: [listId],
      });
    },
    
    grantPermission: (listId: bigint, user: string) => {
      grantPermission({
        address: TODO_LIST_ADDRESS,
        abi: TODO_LIST_ABI,
        functionName: "grantPermission",
        args: [listId, user as `0x${string}`],
      });
    },
    
    revokePermission: (listId: bigint, user: string) => {
      revokePermission({
        address: TODO_LIST_ADDRESS,
        abi: TODO_LIST_ABI,
        functionName: "revokePermission",
        args: [listId, user as `0x${string}`],
      });
    },
    
    // Loading states
    isCreateTodoListPending: isCreateTodoListPending || isCreateTodoListLoading,
    isCreateTodoItemPending: isCreateTodoItemPending || isCreateTodoItemLoading,
    isUpdateTodoListPending: isUpdateTodoListPending || isUpdateTodoListLoading,
    isUpdateTodoItemPending: isUpdateTodoItemPending || isUpdateTodoItemLoading,
    isToggleTodoPending: isToggleTodoPending || isToggleTodoLoading,
    isDeleteTodoPending: isDeleteTodoPending || isDeleteTodoLoading,
    isDeactivateListPending: isDeactivateListPending || isDeactivateListLoading,
    isGrantPermissionPending: isGrantPermissionPending || isGrantPermissionLoading,
    isRevokePermissionPending: isRevokePermissionPending || isRevokePermissionLoading,
    
    // Success states
    isCreateTodoListSuccess,
    isCreateTodoItemSuccess,
    isUpdateTodoListSuccess,
    isUpdateTodoItemSuccess,
    isToggleTodoSuccess,
    isDeleteTodoSuccess,
    isDeactivateListSuccess,
    isGrantPermissionSuccess,
    isRevokePermissionSuccess,
  };
}