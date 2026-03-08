"use client";

import { useEffect, useState } from "react";

type Category = {
  id: string;
  name: string;
};

export default function AddMenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    categoryId: "",
    cuisine: "",
    dietType: "",
    image: "",
  });
console.log(formData)
  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/categories`, {
       method: "GET",
       credentials: "include",
           });
        const json = await res.json();
       
        // Filter active only (defensive frontend logic)
        const activeCategories = json.data.filter((cat: any) => cat.isActive);
        
        setCategories(activeCategories);
      } catch (err) {
        console.error("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Basic Validation
    if (!formData.title || !formData.price || !formData.categoryId ||
      !formData.cuisine ||
      !formData.dietType) {
      setError("Please fill all required fields.");
      return;
    }

    if (Number(formData.price) <= 0) {
      setError("Price must be greater than 0.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/provider/meals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          credentials: "include",
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          price: Number(formData.price),
          categoryId: formData.categoryId,
          cuisine: formData.cuisine,
          dietType: formData.dietType,
          image: formData.image,
          
        }),
      });

      const result = await res.json();

if (!res.ok) {
 console.error("Backend responded with error:", res.status, result);
    throw new Error(result.message || `Server error (${res.status})`);
}


      setSuccess("Meal added successfully!");
      setFormData({
        title: "",
        description: "",
        price: "",
        categoryId: "",
        cuisine: "",
        dietType: "",
        image: "",
      });
    } catch (err:any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 text-black rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6">Add New Menu Item</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Title */}
        <div>
          <label className="block text-black font-medium mb-2">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-black rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter meal title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium text-black mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full border border-black rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter description"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-black font-medium mb-2">Price (৳) *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-black rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter price"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium
           mb-2">Category *</label>

          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full border
             border-black rounded-lg px-4 py-2 focus:ring-2
              focus:ring-blue-500"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

          <div>
          <label className="block font-medium
           mb-2">Cuisine</label>
        <select name="cuisine" value={formData.cuisine} onChange={handleChange}
         className="w-full border
             border-black rounded-lg px-4 py-2 focus:ring-2
              focus:ring-blue-500">
          <option value="">Select Cuisine</option>
          <option value="Indian">Indian</option>
          <option value="Chinese">Chinese</option>
          <option value="Italian">Italian</option>
        </select> </div>
       
             <div>
          <label className="block font-medium
           mb-2">Diet Type*</label>
        <select name="dietType" value={formData.dietType} onChange={handleChange} 
        className="w-full border
             border-black rounded-lg px-4 py-2 focus:ring-2
              focus:ring-blue-500">
          <option value="">Select Diet Type</option>
          <option value="Veg">Veg</option>
          <option value="Vegan">Vegan</option>
          <option value="Non-Veg">Non-Veg</option>
        </select> </div>

        {/* Image URL */}
        <div>
          <label className="block font-medium mb-2">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full border border-black rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Paste image URL"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-800 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Saving..." : "Add Menu"}
        </button>
      </form>
    </div>
  );
}
