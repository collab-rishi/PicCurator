const { doesUserExist, createUser, searchImages } = require("../service/fileService.js");
const { validateEmail, validateUserData } = require("../utils/validator.js");

const {
  photo: photoModel,
  searchHistory: searchHistoryModel,
  tag: tagModel,
  user: userModel,
} = require("../../models");
const tag = require("../../models/tag.js");

const createNewUser = async (req, res) => {
  try {
    const { username, email } = req.body;

    //validate input data
    if (doesUserExist(email) === true) {
      return res.status(400).json({ message: "User already exists" });
    }

    validateUserData({ username, email });

    //create the user
    const newUser = await createUser(username, email);

    //Send successful response
    return res
      .status(201)
      .json({ message: "User created successfully ", user: newUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getPhotos = async (req, res) => {
    try {
        const query = req.query.query;
        console.log(query);
        if (!query) {
            return res.status(400).json({ error: 'Search term is required.' });
          }
        console.log("b");
        const photos = await searchImages(query);
        // console.log(photos);
        console.log("c");
        return res.status(200).json({ photos: photos });


    } 
    catch (error) {
        // 4. Handle any errors during the process
        console.error(error);
        return res.status(500).json({ error: error.message });
      }
}


console.log("a0");
const savePhotos = async (req, res) => {

    try {
        console.log("a1");
        const { imageUrl, description, altDescription, tags, userId } = req.body;
        console.log({ imageUrl, description, altDescription, tags, userId });
        // let pic = req.body.imageUrl;
        console.log(imageUrl);

        if (!imageUrl.startsWith("<https://images.unsplash.com/")) {
            return res.status(400).json({ message: 'Invalid image URL' });
        
        }
          
              // Validate tags
              if (tags && tags.length > 5) {
                return res.status(400).json({ message: 'You can only provide up to 5 tags' });
              }
              if (tags && tags.some(tag => tag.length > 20)) {
                return res.status(400).json({ message: 'Each tag must not exceed 20 characters' });
              }
          
              // Create new photo entry in the database
              const newPhoto = await photoModel.create({
                imageUrl,
                description,
                altDescription,
                tags,
                userId
              });
          
              // Return success message
              return res.status(201).json({
                // success: true,
                message: 'Photo saved successfully',
                // photo: newPhoto
              });
            } catch (error) {
              console.error('Error saving photo:', error);
              return res.status(500).json({ message: 'Failed to save photo', error: error.message });
            }
          };

const addTagsToPhotos = async (req, res) => {

  

    const photoId = req.params.photoId ;

    const { tags } = req.body ;

    if (!Array.isArray(tags) || tags.some(tag => typeof tag !== 'string' || tag.trim() === '')) {
      return res.status(400).json({ message: 'Tags must be non-empty strings.' });
    }
    try {

    const pic = await photoModel.findByPk(photoId);

    if (!pic) {
      return res.status(404).json({ message: 'Photo not found.' });
    }

    console.log(pic);
    const currentTags = await tagModel.count({ where: { photoId: photoId }});

    // const currentTags = await tagModel.findAll({ where: { photoId: photoId } });
    console.log(currentTags);

    const newTagCount = currentTags + tags.length;
    console.log(newTagCount);

    if (newTagCount > 5) {
      return res.status(400).json({ message: 'A photo can have a maximum of 5 tags.' });
    }

    // Add tags to the database
    const newTags = tags.map(tagName => ({
      name: tagName.trim(),
      photoId: photoId
    }));
    console.log(newTags);

    await tagModel.bulkCreate(newTags);

    return res.status(200).json({ message: 'Tags added successfully' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while adding tags.' });
  }
};


const searchAndSort = async (req, res) => {

  const { tags, sort = 'ASC', userId } = req.query;

  if (!tags || typeof tags !== 'string' || tags.trim() === '') {
    return res.status(400).json({ message: 'A valid tag must be provided.' });
  }

  if (sort !== 'ASC' && sort !== 'DESC') {
    return res.status(400).json({ message: 'Sort must be either ASC or DESC.' });
  }



  try {

    if (userId) {
      await searchHistoryModel.create({
        query: tags,
        userId,
      });
    }

    const tagRecord = await tagModel.findOne({ where: { name: tags } });

    if (!tagRecord) {
      return res.status(404).json({ message: 'Tag not found.' });
    }

    // console.log(reqdTag.name);

    // console.log({ reqdTag.tag.photoId });


    const photos = await photoModel.findAll({
      include: [
        {
          model: tagModel,
          where: { name: tags }, // Filter by the specific tag
          attributes: ['name'],
        }
      ],
      order: [['dateSaved', sort]], // Sort by 'dateSaved' in the specified order
    });

    // console.log(photos);

    const result = photos.map(photoRecord => {
      const associatedTags = photoRecord.tags.map(t => t.name); // Extract tag names
      return {
        imageUrl: photoRecord.imageUrl,
        description: photoRecord.description,
        dateSaved: photoRecord.dateSaved.toISOString(),
        tags: associatedTags,
      };
    });

    return res.status(200).json({ photos: result });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while searching photos.' });
  }
};

const getSearchHistory = async (req, res) => {

  const userId = req.query.userId ;

  if (!userId) {
    return res.status(400).json({ message: 'UserId is not provided. ' });
  }

  try{

  const displaySearchHistory = await searchHistoryModel.findAll({ where: { userId: userId } });

  // console.log(displaySearchHistory);

  const result = displaySearchHistory.map(searchRecord => {
    return {
      query: searchRecord.query,
      timestamp: searchRecord.timestamp,
    };
  });

  return res.status(200).json({ searchHistory: result });

  // console.log(result);
} catch (error) {
  console.error(error);
  return res.status(500).json({ message: 'An error occurred while fetching search history.' });
}


};



    


  

          



module.exports = { createNewUser, getPhotos, savePhotos, addTagsToPhotos, searchAndSort, getSearchHistory };
