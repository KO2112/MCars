// app/add-car/page.tsx

import AddCarForm from "../../components/AddCarForm"; // Correct import

const AddCarPage = () => {
  return (
    <div className="py-12 px-6">
      <h1 className="text-3xl font-bold text-center mb-6">Add a New Car</h1>
      <AddCarForm /> {/* This is the form for adding a new car */}
    </div>
  );
};

export default AddCarPage;
