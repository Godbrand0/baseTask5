"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface TodoListFormProps {
  initialData?: {
    name: string;
    description: string;
  };
  onSubmit: (data: { name: string; description: string }) => Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
  title: string;
  description: string;
  submitButtonText: string;
}

export function TodoListForm({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
  title,
  description,
  submitButtonText,
}: TodoListFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter a name for the todo list");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting todo list:", error);
      alert("Error: " + (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
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
            <label htmlFor="name" className="text-sm font-semibold flex items-center gap-2 text-bistre">
              <svg className="w-4 h-4 text-brown" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              List Name 
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Enter todo list name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              disabled={isSubmitting || loading}
              required
              className="h-11 border-lion-300 focus:border-brown focus:ring-brown"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-semibold flex items-center gap-2 text-bistre">
              <svg className="w-4 h-4 text-brown" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter todo list description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              disabled={isSubmitting || loading}
              rows={4}
              className="flex min-h-[100px] w-full rounded-md border border-lion-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-brown-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none text-bistre"
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
              disabled={!formData.name.trim()}
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
