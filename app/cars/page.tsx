// Import the Cars component from the components folder
import Cars from "../../components/Cars";

const CarsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        {/* Render the Cars component here */}
        <Cars />
      </div>
    </div>
  );
};

export default CarsPage;
