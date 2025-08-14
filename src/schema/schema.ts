import {z} from "zod";
export const freelancerSchema=z.object({
    fullName:z.string().min(2,"Full name must be at least 2 characters"),
    email:z.email("Please enter a valid email address"),
    password:z.string().min(8,"Password must be at least 8 characters"),
    age:z.number().min(18,"Age must be at least 18"),

    role:z.string().min(1,"Please select a role"),
    skills:z.array(z.string()).min(1,"Please select at least one skill"),
    experienceLevel:z.enum(["junior","mid","senior"],{
        message:"Please select an experience level"
    }),
    remoteWork:z.boolean(),

    startDate:z.string().min(1,"start data is required"),
    hoursPerWeek:z.number().min(20,"Minimum 20 hour").max(60,"Maximum 60 hours a week is required"),
    bio: z.string().min(10, 'Bio must be at least 10 characters'),
    profileImage: z.instanceof(FileList)
    .refine((files) => files.length > 0, 'Profile image is required')
    .refine((files) => files[0]?.size <= 2 * 1024 * 1024, 'File size must be less than 2MB')
    .refine(
      (files) => ['image/jpeg', 'image/png'].includes(files[0]?.type),
      'Only JPEG and PNG images are allowed'
    ),
     newsletter: z.boolean(),


})