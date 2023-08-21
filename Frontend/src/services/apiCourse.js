import { genrateResponse } from "../utils/helper";

export async function getCourseList() {
  try {
    const response = await fetch("/courseList", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return genrateResponse(response);
  } catch (err) {
    console.log(`${err.message}💥💥💥💥💥💥`);
  }
}

export async function getCourseById(courseId) {
  try {
    const response = await fetch(`/courseById`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: courseId }),
    });
    return genrateResponse(response);
  } catch (err) {
    throw err;
  }
}

export async function getFavouriteCoursesId() {
  try {
    const response = await fetch("/favouriteCourseList", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return genrateResponse(response);
  } catch (err) {
    console.log(`${err.message}💥💥💥💥💥💥`);
  }
}

export async function favouriteCourse(courseId, email) {
  try {
    const response = await fetch(`/addfavouriteCourse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ courseId, email }),
    });

    if (!response.ok) {
      throw new Error("can't possible add to favourite.");
    }
    return genrateResponse(response);
  } catch (err) {
    throw err;
  }
}

export async function removefavouriteCourse(courseId, email) {
  try {
    const response = await fetch(`/removefavouriteCourse`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ courseId, email }),
    });
    if (!response.ok) {
      throw new Error("can't possible to remomve item.");
    }
    return genrateResponse(response);
  } catch (err) {
    throw err;
  }
}

export async function getMyCourses() {
  try {
    const response = await fetch(`/mycourses`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("can't possible to remomve item.");
    }
    return genrateResponse(response);
  } catch (err) {
    throw err;
  }
}
