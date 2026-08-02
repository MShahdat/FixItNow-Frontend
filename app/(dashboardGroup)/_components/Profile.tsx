'use client'

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Plus, X } from 'lucide-react';
import { useActionState, useEffect, useRef, useState } from 'react';
import { cn } from "@/lib/utils";
import { DAYS } from '@/lib/registerValidate';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { updateProfile } from '@/services/updateMe';
import { toast } from 'sonner';

const image = 'https://img.magnific.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80'

interface TechnicianProfile {
  id: string;
  userId: string;
  bio: string;
  skills: string[];
  experience: number;
  hourlyRate: number
  completedJobs: number;
  availability: string[];
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profileImage?: string;
  address?: string;
  city?: string;
  role: 'CUSTOMER' | 'TECHNICIAN' | 'ADMIN';
  status: string
  technicianProfile?: TechnicianProfile
}

const STATUS_STYLES: Record<string, string> = {
  ACTIVE: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  APPROVED: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  PENDING: "bg-amber-50 text-amber-700 ring-amber-600/20",
  INACTIVE: "bg-zinc-100 text-zinc-600 ring-zinc-500/20",
  REJECTED: "bg-red-50 text-red-700 ring-red-600/20",
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-4">
    <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
      {children}
    </span>
    <div className="h-px flex-1 bg-zinc-200" />
  </div>
);




