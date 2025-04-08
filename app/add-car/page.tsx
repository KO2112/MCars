// app/add-car/page.tsx

import AddCarForm from "../../components/AddCarForm"; // Correct import

const AddCarPage = () => {
  return (
    <div className="py-12 px-6">
      
      <AddCarForm /> {/* This is the form for adding a new car */}
    </div>
  );
};

export default AddCarPage;
