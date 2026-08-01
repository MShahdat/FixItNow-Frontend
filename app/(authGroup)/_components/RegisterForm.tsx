"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, X, Plus, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { registerAction } from "../_action/registerAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { buildRegisterPayload, DAYS, mapZodErrors, validateAccountStep, validateFullRegistration } from "@/lib/registerValidate";


type Role = "CUSTOMER" | "TECHNICIAN";
// const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const RegisterForm = () => {
  const [role, setRole] = useState<Role>("CUSTOMER");
  const [step, setStep] = useState<1 | 2>(1);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [showSkillInput, setShowSkillInput] = useState(false);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [agreed, setAgreed] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(registerAction, null);
  const [errors, setErrors] = useState<Record<string, string>>({});


  const router = useRouter()

  useEffect(() => {
    if (!state) return
    if (state.success) {
      toast.success(state.message)
      formRef.current?.reset();
      setRole('CUSTOMER');
      setSkills([]);
      setSelectedDays([]);
      setAgreed(false)
    } else {
      // console.log('login failed')
      toast.error(state.message || 'register failed')
      router.push('/register')
    }
  }, [state])



  const toggleDay = (i: number) => {
    setSelectedDays((prev) =>
      prev.includes(i) ? prev.filter((d) => d !== i) : [...prev, i]
    );
  };

  const addSkill = () => {
    if (skillInput.trim()) {
      setSkills((prev) => [...prev, skillInput.trim()]);
    }
    setSkillInput("");
    setShowSkillInput(false);
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };


  const handleNext = () => {
    const form = formRef.current;
    if (!form) return;

    const payload = buildRegisterPayload(form, role, skills, selectedDays);
    const fieldErrors = validateAccountStep(payload);

    if (fieldErrors) {
      setErrors(fieldErrors);
      // toast.error(Object.values(fieldErrors)[0]);
      return;
    }

    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const rePassword = (form.elements.namedItem("re_password") as HTMLInputElement).value;
    if (password !== rePassword) {
      setErrors((prev) => ({ ...prev, re_password: "Passwords do not match" }));
      // toast.error("Passwords do not match");
      return;
    }

    setErrors({});
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const payload = buildRegisterPayload(form, role, skills, selectedDays);
    const fieldErrors = validateFullRegistration(payload);

    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const rePassword = (form.elements.namedItem("re_password") as HTMLInputElement).value;
    const passwordsMatch = password === rePassword;

    if (fieldErrors || !passwordsMatch) {
      e.preventDefault();
      const merged = fieldErrors ?? {};
      if (!passwordsMatch) merged.re_password = "Passwords do not match";
      setErrors(merged);
      // toast.error(Object.values(merged)[0] ?? "Please fix the errors and try again");
      return;
    }

    setErrors({});
  };


  return (
    <div className="w-full flex items-start justify-center py-4 px-2">
      <form ref={formRef} action={action} onSubmit={handleSubmit} className="w-full max-w-[460px]">
        {/* Step indicator */}
        <div className="flex items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold bg-[#0f1420] text-white">
              {step === 2 ? <Check className="w-3.5 h-3.5" /> : "1"}
            </div>
            <span className="text-sm font-semibold text-[#0f1420]">Account</span>
          </div>
          <div className="flex-1 h-px bg-gray-200 mx-3" />
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border",
                step === 2
                  ? "bg-[#0f1420] text-white border-transparent"
                  : "border-gray-300 text-gray-300"
              )}
            >
              2
            </div>
            <span
              className={cn(
                "text-sm font-semibold",
                step === 2 ? "text-[#0f1420]" : "text-gray-300"
              )}
            >
              Profile
            </span>
          </div>
        </div>

        {/* Hidden fields that mirror React state — always present so FormData sees them */}
        <input type="hidden" name="role" value={role} />
        <input type="hidden" name="skills" value={JSON.stringify(skills)} />
        <input
          type="hidden"
          name="availability"
          value={JSON.stringify(selectedDays.map((i) => DAYS[i]))}
        />

        <div className={step === 1 ? "" : "hidden"}>
          <div className="grid grid-cols-2 gap-1 bg-gray-100 rounded-xl p-1 mb-6">
            <button
              type="button"
              onClick={() => setRole("CUSTOMER")}
              className={cn(
                "h-10 rounded-lg text-sm font-medium transition-colors",
                role === "CUSTOMER"
                  ? "bg-white text-[#0f1420] shadow-sm"
                  : "text-gray-500"
              )}
            >
              I need a service
            </button>
            <button
              type="button"
              onClick={() => setRole("TECHNICIAN")}
              className={cn(
                "h-10 rounded-lg text-sm font-medium transition-colors",
                role === "TECHNICIAN"
                  ? "bg-white text-[#0f1420] shadow-sm"
                  : "text-gray-500"
              )}
            >
              I offer a service
            </button>
          </div>

          <div className="flex flex-col gap-3 space-y-1">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm font-semibold text-[#0f1420] mb-2 block">First Name</label>
                <Input
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  required
                  onChange={() => setErrors((prev) => ({ ...prev, firstName: "" }))}
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="text-sm font-semibold text-[#0f1420] mb-2 block">Last Name</label>
                <Input
                  name="lastName"
                  type="text"
                  placeholder="Last name"
                  onChange={() => setErrors((prev) => ({ ...prev, lastName: "" }))}
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-[#0f1420] mb-2 block">Email</label>
              <Input
                name="email"
                type="email"
                placeholder="Email address"
                required
                onChange={() => setErrors((prev) => ({ ...prev, email: "" }))}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="text-sm font-semibold text-[#0f1420] mb-2 block">Phone</label>
              <Input
                name="phone"
                type="text"
                placeholder="Phone number"
                required
                onChange={() => setErrors((prev) => ({ ...prev, phone: "" }))}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-sm font-semibold text-[#0f1420] mb-2 block">Password</label>
                <Input
                  name="password"
                  type="password"
                  placeholder="password"
                  required
                  onChange={() => setErrors((prev) => ({ ...prev, password: "" }))}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
              <div>
                <label className="text-sm font-semibold text-[#0f1420] mb-2 block">Re-type Password</label>
                <Input
                  name="re_password"
                  type="password"
                  placeholder="Confirm password"
                  required
                  onChange={() => setErrors((prev) => ({ ...prev, re_password: "" }))}
                />
                {errors.re_password && <p className="text-red-500 text-xs mt-1">{errors.re_password}</p>}
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(v) => setAgreed(!!v)}
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <a href="#" className="font-semibold text-[#0f1420] underline">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" className="font-semibold text-[#0f1420] underline">
                  Privacy Policy
                </a>
              </label>
            </div>
          </div>

          <Button
            disabled={!agreed}
            type={role === "TECHNICIAN" ? "button" : "submit"}
            onClick={() => {
              if (role === "TECHNICIAN") handleNext();
            }}
            className="w-full"
          >
            {
              role === "TECHNICIAN"
                ?
                "Continue to profile setup"
                :
                pending ? "Creating..." : "Create account"
            }
            {pending ?
              '' : <ArrowRight className="w-4 h-4" />
            }
          </Button>
        </div>


        <div className={step === 2 && role === "TECHNICIAN" ? "" : "hidden"}>
          <label className="text-sm font-semibold text-[#0f1420] mb-2 block">
            Short bio (Optional)
          </label>
          <Textarea
            name="bio"
            placeholder="15 years fixing pipes across the Bay Area…"
            className="min-h-[90px] mb-4 resize-none py-3"
          />

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="text-sm font-semibold text-[#0f1420] mb-2 block">Years of experience</label>
              <Input
                name="experience"
                type="number"
                placeholder="5"
                onChange={() => setErrors((prev) => ({ ...prev, experience: "" }))}
              />
              {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
            </div>

            <div>
              <label className="text-sm font-semibold text-[#0f1420] mb-2 block">Hourly rate</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <Input
                  name="hourlyRate"
                  type="number"
                  placeholder="50"
                  className="pl-6"
                  onChange={() => setErrors((prev) => ({ ...prev, hourlyRate: "" }))}
                />
              </div>
              {errors.hourlyRate && <p className="text-red-500 text-xs mt-1">{errors.hourlyRate}</p>}
            </div>

          </div>

          <label className="text-sm font-semibold text-[#0f1420] mb-2 block">
            Skills
          </label>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 bg-[#ede9fe] text-[#5b21b6] text-sm font-medium px-3 py-1.5 rounded-full"
              >
                {skill}
                <button type="button" onClick={() => removeSkill(skill)}>
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
            {showSkillInput ? (
              <input
                autoFocus
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSkill()}
                onBlur={addSkill}
                placeholder="Add skills"
                className="border border-dashed border-gray-300 rounded-full px-3 py-1.5 text-sm w-32 focus:outline-none"
              />
            ) : (
              <button
                type="button"
                onClick={() => setShowSkillInput(true)}
                className="inline-flex items-center gap-1 border border-dashed border-gray-300 text-sm font-medium px-3 py-1.5 rounded-full"
              >
                <Plus className="w-3.5 h-3.5" /> Add Skills
              </button>
            )}
          </div>

          <label className="text-sm font-semibold text-[#0f1420] mb-2 block">
            Available days
          </label>
          <div className="flex gap-2 mb-6">
            {DAYS.map((d, i) => (
              <button
                key={i}
                type="button"
                onClick={() => toggleDay(i)}
                className={cn(
                  "w-11 h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors",
                  selectedDays.includes(i)
                    ? "bg-[#0f1420] text-white"
                    : "border border-gray-300 text-gray-400"
                )}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(1)}
              className="w-1/2 font-semibold"
            >
              <ArrowLeft />
              Back
            </Button>
            <Button type="submit" disabled={pending} className="w-1/2 font-semibold">
              {pending ? "Creating..." : "Create account"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;