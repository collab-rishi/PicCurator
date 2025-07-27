# Image Curator - Photo Curation App

Image Curator is a photo curation app that allows users to search for images, save them to collections, add tags, and track search history using the Unsplash API. This app allows users to save their favorite images, manage tags, and view their past searches.

## Project Overview

This application allows users to:

- Search for images from Unsplash based on a query.
- Save images into a personal collection with tags.
- Search for images by tags and sort them by the date they were saved.
- Track search history and display past searches for a given user.

## Features

1. **Create a User**: Users can create an account with a username and email.
2. **Search Photos**: Users can search photos using the Unsplash API.
3. **Save Photos**: Photos can be saved to a collection with optional tags.
4. **Add Tags**: Users can add tags to saved photos, with a limit of 5 tags per photo.
5. **Search by Tags**: Users can search photos by tags and sort them by the date saved.
6. **Track Search History**: The app stores and displays search history for each user.

## Database Models

The app uses Sequelize ORM with SQLite as the database. The following models are created:

1. **User**: Stores user information.
2. **Photo**: Stores photo details including image URL, description, alt description, and user ID.
3. **Tag**: Stores tags associated with photos.
4. **SearchHistory**: Logs the user's search queries along with timestamps.

## API Endpoints

### 1. **Create a New User**

- **Endpoint**: `POST /api/users`
- **Request Body**:
  ```json
  {
    "username": "newUser",
    "email": "newuser@example.com"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User created successfully",
    "user": {
      "id": 1,
      "username": "newUser",
      "email": "newuser@example.com",
      "createdAt": "2024-10-21T10:58:08.408Z",
      "updatedAt": "2024-10-21T10:58:08.408Z"
    }
  }
  ```

### 2. **Search Photos from Unsplash**

- **Endpoint**: `GET /api/photos/search?query=nature`
- **Query Params**: `query` (search term)
- **Response**:
  ```json
  {
    "photos": [
      {
        "imageUrl": "https://images.unsplash.com/photo...",
        "description": "A beautiful landscape",
        "altDescription": "Mountain view"
      }
    ]
  }
  ```

### 3. **Save Photo**

- **Endpoint**: `POST /api/photos`
- **Request Body**:
  ```json
  {
    "imageUrl": "https://images.unsplash.com/photo...",
    "description": "Beautiful landscape",
    "altDescription": "Mountain view",
    "tags": ["nature", "mountain"],
    "userId": 1
  }
  ```
- **Response**:
  ```json
  {
    "message": "Photo saved successfully"
  }
  ```

### 4. **Add Tags to Photo**

- **Endpoint**: `POST /api/photos/:photoId/tags`
- **Request Body**:
  ```json
  {
    "tags": ["newTag1", "newTag2"]
  }
  ```
- **Response**:
  ```json
  {
    "message": "Tags added successfully"
  }
  ```

### 5. **Search Photos by Tag**

- **Endpoint**: `GET /api/photos/tag/search?tags=mountain&sort=ASC&userId=1`
- **Query Params**: `tags`, `sort` (optional: ASC or DESC)
- **Response**:
  ```json
  {
    "photos": [
      {
        "imageUrl": "https://images.unsplash.com/photo...",
        "description": "Mountain view",
        "dateSaved": "2024-01-01T12:00:00Z",
        "tags": ["nature", "mountain"]
      }
    ]
  }
  ```

### 6. **Get Search History**

- **Endpoint**: `GET /api/search-history?userId=1`
- **Query Params**: `userId`
- **Response**:
  ```json
  {
    "searchHistory": [
      {
        "query": "mountains",
        "timestamp": "2024-01-01T12:00:00Z"
      },
      {
        "query": "nature",
        "timestamp": "2024-01-05T08:00:00Z"
      }
    ]
  }
  ```

## Installation and Setup

### 1. **Clone the Repository**

```bash
git clone https://github.com/your-username/picstoria.git
cd picstoria
```

#### 2. **Installation**

```bash
npm install
```

#### 3. **Start the Project**

- run the index file

```bash
node index.js
```

Your backend server should now be running.
