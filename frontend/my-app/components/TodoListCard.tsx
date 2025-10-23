"use client";

import { useState } from "react";
import { TodoList } from "@/hooks/useTodoList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatAddress, formatDate } from "@/lib/utils";

interface TodoListCardProps {
  todoList: TodoList;
  isOwner: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onView: () => void;
}

export function TodoListCard({
  todoList,
  isOwner,
  onEdit,
  onDelete,
  onView
}: TodoListCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!onDelete) return;

    setIsDeleting(true);
    try {
      await onDelete();
    } catch (error) {
      console.error("Error deleting todo list:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="w-full card-hover border-lion-200 shadow-sm">
      <CardHeader className="pb-4 border-b border-lion-100">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle
              className="text-lg font-bold cursor-pointer hover:text-brown transition-colors flex items-center gap-2 text-bistre group"
              onClick={onView}
            >
              <span className="truncate text-white">{todoList.name}</span>
              <svg className="w-4 h-4 text-brown-400 group-hover:text-brown group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </CardTitle>
            {todoList.description && (
              <CardDescription className="mt-2 line-clamp-2 text-brown-600">
                {todoList.description}
              </CardDescription>
            )}
          </div>
          <div className={`status-badge flex-shrink-0 ${
            todoList.isActive
              ? "bg-lion-800 text-lion-400 border border-lion-300"
              : "bg-brown-900 text-brown-600 border border-brown-300"
          }`}>
            {todoList.isActive ? "Active" : "Inactive"}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-brown-600">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-brown-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="font-mono text-xs">{formatAddress(todoList.owner)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-brown-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs">{formatDate(todoList.createdAt)}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onView}
              className="border-lion-300 text-brown hover:bg-lion-900 hover:border-lion-400 transition-all flex-1 sm:flex-none"
            >
              <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View
            </Button>

            {isOwner && (
              <>
                {onEdit && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onEdit}
                    className="border-lion-300 text-brown hover:bg-lion-900 hover:border-lion-400 transition-all"
                  >
                    <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </Button>
                )}
                {onDelete && todoList.isActive && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleDelete}
                    loading={isDeleting}
                    className="bg-falu_red hover:bg-falu_red-600 text-white transition-all"
                  >
                    <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Deactivate
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
