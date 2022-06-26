const express = require("express");
const router = express.Router();

const {
    listAllComment,
    createComment
} = require("../controllers/comment");
const { requireSignin, isAdmin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const {productById} = require("../controllers/product")
router.get("/comments/:productId", listAllComment);
router.post("/createComment/:userId", requireSignin, isAuth, createComment);
// router.put(
//   "/updateCategory/:categoryId/:userId",
//   requireSignin,
//   isAdmin,
//   updateCategory
// );
// router.delete(
//   "/deleteCategory/:categoryId/:userId",
//   requireSignin,
//   isAdmin,
//   removeCategory
// );
// router.get("/categories", listAllCategories);

// whenever there's a 'categoryId' in the route parameter,
// call the categoryById middleware method
// router.param("commentId", commentById);
router.param("productId",productById);
router.param("userId", userById);

module.exports = router;
