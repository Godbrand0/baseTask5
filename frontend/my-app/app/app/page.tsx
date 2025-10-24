"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWeb3 } from "@/contexts/Web3Context";
import { useTodoListContract, type TodoList, type TodoItem as TodoItemType } from "@/hooks/useTodoList";
import { OnchainWallet } from "@/components/OnchainWallet";
import { MiniAppWrapper } from "@/components/MiniAppWrapper";
import { TodoListCard } from "@/components/TodoListCard";
import { TodoListForm } from "@/components/TodoListForm";
import { TodoItemForm } from "@/components/TodoItemForm";
import { TodoItem } from "@/components/TodoItem";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatAddress, formatDate } from "@/lib/utils";

type View = "home" | "my-lists" | "my-tasks" | "create-list" | "list-detail" | "create-item" | "edit-item" | "edit-list";

export default function Home() {
  const router = useRouter();
  const { address, isConnected, isCorrectChain } = useWeb3();
  const {
    useGetTotalLists,
    useGetUserLists,
    useGetTodoList,
    useGetTodoItemsByList,
    useGetTodoItem,
    useGetPendingTodos,
    useHasPermission,
    createTodoList,
    updateTodoList,
    deactivateTodoList,
    createTodoItem,
    updateTodoItem,
    toggleTodoCompletion,
    deleteTodoItem,
    isCreateTodoListPending,
    isUpdateTodoListPending,
    isDeactivateListPending,
    isCreateTodoItemPending,
    isUpdateTodoItemPending,
    isToggleTodoPending,
    isDeleteTodoPending,
  } = useTodoListContract();

  const [currentView, setCurrentView] = useState<View>("home");
  const [selectedListId, setSelectedListId] = useState<bigint | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<bigint | null>(null);
  const [editingList, setEditingList] = useState<TodoList | null>(null);
  const [editingItem, setEditingItem] = useState<TodoItemType | null>(null);

  // Queries
  const { data: totalLists } = useGetTotalLists();
  const { data: userLists } = useGetUserLists(address || "");
  const { data: selectedList } = useGetTodoList(selectedListId || BigInt(0));
  const { data: listItems } = useGetTodoItemsByList(selectedListId || BigInt(0));
  const { data: selectedItem } = useGetTodoItem(selectedItemId || BigInt(0));
  const { data: pendingTodos } = useGetPendingTodos(address || "");
  const { data: hasPermission } = useHasPermission(selectedListId || BigInt(0), address || "");

  // Effects
  useEffect(() => {
    // Redirect to landing page if not connected
    if (!isConnected) {
      router.push("/");
      return;
    }
    
    // Only navigate to list-detail if we're not already on a different view
    // This prevents interfering with manual navigation
    if (selectedListId && selectedList && (currentView === "home" || currentView === "my-lists")) {
      setCurrentView("list-detail");
    }
  }, [isConnected, router, selectedListId, selectedList, currentView]);

  // Handlers
  const handleCreateList = async (data: { name: string; description: string }) => {
    await createTodoList(data.name, data.description);
    setCurrentView("my-lists");
  };

  const handleUpdateList = async (data: { name: string; description: string }) => {
    if (!editingList) return;
    await updateTodoList(editingList.id, data.name, data.description);
    setEditingList(null);
    setCurrentView("list-detail");
  };

  const handleDeactivateList = async () => {
    if (!selectedListId) return;
    await deactivateTodoList(selectedListId);
    setCurrentView("my-lists");
    setSelectedListId(null);
  };

  const handleCreateItem = async (data: {
    title: string;
    description: string;
    priority: number;
    dueDate: number;
    assignedTo: string;
    category: string;
  }) => {
    if (!selectedListId) return;
    await createTodoItem(
      selectedListId,
      data.title,
      data.description,
      data.priority,
      data.dueDate,
      data.assignedTo,
      data.category
    );
    setCurrentView("list-detail");
  };

  const handleUpdateItem = async (data: {
    title: string;
    description: string;
    priority: number;
    dueDate: number;
    assignedTo: string;
    category: string;
  }) => {
    if (!editingItem) return;
    await updateTodoItem(
      editingItem.id,
      data.title,
      data.description,
      data.priority,
      data.dueDate,
      data.assignedTo,
      data.category
    );
    setEditingItem(null);
    setCurrentView("list-detail");
  };

  const handleToggleComplete = async (todoId: bigint) => {
    await toggleTodoCompletion(todoId);
  };

  const handleDeleteItem = async (todoId: bigint) => {
    await deleteTodoItem(todoId);
  };

  const isOwner = selectedList?.owner && address ? selectedList.owner.toLowerCase() === address.toLowerCase() : false;
  const canEditList = isOwner || hasPermission;

  // Render functions
  if (!isConnected) {
    // This will be handled by the useEffect redirect, but keep as fallback
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <OnchainWallet />
        </div>
      </div>
    );
  }
  
  if (!isCorrectChain) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <OnchainWallet />
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (currentView) {
      case "home":
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="card-hover border-border shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    Total Lists
                  </CardTitle>
                  <CardDescription>All todo lists created on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{totalLists?.toString() || "0"}</div>
                  <p className="text-sm text-muted-foreground mt-1">Lists created by all users</p>
                </CardContent>
              </Card>

              <Card className="card-hover border-border shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    Your Lists
                  </CardTitle>
                  <CardDescription>Todo lists you've created</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{userLists?.length || "0"}</div>
                  <p className="text-sm text-muted-foreground mt-1">Lists created by you</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => setCurrentView("my-lists")}
                className="flex-1 h-12 text-base font-medium shadow-lg hover:shadow-xl transition-all"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                My Lists
              </Button>
              <Button
                onClick={() => setCurrentView("my-tasks")}
                className="flex-1 h-12 text-base font-medium shadow-lg hover:shadow-xl transition-all"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                My Tasks
              </Button>
              <Button
                onClick={() => setCurrentView("create-list")}
                variant="outline"
                className="flex-1 h-12 text-base font-medium border-2 hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create New List
              </Button>
            </div>
          </div>
        );

      case "my-lists":
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">My Todo Lists</h1>
                <p className="text-muted-foreground mt-1">Manage and organize your tasks</p>
              </div>
              <Button
                onClick={() => setCurrentView("create-list")}
                className="shadow-lg hover:shadow-xl transition-all"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create New List
              </Button>
            </div>

            {userLists && userLists.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userLists.map((listId) => (
                  <div key={listId.toString()} className="transform transition-all duration-200 hover:scale-[1.02]">
                    <TodoListCardLoader
                      listId={listId}
                      onView={(id) => setSelectedListId(id)}
                      onEdit={(list) => {
                        setEditingList(list);
                        setCurrentView("edit-list");
                      }}
                      onDelete={async (id) => {
                        await handleDeactivateList();
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">No todo lists yet</h3>
                  <p className="text-muted-foreground mb-6">Get started by creating your first todo list</p>
                  <Button
                    onClick={() => setCurrentView("create-list")}
                    size="lg"
                    className="shadow-lg hover:shadow-xl transition-all"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create Your First List
                  </Button>
                </CardContent>
              </Card>
            )}

            <Button
              variant="outline"
              onClick={() => {
                setSelectedListId(null);
                setCurrentView("home");
              }}
              className="h-11"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Button>
          </div>
        );

      case "my-tasks":
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">My Assigned Tasks</h1>
                <p className="text-muted-foreground mt-1">Complete tasks assigned to you</p>
              </div>
            </div>

            {pendingTodos && pendingTodos.length > 0 ? (
              <div className="space-y-4">
                {pendingTodos.map((todoId) => (
                  <div key={todoId.toString()} className="transform transition-all duration-200 hover:scale-[1.01]">
                    <TodoItemLoader
                      itemId={todoId}
                      onToggleComplete={handleToggleComplete}
                      onEdit={undefined} // Assignees cannot edit tasks, only complete them
                      onDelete={undefined} // Assignees cannot delete tasks
                    />
                  </div>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">No pending tasks</h3>
                  <p className="text-muted-foreground">You don't have any tasks assigned to you</p>
                </CardContent>
              </Card>
            )}

            <Button
              variant="outline"
              onClick={() => setCurrentView("home")}
              className="h-11"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Button>
          </div>
        );

      case "create-list":
        return (
          <div className="space-y-6">
            <TodoListForm
              title="Create Todo List"
              description="Create a new todo list to organize your tasks"
              submitButtonText="Create List"
              onSubmit={handleCreateList}
              onCancel={() => setCurrentView("my-lists")}
              loading={isCreateTodoListPending}
            />
          </div>
        );

      case "edit-list":
        return (
          <div className="space-y-6">
            <TodoListForm
              title="Edit Todo List"
              description="Update your todo list details"
              submitButtonText="Update List"
              initialData={{
                name: editingList?.name || "",
                description: editingList?.description || "",
              }}
              onSubmit={handleUpdateList}
              onCancel={() => {
                setEditingList(null);
                setCurrentView("list-detail");
              }}
              loading={isUpdateTodoListPending}
            />
          </div>
        );

      case "list-detail":
        return (
          <div className="space-y-8">
            {selectedList && (
              <>
                <Card className="border-border shadow-sm">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h1 className="text-3xl font-bold">{selectedList.name}</h1>
                          <div className={`status-badge ${
                            selectedList.isActive
                              ? "bg-success/10 text-success border-success/20"
                              : "bg-muted text-muted-foreground border-border"
                          }`}>
                            {selectedList.isActive ? "Active" : "Inactive"}
                          </div>
                        </div>
                        <p className="text-muted-foreground text-lg">{selectedList.description}</p>
                        <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                          <span>Owner: {formatAddress(selectedList.owner)}</span>
                          <span>Created: {formatDate(selectedList.createdAt)}</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        {canEditList && (
                          <Button
                            variant="outline"
                            onClick={() => {
                              setEditingList(selectedList);
                              setCurrentView("edit-list");
                            }}
                            className="shadow-sm"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit List
                          </Button>
                        )}
                        <Button
                          onClick={() => setCurrentView("create-item")}
                          className="shadow-lg hover:shadow-xl transition-all"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Add Item
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <div className="space-y-4">
                  {listItems && listItems.length > 0 ? (
                    <div className="space-y-4">
                      {listItems.map((itemId) => (
                        <div key={itemId.toString()} className="transform transition-all duration-200 hover:scale-[1.01]">
                          <TodoItemLoader
                            itemId={itemId}
                            onToggleComplete={handleToggleComplete}
                            onEdit={(item) => {
                              setEditingItem(item);
                              setCurrentView("edit-item");
                            }}
                            onDelete={handleDeleteItem}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Card className="text-center py-12">
                      <CardContent>
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium text-foreground mb-2">No items yet</h3>
                        <p className="text-muted-foreground mb-6">Start adding tasks to your todo list</p>
                        <Button
                          onClick={() => setCurrentView("create-item")}
                          size="lg"
                          className="shadow-lg hover:shadow-xl transition-all"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Add Your First Item
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>

                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedListId(null);
                    setCurrentView("my-lists");
                  }}
                  className="h-11"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to My Lists
                </Button>
              </>
            )}
          </div>
        );

      case "create-item":
        return (
          <div className="space-y-6">
            <TodoItemForm
              title="Create Todo Item"
              description="Add a new todo item to your list"
              submitButtonText="Create Item"
              onSubmit={handleCreateItem}
              onCancel={() => setCurrentView("list-detail")}
              loading={isCreateTodoItemPending}
            />
          </div>
        );

      case "edit-item":
        return (
          <div className="space-y-6">
            <TodoItemForm
              title="Edit Todo Item"
              description="Update your todo item details"
              submitButtonText="Update Item"
              initialData={
                editingItem
                  ? {
                      title: editingItem.title,
                      description: editingItem.description,
                      priority: Number(editingItem.priority),
                      dueDate: editingItem.dueDate
                        ? new Date(Number(editingItem.dueDate) * 1000).toISOString().slice(0, 16)
                        : "",
                      assignedTo: editingItem.assignedTo,
                      category: editingItem.category,
                    }
                  : undefined
              }
              onSubmit={handleUpdateItem}
              onCancel={() => {
                setEditingItem(null);
                setCurrentView("list-detail");
              }}
              loading={isUpdateTodoItemPending}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <MiniAppWrapper>
      <div className="min-h-screen bg-background flex flex-col">
      <header className={`${isConnected ? "header-compact" : ""} bg-card border-b border-border px-4 sm:px-6 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 bg-primary rounded-lg flex items-center justify-center ${isConnected ? "h-7 w-7" : ""}`}>
              <svg className="w-5 h-5 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
            </div>
            <div>
              <h1 className={`${isConnected ? "text-lg" : "text-2xl sm:text-3xl"} font-bold text-foreground transition-all duration-300`}>Todo List dApp</h1>
              <p className={`${isConnected ? "text-xs" : "text-xs sm:text-sm"} text-muted-foreground transition-all duration-300`}>Task management on Base Sepolia</p>
            </div>
          </div>
          <OnchainWallet />
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
          <div className="space-y-6 sm:space-y-8">
            {renderContent()}
          </div>
        </div>
      </main>

      <footer className="px-4 sm:px-6 py-4 text-center border-t border-border bg-card">
        <p className="text-xs sm:text-sm text-muted-foreground">
          Powered by <span className="text-primary font-semibold">Base</span> and <span className="text-primary font-semibold">OnchainKit</span>
        </p>
      </footer>
      </div>
    </MiniAppWrapper>
  );
}

// Loader components for nested data
function TodoListCardLoader({
  listId,
  onView,
  onEdit,
  onDelete
}: {
  listId: bigint;
  onView: (listId: bigint) => void;
  onEdit?: (list: TodoList) => void;
  onDelete?: (listId: bigint) => void;
}) {
  const { useGetTodoList } = useTodoListContract();
  const { data: todoList } = useGetTodoList(listId);
  const { address } = useWeb3();

  if (!todoList) return <div>Loading...</div>;

  const isOwner = todoList.owner && address ? todoList.owner.toLowerCase() === address.toLowerCase() : false;

  return (
    <TodoListCard
      todoList={todoList}
      isOwner={isOwner}
      onView={() => onView(listId)}
      onEdit={onEdit ? () => onEdit(todoList) : undefined}
      onDelete={onDelete ? () => onDelete(listId) : undefined}
    />
  );
}

function TodoItemLoader({
  itemId,
  onToggleComplete,
  onEdit,
  onDelete
}: {
  itemId: bigint;
  onToggleComplete: (itemId: bigint) => void;
  onEdit?: ((item: TodoItemType) => void) | undefined;
  onDelete?: ((itemId: bigint) => void) | undefined;
}) {
  const { useGetTodoItem, useGetTodoList } = useTodoListContract();
  const { data: todoItem } = useGetTodoItem(itemId);
  const { data: todoList } = useGetTodoList(todoItem?.listId || BigInt(0));
  const { address } = useWeb3();

  if (!todoItem || !todoList) return <div>Loading...</div>;

  const isOwner = todoList.owner && address ? todoList.owner.toLowerCase() === address.toLowerCase() : false;
  const isAssigned = todoItem.assignedTo && address ? todoItem.assignedTo.toLowerCase() === address.toLowerCase() : false;

  return (
    <TodoItem
      todoItem={todoItem}
      isOwner={isOwner}
      isAssigned={isAssigned}
      onToggleComplete={async () => await onToggleComplete(itemId)}
      onEdit={onEdit ? () => onEdit(todoItem) : undefined}
      onDelete={onDelete ? () => onDelete(itemId) : undefined}
    />
  );
}
