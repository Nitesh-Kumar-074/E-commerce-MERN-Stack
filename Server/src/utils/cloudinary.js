import {v2 as cloudinary} from 'cloudinary'

const uploadImageOnCloudinary = async(localFilePath) => {
       try {
              const response = await cloudinary.uploader.upload(localFilePath)
              return response
       } catch (error) {
              console.error("Error in uploading image on cloudinary")
              throw error
       }
}

export {uploadImageOnCloudinary}