const Profile = ({ profile }: { profile: User }) => {


  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [showSkillInput, setShowSkillInput] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const toggleDay = (i: number) => {
    setSelectedDays((prev) =>
      prev.includes(i) ? prev.filter((d) => d !== i) : [...prev, i]
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewImage(url);
  };

  useEffect(() => {
    return () => {
      if (previewImage) URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);

  useEffect(() => {
    if (!profile.technicianProfile) return;

    setSkills(profile.technicianProfile.skills ?? []);

    const dayIndexes = DAYS
      .map((day, index) =>
        profile.technicianProfile?.availability.includes(day.value)
          ? index
          : -1
      )
      .filter((index) => index !== -1);

    setSelectedDays(dayIndexes);
  }, [profile]);

  const fullName = `${profile.firstName} ${profile.lastName}`;
  const statusStyle = STATUS_STYLES[profile.status?.toUpperCase()] ?? STATUS_STYLES.INACTIVE;


  const [state, action, pending] = useActionState(updateProfile, null) as any;


  useEffect(() => {
    if (!hasSubmitted || !state) return

    if (state.success && state.data) {
      toast.success(state.message)
    } else {
      toast.error(state.message || 'register failed')
    }

    setHasSubmitted(false)
  }, [hasSubmitted, state])

  return (
    <Card>
      <form action={action} onSubmit={() => setHasSubmitted(true)}>
        <input type="hidden" name="role" value={profile.role} />
        <input type="hidden" name="skills" value={JSON.stringify(skills)} />
        <input
          type="hidden"
          name="availability"
          value={JSON.stringify(selectedDays.map((i) => DAYS[i].value))}
        />
        {/* Identity */}
        <CardHeader className='flex flex-col items-center justify-center'>
          <div className="relative flex flex-col items-center justify-center gap-4 border-b border-zinc-100 py-6">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24">
              <img
                src={previewImage ?? profile.profileImage ?? image}
                alt={fullName}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover ring-4 ring-zinc-50 shrink-0"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Change profile image"
                className="absolute bottom-0 right-0 flex items-center justify-center w-7 h-7 rounded-full bg-white text-zinc-600 shadow-md ring-1 ring-zinc-200 hover:bg-zinc-50 hover:text-violet-700 transition-colors"
              >
                <Edit className="w-3.5 h-3.5" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-1.5 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-semibold text-zinc-900 truncate">
                  {fullName}
                </h1>
                <Badge className={cn(
                  "text-[11px] font-medium px-2 py-0.5 rounded-full ring-1 ring-inset capitalize",
                  statusStyle
                )}>
                  {profile.status?.toLowerCase()}
                </Badge>
              </div>
              <p className='text-sm -mt-1'>{profile.email}</p>
              <p className="text-sm text-zinc-500 mt-1">{profile.role}</p>
              {profile.technicianProfile && (
                <p className="text-sm font-medium text-violet-700">
                  {profile.technicianProfile.experience} yrs experience
                </p>
              )}
            </div>
          </div>
        </CardHeader>

        {/* Form sections */}
        <CardContent className="space-y-8 py-6">

          <div>
            <SectionLabel>Bio</SectionLabel>
            <Field>
              <Label htmlFor="bio" className="sr-only">Bio</Label>
              <Textarea
                id="bio"
                rows={4}
                defaultValue={profile.technicianProfile?.bio ?? ''}
                name="bio"
                placeholder="Tell customers a little about yourself..."
                required
                className="resize-none"
              />
            </Field>
          </div>

          <div>
            <SectionLabel>Location</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field>
                <Label htmlFor="address" className="text-sm font-medium text-zinc-700 mb-1.5 block">
                  Address
                </Label>
                <Input id="address" name="address" type="text" defaultValue={profile.address ?? ''} />
              </Field>
              <Field>
                <Label htmlFor="city" className="text-sm font-medium text-zinc-700 mb-1.5 block">
                  City
                </Label>
                <Input id="city" name="city" type="text" defaultValue={profile.city ?? ''} />
              </Field>
            </div>
          </div>

          <div>
            <SectionLabel>Pricing & performance</SectionLabel>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <Label htmlFor="fee" className="text-sm font-medium text-zinc-700 mb-1.5 block">
                  Hourly rate (৳)
                </Label>
                <Input
                  id="fee"
                  type="number"
                  name="fee"
                  defaultValue={profile?.technicianProfile?.hourlyRate ?? ''}
                />
              </Field>
              <Field>
                <Label htmlFor="completeJobs" className="text-sm font-medium text-zinc-700 mb-1.5 block">
                  Completed jobs
                </Label>
                <Input
                  id="completeJobs"
                  type="number"
                  name="completeJobs"
                  defaultValue={profile.technicianProfile?.completedJobs ?? 0}
                  required
                  readOnly
                  className="bg-zinc-50 text-zinc-500 cursor-not-allowed"
                />
              </Field>
            </div>
          </div>

          <div>
            <SectionLabel>Skills</SectionLabel>
            <div className="flex flex-wrap items-center gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 bg-violet-50 text-violet-700 text-sm font-medium pl-3 pr-2 py-1.5 rounded-full"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="rounded-full p-0.5 hover:bg-violet-100 transition-colors"
                    aria-label={`Remove ${skill}`}
                  >
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
                  placeholder="Add skill"
                  className="border border-dashed border-zinc-300 rounded-full px-3 py-1.5 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setShowSkillInput(true)}
                  className="inline-flex items-center gap-1 border border-dashed border-zinc-300 text-zinc-500 text-sm font-medium px-3 py-1.5 rounded-full hover:border-violet-400 hover:text-violet-700 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Add skill
                </button>
              )}
            </div>
          </div>

          <div>
            <SectionLabel>Available days</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {DAYS.map((d, i) => (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => toggleDay(i)}
                  className={cn(
                    "w-11 h-9 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500/30",
                    selectedDays.includes(i)
                      ? "bg-zinc-900 text-white"
                      : "border border-zinc-200 text-zinc-400 hover:border-zinc-300 hover:text-zinc-600"
                  )}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

        </CardContent>

        {/* Actions */}
        <CardFooter className="justify-end border-t border-zinc-100 bg-zinc-50/60 py-4">
          <Button type="submit" size="sm" className="w-full sm:w-auto">
            {
              pending ? "Changing" : "Save changes"
            }
          </Button>
        </CardFooter>

      </form>
    </Card>
  );
};

export default Profile;