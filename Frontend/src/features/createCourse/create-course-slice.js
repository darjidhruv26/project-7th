const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  courseTitle: "",
  courseDescription: "",
  courseImageUrl:
    "https://img-b.udemycdn.com/course/750x422/4471614_361e_5.jpg",
  coursePrice: "",
  courseIntroVideoUrl: "vDQ9GZsJkms",
  courseLanguage: "",
  courseDuration: "",
  courseCategory: "",
  courseTotalQuiz: "5",
  courseTotalAssignment: "10",
  courseAuthorImage:
    "https://images.unsplash.com/photo-1544168190-79c17527004f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80",
  courseModules: [],
};

const createCourseSlice = createSlice({
  name: "createCourse",
  initialState,
  reducers: {
    courseOverview(state, action) {
      state.courseTitle = action.payload.courseTitle;
      state.courseDescription = action.payload.courseDescription;
    },
    courseMatrixs(state, action) {
      state.courseLanguage = action.payload.courseLanguage;
      state.courseDuration = action.payload.courseDuration;
      state.courseCategory = action.payload.courseCategory;
    },
    addCourseModule(state, action) {
      const findIndexOfModule = state.courseModules.findIndex(
        (item) => item.moduleId === action.payload.moduleId
      );

      if (findIndexOfModule !== -1) {
        state.courseModules[findIndexOfModule] = {
          ...state.courseModules[findIndexOfModule],
          ...action.payload,
        };
      } else {
        state.courseModules.push(action.payload);
      }
    },
    uploadmoduleFile(state, action) {
      const findIndexOfModule = state.courseModules.findIndex(
        (item) => item.moduleId === action.payload.moduleId
      );
      state.courseModules[findIndexOfModule] = {
        ...state.courseModules[findIndexOfModule],
        fileName: action.payload.fileName,
      };
    },
    courseThubnail(state, action) {
      state.courseImageUrl = action.payload.fileName;
    },
    coursePrice(state, action) {
      state.coursePrice = action.payload.price;
    },
  },
});

export const {
  courseOverview,
  courseMatrixs,
  addCourseModule,
  uploadmoduleFile,
  courseThubnail,
  coursePrice,
} = createCourseSlice.actions;

export default createCourseSlice;
