import CourseAccoridionItem from "./CourseAccoridionItem";

function CourseAccordion({ modules }) {
  return (
    <>
      {modules.map((item) => {
        return <CourseAccoridionItem key={item._id} items={item} />;
      })}
    </>
  );
}

export default CourseAccordion;
