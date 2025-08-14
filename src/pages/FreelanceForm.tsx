import { zodResolver } from "@hookform/resolvers/zod";
import { freelancerSchema } from "../schema/schema";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";

type FreelancerFormData = z.infer<typeof freelancerSchema>;
const skillOptions = ["JavaScript", "React", "UI/UX", "Node.js"];
const experience = ["junior", "mid", "senior"];

export default function FreelanceForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
  } = useForm<FreelancerFormData>({
    resolver: zodResolver(freelancerSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      age: 18,
      role: "",
      skills: [],
      experienceLevel: "junior",
      remoteWork: false,
      startDate: "",
      hoursPerWeek: 20,
      bio: "",
    },
  });
  const hoursPerWeek = watch("hoursPerWeek");
  const onSubmit = (data: FreelancerFormData) => {
    console.log("Form submitted successfully:", {
      ...data,
    });
    alert("Form submitted successfully! Check console for data.");
    reset();
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Freelance Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="border p-4 rounded">
          <h3 className="text-xl font-semibold mb-2">Basic Information</h3>
          <div>
            <label className="block">Full Name</label>
            <input
              type="text"
              {...register("fullName")}
              className="border p-2 w-full"
            />
            {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
          </div>
          <div>
            <label className="block">Email</label>
            <input
              type="email"
              {...register("email")}
              className="border p-2 w-full"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block">Password</label>
            <input
              type="password"
              {...register("password")}
              className="border p-2 w-full"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>
          <div>
            <label className="block">Age</label>
            <input
              type="number"
              {...register("age", { valueAsNumber: true })}
              className="border p-2 w-full"
            />
            {errors.age && <p className="text-red-500">{errors.age.message}</p>}
          </div>
        </div>

        <div className="border p-4 rounded">
          <h3 className="text-xl font-semibold mb-2">Professional Details</h3>
          <div>
            <label className="block">Role</label>
            <select {...register("role")} className="border p-2 w-full">
              <option value="">Select a role</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Writer">Writer</option>
              <option value="Other">Other</option>
            </select>
            {errors.role && <p className="text-red-500">{errors.role.message}</p>}
          </div>
          <div>
            <label className="block">Skills</label>
            <Controller
              name="skills"
              control={control}
              render={({ field }) => (
                <select
                  multiple
                  {...field}
                  value={field.value || []}
                  onChange={(e) => {
                    const values = Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    );
                    field.onChange(values);
                  }}
                  className="border p-2 w-full"
                >
                  {skillOptions.map((skill) => (
                    <option key={skill} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.skills && <p className="text-red-500">{errors.skills.message}</p>}
          </div>
          <div>
            <label className="block">Experience Level</label>
            <div className="flex space-x-4">
              {experience.map((level) => (
                <label key={level}>
                  <input
                    type="radio"
                    value={level}
                    {...register("experienceLevel")}
                  />
                  <span className="ml-1">{level}</span>
                </label>
              ))}
            </div>
            {errors.experienceLevel && <p className="text-red-500">{errors.experienceLevel.message}</p>}
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" {...register("remoteWork")} />
              <span className="ml-2">Available for Remote Work</span>
            </label>
          </div>
        </div>

        <div className="border p-4 rounded">
          <h3 className="text-xl font-semibold mb-2">Availability</h3>
          <div>
            <label className="block">Start Date</label>
            <input
              type="date"
              {...register("startDate")}
              className="border p-2 w-full"
            />
            {errors.startDate && <p className="text-red-500">{errors.startDate.message}</p>}
          </div>
          <div>
            <label className="block">
              Available Hours Per Week: {hoursPerWeek} hours
            </label>
            <input
              type="range"
              min="1"
              max="60"
              {...register("hoursPerWeek", { valueAsNumber: true })}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>1</span>
              <span>60</span>
            </div>
            {errors.hoursPerWeek && <p className="text-red-500">{errors.hoursPerWeek.message}</p>}
          </div>
        </div>

        <div className="border p-4 rounded">
          <h3 className="text-xl font-semibold mb-2">Bio</h3>
          <div>
            <label className="block">Bio *</label>
            <textarea
              {...register("bio")}
              rows={4}
              className="border p-2 w-full"
            />
            {errors.bio && <p className="text-red-500">{errors.bio.message}</p>}
          </div>
        </div>
         <div className="border p-4 rounded">
          <h3 className="text-xl font-semibold mb-2">Portfolio</h3>
          <div>
            <label className="block">Profile Image</label>
            <input
              type="file"
              accept="image/jpeg,image/png"
              {...register("profileImage")}
              className="border p-2 w-full"
            />
            {errors.profileImage && (
              <p className="text-red-500">{errors.profileImage.message}</p>
            )}
          </div>
           {/* Preferences */}

        </div>
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Preferences</h2>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register('newsletter')}
                className="form-checkbox"
              />
              <span className="ml-2">
                Subscribe to Newsletter
              </span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}