const { Review } = require('../model');
const router = require('express').Router();

//const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    // const reviewsData = await Review.findAll({
    //   include: [
    //     {
    //       model: Users,
    //       attributes: ['name'],
    //     },
    //   ],
    // });

    // // Serialize data so the template can read it
    // const reviews = projectData.map((review) => review.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('contact');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
