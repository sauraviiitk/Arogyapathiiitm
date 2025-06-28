import React, { useEffect, useState } from "react";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { Button } from "../components/ui/Button";
import { setDoc, doc, collection, getDoc } from "firebase/firestore";
import { db, auth } from "../Context/Firebase";
import { nanoid } from "nanoid"; 

const DoctorUpdateInfo = () => {
  const user = auth.currentUser;

  const [formData, setFormData] = useState({
    fullName: "",
    specialization: "",
    qualifications: "",
    experience: "",
    about: "",
    clinicAddress: "",
    contactNumber: "",
    doctorId: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      if (!user) return;

      try {
        const docRef = doc(collection(db, "publishedDoctors"), user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching doctor info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorInfo();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // If no doctorId already in the formData, create one like "DOC-ABC123"
    const readableDoctorId = formData.doctorId || `DOC-${nanoid(6).toUpperCase()}`;

    await setDoc(doc(collection(db, "publishedDoctors"), user.uid), {
      ...formData,
      doctorId: readableDoctorId,
      uid: user.uid,
      timestamp: new Date(),
    });

    alert("✅ Doctor Info Submitted & Published!");
    setFormData((prev) => ({
      ...prev,
      doctorId: readableDoctorId,
    }));
  } catch (error) {
    console.error("Error saving doctor info:", error);
    alert("❌ Failed to save info. Try again.");
  }
};


  if (!user) {
    return (
      <div className="text-center mt-20 text-xl text-red-600">
        Please log in to update your doctor information.
      </div>
    );
  }

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 p-6">
    <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-4xl">
      <h2 className="text-4xl font-bold text-center text-green-700 mb-10">
        {loading ? "Loading..." : "Update & Publish Doctor Info"}
      </h2>

      {!loading && (
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <div className="col-span-1">
            <label className="block mb-1 font-semibold text-gray-700">Full Name</label>
            <Input
              name="fullName"
              placeholder="Dr. John Doe"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-span-1">
            <label className="block mb-1 font-semibold text-gray-700">Specialization</label>
            <Input
              name="specialization"
              placeholder="e.g., Cardiologist, Neurologist"
              value={formData.specialization}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-span-1">
            <label className="block mb-1 font-semibold text-gray-700">Qualifications</label>
            <Input
              name="qualifications"
              placeholder="e.g., MBBS, MD, DM"
              value={formData.qualifications}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-span-1">
            <label className="block mb-1 font-semibold text-gray-700">Experience (Years)</label>
            <Input
              name="experience"
              type="number"
              placeholder="e.g., 10"
              value={formData.experience}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block mb-1 font-semibold text-gray-700">Clinic Address</label>
            <Textarea
              name="clinicAddress"
              placeholder="123, Health Street, Delhi, India"
              value={formData.clinicAddress}
              onChange={handleChange}
              required
              rows={2}
            />
          </div>

          <div className="col-span-1">
            <label className="block mb-1 font-semibold text-gray-700">Contact Number</label>
            <Input
              name="contactNumber"
              placeholder="+91-9876543210"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block mb-1 font-semibold text-gray-700">About / Bio</label>
            <Textarea
              name="about"
              placeholder="Write a brief about yourself and your practice..."
              rows={4}
              value={formData.about}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-span-2 mt-4">
            <Button
              type="submit"
              className="w-full text-lg bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition-all duration-300"
            >
              {formData.timestamp ? "Save" : "Update"} & Publish
            </Button>
          </div>
        </form>
      )}
    </div>
  </div>
);
}

export default DoctorUpdateInfo;
