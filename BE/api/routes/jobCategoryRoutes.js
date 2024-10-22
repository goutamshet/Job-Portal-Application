const router = require('express').Router();
const {createJobCategory,updateJobCategory,deleteCategory, getCategories, getSingleCategory} = require("../controllers/job/jobCategoryCtrl");


router.post("/create", createJobCategory);

router.put("./:id", updateJobCategory);

router.delete("/:id", deleteCategory);

router.get("/", getCategories);

router.get('/category_name', getSingleCategory);


module.exports=router;
