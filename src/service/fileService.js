const { user: userModel } = require("../../models");
const axios = require("axios");
require("dotenv").config();

console.log("-1");
const axiosInstance = axios.create({
  baseURL: process.env.MICROSERVICE_BASE_URL,
  headers: {
    Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
  },
});
console.log("-2");

const doesUserExist = async (email) => {
  try {
    const user = await userModel.findOne({ where: { email } });
    return user ? true : false;
  } catch (error) {
    console.error(error);
  }
};

const createUser = async (username, email) => {
  const newUser = await userModel.create({ username, email });
  return newUser;
};

const searchImages = async (searchTerm) => {
  try {
    // const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
    // if (!UNSPLASH_ACCESS_KEY) {
    //   throw new Error("Missing Unsplash API key. Please check your .env file.");
    // }
    // console.log("1");
    // console.log(UNSPLASH_ACCESS_KEY);
    const response = await axiosInstance.get("/search/photos", {
      params: { query: searchTerm },
    });
    console.log("2");
    // console.log(response.data);

    if (response.data && response.data.results.length > 0) {

      // Extract relevant data from the response
      const imageData = response.data.results.map((image) => ({
        imageUrl: image.urls.full, // Image URL
        description: image.description || "No description available", // Description (if available)
        altDescription: image.alt_description || "No alt description available", // Alt text (if available)
      }));
      
      console.log(imageData);
      console.log("3");
      // Return the structured data
      return imageData;
      console.log("4");
    } else {
      // Handle the case where no images are found
      console.error("No images found for the given query.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching images from Unsplash:", error.message);
    throw new Error(
      "Error fetching data from Unsplash. Please try again later."
    );
  }
};

module.exports = {
  doesUserExist,
  createUser,
  searchImages,
};
