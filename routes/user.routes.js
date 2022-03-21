const express = require('express');
const usercontroller = require('../controller/user.controller');
const router = express.Router();
const { body, validationResult } = require('express-validator');


router.post("/signup",
    body('username'),
    body('mobile').isMobilePhone(),
    body('email').isEmail(),
    body('password', 'Password length must be 5 letters long').isLength(5),
    usercontroller.signup);

router.post("/signin",
    body('email').isEmail(),
    body('password', 'Password must be 5 letters long').isLength(5),
    usercontroller.signin);


router.post("/add-to-cart",
    body('userId').not().isEmpty(),
    body('foodId').not().isEmpty(),
    usercontroller.addtoCart);

router.get("/view-cart/:userId", usercontroller.viewCart);

router.delete("/remove-from-cart", usercontroller.removeCart);

router.post("/add-favourite",
    body('userId').not().isEmpty(),
    body('foodId').not().isEmpty(), usercontroller.addtoFavourite);

router.get("/view-favourites/:userId", usercontroller.viewfavourites);





/*router.get("/view-Package-list", usercontroller.viewPackage);

router.get("/view-Product-list", usercontroller.viewProduct);

router.delete("/delete-account/:userId", usercontroller.deleteAccount);
*/

module.exports = router;