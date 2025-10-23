"use client";

import { useState } from "react";
import type { TodoItem } from "@/hooks/useTodoList";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatAddress, formatDateTime, getPriorityColor, getPriorityLabel } from "@/lib/utils";

interface TodoItemProps {
  todoItem: TodoItem;
  isOwner: boolean;
  isAssigned: boolean;
  onToggleComplete: () => Promise<void>;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function TodoItem({
  todoItem,
  isOwner,
  isAssigned,
  onToggleComplete,
  onEdit,
  onDelete
}: TodoItemProps) {
  const [isToggling, setIsToggling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleComplete = async () => {
    setIsToggling(true);
    try {
      await onToggleComplete();
    } catch (error) {
      console.error("Error toggling todo item:", error);
      alert("Error: " + (error as Error).message);
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;

    if (!confirm("Are you sure you want to delete this todo item?")) {
      return;
    }

    setIsDeleting(true);
    try {
      await onDelete();
    } catch (error) {
      console.error("Error deleting todo item:", error);
      alert("Error: " + (error as Error).message);
    } finally {
      setIsDeleting(false);
    }
  };

  const isOverdue = todoItem.dueDate > 0 && Date.now() > Number(todoItem.dueDate) * 1000 && !todoItem.isCompleted;

  return (
    <Card className={`w-full card-hover border-lion-200 ${todoItem.isCompleted ? "opacity-60" : ""} ${isOverdue ? "border-falu_red-400 bg-falu_red-900" : "shadow-sm"}`}>
      <CardContent className="p-4 sm:p-5">
        <div className="space-y-4">
          {/* Header with checkbox, title and priority */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="pt-1 flex-shrink-0">
              <input
                type="checkbox"
                checked={todoItem.isCompleted}
                onChange={handleToggleComplete}
                disabled={isToggling || !(isOwner || isAssigned)}
                className="h-5 w-5 rounded border-lion-300 text-brown focus:ring-brown focus:ring-2 cursor-pointer disabled:cursor-not-allowed"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className={`text-base text-white sm:text-lg font-bold ${todoItem.isCompleted ? "line-through text-brown-500" : "text-bistre"}`}>
                  {todoItem.title}
                </h3>
                <span className={`status-badge flex-shrink-0 ${getPriorityColor(todoItem.priority)}`}>
                  {getPriorityLabel(todoItem.priority)}
                </span>
              </div>
              {todoItem.description && (
                <p className="text-sm text-brown-600 mt-2 leading-relaxed">
                  {todoItem.description}
                </p>
              )}
            </div>
          </div>

          {/* Date info */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-brown-600 bg-peach-900 rounded-lg p-3 border border-lion-200">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-brown-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="truncate">Created: {formatDateTime(todoItem.createdAt)}</span>
            </div>
            {todoItem.dueDate > 0 && (
              <div className={`flex items-center gap-1.5 ${isOverdue ? "text-falu_red-700 font-semibold" : ""}`}>
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="truncate">Due: {formatDateTime(todoItem.dueDate)}</span>
                {isOverdue && <span className="ml-1 px-2 py-0.5 bg-falu_red-600 text-falu_red-900 rounded text-xs font-bold">Overdue</span>}
              </div>
            )}
            {todoItem.isCompleted && todoItem.completedAt > 0 && (
              <div className="flex items-center gap-1.5 text-lion-600">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="truncate">Done: {formatDateTime(todoItem.completedAt)}</span>
              </div>
            )}
          </div>

          {/* User info and actions */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-brown-600">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-brown-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="font-mono truncate">{formatAddress(todoItem.creator)}</span>
              </div>
              {todoItem.assignedTo !== "0x0000000000000000000000000000000000000000" && (
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-brown-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="font-mono truncate">{formatAddress(todoItem.assignedTo)}</span>
                </div>
              )}
              {todoItem.category && (
                <span className="px-2.5 py-1 bg-lion-800 text-lion-500 rounded-md text-xs font-semibold border border-lion-300">
                  {todoItem.category}
                </span>
              )}
            </div>

            {(isOwner || isAssigned) && (
              <div className="flex items-center gap-2">
                {onEdit && (isOwner || todoItem.assignedTo === todoItem.creator) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onEdit}
                    className="border-lion-300 text-brown hover:bg-lion-900 hover:border-lion-400 transition-all"
                  >
                    <svg className="w-4 h-4 sm:mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span className="hidden sm:inline">Edit</span>
                  </Button>
                )}
                {onDelete && isOwner && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleDelete}
                    loading={isDeleting}
                    className="bg-falu_red hover:bg-falu_red-600 text-white transition-all"
                  >
                    <svg className="w-4 h-4 sm:mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span className="hidden sm:inline">Delete</span>
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
