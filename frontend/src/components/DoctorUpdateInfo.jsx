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
      <div className="bg-white shadow-2xl rounded-xl p-10 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
          {loading ? "Loading..." : "Update Doctor Information"}
        </h2>

        {!loading && (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <Input
                name="fullName"
                placeholder="Dr. John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Specialization</label>
              <Input
                name="specialization"
                placeholder="e.g., Cardiologist, Neurologist"
                value={formData.specialization}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Qualifications</label>
              <Input
                name="qualifications"
                placeholder="e.g., MBBS, MD, DM"
                value={formData.qualifications}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Years of Experience</label>
              <Input
                name="experience"
                type="number"
                placeholder="e.g., 10"
                value={formData.experience}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Clinic Address</label>
              <Textarea
                name="clinicAddress"
                placeholder="123, Health Street, Delhi, India"
                value={formData.clinicAddress}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Contact Number</label>
              <Input
                name="contactNumber"
                placeholder="+91-9876543210"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">About / Bio</label>
              <Textarea
                name="about"
                placeholder="Write a brief about yourself and your practice..."
                rows={5}
                value={formData.about}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" className="w-full mt-4">
             {formData.timestamp ? "Save" : "Update"} & Publish
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default DoctorUpdateInfo;
