// GET /api/users/:id/posts

router.get("/api/users/:id/posts", (req, res) => {
  const userId = req.params.id;
  const userPosts = posts.filter((post) => post.userId == userId);

  if (userPosts.length) {
    res.json(userPosts);
  } else {
    res.json({ message: "No posts found for this user" });
  }
});

// Retrieves all posts by a user with the specified id

// POST http://localhost:3000/api/comments?api-key=perscholas
// Body: {
//   "userId": 1,
//   "postId": 1,
//   "body": "This is a new comment."
// }

// GET /api/posts?userId=<VALUE>
// Retrieves all posts by a user with the specified postId.

// GET http://localhost:3000/api/comments/1?api-key=perscholas

// It is common for APIs to have multiple endpoints that accomplish the same task. This route uses a "userId" query parameter to filter posts, while the one above uses a route parameter.

// GET /comments

router.get("/comments", (req, res) => {
  res.json(comments);
});

// Note that we do not have any comments data yet; that is okay! Make sure that you create a place to store comments, but you do not need to populate that data.
// POST /comments

// When creating a new comment object, it should have the following fields:
// id: a unique identifier.
// userId: the id of the user that created the comment.
// postId: the id of the post the comment was made on.
// body: the text of the comment.

const express = require("express");
const router = express.Router();

let comments = []; // declaring comments data

const getAllComments = (req, res) => {
  res.status(200).json(comments);
};

exports.createComment = (req, res) => {
  const newComment = {
    id: comments.length + 1,
    userId: req.body.userId,
    postId: req.body.postId,
    body: req.body.body,
  };
  comments.push(newComment);
  res.status(201).json(newComment);
};

// GET /comments/:id

router.getCommentById = (req, res) => {
  const commentId = parseInt(req.params.id);
  const comment = comments.find((comment) => comment.id === commentId);
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).send("Comment not found");
  }
};

router.get("/:id", (req, res) => {
  const commentId = parseInt(req.params.id);
  const comment = comments.find((comment) => comment.id === commentId);
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).send("Comment not found");
  }
});

// GET http://localhost:3000/api/comments/1?api-key=perscholas

// Retrieves the comment with the specified id.
// PATCH /comments/:id

// Used to update a comment with the specified id with a new body.

router.updateCommentById = (req, res) => {
  const commentId = parseInt(req.params.id);
  const comment = comments.find((comment) => comment.id === commentId);
  if (comment) {
    comment.body = req.body.body || comment.body;
    res.json(comment);
  } else {
    res.status(404).send("Comment not found");
  }
};

// DELETE /comments/:id

router.deleteCommentById = (req, res) => {
  const commentId = parseInt(req.params.id);
  const initialLength = comments.length;

  // Filter out the comment with the given ID
  comments = comments.filter((comment) => comment.id !== commentId);

  // Check if the comment was found and removed
  if (comments.length < initialLength) {
    res.status(204).send(); // No Content
  } else {
    res.status(404).send("Comment not found");
  }
};
// Used to delete a comment with the specified id.

// DELETE http://localhost:3000/api/comments/1?api-key=perscholas

// GET /comments?userId=<VALUE>
// Retrieves comments by the user with the specified userId.
// GET /comments?postId=<VALUE>
// Retrieves comments made on the post with the specified postId.
// GET /posts/:id/comments
// Retrieves all comments made on the post with the specified id.
// GET /users/:id/comments
// Retrieves comments made by the user with the specified id.
// GET /posts/:id/comments?userId=<VALUE>
// Retrieves all comments made on the post with the specified id by a user with the specified userId.
// GET /users/:id/comments?postId=<VALUE>
// Retrieves comments made by the user with the specified id on the post with the specified postId.

module.router = { getAllComments };
