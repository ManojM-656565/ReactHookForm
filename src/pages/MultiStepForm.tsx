import { useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const emailUniqueCheck = async (email: string) => {
  await new Promise((r) => setTimeout(r, 1000));
  return email !== "test@example.com";
};

const step1Schema = z.object({
  fullName: z.string().min(3, "Full name must have at least 3 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .refine(async (val) => await emailUniqueCheck(val), {
      message: "Email already taken",
    }),
  dob: z.string().refine((val) => {
    const dob = new Date(val);
    const now = new Date();
    const age = now.getFullYear() - dob.getFullYear();
    const monthDiff = now.getMonth() - dob.getMonth();
    const dayDiff = now.getDate() - dob.getDate();
    
    if (age > 18) return true;
    if (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0))) return true;
    
    return false;
  }, "You must be at least 18 years old"),
});

const step2Schema = z
  .object({
    accountType: z.enum(["Demo", "Live"]),
    riskTolerance: z.enum(["Low", "Medium", "High"]),
    pan: z
      .string()
      .regex(/^[A-Z0-9]{10}$/, "Must be 10 uppercase alphanumeric characters")
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) => data.accountType === "Demo" || !!data.pan,
    {
      message: "PAN is required for Live accounts",
      path: ["pan"],
    }
  );

const step3Schema = z
  .object({
    password: z
      .string()
      .min(8, "Password must have at least 8 characters")
      .regex(/[A-Z]/, "Must contain an uppercase letter")
      .regex(/[a-z]/, "Must contain a lowercase letter")
      .regex(/[0-9]/, "Must contain a number")
      .regex(/[^A-Za-z0-9]/, "Must contain a special character"),
    confirmPassword: z.string(),
    agreeToTerms: z.literal(true, {
      message: "You must agree to the terms"
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const fullSchema = step1Schema.and(step2Schema).and(step3Schema);

const stepFields = [
  ['fullName', 'email', 'dob'],
  ['accountType', 'riskTolerance', 'pan'],
  ['password', 'confirmPassword', 'agreeToTerms']
];

type FullFormData = z.infer<typeof fullSchema>;
type Step1FormData = z.infer<typeof step1Schema>;
type Step2FormData = z.infer<typeof step2Schema>;
type Step3FormData = z.infer<typeof step3Schema>;

const Step1 = () => {
  const {
    register,
    formState: { errors, isValidating },
  } = useFormContext<Step1FormData>();

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          id="fullName"
          {...register("fullName")}
          disabled={isValidating}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">
            {errors.fullName.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          disabled={isValidating}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {isValidating && <p className="mt-1 text-sm text-gray-500">Checking email...</p>}
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
          Date of Birth
        </label>
        <input
          id="dob"
          type="date"
          {...register("dob")}
          disabled={isValidating}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {errors.dob && (
          <p className="mt-1 text-sm text-red-600">
            {errors.dob.message}
          </p>
        )}
      </div>
    </div>
  );
};

const Step2 = () => {
  const {
    register,
    watch,
    formState: { errors, isValidating },
  } = useFormContext<Step2FormData>();
  const accountType = watch("accountType");

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="accountType" className="block text-sm font-medium text-gray-700">
          Account Type
        </label>
        <select
          id="accountType"
          {...register("accountType")}
          disabled={isValidating}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          <option value="Demo">Demo</option>
          <option value="Live">Live</option>
        </select>
        {errors.accountType && (
          <p className="mt-1 text-sm text-red-600">
            {errors.accountType.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="riskTolerance" className="block text-sm font-medium text-gray-700">
          Risk Tolerance
        </label>
        <select
          id="riskTolerance"
          {...register("riskTolerance")}
          disabled={isValidating}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        {errors.riskTolerance && (
          <p className="mt-1 text-sm text-red-600">
            {errors.riskTolerance.message}
          </p>
        )}
      </div>

      {accountType === "Live" && (
        <div>
          <label htmlFor="pan" className="block text-sm font-medium text-gray-700">
            PAN Number
          </label>
          <input
            id="pan"
            {...register("pan")}
            disabled={isValidating}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.pan && (
            <p className="mt-1 text-sm text-red-600">
              {errors.pan.message}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

const Step3 = () => {
  const {
    register,
    formState: { errors, isValidating },
  } = useFormContext<Step3FormData>();

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register("password")}
          disabled={isValidating}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
          disabled={isValidating}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className="flex items-center">
        <input
          id="agreeToTerms"
          type="checkbox"
          {...register("agreeToTerms")}
          disabled={isValidating}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-900">
          I agree to the terms and conditions
        </label>
      </div>
      {errors.agreeToTerms && (
        <p className="mt-1 text-sm text-red-600">
          {errors.agreeToTerms.message}
        </p>
      )}
    </div>
  );
};

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const methods = useForm<FullFormData>({
    resolver: zodResolver(fullSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      dob: "",
      accountType: "Demo",
      riskTolerance: "Low",
      pan: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const {
    handleSubmit,
    trigger,
    formState: { isSubmitting, isValidating },
  } = methods;

  const handleNext = async () => {
    const fieldsToValidate = stepFields[currentStep];
    
    const isValid = await trigger(fieldsToValidate as any, { shouldFocus: true });

    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = (data: FullFormData) => {
    console.log("Final form data:", data);
    alert("Form submitted successfully! Check the console for the data.");
  };

  const steps = [<Step1 />, <Step2 />, <Step3 />];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Onboarding Form - Step {currentStep + 1}</h2>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {steps[currentStep]}
            
            <div className="flex justify-between mt-6">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={isSubmitting || isValidating}
                  className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition-colors"
                >
                  Back
                </button>
              )}

              <div className="flex-grow" />

              {currentStep < 2 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isSubmitting || isValidating}
                  className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                >
                  {isValidating ? "Validating..." : "Next"}
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting || isValidating}
                  className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

