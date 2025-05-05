"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2 } from "lucide-react";
import { useNotification } from "./Notification";
import { apiClient } from "@/lib/api-client";
import FileUpload from "./FileUpload";

interface VideoFormData {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
}

export default function VideoUploadForm() {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { showNotification } = useNotification();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VideoFormData>({
    defaultValues: {
      title: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
    },
  });

  const handleUploadSuccess = (response: IKUploadResponse) => {
    setValue("videoUrl", response.filePath);
    setValue("thumbnailUrl", response.thumbnailUrl || response.filePath);
    showNotification("Video uploaded successfully!", "success");
  };

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const onSubmit = async (data: VideoFormData) => {
    console.log("Form data:", data);
    if (!data.videoUrl) {
      showNotification("Please upload a video first", "error");
      return;
    }

    setLoading(true);
    try {
      await apiClient.createVideo(data);
      showNotification("Video published successfully!", "success");

      // Reset form after successful submission
      setValue("title", "");
      setValue("description", "");
      setValue("videoUrl", "");
      setValue("thumbnailUrl", "");
      setUploadProgress(0);
    } catch (error) {
      showNotification(
        error instanceof Error ? error.message : "Failed to publish video",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-gray-900 rounded-lg shadow-lg">
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-gray-800 dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-3xl mx-auto"
    >
      {/* Title Field */}
      <div className="form-control">
        <label className="label text-gray-100 dark:text-gray-300 font-medium mb-2">
          Title
        </label>
        <input
          type="text"
          className={`input input-bordered w-full bg-gray-700 text-gray-100 dark:bg-gray-800 dark:text-gray-300 rounded-md px-4 py-2 ${
            errors.title ? "input-error border-red-500" : "border-gray-600"
          }`}
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <span className="text-error text-sm mt-1">
            {errors.title.message}
          </span>
        )}
      </div>
  
      {/* Description Field */}
      <div className="form-control">
        <label className="label text-gray-100 dark:text-gray-300 font-medium mb-2">
          Description
        </label>
        <textarea
          className={`textarea textarea-bordered w-full bg-gray-700 text-gray-100 dark:bg-gray-800 dark:text-gray-300 rounded-md px-4 py-2 h-28 ${
            errors.description ? "textarea-error border-red-500" : "border-gray-600"
          }`}
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <span className="text-error text-sm mt-1">
            {errors.description.message}
          </span>
        )}
      </div>
  
      {/* Video Upload Field */}
      <div className="form-control">
        <label className="label text-gray-100 dark:text-gray-300 font-medium mb-2">
          Upload Video
        </label>
        <FileUpload
          fileType="video"
          onSuccess={handleUploadSuccess}
          onProgress={handleUploadProgress}
        />
        {uploadProgress > 0 && (
          <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
            <div
              className="bg-primary h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
      </div>
  
      {/* Submit Button */}
      <button
        type="submit"
        className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-500 py-2 rounded-md font-medium"
        // disabled={loading || !uploadProgress}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Publishing Video...
          </>
        ) : (
          "Publish Video"
        )}
      </button>
    </form>
    </div>
  );
}