import axios from "axios";

export default async function uploadImage(files: FileList) {
  const formData = new FormData();

  if (files[0]) {
    formData.append("file", files[0]);
    formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        formData
      );
      return response.data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  } else {
    console.error("No file provided.");
  }
}
