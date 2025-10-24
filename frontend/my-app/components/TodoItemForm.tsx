"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface TodoItemFormProps {
  initialData?: {
    title: string;
    description: string;
    priority: number;
    dueDate: string;
    assignedTo: string;
    category: string;
  };
  onSubmit: (data: {
    title: string;
    description: string;
    priority: number;
    dueDate: number;
    assignedTo: string;
    category: string;
  }) => Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
  title: string;
  description: string;
  submitButtonText: string;
}

export function TodoItemForm({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
  title,
  description,
  submitButtonText,
}: TodoItemFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    priority: initialData?.priority || 3,
    dueDate: initialData?.dueDate || "",
    assignedTo: initialData?.assignedTo || "",
    category: initialData?.category || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Please enter a title for the todo item");
      return;
    }

    setIsSubmitting(true);
    try {
      const dueDateTimestamp = formData.dueDate
        ? Math.floor(new Date(formData.dueDate).getTime() / 1000)
        : 0;

      await onSubmit({
        ...formData,
        dueDate: dueDateTimestamp,
      });
    } catch (error) {
      console.error("Error submitting todo item:", error);
      alert("Error: " + (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-lion-200 shadow-sm">
      <CardHeader className="border-b border-lion-100 bg-peach-900">
        <CardTitle className="text-xl sm:text-2xl text-bistre">{title}</CardTitle>
        <CardDescription className="text-base text-brown-600">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-semibold flex items-center gap-2">
              <svg className="w-4 h-4 text-brown" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Title *
            </label>
            <Input
              id="title"
              type="text"
              placeholder="Enter todo item title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              disabled={isSubmitting || loading}
              required
              className="h-11 border-lion-300 focus:border-brown focus:ring-brown"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-semibold flex items-center gap-2">
              <svg className="w-4 h-4 text-brown" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter todo item description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              disabled={isSubmitting || loading}
              rows={4}
              className="flex min-h-[100px] w-full rounded-md border border-lion-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-brown-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none text-bistre"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <label htmlFor="priority" className="text-sm font-semibold flex items-center gap-2">
                <svg className="w-4 h-4 text-brown" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Priority
              </label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) => handleInputChange("priority", parseInt(e.target.value))}
                disabled={isSubmitting || loading}
                className="flex h-11 w-full rounded-md border border-lion-300 bg-white px-3 py-2 text-sm text-bistre ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value={1}>High (1)</option>
                <option value={2}>Medium-High (2)</option>
                <option value={3}>Medium (3)</option>
                <option value={4}>Medium-Low (4)</option>
                <option value={5}>Low (5)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="dueDate" className="text-sm font-semibold flex items-center gap-2">
                <svg className="w-4 h-4 text-brown" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Due Date
              </label>
              <Input
                id="dueDate"
                type="datetime-local"
                value={formData.dueDate}
                onChange={(e) => handleInputChange("dueDate", e.target.value)}
                disabled={isSubmitting || loading}
                className="h-11 border-lion-300 focus:border-brown focus:ring-brown"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="assignedTo" className="text-sm font-semibold flex items-center gap-2">
              <svg className="w-4 h-4 text-brown" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Assign To (Wallet Address)
            </label>
            <Input
              id="assignedTo"
              type="text"
              placeholder="0x... (leave empty for unassigned)"
              value={formData.assignedTo}
              onChange={(e) => handleInputChange("assignedTo", e.target.value)}
              disabled={isSubmitting || loading}
              className="h-11 border-lion-300 focus:border-brown focus:ring-brown font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-semibold flex items-center gap-2">
              <svg className="w-4 h-4 text-brown" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Category
            </label>
            <Input
              id="category"
              type="text"
              placeholder="e.g., Work, Personal, Urgent"
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              disabled={isSubmitting || loading}
              className="h-11 border-lion-300 focus:border-brown focus:ring-brown"
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-4 sm:pt-6 border-t border-lion-200">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting || loading}
                className="h-11 px-6 border-brown-300 text-brown hover:bg-brown-900 transition-all w-full sm:w-auto"
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              loading={isSubmitting || loading}
              disabled={!formData.title.trim()}
              className="h-11 px-6 bg-brown hover:bg-brown-600 text-white shadow-sm transition-all w-full sm:w-auto"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {submitButtonText}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
