const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const Learner = require("./model/learner");
const Instructor = require("./model/instructor");
const Course = require("./model/course");
const path = require("path");
const multer = require("multer");

const mongodb_url =
  "mongodb+srv://YagnikAkbari12:Ppsv%402020@cluster0.dq3pwce.mongodb.net/CourseFinityDB?retryWrites=true&w=majority";

require("dotenv").config();

mongoose.set("strictQuery", false);
const app = express();

const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/course");
const paymentRoutes = require("./routes/payment");
const instructor = require("./model/instructor");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    let event = request.body;

    if (process.env.ENDPOINT_SECRET) {
      const signature = request.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          process.env.ENDPOINT_SECRET
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
    }

    switch (event.type) {
      case "payment_intent.succeeded":
        console.log("success");
        const paymentIntent = event.data.object;

        // add logic for adding purchased courseId to user's my courses array
        const user = await Learner.findOne({
          email: paymentIntent.metadata.email,
        });
        user.courseId = user.courseId.push(paymentIntent.metadata.courseId);
        await user.save();
        break;
      default:
        console.log(`Unhandled event type ${event.type}.`);
    }

    response.send();
  }
);

// app.use(express.static(path.resolve(__dirname, "build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve("build", "index.html"));
// });

const store = new MongoDBStore({
  uri: mongodb_url,
  collection: "sessions",
});

app.use(
  session({
    secret: "My Secret",
    resave: true,
    saveUninitialized: false,
    store: store,
    cookie: {
      expires: 600000,
    },
  })
);

app.use(async (req, res, next) => {
  try {
    // console.log("session print from middlerware:-----", req.session);
    if (!req.session.user) {
      // console.log("no session found.");
      return next();
    }
    const user = await Learner.findById(req.session.user._id);
    console.log(user);
    if (!user) {
      // console.log("no user found!");
      return next();
    }

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
});

app.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
app.use(express.json());

app.use(authRoutes);
app.use(courseRoutes);
app.use(paymentRoutes);

app.post("/createCourse", async (req, res, next) => {
  try {
    const data = req.body;

    const course = new Course({
      courseTitle: data.courseTitle,
      courseAuthor: "64d10501ae8eb3a14396d671",
      courseImageUrl: data.courseImageUrl,
      coursePrice: data.coursePrice,
      courseDescription: data.courseDescription,
      courseLanguage: data.courseLanguage,
      courseDuration: data.courseDuration,
      courseModules: data.courseModules,
      courseCategory: data.courseCategory,
      courseTotalQuiz: +data.courseTotalQuiz,
      courseTotalAssignment: +data.courseTotalAssignment,
      courseAuthorImage:
        "https://images.unsplash.com/photo-1692182549439-2a78c119dc40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
      courseIntroVideoUrl: "CXcdzxvv",
    });

    const result = await course.save();
    console.log("Course uploaded!.");

    return res
      .status(201)
      .send({ message: "Course is uploaded successfully." });
  } catch (err) {
    console.log(err);

    res.status(500).send({ message: "Error processing new cours!" });
  }
});

store.on("error", function (error) {
  console.log("Session Store Error:", error);
});

app.post("/googleAuth", (req, res, next) => {
  const data = req.body;
  console.log(data);
});

app.post("/resetEmail", (req, res, next) => {
  const data = req.body;
  console.log(data);
  res.status(200).send({ message: "email send successful." });
});

app.post("/resetPassword", (req, res, next) => {
  const data = req.body;
  console.log(data);
  if (data.pass !== data.cpass) {
    return res.status(400).send({ message: "passowrd not matched!" });
  }
  res.status(200).send({ message: "passowrd change successful." });
});

app.post("/addfavouriteCourse", (req, res, next) => {
  const { courseId, email } = req.body;
  console.log(courseId, email);
  res.status(201).send({ message: "added to favourite" });
});

app.delete("/removefavouriteCourse", (req, res, next) => {
  const { courseId, email } = req.body;
  console.log(courseId, email);
  res.status(200).send({ message: "remove from favourite" });
});

app.get("/mycourses", (req, res, next) => {
  const email = "test@gmail.com";
  // find purchaesd course for loggedin user
  const courseList = ["64d488e9592ecd4f3b210d9b", "64d48c3a592ecd4f3b249415"];
  res.status(200).send({ message: courseList });
});

app.get("/favouriteCourseList", async (req, res, next) => {
  try {
    const response = await Learner.find({ _id: "64e3a08a84c8f9229858e366" });

    const favouriteCourseList = response[0].favouriteCourses;
    console.log(favouriteCourseList);
    res.status(200).send({ message: favouriteCourseList });
  } catch (err) {
    console.log(err);
  }
});
app.get("/myCoursesInstructor", async (req, res, next) => {
  try {
    const response = await Instructor.find({ _id: "64e3a28c5b6886245b54c927" });

    const myCourseList = response[0].favouriteCourses;
    console.log(favouriteCourseList);
    res.status(200).send({ message: myCourseList });
  } catch (err) {
    console.log(err);
  }
});

mongoose
  .connect(mongodb_url)
  .then((db) => {
    app.listen(5050);
    console.log("Database is Connected.");
  })
  .catch((err) => {
    console.log(err);
    console.log("Database not connected!");
  });
