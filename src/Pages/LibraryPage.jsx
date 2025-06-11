import GradeCard from "../components/LibraryComponents/GradeCard";
import LibraryNavbar from "../components/LibraryComponents/LibraryNavbar";

const LibraryPage = () => {
  return (
    <>
      <LibraryNavbar />
      <h2 className="text-xl font-semibold mt-10 ml-10">Text Books</h2>
      <GradeCard />
    </>
  );
};

export default LibraryPage;
