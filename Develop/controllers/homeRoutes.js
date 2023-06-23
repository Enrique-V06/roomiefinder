// const { Review } = require('../model');
const { Users, Search, Offer, Review } = require('../model');

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
    res.render('homepage');
  } catch (err) {
    res.status(500).json(err);
  }
});

//CONTACT
// http://localhost:3001/contact
router.get('/contact', async (req, res) => {
  try {
    res.render('contact');
  } catch (err) {
    res.status(500).json(err);
  }
});

// SIGNUP
// http://localhost:3001/signup
router.post('/signup', async (req, res) => {
  console.log('req: ', req.body);
  console.log('req username: ', req.body.username);
  // res.status(200).json(req.body);
  try {
    const dbUserData = await Users.create({
      userName: req.body.username,
      email: req.body.email,
      password: req.body.password,
      userType: req.body.userType,
    });

    // Set up sessions with a 'loggedIn' variable set to `true`
    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json(dbUserData);
      console.log("response sent")
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    console.log('failure: ', res.status);
  }
});

//LOGIN
// http://localhost:3001/login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!dbUserData) {
      console.log("cant find user")
      res
        .status(400)
        .json({ message: 'Cannot Find your account in our system.' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      console.log("invalid password")
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log("Catched!")
    console.log(err);
    res.status(500).json(err);
  }
});


// // You are SIGNED IN
// // http://localhost:3001/user
// // -----EVITAR RENDER SI NO ESTAS SIGNED IN !!!
// router.get('/user', async (req, res) => {
//   console.log('---------------LOGED?: ',req.session.loggedIn);
//   if (!req.session.loggedIn) {
//     console.log("NOT loged!")
//     res.redirect('/');
//   } else {
//     console.log("loged!")
//     //---------------------------
//     try {
//       const dbHomeData = await Offer.findAll(
//       );
//       console.log("-------------dbHomeData: ", dbHomeData);
      
//       const homes = dbHomeData.map((home) =>
//         home.get({ plain: true })
//       );
      
//       // console.log("-------------homes b4: ", homes);

//       homes.forEach(element => {
//         if (!element.pet){
//           element.pet = 'No Pets Allowed'
//         } else {
//           element.pet = 'This home is Pet Friendly'
//         }
//       });
        
//       console.log("-------------homes aft: ", homes);

//       res.render('userhomepage', {homes}); 
//       // res.render('userhomepage');
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//     //---------------------------
//     // res.render('userhomepage'); 
//   }
// });


// Logout
router.post('/logout', (req, res) => {
  console.log("---------- LOGOUT POST REQ RECEIVED");
  if (req.session.loggedIn) {
    // req.session.loggedIn = false;
    // res.status(204).end();
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
