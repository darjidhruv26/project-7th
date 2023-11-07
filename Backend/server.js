const express = require("express");
const bodyParser = require("body-parser");
const { mongoose, ObjectId } = require("mongoose");
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

const store = new MongoDBStore({
  uri: mongodb_url,
  collection: "sessions",
});

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

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

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

app.use((req, res, next) => {
  if (!req.session.learner) {
    return next();
  }

  Learner.findById(req.session.learner_id).then((student) => {
    req.learner = student;
    next();
  });
});

app.use((req, res, next) => {
  if (!req.session.instructor) {
    return next();
  }

  Instructor.findById(req.session.instructor_id).then((instructor) => {
    req.instructor = instructor;
    next();
  });
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
    const session_instructor = req.session.instructor;

    const course = new Course({
      courseTitle: data.courseTitle,
      courseAuthor: session_instructor,
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

    if (result) {
      const recentCourseId = result._id;
      const updatedUser = await Instructor.findByIdAndUpdate(
        session_instructor._id,
        { $addToSet: { myCourses: recentCourseId } },
        { new: true }
      );

      if (!updatedUser) {
        console.log("can't find user");
        return res.status(404).send({ message: "User not found" });
      }

      return res.status(201).send({ message: "Added to my Course!" });
    }
  } catch (err) {
    console.log(err);

    res.status(500).send({ message: "Error processing new cours!" });
  }
});

app.post("/googleAuth", (req, res, next) => {
  const data = req.body;
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

app.delete("/removefavouriteCourse", async (req, res, next) => {
  try {
    const loggedInUserId = req.session.learner;
    const { courseId } = req.body;

    const course = await Course.findOne({ _id: courseId });
    if (!course) {
      return res.status(404).send({ message: "Course not found" });
    }

    const updatedUser = await Learner.findByIdAndUpdate(
      loggedInUserId,
      { $pull: { favouriteCourses: courseId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: "Removed from favorites" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error processing request" });
  }
});

app.get("/mycreatedcourses", async (req, res, next) => {
  try {
    const session_instructor_id = req.session.instructor._id;
    const response = await Instructor.find({ _id: session_instructor_id });

    const myCourseList = response[0].myCourses;

    res.status(200).send({ message: myCourseList });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/deletecourse", async (req, res, next) => {
  try {
    const session_instructor_id = req.session.instructor._id;
    const courseId = req.body.id;
    const instructor = await Instructor.findOne({ _id: session_instructor_id });

    if (!instructor) {
      return res.status(404).send({ message: "Instructor not found." });
    }

    const courseIndex = instructor.myCourses.indexOf(courseId);

    if (courseIndex === -1) {
      return res
        .status(404)
        .send({ message: "Course not found in instructor's myCourses." });
    }

    instructor.myCourses.splice(courseIndex, 1);

    await instructor.save();

    const response1 = await Course.deleteOne({ _id: courseId });

    if (response1.deletedCount > 0) {
      res.status(200).send({ message: "Course deleted successfully." });
      return;
    } else {
      return res.status(404).send({ message: "Course not found." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error." });
  }
});

app.get("/mycourses", async (req, res, next) => {
  try {
    const session_learner_id = req.session.learner._id;

    const response = await Learner.find({ _id: session_learner_id });

    const myCourseList = response[0].myCourses;

    res.status(200).send({ message: myCourseList });
  } catch (err) {
    console.log(err);
  }
});

app.get("/favouriteCourseList", async (req, res, next) => {
  try {
    const session_learner = req.session.learner._id;
    const response = await Learner.find({ _id: session_learner });
    const favouriteCourseList = response[0].favouriteCourses;

    res.status(200).send({ message: favouriteCourseList });
  } catch (err) {
    console.log(err);
  }
});

app.use(express.static(path.resolve(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve("build", "index.html"));
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
